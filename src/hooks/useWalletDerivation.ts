import { useEffect, useState } from 'react';
import { ChainType } from '../lib/types/chain';
import { DerivedWallet } from '../lib/types/wallet';
import { mnemonicToSeed } from '../lib/crypto/mnemonic';
import { deriveMultipleAddresses } from '../lib/crypto/chains';

export interface UseWalletDerivationOptions {
  mnemonic: string[];
  passphrase: string;
  chain: ChainType;
  hdPath: string;
  startIndex: number;
  count: number;
  enabled?: boolean;
}

export interface UseWalletDerivationReturn {
  wallets: DerivedWallet[];
  isLoading: boolean;
  error: Error | null;
}

export function useWalletDerivation({
  mnemonic,
  passphrase,
  chain,
  hdPath,
  startIndex,
  count,
  enabled = true,
}: UseWalletDerivationOptions): UseWalletDerivationReturn {
  const [wallets, setWallets] = useState<DerivedWallet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Early return if disabled or invalid input
    if (!enabled || mnemonic.length === 0 || !hdPath || count <= 0) {
      setWallets([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        // Convert mnemonic array to string
        const mnemonicString = mnemonic.join(' ');

        // Derive seed from mnemonic
        const seed = mnemonicToSeed(mnemonicString, passphrase);

        // Derive multiple addresses
        const derivedWallets = await deriveMultipleAddresses(
          seed,
          chain,
          hdPath,
          startIndex,
          count
        );

        if (!cancelled) {
          setWallets(derivedWallets);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Wallet derivation error:', err);
          setWallets([]);
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mnemonic, passphrase, chain, hdPath, startIndex, count, enabled]);

  return { wallets, isLoading, error };
}
