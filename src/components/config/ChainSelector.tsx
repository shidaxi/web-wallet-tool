import { Form } from 'react-bootstrap';
import { ChainType } from '../../lib/types/chain';
import { CHAIN_LIST } from '../../lib/constants/chains';

interface ChainSelectorProps {
  value: ChainType;
  onChange: (chain: ChainType) => void;
}

export function ChainSelector({ value, onChange }: ChainSelectorProps) {
  const selectedChain = CHAIN_LIST.find(c => c.id === value);

  return (
    <Form.Group className="mb-3">
      <Form.Label>Blockchain</Form.Label>
      <Form.Select
        value={value}
        onChange={(e) => onChange(e.target.value as ChainType)}
      >
        {CHAIN_LIST.map(chain => (
          <option key={chain.id} value={chain.id}>
            {chain.icon} {chain.name}
          </option>
        ))}
      </Form.Select>
      {selectedChain?.description && (
        <Form.Text className="text-muted">
          {selectedChain.description}
        </Form.Text>
      )}
    </Form.Group>
  );
}
