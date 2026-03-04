import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { derivePath } from '../hdkey';
import { DerivedWallet } from '../../types/wallet';

/**
 * Derive Sui address from seed
 */
export function deriveSuiAddress(
  seed: Buffer,
  hdPath: string,
  index: number
): DerivedWallet {
  // Derive key using HD path
  const derived = derivePath(seed, hdPath, index);

  // Create Sui keypair from derived private key (first 32 bytes for Ed25519)
  const keypair = Ed25519Keypair.fromSecretKey(derived.privateKey.slice(0, 32));

  // Build full path
  const fullPath = hdPath.endsWith("'") ? `${hdPath}/${index}` : `${hdPath}/${index}`;

  return {
    index,
    hdPath: fullPath,
    address: keypair.getPublicKey().toSuiAddress(),
    publicKey: keypair.getPublicKey().toBase64(),
    privateKey: Buffer.from(keypair.export().privateKey).toString('hex'),
    chain: 'sui',
  };
}
