export interface Employee {
  id?: number;
  fullName: string;
  role: string;
  department: string;
  salary: number;
  dateOfBirth: string;
  dateOfHire: string;
  // attendance: 'present' | 'absent' | 'onleave';
  category: string;
  sex?: string;
  contractType: 'CDI' | 'CDD';
  noMatricule: string;
  initials?: string;
  attendances?: {
    id: number;
    date: string;
    status: 'present ' | 'absent' | 'onleave'
  }[];
}

export interface CreateEmployeeDto {
  fullName: string;
  role: string;
  department: string;
  salary: number;
  dateOfBirth: string;
  dateOfHire: string;
//   attendance: 'present' | 'absent' | 'onleave';
  // category: string;
  sex: string;
  contractType: 'CDI' | 'CDD';
  noMatricule: string;
}

export interface Attendance {
  id?: number;
  employeeId: string;
  date?: Date;
  status?: 'present'| 'absent'| 'onleave'
}

export interface CreateAttendanceDto {
  employeeId: string;
  date?: Date;
  status?: 'present'| 'absent'| 'onleave';
}

export interface UpdateEmployeeDto {
  fullName?: string;
  role?: string;
  department?: string;
  salary?: number;
  dateOfBirth?: string;
  dateOfHire?: string;
  attendance?: 'present' | 'absent' | 'onleave';
  category?: string;
  contractType?: 'CDI' | 'CDD';
  noMatricule?: string;
}
