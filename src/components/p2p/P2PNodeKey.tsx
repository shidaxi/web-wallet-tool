import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Section } from '../layout/Section';
import { PrivateKeyInput } from './PrivateKeyInput';
import { CurveSelector } from './CurveSelector';
import { PeerIdOutput } from './PeerIdOutput';
import { CurveType } from '../../lib/types/p2p';
import { useP2PNode } from '../../hooks/useP2PNode';

export function P2PNodeKey() {
  const [privateKey, setPrivateKey] = useState('');
  const [curve, setCurve] = useState<CurveType>('ed25519');

  const { result, isLoading, error } = useP2PNode(privateKey, curve);

  return (
    <Section
      title="4. P2P Node Key Calculator"
      description="Calculate libp2p PeerId from private key"
    >
      <Row className="g-3 mb-4">
        <Col md={6}>
          <PrivateKeyInput value={privateKey} onChange={setPrivateKey} />
        </Col>
        <Col md={6}>
          <CurveSelector value={curve} onChange={setCurve} />
        </Col>
      </Row>

      <PeerIdOutput
        result={result}
        isLoading={isLoading}
        error={error}
      />
    </Section>
  );
}
