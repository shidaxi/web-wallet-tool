# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

### 3. Build for Offline Use
```bash
npm run build
```

The `dist/index.html` file can be opened directly in any browser without a server.

## 📖 Basic Usage

### Generate a Wallet

1. **Generate Mnemonic**
   - Select word count (12, 15, 18, 21, or 24 words)
   - Choose language (English or 简体中文)
   - Click "Generate"
   - (Optional) Add a BIP39 passphrase

2. **Configure Blockchain**
   - Select blockchain (Ethereum, Solana, Bitcoin, etc.)
   - Choose HD derivation path (use default or custom)
   - Set start index and display count

3. **View Wallets**
   - Addresses are automatically derived
   - Click eye icon to reveal private keys
   - Click copy buttons to copy to clipboard
   - Click "Export JSON" to download all wallets

### Calculate P2P Node Key

1. Scroll to "P2P Node Key Calculator" section
2. Enter a private key (hex format, 64 characters)
3. Select curve type (Ed25519 or Secp256k1)
4. Copy the generated PeerId

## 🔒 Security Checklist

- [ ] **Never share your mnemonic or private keys**
- [ ] **Only use on trusted computers**
- [ ] **Disconnect internet for maximum security**
- [ ] **Close browser tab when done**
- [ ] **Test with small amounts first**
- [ ] **Verify addresses before use**

## 💡 Tips

- **Edit Words**: Click any word card to search and select from BIP39 wordlist
- **Custom Paths**: Use preset paths or enter custom HD derivation paths
- **Multiple Chains**: Switch between chains without regenerating mnemonic
- **Bulk Derivation**: Generate up to 50 addresses at once

## 📦 What's Included

```
dist/
├── index.html                    # Main HTML file (2.73 kB CSS, 2.73 MB JS)
└── assets/
    ├── index-[hash].css          # Tailwind styles
    ├── index-[hash].js           # All application code + crypto libraries
    └── secp256k1-[hash].wasm     # Bitcoin cryptography (1.24 MB)
```

**Total bundle size**: ~4 MB (compressed ~580 kB with gzip)

## 🧪 Testing

Test with well-known mnemonic:

```
Mnemonic: abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about

Expected Results:
- Ethereum (m/44'/60'/0'/0/0):
  Address: 0x9858EfFD232B4033E47d90003D41EC34EcaEda94

- Bitcoin Legacy (m/44'/0'/0'/0/0):
  Address: 1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA

- Solana (m/44'/501'/0'/0'/0'):
  Address: 3TRtCVMxJ8c3m3woU7sS5VJQiQ5VxzMSKjkFR8sM8q7k (approx)
```

## 🐛 Troubleshooting

### Build Errors

**Error**: "Cannot find module '@scure/bip39/wordlists/english'"
- **Fix**: Make sure to use `.js` extension: `'@scure/bip39/wordlists/english.js'`

**Error**: "WASM module not supported"
- **Fix**: Install `vite-plugin-wasm` and `vite-plugin-top-level-await`

**Error**: "Tailwind PostCSS plugin"
- **Fix**: Use `@tailwindcss/postcss` instead of `tailwindcss` in `postcss.config.js`

### Runtime Errors

**Issue**: Wallets not deriving
- Check mnemonic is valid (green checkmark)
- Check HD path format is correct (starts with `m/`)
- Open browser console for error messages

**Issue**: Can't copy to clipboard
- Check browser permissions
- Try clicking the copy button again
- Some browsers block clipboard in insecure contexts (use HTTPS or localhost)

## 📚 Learn More

- [BIP39 Specification](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP32 HD Wallets](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [BIP44 Multi-Account](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [Ethereum HD Paths](https://eips.ethereum.org/EIPS/eip-2334)
- [Solana HD Paths](https://docs.solana.com/wallet-guide/paper-wallet#seed-phrase-generation)

## 🤝 Need Help?

1. Check README.md for detailed documentation
2. Search existing GitHub issues
3. Create a new issue with:
   - Browser version
   - Steps to reproduce
   - Error messages (if any)

---

**⚠️ Remember: This tool is for development and research. Never use it with funds you can't afford to lose!**
