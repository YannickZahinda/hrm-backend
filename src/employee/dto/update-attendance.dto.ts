import { IsIn } from "class-validator";

export class UpdateAttendanceDto {
    @IsIn(['present', 'absent', 'onleave', {message: 'Invalid attendance status'}])
    attendance: 'present' | 'absent' | 'onleave';
}