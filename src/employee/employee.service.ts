import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    ){}

    async findAll():Promise<Employee[]>{
        return await this.employeeRepo.find({relations: ['documents']});
    }

    async create(createEmployeeDto: CreateEmployeeDto) {
        const employee = this.employeeRepo.create(createEmployeeDto);
        return await this.employeeRepo.save(employee);
    }

    async update(id: string, updateEmployeeDto: UpdateEmployeeDto):Promise<Employee>{
        const employee = await this.employeeRepo.findOne({ where: {id: Number(id)} });

        if(!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`)
        }

        Object.assign(employee, updateEmployeeDto);
        return this.employeeRepo.save(employee)
    }


    async remove(id: string){
        return await this.employeeRepo.delete(id);
    }

}
