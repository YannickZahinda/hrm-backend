import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Document } from "src/document/document.entity";
import { Leave } from "src/leave/leave.entity";
import { LeaveBalance } from "src/leave/leave-balance.entity";
import { Attendance } from "src/attendance/attendance.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    fullName: string 

    @Column()
    role: string;

    @Column()
    department: string;

    @Column()
    salary: number;

    @Column({type: 'date'})
    dateOfBirth: Date;

    @Column({type: 'date', default: () => 'CURRENT_DATE'})
    dateOfHire: Date;

    @Column({type: 'varchar', length: 50, nullable: true})
    sex: string

    // @Column({ type: 'text', default: 'present'})
    // attendance: 'present' | 'absent' | 'onleave';

    @Column({ type: 'text', default: 'CC2'})
    category: 'CC2' | 'CC1' | 'M4' | 'MS' | 'SQ' | 'M1' | 'HQ';

    @Column({type: 'text', default: 'CDD'})
    contractType: 'CDI' | 'CDD';

    @Column({type: 'varchar', length: 50, nullable: true})
    noMatricule: string;

    @OneToMany(() => Document, (document) => document.employee)
    documents: Document[];

    @OneToMany(() => Leave, (leave) => leave.employee)
    leaves: Leave[];

    @OneToMany(() => Attendance, (attendance) => attendance.employee)
    attendances: Attendance[];

    @OneToOne(() => LeaveBalance, (LeaveBalance) => LeaveBalance.employee)
    leaveBalance: LeaveBalance;

}