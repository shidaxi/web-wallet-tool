import { useState, useCallback } from 'react';

export interface UseCopyFeedbackReturn {
  copied: string | null;
  copyToClipboard: (text: string, id: string) => Promise<void>;
  isCopied: (id: string) => boolean;
}

export function useCopyFeedback(duration: number = 1500): UseCopyFeedbackReturn {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = useCallback(
    async (text: string, id: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(id);

        // Clear after duration
        setTimeout(() => {
          setCopied(null);
        }, duration);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    },
    [duration]
  );

  const isCopied = useCallback(
    (id: string) => {
      return copied === id;
    },
    [copied]
  );

  return {
    copied,
    copyToClipboard,
    isCopied,
  };
}
