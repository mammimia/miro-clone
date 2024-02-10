import { useMutation } from 'convex/react';
import { useState } from 'react';

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);

  const apiMutation = useMutation(mutationFunction);

  const mutate = async (payload: any) => {
    setPending(true);
    return apiMutation(payload)
      .then((result) => result)
      .catch((error) => {
        throw error;
      })
      .finally(() => setPending(false));
  };

  return { mutate, pending };
};
