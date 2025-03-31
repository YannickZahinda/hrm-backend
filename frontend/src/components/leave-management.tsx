import { useState, useEffect } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Search, Check, X, Edit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmployeeService } from '@/services/employee-api-service';
import { AttendanceService } from '@/services/attendance-api-service';
import { Employee, Leave, LeaveEligibilityResponse } from '@/types/types';
import { toast } from '@/hooks/use-toast';
import { LeaveService } from '@/services/leaves-api-service';

interface LeaveManagementProps {
  employeeId?: number;
}

export function LeaveManagement({ employeeId }: LeaveManagementProps) {
  const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [eligibility, setEligibility] =
    useState<LeaveEligibilityResponse | null>(null);
  const [isEligibilityLoading, setIsEligibilityLoading] = useState(false);
  const [eligibilityError, setEligibilityError] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [leaveType, setLeaveType] = useState<'regular' | 'sick' | 'special'>(
    'regular',
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<Boolean | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetchLeave();
    if (employeeId && typeof employeeId === 'number') {
      fetchEligibility(employeeId);
    } else {
      console.error('Invalid employeeId: ', employeeId);
    }
    const fetchEmployees = async () => {
      try {
        const allEmployees = await EmployeeService.getAllEmployees();
        setEmployees(allEmployees);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, [employeeId]);

  const fetchLeave = async () => {
    try {
      setIsLoading(true);
      const fetchedLeave = await LeaveService.getAllLeaves();
      setLeaves(fetchedLeave);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch attendance',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEligibility = async (employeeId: number) => {
    try {
      setIsLoading(true);
      const fetchedEligibilityData =
        await LeaveService.getEligibility(employeeId);
      setEligibility(fetchedEligibilityData);
    } catch (error) {
      console.error('Failed to fetch eligibility: ', 'error');
      toast({
        title: 'Error',
        description: 'Failed to fetch eligibility',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedEmployee) {
      toast({
        title: 'Error',
        description: 'Please select an employee',
        variant: 'destructive',
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: 'Error',
        description: 'Please select both start and end dates',
        variant: 'destructive',
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      toast({
        title: 'Error',
        description: 'End date must be after start date',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await LeaveService.applyLeave(
        selectedEmployee,
        leaveType,
        start,
        end,
        isCompleted,
      );
      toast({
        title: 'Success',
        description: 'Leave application submitted successfully',
      });
      setIsAddLeaveOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to apply for leave',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredLeaves = leaves.filter((leave) => {
    if (!leave) return false;
    const term = searchTerm.toLowerCase();
    return (
      leave.employee?.fullName?.toLowerCase().includes(term) ||
      leave.leaveType?.toLowerCase().includes(term)
    );
  });

  // Mock leave eligibility data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Leave Management
          </h1>
          <p className="text-muted-foreground">Manage employee leave records</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isEligibilityOpen} onOpenChange={setIsEligibilityOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Check Eligibility
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Leave Eligibility</DialogTitle>
                <DialogDescription>
                  Check leave eligibility for an employee
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="eligibilityEmployee" className="text-right">
                    Employee
                  </Label>
                  <Select
                    onValueChange={async (value) => {
                      const employeeId = parseInt(value, 10);
                      try {
                        setIsLoading(true);
                        setEligibilityError(null);
                        const data =
                          await LeaveService.getEligibility(employeeId);
                        setEligibility(data);
                      } catch (error) {
                        setEligibilityError('Failed to fetch eligibility data');
                        console.log(error);
                      } finally {
                        setIsEligibilityLoading(false);
                      }
                      if (isEligibilityLoading)
                        return <div>Loading eligibility....</div>;
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {leaves.map((leave) => {
                        if (!leave || !leave.employee || !leave.employee.id)
                          return false;
                        return (
                          <SelectItem
                            key={leave.employee.id}
                            value={leave.employee.id.toString()}
                          >
                            {leave.employee.fullName} ({leave.employee.category}
                            )
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {eligibility && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Total Entitled
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {eligibility.policy.leaveDaysEntitle} days
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Policy: {eligibility.policy.employeCategory}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Available Balance
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {eligibility.balance.regularLeaveBalance} days
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Sick: {eligibility.balance.sickLeaveBalance} |
                            Special: {eligibility.balance.specialLeaveBalance}
                          </p>
                        </CardContent>
                      </Card>

                      <Card
                        className={
                          eligibility.isEligible
                            ? 'border-green-200'
                            : 'border-orange-200'
                        }
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Eligibility Status
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold flex items-center gap-2">
                            {eligibility.isEligible ? (
                              <span className="text-green-600">Eligible</span>
                            ) : (
                              <span className="text-orange-600">
                                Not Eligible
                              </span>
                            )}
                          </div>
                          {!eligibility.isEligible && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Eligible in {eligibility.daysUntilEligible} days
                            </p>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Waiting Period
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {eligibility.policy.waitingPeriodMonths} months
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Hired:{' '}
                            {new Date(
                              eligibility.employee.dateOfHire,
                            ).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Next Eligibility Date
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {eligibility.balance.nextEligibleLeaveBalance
                              ? new Date(
                                  eligibility.balance.nextEligibleLeaveBalance,
                                ).toLocaleDateString()
                              : 'N/A'}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last leave ended:{' '}
                            {eligibility.balance.lastLeaveEndDate
                              ? new Date(
                                  eligibility.balance.lastLeaveEndDate,
                                ).toLocaleDateString()
                              : 'No leaves taken'}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Employee Info
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1">
                            <p className="font-medium">
                              {eligibility.employee.fullName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {eligibility.employee.role} •{' '}
                              {eligibility.employee.department}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Contract: {eligibility.employee.contractType} •{' '}
                              {eligibility.employee.category}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button onClick={() => setIsEligibilityOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddLeaveOpen} onOpenChange={setIsAddLeaveOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Register Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Register New Leave</DialogTitle>
                <DialogDescription>
                  Enter the leave details for an employee.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="employee" className="text-right">
                    Employee
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setSelectedEmployee(Number.parseInt(value))
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading ? (
                        <div className="p-2 text-center text-sm text-muted-foreground">
                          Loading employees...
                        </div>
                      ) : (
                        employees.map((employee) => {
                          if (!employee.id) return false;

                          return (
                            <SelectItem
                              key={employee.id}
                              value={employee.id.toString()}
                            >
                              {employee.fullName} ({employee.category})
                            </SelectItem>
                          );
                        })
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="leaveType" className="text-right">
                    Leave Type
                  </Label>
                  <Select
                    value={leaveType}
                    onValueChange={(value: 'regular' | 'sick' | 'special') =>
                      setLeaveType(value)
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="sick">Sick</SelectItem>
                      <SelectItem value="special">Special</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    className="col-span-3"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    className="col-span-3"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isCompleted" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={isCompleted.toString()}
                    onValueChange={(value) => setIsCompleted(value === 'true')}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Active</SelectItem>
                      <SelectItem value="true">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddLeaveOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                    setIsAddLeaveOpen(false);
                  }}
                >
                  Register Leave
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Leaves</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search leaves..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaves.map((leave) => {
                  if (!leave || !leave.employee || !leave.employee.id)
                    return false;
                  const getInitials = (name: string) => {
                    const names = name.split('');
                    let initials = name[0].substring(0, 1).toUpperCase();

                    if (name.length > 1) {
                      initials += names[names.length - 1]
                        .substring(0, 1)
                        .toUpperCase();
                    }

                    return initials;
                  };
                  const initials = getInitials(leave.employee.fullName);

                  return (
                    <TableRow key={leave.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="" alt="" />
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {leave.employee.fullName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {leave.employee.category}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            leave.leaveType === 'regular'
                              ? 'default'
                              : leave.leaveType === 'sick'
                                ? 'destructive'
                                : 'outline'
                          }
                        >
                          {leave.leaveType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>
                            {new Date(leave.startDate).toLocaleDateString()} -{' '}
                            {new Date(leave.endDate).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            unknow days
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            leave.isCompleted
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {leave.isCompleted ? 'Completed' : 'Active'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          {!leave.isCompleted && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="sr-only">Mark as Completed</span>
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaves
                  .filter((leave) => !leave.isCompleted)
                  .map((leave) => {
                    if (!leave || !leave.employee) return false;

                    const getInitials = (name: string) => {
                      const names = name.split('');
                      let initials = name[0].substring(0, 1).toUpperCase();

                      if (name.length > 1) {
                        initials += names[names.length - 1]
                          .substring(0, 1)
                          .toUpperCase();
                      }

                      return initials;
                    };
                    const initials = getInitials(leave.employee.fullName);

                    if (!leave || !leave.employee) return false;
                    return (
                      <TableRow key={leave.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {leave.employee.fullName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {leave.employee.category}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              leave.leaveType === 'regular'
                                ? 'default'
                                : leave.leaveType === 'sick'
                                  ? 'destructive'
                                  : 'outline'
                            }
                          >
                            {leave.leaveType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>
                              {new Date(leave.startDate).toLocaleDateString()} -{' '}
                              {new Date(leave.endDate).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              unknow days
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="sr-only">Mark as Completed</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaves
                  .filter((leave) => leave.isCompleted)
                  .map((leave) => {
                    if (!leave || !leave.employee) return false;

                    const getInitials = (name: string) => {
                      const names = name.split('');
                      let initials = name[0].substring(0, 1).toUpperCase();

                      if (name.length > 1) {
                        initials += names[names.length - 1]
                          .substring(0, 1)
                          .toUpperCase();
                      }

                      return initials;
                    };
                    const initials = getInitials(leave.employee.fullName);

                    return (
                      <TableRow key={leave.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {leave.employee.fullName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {leave.employee.category}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              leave.leaveType === 'regular'
                                ? 'default'
                                : leave.leaveType === 'sick'
                                  ? 'destructive'
                                  : 'outline'
                            }
                          >
                            {leave.leaveType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>
                              {new Date(leave.startDate).toLocaleDateString()} -{' '}
                              {new Date(leave.endDate).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              unkown days
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                            Completed
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
