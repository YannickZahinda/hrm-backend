import axios from 'axios';
import { Attendance, CreateAttendanceDto } from '@/types/types';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/attendance'
    : 'http://localhost:3000/attendance';

export const AttendanceService = {
    async getAllAttendances(): Promise<Attendance[]> {
        try {
            const response = await axios.get<Attendance[]>(`${API_BASE_URL}/all`)
            return response.data
        } catch (error) {
            throw error;
        }
    }
}