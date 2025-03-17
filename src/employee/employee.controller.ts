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
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { UpdateContractTypeDto } from './dto/update-contract-type.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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
    @Body() updateAttendanceDto: UpdateAttendanceDto
  ) {
    const updateEmployeeAttendance = await this.employeeService.updateAttendance(
      id,
      updateAttendanceDto.attendance
    );

    if (!updateEmployeeAttendance) {
      throw new NotFoundException(`Employee with ID ${id} was not found`);
    }

    return updateEmployeeAttendance;
  }

  @Patch('/:id/contract-type')
  async updateContractType(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContractTypeDto: UpdateContractTypeDto
  ){
    const updateContractType = await this.employeeService.updateContractType(id, updateContractTypeDto.contractType);
    if(!updateContractType){
      throw new NotFoundException(`Couldn't find employe with ID: ${id}`);
    }

    return updateContractType;
  }

  @Patch('/:id/category')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ){
    const updatedCategory = await this.employeeService.updateCategory(id, updateCategoryDto.category);
    if(!updatedCategory) {
      throw new NotFoundException( ` Employe with ID: ${id} was not found`)
    }

    return updatedCategory;
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number) {
    return await this.employeeService.remove(id);
  }
}
