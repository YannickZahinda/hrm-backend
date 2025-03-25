import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee/employee.entity';
import { Document } from './document/document.entity';
import { EmployeeModule } from './employee/employee.module';
import { DocumentModule } from './document/document.module';
import { LeaveController } from './leave/leave.controller';
import { LeaveService } from './leave/leave.service';
import { LeaveModule } from './leave/leave.module';
import { Leave } from './leave/leave.entity';
import { LeaveBalance } from './leave/leave-balance.entity';
import { LeavePolicy } from './leave/leave-policy.entity';
import { AttendanceController } from './attendance/attendance.controller';
import { AttendanceService } from './attendance/attendance.service';
import { AttendanceModule } from './attendance/attendance.module';
import { Attendance } from './attendance/attendance.entity';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Employee, Document, Leave, LeaveBalance, LeavePolicy, Attendance],
      synchronize: true
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Employee, Document, Leave, LeaveBalance, LeavePolicy, Attendance]),
    EmployeeModule,
    DocumentModule,
    LeaveModule,
    AttendanceModule,
  ],
  controllers: [AppController, AttendanceController],
  providers: [AppService, AttendanceService],
})
export class AppModule {}
