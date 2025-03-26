import { Badge } from '@/components/ui/badge';

import { useState, useEffect } from 'react';
import { EmployeeService } from '@/services/employee-api-service';
import { CreateEmployeeDto, Employee } from '@/types/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  FileText,
  Calendar,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function EmployeeList() {
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
    sex: 'unknow',
    // category: '',
    contractType: 'CDI',
    noMatricule: '',
  });

  useEffect(() => {
    fetchEmployees();
    console.log('orginal state employees::::::', employees);
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const fetchedEmployees = await EmployeeService.getAllEmployees();
      console.log('Received data: ', fetchedEmployees);
      setEmployees(fetchedEmployees);
    } catch (error) {
      console.error('Error details: ', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch employees',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading......</div>;
  }

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

  const resetForm = () => {
    setNewEmployee({
      fullName: '',
      role: '',
      department: '',
      salary: 0,
      dateOfBirth: '',
      dateOfHire: '',
      sex: '',
      // category: '',
      contractType: 'CDI',
      noMatricule: '',
    });
  };

  const getLatestAttendance = (employee: Employee) => {
    if (!employee.attendances || employee.attendances.length === 0) {
      return { status: 'none', date: null };
    }

    const sortedAttendances = [...employee.attendances].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    return {
      status: sortedAttendances[0].status,
      date: sortedAttendances[0].date,
    };
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.contractType.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  className="col-span-3"
                  value={newEmployee.fullName}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, fullName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  className="col-span-3"
                  value={newEmployee.role}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, role: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Input
                  id="department"
                  className="col-span-3"
                  value={newEmployee.department}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      department: e.target.value,
                    })
                  }
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
                  value={newEmployee.salary}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      salary: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sex" className="text-right">
                  sex
                </Label>
                <Input
                  id="sex"
                  className="col-span-3"
                  value={newEmployee.sex}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, sex: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contractType" className="text-right">
                  Contract Type
                </Label>
                <Select
                  value={newEmployee.contractType}
                  onValueChange={(value: 'CDI' | 'CDD') =>
                    setNewEmployee({ ...newEmployee, contractType: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CDI">CDI</SelectItem>
                    <SelectItem value="CDD">CDD</SelectItem>
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
                  value={newEmployee.noMatricule}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      noMatricule: e.target.value,
                    })
                  }
                />
              </div>
            </div>
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

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search employees..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Sex</TableHead>
              <TableHead>Contract</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" alt="" />
                      <AvatarFallback>{employee.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {employee.role}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Badge variant="outline">{employee.category}</Badge>
                </TableCell>
                <TableCell>{employee.sex}</TableCell>
                <TableCell>{employee.contractType}</TableCell>
                <TableCell>
                  {(() => {
                    const latest = getLatestAttendance(employee);
                    let variant:
                      | 'default'
                      | 'destructive'
                      | 'outline'
                      | 'secondary';

                    switch (latest.status) {
                      case 'present':
                        variant = 'default';
                        break;
                      case 'absent':
                        variant = 'destructive';
                        break;
                      case 'onleave':
                        variant = 'secondary';
                        break;
                      default:
                        variant = 'outline';
                    }

                    return (
                      <div className="flex items-center gap-2">
                        <Badge variant={variant}>
                        {latest.status === 'none' ? 'No record' : latest.status}
                      </Badge>
                      </div>
                      
                    );
                  })()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Manage Documents
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        Manage Leaves
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() =>
                          employee.id && handleDeleteEmployee(employee.id)
                        }
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Employee
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
