import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  id: string;
  isCopied: boolean;
  onCopy: (text: string, id: string) => void;
}

export function CopyButton({ text, id, isCopied, onCopy }: CopyButtonProps) {
  return (
    <button
      onClick={() => onCopy(text, id)}
      className="p-2 hover:bg-apple-gray-100 rounded-lg transition-all active:scale-95"
      title="Copy to clipboard"
    >
      {isCopied ? (
        <Check className="w-4 h-4 text-apple-green" />
      ) : (
        <Copy className="w-4 h-4 text-apple-gray-500 hover:text-apple-blue" />
      )}
    </button>
  );
}
