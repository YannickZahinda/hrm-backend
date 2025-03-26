import axios from 'axios';
import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '@/types/types';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/employees'
    : 'http://localhost:3000/employees';

export const EmployeeService = {
  async getAllEmployees(): Promise<Employee[]> {
    try {
      const response = await axios.get<Employee[]>(`${API_BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employees: ', error);
      throw error;
    }
  },

  async createEmployee(employeeData: CreateEmployeeDto): Promise<Employee> {
    try {
      const response = await axios.post<Employee>(API_BASE_URL, employeeData);
      return response.data;
    } catch (error) {
      console.error('Error creating employee: ', error);
      throw error;
    }
  },

  async updateEmployee(
    id: number,
    employeeData: UpdateEmployeeDto,
  ): Promise<Employee> {
    try {
      const response = await axios.patch<Employee>(
        `${API_BASE_URL}/${id}`,
        employeeData,
      );
      return response.data;
    } catch (error) {
      console.error('Error updating employee: ', error);
      throw error;
    }
  },

  async getEmployeeById(id: number): Promise<Employee> {
    try {
      const response = await axios.get<Employee>(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee: ', error);
      throw error;
    }
  },

  async deleteEmployee(id: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting employee: ', error);
      throw error;
    }
  },
};
