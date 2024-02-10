'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { useOrganization } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import Image from 'next/image';
import React from 'react';

const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate: create, pending } = useApiMutation(api.board.create);

  const handleClick = () => {
    if (!organization) return;

    create({ orgId: organization.id, title: 'My first board' });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src="/note.svg" height={200} width={200} alt="Empty" />
      <h2 className="mt-6 text-2xl font-semibold">Create your first board!</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} size="lg" onClick={handleClick}>
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
