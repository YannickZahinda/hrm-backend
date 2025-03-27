import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface EmployeeFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function EmployeeFilters({
  searchTerm,
  onSearchChange,
}: EmployeeFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search employees..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
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
  );
}
