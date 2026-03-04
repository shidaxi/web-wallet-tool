export type WordCount = 12 | 15 | 18 | 21 | 24;

export type Language = 'en' | 'zh';

export interface MnemonicConfig {
  wordCount: WordCount;
  language: Language;
  passphrase: string;
}

export interface MnemonicValidation {
  isValid: boolean;
  errorMessage?: string;
}
