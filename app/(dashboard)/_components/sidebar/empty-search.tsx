import Image from 'next/image';
import React from 'react';

const EmptySearch = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src="/empty-search.svg" height={200} width={200} alt="Empty" />
      <h2 className="mt-6 text-2xl font-semibold">No results found!</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Try searching for something else
      </p>
    </div>
  );
};

export default EmptySearch;
