import { ChainInfo, ChainType } from '../types/chain';

export const CHAIN_INFO: Record<ChainType, ChainInfo> = {
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    defaultPath: "m/44'/60'/0'/0",
    icon: '⟠',
    description: 'EVM-compatible chain (Ethereum, BSC, Polygon, etc.)',
  },
  solana: {
    id: 'solana',
    name: 'Solana',
    defaultPath: "m/44'/501'/0'/0'",
    icon: '◎',
    description: 'High-performance blockchain using Ed25519',
  },
  sui: {
    id: 'sui',
    name: 'Sui',
    defaultPath: "m/44'/784'/0'/0'/0'",
    icon: '〜',
    description: 'Move-based blockchain by Mysten Labs',
  },
  aptos: {
    id: 'aptos',
    name: 'Aptos',
    defaultPath: "m/44'/637'/0'/0'/0'",
    icon: 'Ⓐ',
    description: 'Move-based blockchain using Ed25519',
  },
  'bitcoin-legacy': {
    id: 'bitcoin-legacy',
    name: 'Bitcoin (Legacy)',
    defaultPath: "m/44'/0'/0'/0",
    icon: '₿',
    description: 'P2PKH addresses (starts with 1)',
  },
  'bitcoin-segwit': {
    id: 'bitcoin-segwit',
    name: 'Bitcoin (SegWit)',
    defaultPath: "m/49'/0'/0'/0",
    icon: '₿',
    description: 'P2SH-P2WPKH addresses (starts with 3)',
  },
  'bitcoin-native-segwit': {
    id: 'bitcoin-native-segwit',
    name: 'Bitcoin (Native SegWit)',
    defaultPath: "m/84'/0'/0'/0",
    icon: '₿',
    description: 'P2WPKH addresses (starts with bc1q)',
  },
  'bitcoin-taproot': {
    id: 'bitcoin-taproot',
    name: 'Bitcoin (Taproot)',
    defaultPath: "m/86'/0'/0'/0",
    icon: '₿',
    description: 'P2TR addresses (starts with bc1p)',
  },
  cosmos: {
    id: 'cosmos',
    name: 'Cosmos',
    defaultPath: "m/44'/118'/0'/0",
    icon: '⚛',
    description: 'Cosmos SDK chains (Atom, Osmosis, etc.)',
  },
};

export const CHAIN_LIST: ChainInfo[] = Object.values(CHAIN_INFO);
