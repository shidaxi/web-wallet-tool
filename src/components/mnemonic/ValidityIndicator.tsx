import { Alert } from 'react-bootstrap';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ValidityIndicatorProps {
  isValid: boolean;
  wordCount: number;
}

export function ValidityIndicator({ isValid, wordCount }: ValidityIndicatorProps) {
  if (wordCount === 0) return null;

  return (
    <Alert variant={isValid ? 'success' : 'danger'} className="d-flex align-items-center gap-3 mb-0">
      {isValid ? (
        <>
          <CheckCircle2 size={20} />
          <strong>Valid BIP39 Mnemonic ✓</strong>
        </>
      ) : (
        <>
          <XCircle size={20} />
          <strong>Invalid Mnemonic</strong>
        </>
      )}
    </Alert>
  );
}
