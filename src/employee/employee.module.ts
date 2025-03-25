import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
// import { LeaveBalance } from 'src/leave/leave-balance.entity';
// import { LeaveService } from 'src/leave/leave.service';
// import { LeaveModule } from 'src/leave/leave.module';
import { Attendance } from 'src/attendance/attendance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Attendance])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
