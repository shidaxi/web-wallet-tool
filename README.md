# Multi-Chain Wallet Tool

A pure frontend multi-chain wallet generation tool based on BIP39 mnemonic phrases. This tool runs entirely in your browser with **zero network requests**, designed for development and research purposes.

## ⚠️ Security Warning

**CRITICAL:** This tool handles private keys and sensitive cryptographic material.

- ✅ **Safe**: Runs 100% offline in your browser (zero network requests)
- ✅ **Safe**: All computations happen locally in JavaScript
- ✅ **Safe**: No data is sent to any server
- ❌ **DO NOT**: Use this tool on untrusted computers
- ❌ **DO NOT**: Share your mnemonic phrase or private keys with anyone
- ❌ **DO NOT**: Use wallets generated here for production without proper verification
- ❌ **DO NOT**: Screenshot or save private keys in insecure locations

**Always close the browser tab when done to clear all sensitive data from memory.**

## Features

### 1. Mnemonic Generator
- Generate BIP39 mnemonic phrases (12/15/18/21/24 words)
- Support for English and Simplified Chinese wordlists
- Edit individual words with searchable dropdown
- Optional BIP39 passphrase (25th word) support
- Real-time validation

### 2. Multi-Chain Support
- **Ethereum** (and EVM-compatible chains: BSC, Polygon, etc.)
- **Solana** (Ed25519-based addresses)
- **Sui** (Move-based blockchain)
- **Aptos** (Move-based with Ed25519)
- **Bitcoin** (4 address types: Legacy P2PKH, SegWit P2SH, Native SegWit, Taproot)
- **Cosmos** (Atom and other Cosmos SDK chains)

### 3. HD Path Configuration
- Predefined paths for each blockchain
- Custom HD path input with validation
- Support for account/change/address indices
- BIP44/BIP49/BIP84/BIP86 standards

### 4. Wallet Derivation
- Derive multiple addresses at once (up to 50)
- Configure starting index and display count
- View address, public key, and private key
- Private key blur/reveal toggle
- One-click copy to clipboard
- Export wallets to JSON (with security warning)

### 5. P2P Node Key Calculator
- Calculate libp2p PeerId from private key
- Support for Ed25519 and Secp256k1 curves
- Display PeerId, public key, and multihash
- Useful for configuring peer-to-peer networks

## Installation & Usage

### Prerequisites
- Node.js 20.19.0 or later
- npm or yarn

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Output will be in the dist/ directory
# You can open dist/index.html directly in a browser (offline mode)
```

### Offline Usage

1. Build the project: `npm run build`
2. The `dist/` folder contains a standalone HTML file
3. **Disconnect from the internet**
4. Open `dist/index.html` in your browser
5. The tool works completely offline

### Deploy to GitHub Pages

This project includes automated deployment to GitHub Pages via GitHub Actions.

#### Setup

1. Go to your repository Settings → Pages
2. Under "Build and deployment", select:
   - **Source**: GitHub Actions
3. Save the settings

#### Deploy

To deploy a new version:

```bash
# Tag your release (use semantic versioning)
git tag v1.0.0
git push origin v1.0.0
```

The GitHub Actions workflow will automatically:
1. Build the project with the correct base path
2. Deploy to GitHub Pages
3. Make the site available at `https://yourusername.github.io/web-wallet-tool/`

#### Manual Deployment

If you prefer manual deployment:

```bash
# Build with GitHub Pages base path
GITHUB_PAGES=true npm run build

# Deploy the dist/ folder to your gh-pages branch
```

## Technology Stack

### Core Dependencies
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Bootstrap 5** - UI framework and styling
- **React-Bootstrap** - Bootstrap components for React

