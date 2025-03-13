import { Employee } from "src/employee/employee.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    filePath: string;

    @ManyToOne(() => Employee, (employee) => employee.documents, {onDelete: 'CASCADE'})
    employee: Employee;
}