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
    </div>
  );
};
