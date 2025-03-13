import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    ){}

    async findAll(){
        return await this.employeeRepo.find({relations: ['documents']});
    }

    async create(createEmployeeDto: CreateEmployeeDto) {
        const employee = this.employeeRepo.create(createEmployeeDto);
        return await this.employeeRepo.save(employee);
    }

    async remove(id: number){
        return await this.employeeRepo.delete(id);
    }

}
