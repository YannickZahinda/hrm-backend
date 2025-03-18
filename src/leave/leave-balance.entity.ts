import { Employee } from "src/employee/employee.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class LeaveBalance {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Employee)
    @JoinColumn()
    employee: Employee;

    @Column({default: 0})
    regularLeaveBalance: number;

    @Column({default: 0})
    sickLeaveBalance: number

    @Column({default: 0})
    specialLeaveBalance: number

    @Column({type: 'date', nullable: true})
    lastLeaveEndDate: Date;

    @Column({type: 'date', nullable: true})
    nextEligibleLeaveBalance: Date;
}
