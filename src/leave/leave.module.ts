import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveBalance } from './leave-balance.entity';
import { Leave } from './leave.entity';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { LeavePolicy } from './leave-policy.entity';
import { Employee } from 'src/employee/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Leave, LeaveBalance, LeavePolicy, Employee])],
    providers: [LeaveService],
    controllers: [LeaveController]
})
export class LeaveModule {}
