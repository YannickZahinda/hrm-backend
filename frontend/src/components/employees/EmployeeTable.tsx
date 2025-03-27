import { Employee } from '@/types/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, FileText, Calendar, Trash } from 'lucide-react';
import { DateDisplay } from '../DateDisplay';

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (id: number) => void;
}

const EmployeeTable = ({ employees, onDelete }: EmployeeTableProps) => {
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>No Matricule</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Sex</TableHead>
          <TableHead>Contract</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Attendance</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Date of hire</TableHead>
          <TableHead>Date of birth</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => {
          return (
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
              <TableCell>{employee.noMatricule}</TableCell>
              <TableCell>
                <Badge variant="outline">{employee.category}</Badge>
              </TableCell>
              <TableCell>{employee.sex}</TableCell>
              <TableCell>{employee.contractType}</TableCell>
              <TableCell>{employee.salary}</TableCell>
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
              <TableCell>
                <DateDisplay date={employee.dateOfBirth} />
              </TableCell>
              <TableCell>
                <DateDisplay date={employee.dateOfHire} />
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
                        employee.id && onDelete(employee.id)
                      }
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Employee
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
