'use client';

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: boolean;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = []; // Call API to get data

  if (!data?.length && query.search) {
    return <div>Try searching for something else</div>;
  }

  if (!data?.length && query.favorites) {
    return <div>No favorites</div>;
  }

  if (!data?.length) {
    return <div>No boards</div>;
  }

  return <div>{JSON.stringify(query)}</div>;
};
