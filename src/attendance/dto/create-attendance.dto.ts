import { IsOptional, IsDate, IsInt, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class CreateAttendanceDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date?: Date;

    @IsOptional()
    @IsIn(['present', 'absent', 'onleave'])
    status?: string;

    @IsInt()
    employeeId: number
}