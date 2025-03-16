import { Body, Controller, Get, Post} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService
    ) {}

    @Get('/employees')
    getAllEmployees(){
        return this.employeeService.findAll()
    }

    @Post()
    createEmployee(@Body() body: CreateEmployeeDto) {
        return this.employeeService.create(body);
    }
}
