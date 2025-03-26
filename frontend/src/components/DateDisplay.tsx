import { format } from 'date-fns';

interface DateDisplayProps {
  date: Date | string | null | undefined;
  formatString?: string;
}

export function DateDisplay({ date, formatString = 'MMM dd, yyyy' }: DateDisplayProps) {
  if (!date) return <span className="text-muted-foreground">Not set</span>;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return (
    <span>
      {isNaN(dateObj.getTime()) 
        ? 'Invalid date' 
        : format(dateObj, formatString)}
    </span>
  );
}