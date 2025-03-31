export interface EmployeeBase {
  id?: number;
  fullName: string;
  role: string;
  department: string;
  salary: number;
  sex?: string;
  contractType: 'CDI' | 'CDD';
  category: 'CC2' | 'CC1' | 'M4' | 'MS' | 'SQ' | 'M1' | 'HQ';
  noMatricule: string;
  initials?: string;
}


export interface Employee extends EmployeeBase {
  dateOfBirth: string;
  dateOfHire: string;
  attendances?: {
    id: number;
    date: string;
    status: 'present' | 'absent' | 'onleave'
  }[];
}

export interface EmployeeFormValues {
  id?: number;
  fullName: string;
  role: string;
  department: string;
  salary: number;
  dateOfBirth: string; // Always use string format in forms: to remember!!!!!!
  dateOfHire: string;  // Always use string format in forms
  sex: string;
  category: 'CC2' | 'CC1' | 'M4' | 'MS' | 'SQ' | 'M1' | 'HQ';
  contractType: 'CDI' | 'CDD';
  noMatricule: string;
}

export interface CreateEmployeeDto  extends Omit<EmployeeFormValues, 'id'>{
  fullName: string;
  role: string;
  department: string;
  salary: number;
  dateOfBirth: string;
  dateOfHire: string;
  category: 'CC2' | 'CC1' | 'M4' | 'MS' | 'SQ' | 'M1' | 'HQ';
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

export interface Leave {
  id?: number;
  leaveType?: 'regular' | 'sick' | 'special';
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  employee?: {
    id?: number;
    fullName: string;
    role: string;
    department: string;
    salary: number;
    dateOfBirth: Date;
    dateOfHire: Date;
    category: 'CC2' | 'CC1' | 'M4' | 'MS' | 'SQ' | 'M1' | 'HQ';
    contractType: 'CDI' | 'CDD';
  }
}

export interface CreateAttendanceDto {
  employeeId: string;
  date?: Date;
  status?: 'present'| 'absent'| 'onleave';
}

export interface UpdateEmployeeDto extends Partial<EmployeeFormValues> {
  fullName?: string;
  role?: string;
  department?: string;
  salary?: number;
  dateOfBirth?: string;
  dateOfHire?: string;
  attendance?: 'present' | 'absent' | 'onleave';
  category?: 'CC2' | 'CC1' | 'M4' | 'MS' | 'SQ' | 'M1' | 'HQ';
  contractType?: 'CDI' | 'CDD';
  noMatricule?: string;
}
