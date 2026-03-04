import { ChainType } from './chain';

export interface DerivedWallet {
  index: number;
  hdPath: string;
  address: string;
  publicKey: string;
  privateKey: string;
  chain: ChainType;
}

export interface WalletExportData {
  chain: ChainType;
  hdPath: string;
  wallets: DerivedWallet[];
  exportedAt: string;
}
