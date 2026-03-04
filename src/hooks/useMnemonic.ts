import { useState, useCallback, useEffect } from 'react';
import { Language, WordCount } from '../lib/types/mnemonic';
import { generateMnemonic, validateMnemonic, getValidLastWords } from '../lib/crypto/mnemonic';

export interface UseMnemonicReturn {
  words: string[];
  wordCount: WordCount;
  language: Language;
  passphrase: string;
  isValid: boolean;
  setWordCount: (count: WordCount) => void;
  setLanguage: (lang: Language) => void;
  setPassphrase: (pass: string) => void;
  generate: () => void;
  updateWord: (index: number, word: string) => void;
  importMnemonic: (text: string) => void;
  clear: () => void;
}

export function useMnemonic(): UseMnemonicReturn {
  const [words, setWords] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState<WordCount>(12);
  const [language, setLanguage] = useState<Language>('en');
  const [passphrase, setPassphrase] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Validate mnemonic whenever words or language changes
  useEffect(() => {
    if (words.length === 0) {
      setIsValid(false);
      return;
    }

    const valid = validateMnemonic(words, language);
    setIsValid(valid);
  }, [words, language]);

  // Generate new mnemonic
  const generate = useCallback(() => {
    const newWords = generateMnemonic(wordCount, language);
    setWords(newWords);
  }, [wordCount, language]);

  // Update a single word
  const updateWord = useCallback((index: number, word: string) => {
    setWords(prev => {
      const newWords = [...prev];
      newWords[index] = word;

      // If changing a non-last word and we have a full set of words
      if (index < wordCount - 1 && newWords.length === wordCount) {
        // Get valid last words based on the new state
        const previousWords = newWords.slice(0, -1);
        const allPreviousWordsFilled = previousWords.every(w => w && w.length > 0);

        if (allPreviousWordsFilled) {
          const validLastWords = getValidLastWords(previousWords, wordCount, language);
          if (validLastWords.length > 0) {
            newWords[wordCount - 1] = validLastWords[0];
          }
        }
      }

      return newWords;
    });
  }, [wordCount, language]);

  // Import mnemonic from text (space or newline separated)
  const importMnemonic = useCallback((text: string) => {
    const imported = text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0);

    setWords(imported);

    // Update word count to match imported length
    const length = imported.length as WordCount;
    if ([12, 15, 18, 21, 24].includes(length)) {
      setWordCount(length);
    }
  }, []);

  // Clear all
  const clear = useCallback(() => {
    setWords([]);
    setPassphrase('');
    setIsValid(false);
  }, []);

  return {
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
    importMnemonic,
    clear,
  };
}
