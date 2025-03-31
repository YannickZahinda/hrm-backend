import { useState, useEffect } from 'react';
import { EmployeeService } from '@/services/employee-api-service';
import { CreateEmployeeDto, Employee } from '@/types/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import EmployeeTable from './employees/EmployeeTable';
import { EmployeeForm } from './employees/EmployeeForm';
import { EmployeeFilters } from './employees/EmployeeFilters';

interface EmployeeListProps {
  // editEmployeeId: (id: number) => void;
  setEditEmployeeId: (id: number) => void;
  setActiveView: (view: string) => void;
}

export function EmployeeList({ setEditEmployeeId, setActiveView}: EmployeeListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newEmployee, setNewEmployee] = useState<CreateEmployeeDto>({
    fullName: '',
    role: '',
    department: '',
    salary: 0,
    dateOfBirth: '',
    dateOfHire: '',
    sex: '',
    category: 'CC2',
    contractType: 'CDI',
    noMatricule: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const fetchedEmployees = await EmployeeService.getAllEmployees();
      setEmployees(fetchedEmployees);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch employees',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleInputChange = (field: keyof CreateEmployeeDto, value: any) => {
  //   setNewEmployee((prev) => ({ ...prev, [field]: value }));
  // };

  const handleCreateEmployee = async () => {
    if (
      !newEmployee.fullName ||
      !newEmployee.noMatricule ||
      !newEmployee.dateOfHire
    ) {
      toast({
        title: 'Error',
        description: 'Full name, matricule and date of hire are required',
        variant: 'destructive',
      });
    }

    try {
      const createdEmployee = await EmployeeService.createEmployee(newEmployee);
      setEmployees([...employees, createdEmployee]);
      setIsAddEmployeeOpen(false);
      resetForm();
      toast({
        title: 'Success',
        description: 'Employee created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create employee',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await EmployeeService.deleteEmployee(id);
      setEmployees(employees.filter((emp) => emp.id !== id));
      toast({
        title: 'Success',
        description: 'Employee deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete employee',
        variant: 'destructive',
      });
    }
  };

  const handleEditEmployee = (id: number) => {
    setEditEmployeeId(id);
    setActiveView('edit-employee');
  }

  const resetForm = () => {
    setNewEmployee({
      fullName: '',
      role: '',
      department: '',
      salary: 0,
      dateOfBirth: '',
      dateOfHire: '',
      sex: '',
      category: 'CC1',
      contractType: 'CDI',
      noMatricule: '',
    });
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.contractType.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return <div>Loading......</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">Manage your employee records</p>
        </div>
        <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Enter the details of the new employee. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <EmployeeForm employee={newEmployee} onChange={setNewEmployee} />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddEmployeeOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleCreateEmployee}>
                Save Employee
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <EmployeeFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="rounded-md border">
        <EmployeeTable
          employees={filteredEmployees}
          onDelete={handleDeleteEmployee}
          onEdit={handleEditEmployee}
        />
      </div>
    </div>
  );
}
