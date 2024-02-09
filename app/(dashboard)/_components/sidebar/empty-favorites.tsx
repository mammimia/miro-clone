import Image from 'next/image';
import React from 'react';

const EmptyFavorites = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src="/empty-favorites.svg" height={200} width={200} alt="Empty" />
      <h2 className="mt-6 text-2xl font-semibold">No favorite boards!</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Add boards to your favorites to see them here
      </p>
    </div>
  );
};

export default EmptyFavorites;
