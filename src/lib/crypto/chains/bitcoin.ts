import * as bitcoin from 'bitcoinjs-lib';
import { derivePath } from '../hdkey';
import { DerivedWallet } from '../../types/wallet';
import { ChainType } from '../../types/chain';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';

// Initialize ECC for bitcoinjs-lib
bitcoin.initEccLib(ecc as any);
const ECPair = ECPairFactory(ecc);

export type BitcoinAddressType = 'legacy' | 'segwit' | 'native-segwit' | 'taproot';

/**
 * Derive Bitcoin address from seed
 */
export function deriveBitcoinAddress(
  seed: Buffer,
  hdPath: string,
  index: number,
  addressType: BitcoinAddressType
): DerivedWallet {
  // Derive key using HD path
  const derived = derivePath(seed, hdPath, index);

  const network = bitcoin.networks.bitcoin;

  // Create keypair from private key
  const keyPair = ECPair.fromPrivateKey(derived.privateKey, { network });

  let address: string;
  let chainType: ChainType;

  switch (addressType) {
    case 'legacy': {
      // P2PKH (starts with 1)
      const { address: addr } = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
        network,
      });
      address = addr!;
      chainType = 'bitcoin-legacy';
      break;
    }

    case 'segwit': {
      // P2SH-P2WPKH (starts with 3)
      const { address: addr } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({
          pubkey: keyPair.publicKey,
          network,
        }),
        network,
      });
      address = addr!;
      chainType = 'bitcoin-segwit';
      break;
    }

    case 'native-segwit': {
      // P2WPKH (starts with bc1q)
      const { address: addr } = bitcoin.payments.p2wpkh({
        pubkey: keyPair.publicKey,
        network,
      });
      address = addr!;
      chainType = 'bitcoin-native-segwit';
      break;
    }

    case 'taproot': {
      // P2TR (starts with bc1p)
      // For taproot, we need to use the x-only pubkey (32 bytes)
      const internalPubkey = keyPair.publicKey.slice(1, 33);
      const { address: addr } = bitcoin.payments.p2tr({
        internalPubkey,
        network,
      });
      address = addr!;
      chainType = 'bitcoin-taproot';
      break;
    }

    default:
      throw new Error(`Unsupported Bitcoin address type: ${addressType}`);
  }

  // Build full path
  const fullPath = hdPath.endsWith("'") ? `${hdPath}/${index}` : `${hdPath}/${index}`;

  return {
    index,
    hdPath: fullPath,
    address,
    publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
    privateKey: Buffer.from(keyPair.privateKey!).toString('hex'),
    chain: chainType,
  };
}

/**
 * Helper function to get address type from chain type
 */
export function getAddressTypeFromChain(chain: ChainType): BitcoinAddressType | null {
  switch (chain) {
    case 'bitcoin-legacy':
      return 'legacy';
    case 'bitcoin-segwit':
      return 'segwit';
    case 'bitcoin-native-segwit':
      return 'native-segwit';
    case 'bitcoin-taproot':
      return 'taproot';
    default:
      return null;
  }
}
