'use client';

import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { cn } from '@/lib/utils';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate: create, pending } = useApiMutation(api.board.create);

  const handleClick = () => {
    create({ orgId, title: 'Untitled' })
      .then((id) => {
        toast.success('Board created');
        // Router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error('Failed to create board');
      });
  };

  return (
    <button
      className={cn(
        'col-span-1 flex aspect-[100/127] flex-col items-center justify-center rounded-lg bg-blue-600 py-6 hover:bg-blue-800',
        (pending || disabled) && 'opacity-75'
      )}
      disabled={pending || disabled}
      onClick={handleClick}
    >
      <div />
      {!pending ? (
        <Plus className="h-10 w-10 stroke-1 text-white" />
      ) : (
        <Loader2 className="h-10 w-10 animate-spin stroke-1 text-white" />
      )}
      <p className="text-sm font-light text-white">New board</p>
    </button>
  );
};
