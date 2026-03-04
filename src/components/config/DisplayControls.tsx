import { Form } from 'react-bootstrap';

interface DisplayControlsProps {
  startIndex: number;
  count: number;
  onStartIndexChange: (index: number) => void;
  onCountChange: (count: number) => void;
}

export function DisplayControls({
  startIndex,
  count,
  onStartIndexChange,
  onCountChange,
}: DisplayControlsProps) {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Start Index</Form.Label>
        <Form.Control
          type="number"
          min="0"
          max="999999"
          value={startIndex}
          onChange={(e) => onStartIndexChange(Math.max(0, parseInt(e.target.value) || 0))}
        />
        <Form.Text className="text-muted">
          First address index to derive
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Display Count</Form.Label>
        <Form.Control
          type="number"
          min="1"
          max="50"
          value={count}
          onChange={(e) => onCountChange(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
        />
        <Form.Text className="text-muted">
          Number of addresses (1-50)
        </Form.Text>
      </Form.Group>
    </>
  );
}
