import { Keypair } from '@solana/web3.js';
import { derivePath } from '../hdkey';
import { DerivedWallet } from '../../types/wallet';

/**
 * Derive Solana address from seed
 */
export function deriveSolanaAddress(
  seed: Buffer,
  hdPath: string,
  index: number
): DerivedWallet {
  // Derive key using HD path
  const derived = derivePath(seed, hdPath, index);

  // Create Solana keypair from derived private key
  const keypair = Keypair.fromSeed(derived.privateKey.slice(0, 32));

  // Build full path
  const fullPath = hdPath.endsWith("'") ? `${hdPath}/${index}` : `${hdPath}/${index}`;

  return {
    index,
    hdPath: fullPath,
    address: keypair.publicKey.toBase58(),
    publicKey: Buffer.from(keypair.publicKey.toBytes()).toString('hex'),
    privateKey: Buffer.from(keypair.secretKey).toString('hex'),
    chain: 'solana',
  };
}
