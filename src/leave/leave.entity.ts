import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from 'src/employee/employee.entity';

@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', default: 'regular' })
  // leaveType: 'CC2 leave type' | 'CC1 & M4 leave type' | 'MS & SQ & M1 & HQ leave type'
  leaveType: 'regular' | 'sick' | 'special';

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  startDate: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  endDate: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ nullable: true })
  dateRequested: Date;

  @Column({ nullable: true })
  dateApproved: Date;

  @Column({ nullable: true })
  approvedBy: string;

  @ManyToOne(() => Employee, (employee) => employee.leaves)
  employee: Employee;
}
