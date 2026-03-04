import { useState, useEffect } from 'react';
import { CurveType, P2PNodeInfo } from '../lib/types/p2p';
import { calculatePeerId, isValidPrivateKey } from '../lib/crypto/p2p';

export interface UseP2PNodeReturn {
  result: P2PNodeInfo | null;
  isLoading: boolean;
  error: Error | null;
}

export function useP2PNode(
  privateKeyHex: string,
  curve: CurveType
): UseP2PNodeReturn {
  const [result, setResult] = useState<P2PNodeInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Reset state if input is invalid
    if (!privateKeyHex || !isValidPrivateKey(privateKeyHex)) {
      setResult(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    calculatePeerId(privateKeyHex, curve)
      .then(info => {
        if (!cancelled) {
          setResult(info);
          setError(null);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setResult(null);
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [privateKeyHex, curve]);

  return { result, isLoading, error };
}
