import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employee } from "src/employee/employee.entity";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date', default: () => 'CURRENT_DATE'})
    date: Date;

    @Column({type: 'text', default: 'present'})
    status: 'present' | 'absent' | 'onleave';

    @ManyToOne(() => Employee, (employee)=> employee.attendances, {onDelete: 'CASCADE'})
    employee: Employee;
}