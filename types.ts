
export type Tone = 'Serious & Formal' | 'Slightly Unhinged' | 'Passive-Aggressive' | 'World-Weary & Cynical';
export const tones: Tone[] = ['Serious & Formal', 'Slightly Unhinged', 'Passive-Aggressive', 'World-Weary & Cynical'];

export type LetterLength = 'Short' | 'Medium' | 'Long';
export const letterLengths: LetterLength[] = ['Short', 'Medium', 'Long'];

export interface LetterFormProps {
  recipient: string;
  setRecipient: (value: string) => void;
  signature: string;
  setSignature: (value: string) => void;
  complaint: string;
  setComplaint: (value: string) => void;
  tone: Tone;
  setTone: (value: Tone) => void;
  letterLength: LetterLength;
  setLetterLength: (value: LetterLength) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export interface LetterDisplayProps {
  letter: string;
  isLoading: boolean;
  error: string | null;
}