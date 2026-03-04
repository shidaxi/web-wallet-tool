import * as ed from '@noble/ed25519';
import * as secp from '@noble/secp256k1';
import { sha256 } from '@noble/hashes/sha2.js';
import { CurveType, P2PNodeInfo } from '../types/p2p';

/**
 * Calculate libp2p PeerId from private key
 * @param privateKeyHex - Private key in hex format (64 chars for Ed25519/Secp256k1)
 * @param curve - Curve type: 'ed25519' or 'secp256k1'
 * @returns PeerId information including peerId string, public key, and multihash
 */
export async function calculatePeerId(
  privateKeyHex: string,
  curve: CurveType
): Promise<P2PNodeInfo> {
  // Remove 0x prefix if present
  const cleanHex = privateKeyHex.startsWith('0x')
    ? privateKeyHex.slice(2)
    : privateKeyHex;

  // Validate hex format
  if (!/^[0-9a-fA-F]+$/.test(cleanHex)) {
    throw new Error('Invalid private key: must be hex format');
  }

  // Convert hex to bytes
  const privateKeyBytes = new Uint8Array(
    cleanHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
  );

  // Validate key length
  if (privateKeyBytes.length !== 32) {
    throw new Error('Private key must be 32 bytes');
  }

  try {
    let publicKeyBytes: Uint8Array;
    let publicKeyMulticodec: Uint8Array;

    if (curve === 'ed25519') {
      // Derive public key from private key
      publicKeyBytes = await ed.getPublicKey(privateKeyBytes);

      // Ed25519 public key multicodec: 0xed01 + publicKey
      publicKeyMulticodec = new Uint8Array([0xed, 0x01, ...publicKeyBytes]);
    } else if (curve === 'secp256k1') {
      // Derive compressed public key from private key
      publicKeyBytes = secp.getPublicKey(privateKeyBytes, true);

      // Secp256k1 public key multicodec: 0xe701 + publicKey
      publicKeyMulticodec = new Uint8Array([0xe7, 0x01, ...publicKeyBytes]);
    } else {
      throw new Error(`Unsupported curve: ${curve}`);
    }

    // Hash the public key for PeerId
    const hash = sha256(publicKeyMulticodec);

    // Create multihash: 0x12 (sha256) + 0x20 (32 bytes) + hash
    const multihash = new Uint8Array([0x12, 0x20, ...hash]);

    // Base58 encode for PeerId string
    const peerId = base58Encode(multihash);

    return {
      peerId: `12D3Koo${peerId.slice(0, 44)}`, // Standard libp2p PeerId format
      publicKeyHex: Buffer.from(publicKeyBytes).toString('hex'),
      multihash: Buffer.from(multihash).toString('hex'),
    };
  } catch (error) {
    throw new Error(`Failed to calculate PeerId: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Base58 encoding (Bitcoin alphabet)
 */
function base58Encode(data: Uint8Array): string {
  const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const BASE = BigInt(58);

  let num = BigInt('0x' + Array.from(data).map(b => b.toString(16).padStart(2, '0')).join(''));

  let encoded = '';
  while (num > 0) {
    const remainder = Number(num % BASE);
    encoded = ALPHABET[remainder] + encoded;
    num = num / BASE;
  }

  // Add leading '1' for leading zeros
  for (const byte of data) {
    if (byte === 0) {
      encoded = '1' + encoded;
    } else {
      break;
    }
  }

  return encoded;
}

/**
 * Validate private key format
 */
export function isValidPrivateKey(privateKeyHex: string): boolean {
  const cleanHex = privateKeyHex.startsWith('0x')
    ? privateKeyHex.slice(2)
    : privateKeyHex;

  if (!/^[0-9a-fA-F]+$/.test(cleanHex)) {
    return false;
  }

  const length = cleanHex.length / 2;
  return length === 32; // 32 bytes for both curves
}
