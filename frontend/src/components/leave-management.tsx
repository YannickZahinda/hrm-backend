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
import { Leave } from '@/types/types';
import { toast } from '@/hooks/use-toast';
import { LeaveService } from '@/services/leaves-api-service';

export function LeaveManagement() {
  const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  useEffect(() => {
    fetchLeave();
  }, []);

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

  // Mock leave data based on the entity

  const filteredLeaves = leaves.filter((leave) => {
    if (!leave) return false;
    const term = searchTerm.toLowerCase();
    return (
      leave.employee?.fullName?.toLowerCase().includes(term) ||
      leave.leaveType?.toLowerCase().includes(term)
    );
  });

  // Mock leave eligibility data
  const eligibilityData = {
    balance: 22,
    used: 8,
    remaining: 14,
    nextAccrual: '2025-04-01',
  };

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
            <DialogContent className="sm:max-w-[525px]">
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
                  <Select>
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

                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Balance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {eligibilityData.balance} days
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Used</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {eligibilityData.used} days
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Remaining Balance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {eligibilityData.remaining} days
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Next accrual on {eligibilityData.nextAccrual}
                      </p>
                    </CardContent>
                  </Card>
                </div>
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="leaveType" className="text-right">
                    Leave Type
                  </Label>
                  <Select>
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
                  <Input id="startDate" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">
                    End Date
                  </Label>
                  <Input id="endDate" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isCompleted" className="text-right">
                    Status
                  </Label>
                  <Select>
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
                <Button type="submit" onClick={() => setIsAddLeaveOpen(false)}>
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
                    if(!leave || !leave.employee) return false;

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

                    if(!leave || !leave.employee) return false;
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
