import * as ed from '@noble/ed25519';
import { sha3_256 } from '@noble/hashes/sha3.js';
import { derivePath } from '../hdkey';
import { DerivedWallet } from '../../types/wallet';

/**
 * Derive Aptos address from seed
 * Aptos uses Ed25519 + SHA3-256 for address calculation
 */
export async function deriveAptosAddress(
  seed: Buffer,
  hdPath: string,
  index: number
): Promise<DerivedWallet> {
  // Derive key using HD path
  const derived = derivePath(seed, hdPath, index);

  // Use first 32 bytes for Ed25519 private key
  const privateKey = derived.privateKey.slice(0, 32);

  // Derive public key from private key
  const publicKey = await ed.getPublicKey(privateKey);

  // Calculate Aptos address: SHA3-256(publicKey || 0x00) -> first 32 bytes
  const addressBytes = sha3_256.create()
    .update(publicKey)
    .update(new Uint8Array([0x00])) // Single signature scheme
    .digest();

  // Convert to hex address with 0x prefix
  const address = '0x' + Buffer.from(addressBytes).toString('hex');

  // Build full path
  const fullPath = hdPath.endsWith("'") ? `${hdPath}/${index}` : `${hdPath}/${index}`;

  return {
    index,
    hdPath: fullPath,
    address,
    publicKey: Buffer.from(publicKey).toString('hex'),
    privateKey: Buffer.from(privateKey).toString('hex'),
    chain: 'aptos',
  };
}
