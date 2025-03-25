import { IsOptional, IsDate, IsInt, IsIn, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateAttendanceDto {
    @IsInt()
    @IsNotEmpty()
    employeeId: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date?: Date;

    @IsOptional()
    @IsIn(['present', 'absent', 'onleave'])
    status?: string;


}