import { ChainType } from '../types/chain';

// Default HD paths for each chain type
export const DEFAULT_HD_PATHS: Record<ChainType, string> = {
  ethereum: "m/44'/60'/0'/0",
  solana: "m/44'/501'/0'/0'",
  sui: "m/44'/784'/0'/0'/0'",
  aptos: "m/44'/637'/0'/0'/0'",
  'bitcoin-legacy': "m/44'/0'/0'/0",
  'bitcoin-segwit': "m/49'/0'/0'/0",
  'bitcoin-native-segwit': "m/84'/0'/0'/0",
  'bitcoin-taproot': "m/86'/0'/0'/0",
  cosmos: "m/44'/118'/0'/0",
};

// Preset HD paths for quick selection
export interface HDPathPreset {
  label: string;
  path: string;
  description?: string;
}

export const HD_PATH_PRESETS: Record<ChainType, HDPathPreset[]> = {
  ethereum: [
    { label: 'Default (BIP44)', path: "m/44'/60'/0'/0", description: 'Standard Ethereum path' },
    { label: 'Ledger Live', path: "m/44'/60'/0'/0/0", description: 'Ledger Live format' },
    { label: 'Legacy', path: "m/44'/60'/0'", description: 'Old format without change' },
  ],
  solana: [
    { label: 'Default', path: "m/44'/501'/0'/0'", description: 'Standard Solana path' },
    { label: 'Single Account', path: "m/44'/501'/0'", description: 'Phantom/Solflare format' },
  ],
  sui: [
    { label: 'Default', path: "m/44'/784'/0'/0'/0'", description: 'Standard Sui path' },
  ],
  aptos: [
    { label: 'Default', path: "m/44'/637'/0'/0'/0'", description: 'Standard Aptos path' },
  ],
  'bitcoin-legacy': [
    { label: 'Default (P2PKH)', path: "m/44'/0'/0'/0", description: 'BIP44 legacy addresses' },
  ],
  'bitcoin-segwit': [
    { label: 'Default (P2SH-SegWit)', path: "m/49'/0'/0'/0", description: 'BIP49 SegWit in P2SH' },
  ],
  'bitcoin-native-segwit': [
    { label: 'Default (Native SegWit)', path: "m/84'/0'/0'/0", description: 'BIP84 native SegWit' },
  ],
  'bitcoin-taproot': [
    { label: 'Default (Taproot)', path: "m/86'/0'/0'/0", description: 'BIP86 Taproot addresses' },
  ],
  cosmos: [
    { label: 'Default (Cosmos Hub)', path: "m/44'/118'/0'/0", description: 'Standard Cosmos path' },
    { label: 'Osmosis', path: "m/44'/118'/0'/0", description: 'Same as Cosmos Hub' },
  ],
};

// Validate HD path format
export function isValidHDPath(path: string): boolean {
  // Must start with m/
  if (!path.startsWith('m/')) return false;

  // Extract path components
  const components = path.slice(2).split('/');
  if (components.length === 0) return false;

  // Each component must be a number or number with '
  for (const component of components) {
    const isHardened = component.endsWith("'");
    const num = isHardened ? component.slice(0, -1) : component;

    if (!/^\d+$/.test(num)) return false;

    const value = parseInt(num, 10);
    if (value < 0 || value >= 0x80000000) return false;
  }

  return true;
}

// Parse HD path to get depth
export function getHDPathDepth(path: string): number {
  if (!path.startsWith('m/')) return 0;
  return path.slice(2).split('/').length;
}
