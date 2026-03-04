#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║            Multi-Chain Wallet Tool - Quick Start                 ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "Choose an option:"
echo ""
echo "  1. Start Development Server"
echo "  2. Build for Production"
echo "  3. Open Built Version in Browser"
echo "  4. Run TypeScript Check"
echo "  5. Show Project Info"
echo ""
echo -n "Enter choice (1-5): "
read choice

case $choice in
  1)
    echo ""
    echo "Starting development server..."
    npm run dev
    ;;
  2)
    echo ""
    echo "Building for production..."
    npm run build
    echo ""
    echo "✅ Build complete! Files are in dist/"
    ;;
  3)
    echo ""
    echo "Opening built version in browser..."
    if [ -f "dist/index.html" ]; then
      open dist/index.html || xdg-open dist/index.html || start dist/index.html
    else
      echo "❌ Build first with option 2"
    fi
    ;;
  4)
    echo ""
    echo "Running TypeScript check..."
    npx tsc --noEmit
    ;;
  5)
    echo ""
    echo "Project Information:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Name:        Multi-Chain Wallet Tool"
    echo "Version:     1.0.0"
    echo "Tech Stack:  React 18 + TypeScript + Vite + Tailwind"
    echo "Chains:      Ethereum, Solana, Sui, Aptos, Bitcoin, Cosmos"
    echo "Features:    BIP39 Mnemonic + HD Wallet + P2P Keys"
    echo "Security:    100% Offline, Zero Network Requests"
    echo ""
    echo "Documentation:"
    echo "  - README.md          Full documentation"
    echo "  - QUICKSTART.md      Quick start guide"
    echo "  - VERIFICATION.md    Implementation checklist"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    ;;
  *)
    echo "Invalid choice"
    ;;
esac
