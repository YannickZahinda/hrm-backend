import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import { Search, Plus, FileText, Download, Trash, Eye, Upload } from "lucide-react"

export function DocumentManagement() {
  const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)

  // Mock employee data
  const employees = [
    { id: 1, fullName: "Mohammed Ali" },
    { id: 2, fullName: "Fatima Zahra" },
    { id: 3, fullName: "Omar Hassan" },
    { id: 4, fullName: "Layla Mansour" },
    { id: 5, fullName: "Ahmed Khalid" },
  ]

  // Mock document data based on the entity
  const documents = [
    {
      id: 1,
      filename: "Contract_Mohammed_Ali.pdf",
      filePath: "/uploads/1234567890-Contract_Mohammed_Ali.pdf",
      employee: employees[0],
      uploadDate: "2025-01-15",
      fileSize: "2.4 MB",
      fileType: "PDF",
    },
    {
      id: 2,
      filename: "ID_Card_Fatima_Zahra.jpg",
      filePath: "/uploads/1234567891-ID_Card_Fatima_Zahra.jpg",
      employee: employees[1],
      uploadDate: "2025-02-10",
      fileSize: "1.2 MB",
      fileType: "JPG",
    },
    {
      id: 3,
      filename: "Resume_Omar_Hassan.pdf",
      filePath: "/uploads/1234567892-Resume_Omar_Hassan.pdf",
      employee: employees[2],
      uploadDate: "2025-03-05",
      fileSize: "1.8 MB",
      fileType: "PDF",
    },
    {
      id: 4,
      filename: "Certificate_Layla_Mansour.pdf",
      filePath: "/uploads/1234567893-Certificate_Layla_Mansour.pdf",
      employee: employees[3],
      uploadDate: "2025-01-20",
      fileSize: "3.1 MB",
      fileType: "PDF",
    },
    {
      id: 5,
      filename: "Medical_Report_Ahmed_Khalid.pdf",
      filePath: "/uploads/1234567894-Medical_Report_Ahmed_Khalid.pdf",
      employee: employees[4],
      uploadDate: "2025-02-28",
      fileSize: "4.2 MB",
      fileType: "PDF",
    },
  ]

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">Manage employee documents</p>
        </div>
        <Dialog open={isAddDocumentOpen} onOpenChange={setIsAddDocumentOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Upload a document for an employee.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="employee" className="text-right">
                  Employee
                </Label>
                <Select onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id.toString()}>
                        {employee.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">Document File</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-secondary/50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {selectedFile ? (
                        <>
                          <FileText className="w-8 h-8 mb-3 text-primary" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">{selectedFile.name}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">Any file type (MAX. 10MB)</p>
                        </>
                      )}
                    </div>
                    <Input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDocumentOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={() => setIsAddDocumentOpen(false)}
                disabled={!selectedFile || !selectedEmployee}
              >
                Upload
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
            placeholder="Search documents..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by employee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Employees</SelectItem>
            {employees.map((employee) => (
              <SelectItem key={employee.id} value={employee.id.toString()}>
                {employee.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="jpg">JPG</SelectItem>
            <SelectItem value="docx">DOCX</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span>{doc.filename}</span>
                  </div>
                </TableCell>
                <TableCell>{doc.employee.fullName}</TableCell>
                <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                <TableCell>{doc.fileSize}</TableCell>
                <TableCell>{doc.fileType}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500">
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

