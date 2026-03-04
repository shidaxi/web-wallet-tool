import { Button, Form, Row, Col } from 'react-bootstrap';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Language, WordCount } from '../../lib/types/mnemonic';
import { WORD_COUNT_OPTIONS, LANGUAGE_OPTIONS } from '../../lib/constants/wordlists';

interface MnemonicControlsProps {
  wordCount: WordCount;
  language: Language;
  onWordCountChange: (count: WordCount) => void;
  onLanguageChange: (lang: Language) => void;
  onGenerate: () => void;
  mnemonic: string[];
}

export function MnemonicControls({
  wordCount,
  language,
  onWordCountChange,
  onLanguageChange,
  onGenerate,
  mnemonic,
}: MnemonicControlsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyMnemonic = async () => {
    if (mnemonic.length > 0) {
      await navigator.clipboard.writeText(mnemonic.join(' '));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <Row className="g-3 align-items-end mb-4">
      <Col xs="auto">
        <Form.Label className="mb-1 small">Word Count</Form.Label>
        <Form.Select
          value={wordCount}
          onChange={(e) => onWordCountChange(Number(e.target.value) as WordCount)}
          className="form-select-sm"
          style={{ width: 'auto' }}
        >
          {WORD_COUNT_OPTIONS.map(count => (
            <option key={count} value={count}>{count} words</option>
          ))}
        </Form.Select>
      </Col>

      <Col xs="auto">
        <Form.Label className="mb-1 small">Language</Form.Label>
        <Form.Select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="form-select-sm"
          style={{ width: 'auto' }}
        >
          {LANGUAGE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </Form.Select>
      </Col>

      <Col xs="auto">
        <Button variant="primary" onClick={onGenerate} className="d-flex align-items-center gap-2">
          <RefreshCw size={16} />
          Generate
        </Button>
      </Col>

      {mnemonic.length > 0 && (
        <Col xs="auto">
          <Button
            variant={copied ? 'success' : 'outline-primary'}
            onClick={handleCopyMnemonic}
            className="d-flex align-items-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </Col>
      )}
    </Row>
  );
}
