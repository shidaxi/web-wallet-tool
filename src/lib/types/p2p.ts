export type CurveType = 'ed25519' | 'secp256k1';

export interface P2PNodeInfo {
  peerId: string;
  publicKeyHex: string;
  multihash: string;
}
