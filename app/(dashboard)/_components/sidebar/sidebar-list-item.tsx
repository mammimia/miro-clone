'use client';

import { cn } from '@/lib/utils';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import Image from 'next/image';

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const SidebarListItem = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const handleClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <div className="relative aspect-square">
      <Image
        src={imageUrl}
        onClick={handleClick}
        alt={name}
        fill
        className={cn(
          'cursor-pointer rounded-md opacity-75 transition hover:opacity-100',
          isActive && 'opacity-100'
        )}
      />
    </div>
  );
};
