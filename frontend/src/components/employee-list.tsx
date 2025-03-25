"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, MoreHorizontal, Edit, Trash, FileText, Calendar } from "lucide-react"

export function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)

  const employees = [
    {
      id: 1,
      fullName: "Mohammed Ali",
      role: "Software Developer",
      department: "Engineering",
      salary: 45000,
      dateOfBirth: "1990-05-15",
      dateOfHire: "2022-01-15",
      attendance: "present",
      category: "CC2",
      contractType: "CDI",
      noMatricule: "EMP001",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MA",
    },
    {
      id: 2,
      fullName: "Fatima Zahra",
      role: "Marketing Specialist",
      department: "Marketing",
      salary: 42000,
      dateOfBirth: "1992-03-10",
      dateOfHire: "2021-03-10",
      attendance: "onleave",
      category: "CC1",
      contractType: "CDI",
      noMatricule: "EMP002",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "FZ",
    },
    {
      id: 3,
      fullName: "Omar Hassan",
      role: "Financial Analyst",
      department: "Finance",
      salary: 50000,
      dateOfBirth: "1988-11-05",
      dateOfHire: "2023-11-05",
      attendance: "present",
      category: "M4",
      contractType: "CDI",
      noMatricule: "EMP003",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "OH",
    },
    {
      id: 4,
      fullName: "Layla Mansour",
      role: "HR Specialist",
      department: "Human Resources",
      salary: 48000,
      dateOfBirth: "1991-07-20",
      dateOfHire: "2022-07-20",
      attendance: "present",
      category: "MS",
      contractType: "CDI",
      noMatricule: "EMP004",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LM",
    },
    {
      id: 5,
      fullName: "Ahmed Khalid",
      role: "Sales Representative",
      department: "Sales",
      salary: 40000,
      dateOfBirth: "1993-02-08",
      dateOfHire: "2023-02-08",
      attendance: "absent",
      category: "SQ",
      contractType: "CDD",
      noMatricule: "EMP005",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AK",
    },
  ]

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.contractType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <DialogDescription>Enter the details of the new employee. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="text-right">
                  Full Name
                </Label>
                <Input id="fullName" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input id="role" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Input id="department" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salary" className="text-right">
                  Salary
                </Label>
                <Input id="salary" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dateOfBirth" className="text-right">
                  Date of Birth
                </Label>
                <Input id="dateOfBirth" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dateOfHire" className="text-right">
                  Date of Hire
                </Label>
                <Input id="dateOfHire" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select>
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
                <Label htmlFor="contractType" className="text-right">
                  Contract Type
                </Label>
                <Select>
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
                <Label htmlFor="noMatricule" className="text-right">
                  Matricule No.
                </Label>
                <Input id="noMatricule" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={() => setIsAddEmployeeOpen(false)}>
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
                      <AvatarImage src={employee.avatar} alt={employee.fullName} />
                      <AvatarFallback>{employee.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee.fullName}</p>
                      <p className="text-sm text-muted-foreground">{employee.role}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Badge variant="outline">{employee.category}</Badge>
                </TableCell>
                <TableCell>{employee.contractType}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      employee.attendance === "present"
                        ? "bg-green-100 text-green-800"
                        : employee.attendance === "onleave"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.attendance}
                  </span>
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
                      <DropdownMenuItem className="text-red-600">
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
  )
}

