export type ChainType =
  | 'ethereum'
  | 'solana'
  | 'sui'
  | 'aptos'
  | 'bitcoin-legacy'
  | 'bitcoin-segwit'
  | 'bitcoin-native-segwit'
  | 'bitcoin-taproot'
  | 'cosmos';

export interface ChainInfo {
  id: ChainType;
  name: string;
  defaultPath: string;
  icon: string;
  description?: string;
}

export type ChainCategory = 'evm' | 'solana' | 'move' | 'bitcoin' | 'cosmos';
