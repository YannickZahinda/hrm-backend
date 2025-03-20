import { Injectable, NotFoundException } from '@nestjs/common';
import { Leave } from './leave.entity';
import { LeaveBalance } from './leave-balance.entity';
import { LeavePolicy } from './leave-policy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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

  //this method determine when an employee can take leave and if they are eligible
  async getLeaveEligibility(employeeId: number) {
    const employee = await this.employeeRepo.findOne({
      where: { id: employeeId },
    });
    const policy = await this.leavePolicyRepo.findOne({
      where: { employeCategory: employee?.category, isActive: true },
    });

    if (!employee) {
      throw new NotFoundException(
        `Employee with ID${employeeId} was not found`,
      );
    }

    if (!policy) {
      throw new NotFoundException(
        `No active leave policy found for employee category: ${employee.category}`,
      );
    }

    //calculating the eligible date adding hire date + waiting period
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
    today.setHours(0, 0, 0, 0);
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
    try {
      await this.leavePolicyRepo.clear();

      const policyConfigs = [
        { category: 'CC2', waitingMonths: 3, leaveDays: 15 },
        { category: 'CC1', waitingMonths: 6, leaveDays: 21 },
        { category: 'M4', waitingMonths: 6, leaveDays: 21 },
        { category: 'MS', waitingMonths: 12, leaveDays: 21 },
        { category: 'SQ', waitingMonths: 12, leaveDays: 21 },
        { category: 'M1', waitingMonths: 12, leaveDays: 21 },
        { category: 'HQ', waitingMonths: 12, leaveDays: 21 },
      ]as const;

      // Create and save each policy individually
      const promises = policyConfigs.map((config) => {
        return this.leavePolicyRepo.save({
          employeCategory: config.category,
          waitingPeriodMonths: config.waitingMonths,
          leaveDaysEntitled: config.leaveDays,
          isActive: true,
          effectiveDate: new Date(),
        });
      });

      // Wait for all saves to complete
      const newPolicies = await Promise.all(promises);

      return newPolicies;
    } catch (error) {
      console.error('ERreor resetting leave policies: ', error);
      throw new Error(
        `Failed to reset and initialize leave policies: ${error.message}`,
      );
    }
  }

  async getUpcomingLeaveEligibility() {
    const today = new Date();
    const thirtyDaysLater = new Date(today);
    thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

    //finding all employees becoming eligible for leave in the next 30 days
    const upcomingEligibility = await this.leaveBalanceRepo.find({
      where: {
        nextEligibleLeaveBalance: Between(today, thirtyDaysLater),
      },
      relations: ['employee'],
    });

    return upcomingEligibility.map((balance) => {
      const daysUntilEligible = Math.ceil(
        (balance.nextEligibleLeaveBalance.getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      console.log('Upcoming Eligibility:', upcomingEligibility);

      return {
        employee: balance.employee,
        eligibleDate: balance.nextEligibleLeaveBalance,
        daysUntilEligible,
      };
    });

  }

  async applyLeave(
    employeeId: number,
    leaveType: 'regular' | 'sick' | 'special',
    startDate: Date,
    endDate: Date,
  ) {
    const employee = await this.employeeRepo.findOne({
      where: { id: employeeId },
    });
    if (!employee)
      throw new NotFoundException(`Employee with ID: ${employeeId} not found`);

    const leaveBalance = await this.leaveBalanceRepo.findOne({
      where: { employee: { id: employeeId } },
    });
    if (!leaveBalance)
      throw new NotFoundException(`No leave balance record for employee`);

    const leaveDays =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;

    if (
      leaveType === 'regular' &&
      leaveBalance.regularLeaveBalance < leaveDays
    ) {
      throw new Error('Not enough leave balance');
    }

    if (leaveType === 'sick' && leaveBalance.sickLeaveBalance < leaveDays) {
      throw new Error('Not enough sick leave balance');
    }
    if (
      leaveType === 'special' &&
      leaveBalance.specialLeaveBalance < leaveDays
    ) {
      throw new Error('Not enough special leave balance');
    }

    const newLeave = this.leaveRepo.create({
      employee,
      leaveType,
      startDate,
      endDate,
      isCompleted: false,
    });

    await this.leaveRepo.save(newLeave);

    if (leaveType === 'regular') leaveBalance.regularLeaveBalance -= leaveDays;
    if (leaveType === 'sick') leaveBalance.sickLeaveBalance -= leaveDays;
    if (leaveType === 'special') leaveBalance.specialLeaveBalance -= leaveDays;

    leaveBalance.lastLeaveEndDate = endDate;
    await this.leaveBalanceRepo.save(leaveBalance);

    return newLeave;
  }
}
