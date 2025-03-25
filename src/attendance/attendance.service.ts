import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { Employee } from 'src/employee/employee.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async createEmployeAttendance(
    employeeId: number,
    date: Date,
    status: 'present' | 'absent' | 'onleave',
  ) {
    const employee = await this.employeeRepo.findOne({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException(
        `Employee with ID ${employeeId} was not found`,
      );
    }

    const existingAttendanceRecord = await this.attendanceRepo.findOne({
      where: { employee: { id: employeeId }, date },
    });

    if(existingAttendanceRecord) {
        throw new ConflictException(`Attendance for employee ${employeeId} on date ${date} already exists.`);
    }

    const attendance = this.attendanceRepo.create({
        employee, date, status,
    });

    return await this.attendanceRepo.save(attendance);

  }
}
