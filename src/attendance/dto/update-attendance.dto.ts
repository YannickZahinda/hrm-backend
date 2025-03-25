import { IsOptional, IsIn, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class UpdateAttendanceDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date?: Date;

    @IsOptional()
    @IsIn(['present', 'absent', 'onleave'])
    status?: string;
}