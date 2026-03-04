import { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { DerivedWallet } from '../../lib/types/wallet';
import { PrivateKeyField } from './PrivateKeyField';

interface WalletRowProps {
  wallet: DerivedWallet;
  isCopied: (id: string) => boolean;
  onCopy: (text: string, id: string) => void;
}

export function WalletRow({ wallet, isCopied, onCopy }: WalletRowProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <tr className="align-middle">
      <td className="text-center">
        <code className="small">{wallet.index}</code>
      </td>
      <td>
        <code className="small text-truncate d-block" style={{ maxWidth: '200px' }} title={wallet.hdPath}>
          {wallet.hdPath}
        </code>
      </td>
      <td>
        <div
          onClick={() => handleCopy(wallet.address, 'address')}
          className="position-relative"
          style={{ cursor: 'pointer' }}
        >
          <code className="small text-truncate d-block" style={{ maxWidth: '300px' }} title={wallet.address}>
            {wallet.address}
          </code>
          {copiedField === 'address' && (
            <Badge bg="success" className="position-absolute top-0 end-0 small">
              Copied!
            </Badge>
          )}
        </div>
      </td>
      <td>
        <PrivateKeyField
          privateKey={wallet.privateKey}
          id={`privkey-${wallet.chain}-${wallet.index}`}
          isCopied={isCopied(`privkey-${wallet.chain}-${wallet.index}`)}
          onCopy={onCopy}
          onDirectCopy={handleCopy}
          copiedField={copiedField}
        />
      </td>
      <td>
        <div
          onClick={() => handleCopy(wallet.publicKey, 'publicKey')}
          className="position-relative"
          style={{ cursor: 'pointer' }}
        >
          <code className="small text-truncate d-block" style={{ maxWidth: '200px' }} title={wallet.publicKey}>
            {wallet.publicKey}
          </code>
          {copiedField === 'publicKey' && (
            <Badge bg="success" className="position-absolute top-0 end-0 small">
              Copied!
            </Badge>
          )}
        </div>
      </td>
    </tr>
  );
}
