import { Table, Spinner, Alert } from 'react-bootstrap';
import { Section } from '../layout/Section';
import { WalletRow } from './WalletRow';
import { ExportButton } from './ExportButton';
import { DerivedWallet } from '../../lib/types/wallet';
import { ChainType } from '../../lib/types/chain';

interface WalletListProps {
  wallets: DerivedWallet[];
  chain: ChainType;
  hdPath: string;
  isLoading: boolean;
  error: Error | null;
  isCopied: (id: string) => boolean;
  onCopy: (text: string, id: string) => void;
}

export function WalletList({
  wallets,
  chain,
  hdPath,
  isLoading,
  error,
  isCopied,
  onCopy,
}: WalletListProps) {
  return (
    <Section
      title="3. Derived Wallets"
      description="Generated wallet addresses and keys (click any field to copy)"
    >
      {isLoading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-3 mb-0">Deriving wallets...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger">
          <strong>Error:</strong> {error.message}
        </Alert>
      )}

      {!isLoading && !error && wallets.length === 0 && (
        <div className="text-center py-5 text-muted">
          Generate a mnemonic above to derive wallets
        </div>
      )}

      {!isLoading && !error && wallets.length > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="small text-muted">
              Showing {wallets.length} wallet{wallets.length !== 1 ? 's' : ''}
            </div>
            <ExportButton wallets={wallets} chain={chain} hdPath={hdPath} />
          </div>

          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: '60px' }}>#</th>
                  <th style={{ width: '180px' }}>HD Path</th>
                  <th>Address</th>
                  <th>Private Key</th>
                  <th>Public Key</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map((wallet) => (
                  <WalletRow
                    key={`${wallet.chain}-${wallet.index}`}
                    wallet={wallet}
                    isCopied={isCopied}
                    onCopy={onCopy}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </Section>
  );
}
