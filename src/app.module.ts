import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee/employee.entity';
import { Document } from './document/document.entity';
import { EmployeeModule } from './employee/employee.module';
import { DocumentModule } from './document/document.module';
import { AttendanceController } from './attendance/attendance.controller';
import { AttendanceService } from './attendance/attendance.service';
import { AttendancModule } from './attendanc/attendanc.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Employee, Document],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Employee, Document]),
    EmployeeModule,
    DocumentModule,
    AttendancModule,
  ],
  controllers: [AppController, AttendanceController],
  providers: [AppService, AttendanceService],
})
export class AppModule {}
