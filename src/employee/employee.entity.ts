import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Document } from "src/Document/document.entity";

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

    @OneToMany(() => Document, (document) => document.employee)
    documents: Document[];

}