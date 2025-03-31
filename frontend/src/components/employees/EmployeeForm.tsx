import { CreateEmployeeDto, Employee, EmployeeFormValues } from '@/types/types';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface EmployeeFormProps {
  employee: EmployeeFormValues;
  onChange: (employee: CreateEmployeeDto) => void;
  onSubmit?: (values: EmployeeFormValues) => void;
  // onCancel: () => void;
}

export function EmployeeForm({
  employee,
  onChange,
}: EmployeeFormProps) {
  

  const handleChange = (field: keyof EmployeeFormValues, value: any) => {
    onChange({ ...employee, [field]: value });
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="fullName" className="text-right">
          Full Name
        </Label>
        <Input
          id="fullName"
          className="col-span-3"
          value={employee.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="role" className="text-right">
          Role
        </Label>
        <Input
          id="role"
          className="col-span-3"
          value={employee.role}
          onChange={(e) => handleChange('role', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="department" className="text-right">
          Department
        </Label>
        <Input
          id="department"
          className="col-span-3"
          value={employee.department}
          onChange={(e) => handleChange('department', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="salary" className="text-right">
          Salary
        </Label>
        <Input
          id="salary"
          type="number"
          className="col-span-3"
          value={employee.salary}
          onChange={(e) => handleChange('salary', Number(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="sex" className="text-right">
          sex
        </Label>
        <Input
          id="sex"
          className="col-span-3"
          value={employee.sex}
          onChange={(e) => handleChange('sex', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="contractType" className="text-right">
          Contract Type
        </Label>
        <Select
          value={employee.contractType}
          onValueChange={(value: 'CDI' | 'CDD') =>
            handleChange('contractType', value)
          }
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select contract type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CDI">CDI</SelectItem>
            <SelectItem value="CDD">CDD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="dateOfBirth"
          className="text-right flex items-center gap-1"
        >
          <Calendar className="h-4 w-4" />
          Date of Birth
        </Label>
        <div className="col-span-3">
          <Input
            id="dateOfBirth"
            type="date"
            value={
              employee.dateOfBirth
                ? new Date(employee.dateOfBirth).toISOString().split('T')[0]
                : ''
            }
            onChange={(e) => {
              handleChange('dateOfBirth', e.target.value);
            }}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="dateOfHire"
          className="text-right flex items-center gap-1"
        >
          <Calendar className="h-4 w-4" />
          Date of Hire
        </Label>
        <div className="col-span-3">
          <Input
            id="dateOfHire"
            type="date"
            value={
              employee.dateOfHire
                ? new Date(employee.dateOfHire).toISOString().split('T')[0]
                : ''
            }
            onChange={(e) => {
              handleChange('dateOfHire', e.target.value);
            }}
            max={new Date().toISOString().split('T')[0]}
            min={
              employee.dateOfBirth
                ? new Date(employee.dateOfBirth).toISOString().split('T')[0]
                : undefined
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          Category
        </Label>
        <Select
          value={employee.category}
          onValueChange={(
            value: 'CC2' | 'CC1' | 'M4' | 'MS' | 'SQ' | 'M1' | 'HQ',
          ) => handleChange('category', value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CC2">CC2</SelectItem>
            <SelectItem value="CC1">CC1</SelectItem>
            <SelectItem value="M4">M4</SelectItem>
            <SelectItem value="MS">MS</SelectItem>
            <SelectItem value="SQ">SQ</SelectItem>
            <SelectItem value="M1">M1</SelectItem>
            <SelectItem value="HQ">HQ</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="noMatricule" className="text-right">
          No Matricule
        </Label>
        <Input
          id="noMatricule"
          className="col-span-3"
          value={employee.noMatricule}
          onChange={(e) => handleChange('noMatricule', e.target.value)}
        />
      </div>
    </div>
  );
}
