import { Form } from 'react-bootstrap';

interface PrivateKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PrivateKeyInput({ value, onChange }: PrivateKeyInputProps) {
  return (
    <div>
      <Form.Label className="small text-muted">
        Private Key (Hex)
      </Form.Label>
      <Form.Control
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="64-character hex string (without 0x prefix)"
        autoComplete="off"
        data-lpignore="true"
        className="font-monospace"
        style={{ fontSize: '0.875rem' }}
      />
      <Form.Text className="text-muted">
        Enter a private key from the wallet list above, or any Ed25519/Secp256k1 private key
      </Form.Text>
    </div>
  );
}
