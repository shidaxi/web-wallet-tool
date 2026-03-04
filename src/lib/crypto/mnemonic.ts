import { generateMnemonic as generateMnemonicScure, mnemonicToSeedSync, validateMnemonic as validateMnemonicScure } from '@scure/bip39';
import { getWordlist } from '../constants/wordlists';
import { Language, WordCount } from '../types/mnemonic';

/**
 * Generate a new BIP39 mnemonic
 */
export function generateMnemonic(wordCount: WordCount, language: Language): string[] {
  const wordlist = getWordlist(language);

  // Map word count to entropy strength (in bits)
  const strengthMap: Record<WordCount, number> = {
    12: 128,
    15: 160,
    18: 192,
    21: 224,
    24: 256,
  };

  const strength = strengthMap[wordCount];

  const mnemonic = generateMnemonicScure(wordlist, strength);
  return mnemonic.split(' ');
}

/**
 * Validate a mnemonic phrase
 */
export function validateMnemonic(words: string[], language: Language): boolean {
  const wordlist = getWordlist(language);
  const mnemonic = words.join(' ');

  try {
    return validateMnemonicScure(mnemonic, wordlist);
  } catch {
    return false;
  }
}

/**
 * Convert mnemonic to seed (512-bit)
 */
export function mnemonicToSeed(mnemonic: string, passphrase: string = ''): Buffer {
  const seed = mnemonicToSeedSync(mnemonic, passphrase);
  return Buffer.from(seed);
}

/**
 * Check if a word is in the BIP39 wordlist
 */
export function isValidWord(word: string, language: Language): boolean {
  const wordlist = getWordlist(language);
  return wordlist.includes(word);
}

/**
 * Get suggestions for partial word input
 */
export function getSuggestions(partial: string, language: Language, limit: number = 10): string[] {
  const wordlist = getWordlist(language);
  const lower = partial.toLowerCase();

  return wordlist
    .filter(word => word.toLowerCase().startsWith(lower))
    .slice(0, limit);
}

/**
 * Get valid last words that make the mnemonic valid
 * This filters the wordlist to only show words that would create a valid BIP39 mnemonic
 */
export function getValidLastWords(
  words: string[],
  wordCount: number,
  language: Language
): string[] {
  const wordlist = getWordlist(language);

  // If this isn't the last word position, return full wordlist
  if (words.length !== wordCount - 1) {
    return wordlist;
  }

  // Filter wordlist to only valid last words
  const validWords: string[] = [];

  for (const word of wordlist) {
    const testMnemonic = [...words, word];
    if (validateMnemonic(testMnemonic, language)) {
      validWords.push(word);
    }
  }

  return validWords.length > 0 ? validWords : wordlist;
}
