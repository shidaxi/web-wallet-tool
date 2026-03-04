import { ChainType } from '../../types/chain';
import { DerivedWallet } from '../../types/wallet';
import { deriveEthereumAddress } from './ethereum';
import { deriveSolanaAddress } from './solana';
import { deriveSuiAddress } from './sui';
import { deriveAptosAddress } from './aptos';
import { deriveBitcoinAddress, getAddressTypeFromChain } from './bitcoin';
import { deriveCosmosAddress } from './cosmos';

/**
 * Universal chain derivation function
 * Routes to the appropriate chain-specific derivation function
 */
export async function deriveAddress(
  seed: Buffer,
  chain: ChainType,
  hdPath: string,
  index: number
): Promise<DerivedWallet> {
  switch (chain) {
    case 'ethereum':
      return deriveEthereumAddress(seed, hdPath, index);

    case 'solana':
      return deriveSolanaAddress(seed, hdPath, index);

    case 'sui':
      return deriveSuiAddress(seed, hdPath, index);

    case 'aptos':
      return await deriveAptosAddress(seed, hdPath, index);

    case 'bitcoin-legacy':
    case 'bitcoin-segwit':
    case 'bitcoin-native-segwit':
    case 'bitcoin-taproot': {
      const addressType = getAddressTypeFromChain(chain);
      if (!addressType) {
        throw new Error(`Invalid Bitcoin chain type: ${chain}`);
      }
      return deriveBitcoinAddress(seed, hdPath, index, addressType);
    }

    case 'cosmos':
      return deriveCosmosAddress(seed, hdPath, index);

    default:
      throw new Error(`Unsupported chain: ${chain}`);
  }
}

/**
 * Derive multiple addresses for a chain
 */
export async function deriveMultipleAddresses(
  seed: Buffer,
  chain: ChainType,
  hdPath: string,
  startIndex: number,
  count: number
): Promise<DerivedWallet[]> {
  const promises = Array.from({ length: count }, (_, i) =>
    deriveAddress(seed, chain, hdPath, startIndex + i)
  );

  return Promise.all(promises);
}

// Re-export individual chain functions
export {
  deriveEthereumAddress,
  deriveSolanaAddress,
  deriveSuiAddress,
  deriveAptosAddress,
  deriveBitcoinAddress,
  deriveCosmosAddress,
};
