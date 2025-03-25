import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService){}

    @Post()
    recordAttendance(@Body() createAttendanceDto: CreateAttendanceDto){
        const { employeeId, date, status } = createAttendanceDto;
        if(!employeeId || !date || !status) {
            throw new BadRequestException('Missing required fields: employeeId, date, status');
        }
        const parsedDate = new Date(date);
        if(isNaN(parsedDate.getTime())) {
            throw new BadRequestException('Invalid date format')
        };

        const validStatuses = ['present', 'absent', 'onleave'];
        if(!validStatuses.includes(status)) {
            throw new BadRequestException('Invalid status value')
        }
        return this.attendanceService.createEmployeAttendance(employeeId, new Date(date), status as 'present' | 'absent' | 'onleave')
    }
}
