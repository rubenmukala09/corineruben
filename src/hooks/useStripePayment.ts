import { useCallback, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GuestScanPaymentResponse {
  clientSecret: string;
  scanId: string;
  amount: number;
  filePath: string;
  paymentIntentId: string;
}

export const useStripePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGuestScanPayment = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "guest-scan-payment",
        {
          body: {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
          },
        },
      );

      if (fnError) {
        throw new Error(fnError.message || "Failed to initialize payment");
      }

      if (!data?.clientSecret || !data?.scanId || !data?.filePath) {
        throw new Error("Incomplete payment response. Please try again.");
      }

      return data as GuestScanPaymentResponse;
    } catch (err: any) {
      const message = err?.message || "Payment setup failed.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createGuestScanPayment,
    loading,
    error,
    clearError: () => setError(null),
  };
};

export default useStripePayment;
