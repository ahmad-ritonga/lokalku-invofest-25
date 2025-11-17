// Custom hook for Gemini AI integration
import { useState, useCallback } from "react";
import { chatWithGemini } from "@/services/gemini.service";
import type { GeminiResponse } from "@/types/chat.types";

const TIMEOUT_MS = 10000; // 10 seconds

export const useGemini = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (
      message: string,
      conversationHistory: string[] = [],
      userLocation?: { lat: number; lng: number }
    ): Promise<GeminiResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        // Create timeout promise
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("Request timeout")), TIMEOUT_MS);
        });

        // Race between API call and timeout
        const response = await Promise.race([
          chatWithGemini(message, conversationHistory, userLocation),
          timeoutPromise,
        ]);

        setIsLoading(false);
        return response;
      } catch (err: any) {
        setIsLoading(false);
        const errorMessage = err.message || "Terjadi kesalahan. Coba lagi ya! 🙏";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    sendMessage,
    isLoading,
    error,
    clearError,
  };
};
