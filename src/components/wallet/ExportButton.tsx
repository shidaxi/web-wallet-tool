import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Download, AlertTriangle } from 'lucide-react';
import { DerivedWallet } from '../../lib/types/wallet';
import { ChainType } from '../../lib/types/chain';

interface ExportButtonProps {
  wallets: DerivedWallet[];
  chain: ChainType;
  hdPath: string;
}

export function ExportButton({ wallets, chain, hdPath }: ExportButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleExport = () => {
    const data = {
      chain,
      hdPath,
      wallets,
      exportedAt: new Date().toISOString(),
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `wallets-${chain}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowConfirm(false);
  };

  if (wallets.length === 0) return null;

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={() => setShowConfirm(true)}
        className="d-flex align-items-center gap-2"
      >
        <Download size={14} />
        Export JSON
      </Button>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            <AlertTriangle className="text-danger" size={24} />
            Export Private Keys?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            This will download a JSON file containing all private keys. Keep this file secure
            and never share it with anyone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleExport}>
            Export Anyway
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
