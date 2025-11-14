import { useState, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Hook for optimistic UI updates
 * Updates UI immediately, then syncs with server
 */
export function useOptimisticUpdate<T>() {
  const [isUpdating, setIsUpdating] = useState(false);

  const update = useCallback(
    async (
      optimisticUpdate: () => void,
      apiCall: () => Promise<T>,
      revert: () => void,
      options?: {
        successMessage?: string;
        errorMessage?: string;
      }
    ): Promise<T | null> => {
      setIsUpdating(true);

      // 1. Update UI immediately (optimistic)
      optimisticUpdate();

      try {
        // 2. Make API call in background
        const result = await apiCall();
        
        if (options?.successMessage) {
          toast.success(options.successMessage);
        }
        
        setIsUpdating(false);
        return result;
      } catch (error) {
        // 3. Revert UI on error
        revert();
        
        if (options?.errorMessage) {
          toast.error(options.errorMessage);
        }
        
        setIsUpdating(false);
        throw error;
      }
    },
    []
  );

  return { update, isUpdating };
}
