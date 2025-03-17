import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/all')
  getAllEmployees() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  getEmployee(@Param('id') id: number) {
    return this.employeeService.findOne(id);
  }

  @Post()
  createEmployee(@Body() body: CreateEmployeeDto) {
    return this.employeeService.create(body);
  }

  @Patch(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeeService.update(id, updateEmployeeDto);
  }

  @Patch('/:id/attendance')
  async updateAttendance(
    @Param('id', ParseIntPipe) id: number,
    @Body() attendance: { attendance: 'present' | 'absent' | 'onleave' },
  ) {
    const updateEmployeeAttendance = await this.employeeService.updateAttendance(
      id,
      attendance.attendance,
    );

    if (!updateEmployeeAttendance) {
      throw new NotFoundException(`Employee with ID ${id} was not found`);
    }

    return updateEmployeeAttendance;
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number) {
    return await this.employeeService.remove(id);
  }
}
