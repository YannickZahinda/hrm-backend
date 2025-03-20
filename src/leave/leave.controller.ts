import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { Leave } from './leave.entity';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Get('eligibility/:employeeId')
  async getLeaveEligibility(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    return this.leaveService.getLeaveEligibility(employeeId);
  }

  @Get('upcoming-eligibility')
  async getUpcomingLeaveEligibility() {
    return this.leaveService.getUpcomingLeaveEligibility();
  }

  @Post('initialize-policies')
  async initializeLeavePolicies() {
    return this.leaveService.initializeLeavePolicies();
  }

  //existing employee initializing leave history
  @Post('initialize-history/:employeeId')
  async initializeEmployeeLeaveHistory(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body() data: { lastLeaveEndDate: Date; initialBalance: number },
  ) {
    return this.leaveService.initializeEmployeeLeaveHistory(
      employeeId,
      new Date(data.lastLeaveEndDate),
      data.initialBalance,
    );
  }

  @Post('new-leave')
  async applyForLeave(
    @Body() data: { employeeId: number; leaveType: 'regular' | 'sick' | 'special'; startDate: Date; endDate: Date; isCompleted: boolean}
  ) {
    return this.leaveService.applyLeave(
      data.employeeId,
      data.leaveType,
      new Date(data.startDate),
      new Date(data.endDate)
      )
  }
}
