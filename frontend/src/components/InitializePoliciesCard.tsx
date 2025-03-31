import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LeaveService } from '@/services/leaves-api-service';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function InitializePoliciesCard() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleInitialize = async () => {
    try {
      setIsInitializing(true);
      await LeaveService.initializeLeavePolicies();
      toast({
        title: 'Success',
        description: 'Leave policies initialized successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error 
          ? error.message 
          : 'Failed to initialize policies',
        variant: 'destructive',
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleReset = async () => {
    try {
      setIsResetting(true);
    
      await LeaveService.initializeLeavePolicies();
      toast({
        title: 'Success',
        description: 'Leave policies reset to defaults',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error 
          ? error.message 
          : 'Failed to reset policies',
        variant: 'destructive',
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Initialize Leave Policies</CardTitle>
        <CardDescription>
          Initialize or reset leave policies for all employees
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          This will initialize leave policies for all employees based on their categories. 
          Use this when setting up the system for the first time or when making major policy changes.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleReset}
          disabled={isResetting}
        >
          {isResetting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : 'Reset to Defaults'}
        </Button>
        <Button 
          onClick={handleInitialize}
          disabled={isInitializing}
        >
          {isInitializing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Initializing...
            </>
          ) : 'Initialize Policies'}
        </Button>
      </CardFooter>
    </Card>
  );
}