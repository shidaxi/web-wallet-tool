import { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';

interface PrivateKeyFieldProps {
  privateKey: string;
  id: string;
  isCopied: boolean;
  onCopy: (text: string, id: string) => void;
  onDirectCopy: (text: string, field: string) => void;
  copiedField: string | null;
}

export function PrivateKeyField({ privateKey, onDirectCopy, copiedField }: PrivateKeyFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="d-flex align-items-center gap-2 position-relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(!isVisible);
        }}
        className="btn btn-sm btn-outline-secondary p-1"
        title={isVisible ? 'Hide' : 'Show'}
        style={{ minWidth: '32px' }}
      >
        {isVisible ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
      <div
        onClick={() => onDirectCopy(privateKey, 'privateKey')}
        className="flex-grow-1"
        style={{ cursor: 'pointer' }}
      >
        <code
          className={`small text-truncate d-block ${isVisible ? '' : 'blur-sensitive'}`}
          style={{ maxWidth: '250px' }}
          title={privateKey}
        >
          {privateKey}
        </code>
      </div>
      {copiedField === 'privateKey' && (
        <Badge bg="success" className="position-absolute top-0 end-0 small">
          Copied!
        </Badge>
      )}
    </div>
  );
}
