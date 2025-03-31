import axios from 'axios';
import { Leave, LeaveEligibilityResponse } from '@/types/types';

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
      console.error('Error fetching leaves: ', error);
      throw error;
    }
  },

  async getEligibility(employeeId: number) {
    try {
      const response = await axios.get<LeaveEligibilityResponse>(
        `${API_BASE_URL}/eligibility/${employeeId}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async applyLeave(
    employeeId: number,
    leaveType: 'regular' | 'sick' | 'special',
    startDate: Date,
    endDate: Date,
    isCompleted: boolean = false
  ): Promise<Leave> {
    try {
        const response = await axios.post<Leave>(`${API_BASE_URL}/new-leave`, {
            employeeId, leaveType, startDate: startDate.toISOString(), endDate: endDate.toISOString(), isCompleted
        
        })
        return response.data;

    } catch (error) {
        console.log('Unexpected error applying leave', error);
        throw new Error('Failed to apply for leave');
    }
  },

  initializeLeaveHistory: async (
    employeeId: number, 
    lastLeaveEndDate: string | Date,
    initialBalance: number
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/initialize-history/${employeeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lastLeaveEndDate,
          initialBalance,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to initialize leave history');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error initializing leave history:', error);
      throw error;
    }
  },

  async initializeLeavePolicies(){
    try {
      const response = await axios.post(`${API_BASE_URL}/initialize-policies`);
      return response.data;
    } catch (error) {
      
      throw new Error('Unknown error occurred while initializing policies');
    }
  }


};
