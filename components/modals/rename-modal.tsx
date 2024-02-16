'use client';

import { useRenameModal } from '@/store/use-rename-modal';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';

export const RenameModal = () => {
  const { isOpen, initialValues, onClose } = useRenameModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
      </DialogContent>
      <DialogDescription>Enter a new title for this board</DialogDescription>
    </Dialog>
  );
};
