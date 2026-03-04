import Select from 'react-select';
import { useMemo } from 'react';
import { Language } from '../../lib/types/mnemonic';
import { getWordlist } from '../../lib/constants/wordlists';
import { getValidLastWords } from '../../lib/crypto/mnemonic';

interface WordCardProps {
  index: number;
  word: string;
  language: Language;
  onChange: (word: string) => void;
  allWords: string[];
  totalWordCount: number;
}

export function WordCard({ index, word, language, onChange, allWords, totalWordCount }: WordCardProps) {
  const allWordsKey = allWords.join(',');
  const isLastWord = index === totalWordCount - 1;

  const wordlist = useMemo(() => {
    if (isLastWord) {
      const previousWords = allWords.slice(0, -1);
      const allPreviousWordsFilled = previousWords.every(w => w && w.length > 0);

      if (allPreviousWordsFilled) {
        const validWords = getValidLastWords(previousWords, totalWordCount, language);
        return validWords.length > 0 ? validWords : getWordlist(language);
      }
    }

    return getWordlist(language);
  }, [isLastWord, allWordsKey, totalWordCount, language]);

  const options = useMemo(
    () => wordlist.map(w => ({ value: w, label: w })),
    [wordlist]
  );

  const selectedOption = word ? { value: word, label: word } : null;

  return (
    <div className="word-card">
      <div className={`word-number ${isLastWord ? 'last' : ''}`}>
        {index + 1}
      </div>
      <Select
        value={selectedOption}
        onChange={(option) => onChange(option?.value || '')}
        options={options}
        placeholder="Select..."
        isSearchable
        isClearable
        noOptionsMessage={() => isLastWord ? "Fill previous words first" : "No options"}
        className="word-select"
        classNamePrefix="word-select"
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: '#ffffff',
            borderColor: state.isFocused ? '#007aff' : (isLastWord ? '#ff9500' : '#d2d2d7'),
            borderWidth: '1.5px',
            borderRadius: '0.75rem',
            minHeight: '44px',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(0, 122, 255, 0.15)' : 'none',
            '&:hover': {
              borderColor: '#007aff',
            },
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: '#ffffff',
            borderRadius: '0.75rem',
            border: '1px solid #d2d2d7',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            marginTop: '4px',
          }),
          menuList: (base) => ({
            ...base,
            padding: '4px',
            maxHeight: '240px',
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#f5f5f7' : '#ffffff',
            color: state.isFocused ? '#1c1c1e' : '#3a3a3c',
            fontWeight: state.isSelected ? 600 : 400,
            borderRadius: '0.5rem',
            padding: '8px 12px',
            margin: '2px 0',
            cursor: 'pointer',
            fontFamily: 'SF Mono, Monaco, Consolas, monospace',
            fontSize: '13px',
            transition: 'background-color 0.15s ease',
          }),
          input: (base) => ({
            ...base,
            color: '#1c1c1e',
            fontFamily: 'SF Mono, Monaco, Consolas, monospace',
            fontSize: '14px',
          }),
          singleValue: (base) => ({
            ...base,
            color: '#1c1c1e',
            fontFamily: 'SF Mono, Monaco, Consolas, monospace',
            fontWeight: 500,
            fontSize: '14px',
          }),
          placeholder: (base) => ({
            ...base,
            color: '#86868b',
            fontSize: '14px',
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: '#86868b',
            padding: '6px',
            '&:hover': {
              color: '#007aff',
            },
          }),
          clearIndicator: (base) => ({
            ...base,
            color: '#86868b',
            padding: '6px',
            '&:hover': {
              color: '#ff3b30',
            },
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
        }}
      />
    </div>
  );
}
