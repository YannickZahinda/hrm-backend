import {
  ConflictException,
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { Employee } from 'src/employee/employee.entity';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';


@Injectable()
export class AttendanceService {
  private readonly logger = new Logger(Attendance.name);

  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async findAllAttendances(): Promise<Attendance[]> {
    return await this.attendanceRepo.find({ relations: ['employee'] });
  }

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

    if (existingAttendanceRecord) {
      throw new ConflictException(
        `Attendance for employee ${employeeId} on date ${date} already exists.`,
      );
    }

    const attendance = this.attendanceRepo.create({
      employee,
      date,
      status,
    });

    return await this.attendanceRepo.save(attendance);
  }

  @Cron('0 6 * * *')
  async recordAttendanceAutomatically() {
    console.log('Recording attendance for all employees...')
    this.logger.log('Recording attendance for all employees...')

    const employees = await this.employeeRepo.find();

    if(employees.length === 0) {
      console.warn('No employees found, Skipping attendance recording');
      return;
    }

    const date = new Date();

    for (const employee of employees) {
      const existingRecord = await this.attendanceRepo.findOne({where: {employee: {id: employee.id}, date}});

      if(!existingRecord) {
        const attendanceRecord = await this.attendanceRepo.create({
          employee, date, status: 'present'
        });

        await this.attendanceRepo.save(attendanceRecord);
        console.log(`Recorded attendance for employee ID: ${employee.id}`);
        this.logger.log(`Recorded attendance for employee ID: ${employee.id}`)
      }else {
        console.log(`Attendance already recorded for employee ID: ${employee.id} today`)
        this.logger.log(`Attendance already recorded for employee ID: ${employee.id} today`)
      }
    }
  }

  
}
