import { Row, Col } from 'react-bootstrap';
import { Section } from '../layout/Section';
import { MnemonicControls } from './MnemonicControls';
import { WordCard } from './WordCard';
import { PassphraseInput } from './PassphraseInput';
import { ValidityIndicator } from './ValidityIndicator';
import { UseMnemonicReturn } from '../../hooks/useMnemonic';

interface MnemonicGeneratorProps {
  mnemonic: UseMnemonicReturn;
}

export function MnemonicGenerator({ mnemonic }: MnemonicGeneratorProps) {
  const {
    words,
    wordCount,
    language,
    passphrase,
    isValid,
    setWordCount,
    setLanguage,
    setPassphrase,
    generate,
    updateWord,
  } = mnemonic;

  return (
    <Section
      title="1. Mnemonic Generator"
      description="Generate or edit BIP39 mnemonic phrase (seed phrase)"
    >
      <MnemonicControls
        wordCount={wordCount}
        language={language}
        onWordCountChange={setWordCount}
        onLanguageChange={setLanguage}
        onGenerate={generate}
        mnemonic={words}
      />

      {words.length > 0 && (
        <>
          <Row className="g-3 mb-4">
            {words.map((word, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2}>
                <WordCard
                  index={index}
                  word={word}
                  language={language}
                  onChange={(newWord) => updateWord(index, newWord)}
                  allWords={words}
                  totalWordCount={wordCount}
                />
              </Col>
            ))}
          </Row>

          <PassphraseInput value={passphrase} onChange={setPassphrase} />

          <ValidityIndicator isValid={isValid} wordCount={words.length} />
        </>
      )}
    </Section>
  );
}
