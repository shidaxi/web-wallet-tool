import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ChainType } from '../../lib/types/chain';
import { HD_PATH_PRESETS } from '../../lib/constants/hdpaths';
import { isValidHDPath } from '../../lib/constants/hdpaths';

interface HDPathInputProps {
  chain: ChainType;
  value: string;
  onChange: (path: string) => void;
}

export function HDPathInput({ chain, value, onChange }: HDPathInputProps) {
  const [customMode, setCustomMode] = useState(false);
  const presets = HD_PATH_PRESETS[chain] || [];

  useEffect(() => {
    setCustomMode(false);
  }, [chain]);

  const handlePresetChange = (path: string) => {
    if (path === 'custom') {
      setCustomMode(true);
    } else {
      setCustomMode(false);
      onChange(path);
    }
  };

  const isValid = isValidHDPath(value);

  return (
    <Form.Group className="mb-3">
      <Form.Label>HD Derivation Path</Form.Label>

      {!customMode ? (
        <Form.Select
          value={value}
          onChange={(e) => handlePresetChange(e.target.value)}
          className="font-monospace"
        >
          {presets.map((preset) => (
            <option key={preset.path} value={preset.path}>
              {preset.label}: {preset.path}
            </option>
          ))}
          <option value="custom">Custom Path...</option>
        </Form.Select>
      ) : (
        <div>
          <Form.Control
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="m/44'/60'/0'/0"
            isInvalid={!isValid}
            className="font-monospace"
          />
          <Form.Control.Feedback type="invalid">
            Invalid HD path format
          </Form.Control.Feedback>
          <Button
            variant="link"
            size="sm"
            onClick={() => setCustomMode(false)}
            className="p-0 mt-1 text-decoration-none"
          >
            ← Back to presets
          </Button>
        </div>
      )}

      <Form.Text className="text-muted">
        {presets.find(p => p.path === value)?.description || 'Custom derivation path'}
      </Form.Text>
    </Form.Group>
  );
}
