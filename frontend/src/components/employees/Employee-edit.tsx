import { useEffect, useState } from 'react';
import { EmployeeService } from '@/services/employee-api-service';
import {
  CreateEmployeeDto,
  Employee,
  EmployeeFormValues,
  UpdateEmployeeDto,
} from '@/types/types';
import { toast } from '@/hooks/use-toast';
import { EmployeeForm } from './EmployeeForm';
import { Button } from '../ui/button';

interface EmployeeEditProps {
  id?: number | null;
  setActiveView: (view: string) => void;
}

const EmployeeEdit: React.FC<EmployeeEditProps> = ({ id, setActiveView }) => {
  const [employee, setEmployee] = useState<EmployeeFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return;

      try {
        const data = await EmployeeService.getEmployeeById(id);
        const formValues: EmployeeFormValues = {
          id: data.id,
          fullName: data.fullName,
          role: data.role,
          department: data.department,
          salary: data.salary,
          dateOfBirth:
            typeof data.dateOfBirth === 'string'
              ? data.dateOfBirth
              : data.dateOfBirth.toISOString().split('T')[0],
          dateOfHire:
            typeof data.dateOfHire === 'string'
              ? data.dateOfHire
              : data.dateOfHire.toISOString().split('T')[0],
          sex: data.sex || '',
          category: data.category,
          contractType: data.contractType,
          noMatricule: data.noMatricule,
        };
        setEmployee(formValues);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load employee data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (onSubmit) {
  //       onSubmit(employee);
  //     }
  //   };

  const handleSubmit = async (updatedData: UpdateEmployeeDto) => {
    if (!id || !employee) return;

    try {
      const dataToSend: UpdateEmployeeDto = {
        fullName: updatedData.fullName,
        role: updatedData.role,
        department: updatedData.department,
        salary: updatedData.salary,
        dateOfBirth: updatedData.dateOfBirth,
        dateOfHire: updatedData.dateOfHire,
        sex: updatedData.sex,
        category: updatedData.category,
        contractType: updatedData.contractType,
        noMatricule: updatedData.noMatricule,
      };

      await EmployeeService.updateEmployee(id, dataToSend);
      toast({
        title: 'Success',
        description: 'Employee updated successfully',
      });
      setActiveView('employees');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update employee',
        variant: 'destructive',
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!employee) return <div>Employee not found</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Employee</h1>

      <EmployeeForm
        employee={employee}
        onChange={setEmployee}
      />
      <Button type="submit" onClick={() => handleSubmit(employee)}>
        Save Employee
      </Button>
    </div>
  );
};

export default EmployeeEdit;
