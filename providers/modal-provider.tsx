'use client';

import { RenameModal } from '@/components/modals/rename-modal';
import { useEffect, useState } from 'react';

// To avoid hydration errors, we need to make sure that the modal is only rendered on the client
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameModal />
    </>
  );
};
