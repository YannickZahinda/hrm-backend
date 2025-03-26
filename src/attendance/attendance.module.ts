import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Employee } from 'src/employee/employee.entity';

@Module({
    imports:[ TypeOrmModule.forFeature([Attendance, Employee])],
    providers: [AttendanceService],
    controllers: [AttendanceController],
    exports: [AttendanceService]
})
export class AttendanceModule {}
