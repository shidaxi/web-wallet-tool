import { Row, Col } from 'react-bootstrap';
import { Section } from '../layout/Section';
import { ChainSelector } from './ChainSelector';
import { HDPathInput } from './HDPathInput';
import { DisplayControls } from './DisplayControls';
import { ChainType } from '../../lib/types/chain';

interface ConfigPanelProps {
  chain: ChainType;
  hdPath: string;
  startIndex: number;
  count: number;
  onChainChange: (chain: ChainType) => void;
  onHDPathChange: (path: string) => void;
  onStartIndexChange: (index: number) => void;
  onCountChange: (count: number) => void;
}

export function ConfigPanel({
  chain,
  hdPath,
  startIndex,
  count,
  onChainChange,
  onHDPathChange,
  onStartIndexChange,
  onCountChange,
}: ConfigPanelProps) {
  return (
    <Section
      title="2. Wallet Configuration"
      description="Select blockchain and derivation parameters"
    >
      <Row>
        <Col md={4}>
          <ChainSelector value={chain} onChange={onChainChange} />
        </Col>
        <Col md={4}>
          <HDPathInput chain={chain} value={hdPath} onChange={onHDPathChange} />
        </Col>
        <Col md={4}>
          <DisplayControls
            startIndex={startIndex}
            count={count}
            onStartIndexChange={onStartIndexChange}
            onCountChange={onCountChange}
          />
        </Col>
      </Row>
    </Section>
  );
}
