import { HDKey } from '@scure/bip32';

export interface DerivedKeyInfo {
  privateKey: Buffer;
  publicKey: Buffer;
  chainCode: Buffer;
}

/**
 * Derive a key at a specific HD path with index
 * @param seed - The root seed (512-bit)
 * @param hdPath - Base HD path (e.g., "m/44'/60'/0'/0")
 * @param index - Address index to derive
 * @returns Derived private key, public key, and chain code
 */
export function derivePath(seed: Buffer, hdPath: string, index: number): DerivedKeyInfo {
  const hdkey = HDKey.fromMasterSeed(seed);

  // Build full path with index
  const fullPath = hdPath.endsWith("'") ? `${hdPath}/${index}` : `${hdPath}/${index}`;

  const derived = hdkey.derive(fullPath);

  if (!derived.privateKey) {
    throw new Error(`Failed to derive private key at path: ${fullPath}`);
  }

  return {
    privateKey: Buffer.from(derived.privateKey),
    publicKey: Buffer.from(derived.publicKey!),
    chainCode: Buffer.from(derived.chainCode!),
  };
}

/**
 * Derive multiple addresses at once
 */
export function deriveMultiple(
  seed: Buffer,
  hdPath: string,
  startIndex: number,
  count: number
): DerivedKeyInfo[] {
  return Array.from({ length: count }, (_, i) =>
    derivePath(seed, hdPath, startIndex + i)
  );
}

/**
 * Parse and validate HD path format
 */
export function parseHDPath(path: string): number[] {
  if (!path.startsWith('m/')) {
    throw new Error('HD path must start with m/');
  }

  const components = path.slice(2).split('/');
  const indices: number[] = [];

  for (const component of components) {
    const isHardened = component.endsWith("'");
    const numStr = isHardened ? component.slice(0, -1) : component;
    const num = parseInt(numStr, 10);

    if (isNaN(num) || num < 0) {
      throw new Error(`Invalid HD path component: ${component}`);
    }

    // Add hardened offset if needed
    indices.push(isHardened ? num + 0x80000000 : num);
  }

  return indices;
}
