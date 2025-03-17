import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Document } from "src/document/document.entity";

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

    @Column({ type: 'text', default: 'present'})
    attendance: 'present' | 'absent' | 'onleave';

    @Column({ type: 'text', default: 'CC2'})
    category: 'CC2' | 'CC1' | 'M4' | 'MS' | 'SQ' | 'M1' | 'HQ';

    @Column({type: 'text', default: 'CDD'})
    contractType: 'CDI' | 'CDD';

    @Column({type: 'varchar', length: 50, nullable: true})
    noMatricule: string;

    @OneToMany(() => Document, (document) => document.employee)
    documents: Document[];

}