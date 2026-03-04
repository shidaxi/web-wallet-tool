import { Alert } from 'react-bootstrap';
import { ShieldAlert } from 'lucide-react';

export function Header() {
  return (
    <header className="header-glass sticky-top">
      <div className="container py-4">
        <div className="text-center mb-4">
          <h1 className="display-5 fw-semibold text-dark mb-2">
            🔐 Multi-Chain Wallet Tool
          </h1>
          <p className="text-muted mb-0">
            A secure, offline-first tool for generating multi-chain cryptocurrency wallets
          </p>
        </div>

        <Alert variant="danger" className="d-flex align-items-start gap-3 mb-0">
          <ShieldAlert size={20} className="flex-shrink-0 mt-1" />
          <div className="small">
            <strong>Security Warning:</strong>{' '}
            This tool runs entirely in your browser. Never share your mnemonic or private keys.
            Close this page when done to clear all data. For development and research purposes only.
          </div>
        </Alert>
      </div>
    </header>
  );
}
