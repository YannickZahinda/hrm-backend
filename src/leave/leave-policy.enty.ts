import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class LeavePolicy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', default: 'CC2'})
    employeCategory: 'CC2'| 'CC1'| 'M4'| 'MS'| 'SQ'| 'M1'| 'HQ'

    @Column({nullable: true})
    waitingPeriodMonths: number;

    @Column({nullable: true})
    leaveDaysEntitle: number;

    @Column({default: true})
    isActive: boolean;

    @Column({type: 'date', default: () => 'CURRENT_DATE'})
    effectiveDate: Date;
}