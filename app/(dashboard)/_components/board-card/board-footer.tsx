import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface BoardFooterProps {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}

export const BoardFooter = ({
  isFavorite,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled
}: BoardFooterProps) => {
  return (
    <div className="relative bg-white p-3">
      <p className="max-w-[calc(100%-20px)]} truncate text-[13px]">{title}</p>
      <p className="truncate text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        Created by {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'absolute right-3 top-3 text-muted-foreground opacity-0 transition hover:text-blue-600 group-hover:opacity-100',
          disabled && 'cursor-not-allowed opacity-75'
        )}
      >
        <Star
          className={cn('h-4 w-4', isFavorite && 'fill-blue-600 text-blue-600')}
        />
      </button>
    </div>
  );
};
