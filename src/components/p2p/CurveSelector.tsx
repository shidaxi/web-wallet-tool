import { Form } from 'react-bootstrap';
import { CurveType } from '../../lib/types/p2p';

interface CurveSelectorProps {
  value: CurveType;
  onChange: (curve: CurveType) => void;
}

export function CurveSelector({ value, onChange }: CurveSelectorProps) {
  return (
    <div>
      <Form.Label className="small text-muted">Curve Type</Form.Label>
      <div className="d-flex gap-4">
        <Form.Check
          type="radio"
          id="curve-ed25519"
          label="Ed25519"
          value="ed25519"
          checked={value === 'ed25519'}
          onChange={(e) => onChange(e.target.value as CurveType)}
        />
        <Form.Check
          type="radio"
          id="curve-secp256k1"
          label="Secp256k1"
          value="secp256k1"
          checked={value === 'secp256k1'}
          onChange={(e) => onChange(e.target.value as CurveType)}
        />
      </div>
    </div>
  );
}
