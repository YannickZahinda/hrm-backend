import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
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
  findOneEmployee(@Param('id') id: number){
    return this.employeeService.findOne(id)
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
    return this.employeeService.update(id, updateEmployeeDto);
  }
}
