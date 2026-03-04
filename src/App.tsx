import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Header } from './components/layout/Header';
import { MnemonicGenerator } from './components/mnemonic/MnemonicGenerator';
import { ConfigPanel } from './components/config/ConfigPanel';
import { WalletList } from './components/wallet/WalletList';
import { P2PNodeKey } from './components/p2p/P2PNodeKey';
import { useMnemonic } from './hooks/useMnemonic';
import { useWalletDerivation } from './hooks/useWalletDerivation';
import { useCopyFeedback } from './hooks/useCopyFeedback';
import { ChainType } from './lib/types/chain';
import { DEFAULT_HD_PATHS } from './lib/constants/hdpaths';

function App() {
  const mnemonic = useMnemonic();
  const { isCopied, copyToClipboard } = useCopyFeedback();

  // Wallet configuration state
  const [chain, setChain] = useState<ChainType>('ethereum');
  const [hdPath, setHDPath] = useState(DEFAULT_HD_PATHS.ethereum);
  const [startIndex, setStartIndex] = useState(0);
  const [count, setCount] = useState(5);

  // Update HD path when chain changes
  useEffect(() => {
    setHDPath(DEFAULT_HD_PATHS[chain]);
  }, [chain]);

  // Derive wallets
  const { wallets, isLoading, error } = useWalletDerivation({
    mnemonic: mnemonic.words,
    passphrase: mnemonic.passphrase,
    chain,
    hdPath,
    startIndex,
    count,
    enabled: mnemonic.isValid,
  });

  // Warn before closing if mnemonic exists
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (mnemonic.words.length > 0) {
        e.preventDefault();
        e.returnValue = 'Are you sure? All mnemonic and private keys will be lost.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [mnemonic.words]);

  return (
    <div className="min-vh-100">
      <Header />

      <Container className="py-4">
        <MnemonicGenerator mnemonic={mnemonic} />

        {mnemonic.isValid && (
          <>
            <ConfigPanel
              chain={chain}
              hdPath={hdPath}
              startIndex={startIndex}
              count={count}
              onChainChange={setChain}
              onHDPathChange={setHDPath}
              onStartIndexChange={setStartIndex}
              onCountChange={setCount}
            />

            <WalletList
              wallets={wallets}
              chain={chain}
              hdPath={hdPath}
              isLoading={isLoading}
              error={error}
              isCopied={isCopied}
              onCopy={copyToClipboard}
            />

            <P2PNodeKey />
          </>
        )}
      </Container>

      <footer className="border-top py-4 mt-5 bg-white">
        <Container>
          <div className="text-center">
            <p className="small text-muted mb-2">
              Open source tool for development and research purposes only.
            </p>
            <p className="small text-muted mb-2">
              This tool runs entirely in your browser. No data is sent to any server.
            </p>
            <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>
              Always verify addresses before sending funds.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
