'use client';

import { ConfirmModal } from '@/components/confirm-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { useRenameModal } from '@/store/use-rename-modal';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { Link2, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ActionsProps {
  id: string;
  title: string;
  children: React.ReactNode;
  side?: DropdownMenuContentProps['side'];
  sideOffset?: DropdownMenuContentProps['sideOffset'];
}

export const Actions = ({
  id,
  title,
  children,
  side,
  sideOffset
}: ActionsProps) => {
  const { onOpen } = useRenameModal();
  const { mutate: remove, pending } = useApiMutation(api.board.remove);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success('Link copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy link to clipboard');
      });
  };

  const handleDelete = () => {
    remove({ id })
      .then(() => {
        toast.success('Board deleted');
      })
      .catch(() => {
        toast.error('Failed to delete board');
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={(event) => event.stopPropagation()}
      >
        <DropdownMenuItem
          className="cursor-pointer p-3"
          onClick={handleCopyLink}
        >
          <Link2 className="mr-2 h-4 w-4" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer p-3"
          onClick={() => onOpen(id, title)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Rename board
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board?"
          description="This will delete the board and all of its contents."
          disabled={pending}
          onConfirm={handleDelete}
        >
          <Button
            className="w-full cursor-pointer justify-start p-3 text-sm font-normal"
            variant="ghost"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete board
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
