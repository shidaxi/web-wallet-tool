import * as secp from '@noble/secp256k1';
import { bech32 } from 'bech32';
import { sha256 } from '@noble/hashes/sha2.js';
import { ripemd160 } from '@noble/hashes/legacy.js';
import { derivePath } from '../hdkey';
import { DerivedWallet } from '../../types/wallet';

/**
 * Derive Cosmos address from seed
 * Uses Secp256k1 + Bech32 encoding with 'cosmos' prefix
 */
export function deriveCosmosAddress(
  seed: Buffer,
  hdPath: string,
  index: number,
  prefix: string = 'cosmos'
): DerivedWallet {
  // Derive key using HD path
  const derived = derivePath(seed, hdPath, index);

  // Get compressed public key using secp256k1
  const publicKey = secp.getPublicKey(derived.privateKey, true);

  // Calculate address: RIPEMD160(SHA256(publicKey))
  const hash = sha256(publicKey);
  const addressBytes = ripemd160(hash);

  // Encode address using Bech32
  const words = bech32.toWords(addressBytes);
  const address = bech32.encode(prefix, words);

  // Build full path
  const fullPath = hdPath.endsWith("'") ? `${hdPath}/${index}` : `${hdPath}/${index}`;

  return {
    index,
    hdPath: fullPath,
    address,
    publicKey: Buffer.from(publicKey).toString('hex'),
    privateKey: derived.privateKey.toString('hex'),
    chain: 'cosmos',
  };
}
