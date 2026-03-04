import { useState } from 'react';
import { Badge, Spinner, Alert } from 'react-bootstrap';
import { P2PNodeInfo } from '../../lib/types/p2p';

interface PeerIdOutputProps {
  result: P2PNodeInfo | null;
  isLoading: boolean;
  error: Error | null;
}

export function PeerIdOutput({ result, isLoading, error }: PeerIdOutputProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };
  if (isLoading) {
    return (
      <div className="text-center py-3">
        <Spinner animation="border" size="sm" variant="primary" />
        <p className="text-muted mt-2 mb-0 small">Calculating PeerId...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mb-0">
        <strong>Error:</strong> {error.message}
      </Alert>
    );
  }

  if (!result) {
    return (
      <div className="text-muted small fst-italic">
        Enter a valid private key above to calculate the libp2p PeerId
      </div>
    );
  }

  return (
    <div className="vstack gap-3">
      <div>
        <label className="form-label small text-muted mb-1">Peer ID</label>
        <div
          onClick={() => handleCopy(result.peerId, 'peerId')}
          className="position-relative border border-success rounded px-3 py-2"
          style={{ cursor: 'pointer' }}
        >
          <code className="small text-success d-block" style={{ wordBreak: 'break-all' }}>
            {result.peerId}
          </code>
          {copiedField === 'peerId' && (
            <Badge bg="success" className="position-absolute top-0 end-0 small">
              Copied!
            </Badge>
          )}
        </div>
      </div>

      <div>
        <label className="form-label small text-muted mb-1">Public Key (Hex)</label>
        <div
          onClick={() => handleCopy(result.publicKeyHex, 'publicKey')}
          className="position-relative border rounded px-3 py-2"
          style={{ cursor: 'pointer' }}
        >
          <code className="small d-block" style={{ wordBreak: 'break-all' }}>
            {result.publicKeyHex}
          </code>
          {copiedField === 'publicKey' && (
            <Badge bg="success" className="position-absolute top-0 end-0 small">
              Copied!
            </Badge>
          )}
        </div>
      </div>

      <div>
        <label className="form-label small text-muted mb-1">Multihash (Hex)</label>
        <div
          onClick={() => handleCopy(result.multihash, 'multihash')}
          className="position-relative border rounded px-3 py-2"
          style={{ cursor: 'pointer' }}
        >
          <code className="small d-block" style={{ wordBreak: 'break-all' }}>
            {result.multihash}
          </code>
          {copiedField === 'multihash' && (
            <Badge bg="success" className="position-absolute top-0 end-0 small">
              Copied!
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