### Cryptography Libraries
- `bip39` - BIP39 mnemonic implementation
- `@scure/bip32` - HD key derivation (BIP32)
- `@scure/bip39` - Secure BIP39 implementation
- `ethers@6` - Ethereum wallet derivation
- `@solana/web3.js` - Solana wallet derivation
- `@mysten/sui.js` - Sui wallet derivation
- `@noble/ed25519` - Ed25519 signatures (Aptos)
- `@noble/secp256k1` - Secp256k1 signatures (Cosmos, Bitcoin)
- `bitcoinjs-lib` - Bitcoin address generation
- `tiny-secp256k1` - Secp256k1 implementation for Bitcoin
- `@libp2p/peer-id-factory` - libp2p PeerId generation
- `bech32` - Bech32 address encoding (Cosmos)

### UI Libraries
- `bootstrap` - CSS framework
- `react-bootstrap` - Bootstrap components for React
- `react-select` - Searchable word dropdown
- `lucide-react` - Icon library

## Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Header, Section
│   ├── mnemonic/       # Mnemonic generator UI
│   ├── config/         # Chain selector, HD path input
│   ├── wallet/         # Wallet list display
│   └── p2p/           # P2P node key calculator
├── hooks/              # Custom React hooks
│   ├── useMnemonic.ts
│   ├── useWalletDerivation.ts
│   ├── useCopyFeedback.ts
│   └── useP2PNode.ts
├── lib/
│   ├── constants/      # Chain info, HD paths, wordlists
│   ├── crypto/         # Core cryptography implementations
│   │   ├── chains/     # Per-chain address derivation
│   │   ├── hdkey.ts    # HD key derivation
│   │   ├── mnemonic.ts # Mnemonic utilities
│   │   └── p2p.ts      # P2P key calculation
│   └── types/          # TypeScript type definitions
└── App.tsx             # Main application

## HD Derivation Paths

| Chain | Default Path | Description |
|-------|-------------|-------------|
| Ethereum | `m/44'/60'/0'/0` | BIP44 standard |
| Solana | `m/44'/501'/0'/0'` | Solana standard |
| Sui | `m/44'/784'/0'/0'/0'` | Sui standard |
| Aptos | `m/44'/637'/0'/0'/0'` | Aptos standard |
| Bitcoin Legacy | `m/44'/0'/0'/0` | P2PKH (starts with 1) |
| Bitcoin SegWit | `m/49'/0'/0'/0` | P2SH-P2WPKH (starts with 3) |
| Bitcoin Native SegWit | `m/84'/0'/0'/0` | P2WPKH (starts with bc1q) |
| Bitcoin Taproot | `m/86'/0'/0'/0` | P2TR (starts with bc1p) |
| Cosmos | `m/44'/118'/0'/0` | Cosmos Hub standard |

## Security Features

1. **Content Security Policy (CSP)** - Blocks external network requests
2. **No external dependencies at runtime** - All code bundled
3. **Browser warning on close** - Prevents accidental data loss
4. **Private key blur** - Hide sensitive data by default
5. **Export confirmation** - Warning dialog before downloading private keys
6. **No autocomplete** - Prevents password managers from saving data

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Development Notes

### Adding a New Blockchain

1. Define chain info in `src/lib/constants/chains.ts`
2. Add default HD path in `src/lib/constants/hdpaths.ts`
3. Implement derivation in `src/lib/crypto/chains/your-chain.ts`
4. Export from `src/lib/crypto/chains/index.ts`
5. Update `ChainType` in `src/lib/types/chain.ts`

### Testing Mnemonic Derivation

Use well-known test vectors to verify correctness:

```
Mnemonic: abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about
Ethereum (m/44'/60'/0'/0/0): 0x9858EfFD232B4033E47d90003D41EC34EcaEda94
Bitcoin Legacy (m/44'/0'/0'/0/0): 1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA
```

## License

MIT License - See LICENSE file for details

## Disclaimer

This software is provided "as is" without warranty of any kind. The authors are not responsible for any loss of funds or security breaches resulting from the use of this tool. **Use at your own risk.**

For production use, always verify addresses and test with small amounts first.

## Contributing

Contributions are welcome! Please ensure:
- All tests pass
- Code follows TypeScript best practices
- Security considerations are documented
- No external network dependencies are introduced

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the code comments

---

**Remember: Never share your private keys or mnemonic phrase with anyone!**
