import { Injectable } from '@nestjs/common';
import { Leave } from './leave.entity';
import { LeaveBalance } from './leave-balance.entity';
import { LeavePolicy } from './leave-policy.enty';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/employee/employee.entity';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave) private leaveRepo: Repository<Leave>,
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(LeaveBalance)
    private leaveBalanceRepo: Repository<LeaveBalance>,
    @InjectRepository(LeavePolicy)
    private leavePolicyRepo: Repository<LeavePolicy>,
  ) {}

  async getLeaveEligibility(employeeId: number) {
    const employee = await this.employeeRepo.findOne({
      where: { id: employeeId },
    });
    const policy = await this.leavePolicyRepo.findOne({
      where: { employeCategory: employee?.category, isActive: true },
    });

    //calculate hire date + waiting period
    const hireDate = employee?.dateOfHire
      ? new Date(employee?.dateOfHire)
      : null;
    const eligibleDate = hireDate ? new Date(hireDate) : null;
    eligibleDate?.setMonth(
      eligibleDate.getMonth() + (policy?.waitingPeriodMonths ?? 0),
    );

    //get a leave balance
    let balance = await this.leaveBalanceRepo.findOne({
      where: {
        employee: { id: employeeId },
      },
    });

    //if no balance recording we will create one( this helps me remember the logic)
    if (!balance) {
      balance = this.leaveBalanceRepo.create({
        employee: employee ?? ({ id: employeeId } as any),
        regularLeaveBalance: 0,
        nextEligibleLeaveBalance: eligibleDate ?? undefined,
      });

      await this.leaveBalanceRepo.save(balance);
    }

    const today = new Date();
    const isEligible = eligibleDate ? today >= eligibleDate : false;

    return {
      employee,
      policy,
      balance,
      isEligible,
      daysUntilEligible: eligibleDate
        ? isEligible
          ? 0
          : Math.ceil(
              (eligibleDate.getTime() - today.getTime()) /
                (1000 * 60 * 60 * 24),
            )
        : undefined,
    };
  }

  //handling existing employee who've already taken leave
  async initializeEmployeeLeaveHistory(
    employeeId: number,
    lastLeaveEndDate: Date,
    initialBalance: number,
  ) {
    const employee = await this.employeeRepo.findOne({
      where: { id: employeeId },
    });
    const policy = await this.leavePolicyRepo.findOne({
      where: { employeCategory: employee?.category, isActive: true },
    });

    //create or update leave balance
    let balance = await this.leaveBalanceRepo.findOne({
      where: { employee: { id: employeeId } },
    });

    if (!balance) {
      balance = this.leaveBalanceRepo.create({
        employee: employee ?? ({ id: employeeId } as any),
        regularLeaveBalance: initialBalance,
        lastLeaveEndDate: lastLeaveEndDate,
      });
    } else {
      balance.regularLeaveBalance = initialBalance;
      balance.lastLeaveEndDate = lastLeaveEndDate;
    }

    //calculate next eligible date based on policy and last leave
    const nextEligibleDate = new Date(lastLeaveEndDate);
    nextEligibleDate.setMonth(
      nextEligibleDate?.getMonth() + (policy?.waitingPeriodMonths ?? 0),
    );

    balance.nextEligibleLeaveBalance = nextEligibleDate;

    await this.leaveBalanceRepo.save(balance);

    return balance;
  }

  //initializing system with leave policies

  async initializeLeavePolicies() {
    //CC2 category (15 days after 3 months)
    await this.leavePolicyRepo.save({
      employeeCategory: 'CC2',
      waitingPeriodMonths: 3,
      leaveDaysEntitled: 15,
    });

    // CC1 and M4 categories (21 days after 6 months)
    await this.leavePolicyRepo.save({
      employeeCategory: 'CC1',
      waitingPeriodMonths: 6,
      leaveDaysEntitled: 21,
    });

    await this.leavePolicyRepo.save({
      employeeCategory: 'M4',
      waitingPeriodMonths: 6,
      leaveDaysEntitled: 21,
    });

    // MS, SQ, M1, HQ categories (21 days after 12 months)
    for (const category of ['MS', 'SQ', 'M1', 'HQ']) {
      await this.leavePolicyRepo.save({
        employeeCategory: category,
        waitingPeriodMonths: 12,
        leaveDaysEntitled: 21,
      });
    }
  }
}
