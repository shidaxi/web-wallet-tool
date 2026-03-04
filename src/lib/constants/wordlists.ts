import { wordlist as englishWordlist } from '@scure/bip39/wordlists/english.js';
import { wordlist as chineseWordlist } from '@scure/bip39/wordlists/simplified-chinese.js';
import { Language } from '../types/mnemonic';

export const WORDLISTS: Record<Language, string[]> = {
  en: englishWordlist,
  zh: chineseWordlist,
};

export function getWordlist(language: Language): string[] {
  return WORDLISTS[language];
}

export const WORD_COUNT_OPTIONS = [12, 15, 18, 21, 24] as const;

export const LANGUAGE_OPTIONS = [
  { value: 'en' as const, label: 'English' },
  { value: 'zh' as const, label: '简体中文' },
] as const;
