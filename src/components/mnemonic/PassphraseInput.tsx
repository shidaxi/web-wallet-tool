import { Form } from 'react-bootstrap';
import { Key } from 'lucide-react';

interface PassphraseInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PassphraseInput({ value, onChange }: PassphraseInputProps) {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="d-flex align-items-center gap-2">
        <Key size={16} className="text-muted" />
        <span>BIP39 Passphrase (25th word - optional)</span>
      </Form.Label>
      <Form.Control
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Leave empty for no passphrase"
        autoComplete="off"
        data-lpignore="true"
      />
      <Form.Text className="text-muted">
        Optional passphrase for additional security (BIP39 extension)
      </Form.Text>
    </Form.Group>
  );
}
