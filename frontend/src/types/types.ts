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
}

export interface CreateEmployeeDto {
  fullName: string;
  role: string;
  department: string;
  salary: number;
  dateOfBirth: string;
  dateOfHire: string;
//   attendance: 'present' | 'absent' | 'onleave';
  category: string;
  contractType: 'CDI' | 'CDD';
  noMatricule: string;
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
