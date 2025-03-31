import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { LeaveService } from '@/services/leaves-api-service';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LeaveHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId: number;
  employeeName: string;
}

export function LeaveHistoryDialog({
  isOpen,
  onClose,
  employeeId,
  employeeName,
}: LeaveHistoryDialogProps) {
  const [lastLeaveEndDate, setLastLeaveEndDate] = useState<string>('');
  const [initialBalance, setInitialBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lastLeaveEndDate) {
      toast({
        title: 'Missing Information',
        description: 'Please provide the last leave end date',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await LeaveService.initializeLeaveHistory(
        employeeId,
        lastLeaveEndDate,
        initialBalance
      );
      
      toast({
        title: 'Success',
        description: 'Leave history initialized successfully',
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to initialize leave history',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Initialize Leave History</DialogTitle>
          <DialogDescription>
            Set up initial leave balance for {employeeName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="lastLeaveEndDate"
                className="text-right flex items-center gap-1"
              >
                <Calendar className="h-4 w-4" />
                Last Leave End Date
              </Label>
              <div className="col-span-3">
                <Input
                  id="lastLeaveEndDate"
                  type="date"
                  value={lastLeaveEndDate}
                  onChange={(e) => setLastLeaveEndDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="initialBalance" className="text-right">
                Initial Balance (days)
              </Label>
              <Input
                id="initialBalance"
                type="number"
                className="col-span-3"
                value={initialBalance}
                onChange={(e) => setInitialBalance(Number(e.target.value))}
                min="0"
                step="0.5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}