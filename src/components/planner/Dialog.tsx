import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import GoogleAuthButton from '../ui/GoogleSvg';

const DialogComponent = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleCalendarSync = () => {
    setShowAuthDialog(true);
  };

  const handleAuthComplete = () => {
    setShowAuthDialog(false);
    toast({
      title: 'Google Calendar Connected',
      description: 'Your study plans will now sync with Google Calendar.',
    });
  };

  return (
    <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect with Google Calendar</DialogTitle>
          <DialogDescription>
            Sync your study plans with Google Calendar to stay organized across
            all your devices.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='bg-muted p-4 rounded-md text-sm'>
            <p>
              By connecting with Google Calendar, you authorize this app to:
            </p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Create calendar events for your study sessions</li>
              <li>Read your existing calendar events to avoid conflicts</li>
              <li>Update or delete events created by this app</li>
            </ul>
          </div>

          <GoogleAuthButton />
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setShowAuthDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleAuthComplete}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
