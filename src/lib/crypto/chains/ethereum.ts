import { HDNodeWallet } from 'ethers';
import { DerivedWallet } from '../../types/wallet';

/**
 * Derive Ethereum address from seed
 */
export function deriveEthereumAddress(
  seed: Buffer,
  hdPath: string,
  index: number
): DerivedWallet {
  // Create HD node from seed
  const hdNode = HDNodeWallet.fromSeed(seed);

  // Build full path
  const fullPath = hdPath.endsWith("'") ? `${hdPath}/${index}` : `${hdPath}/${index}`;

  // Derive child node
  const derived = hdNode.derivePath(fullPath);

  return {
    index,
    hdPath: fullPath,
    address: derived.address,
    publicKey: derived.publicKey,
    privateKey: derived.privateKey,
    chain: 'ethereum',
  };
}
