import axios from 'axios';
import { Leave } from '@/types/types';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/leave'
    : 'http://localhost:3000/leave';

export const LeaveService = {
    async getAllLeaves(): Promise<Leave[]> {
        try {
            const response = await axios.get<Leave[]>(`${API_BASE_URL}/all`);
            return response.data;
            
        } catch (error) {
            console.error('Error fetching leaves: ', error)
            throw error;
        }
    }
}