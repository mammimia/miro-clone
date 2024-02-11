'use client';

import { useQuery } from 'convex/react';
import EmptyBoards from './sidebar/empty-boards';
import EmptyFavorites from './sidebar/empty-favorites';
import EmptySearch from './sidebar/empty-search';
import { api } from '@/convex/_generated/api';

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: boolean;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId });

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return <div>{JSON.stringify(data)}</div>;
};
