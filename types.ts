
export type Tone = 'Serious & Formal' | 'Slightly Unhinged' | 'Passive-Aggressive' | 'World-Weary & Cynical';

export const tones: Tone[] = ['Serious & Formal', 'Slightly Unhinged', 'Passive-Aggressive', 'World-Weary & Cynical'];

export interface LetterFormProps {
  recipient: string;
  setRecipient: (value: string) => void;
  signature: string;
  setSignature: (value: string) => void;
  complaint: string;
  setComplaint: (value: string) => void;
  tone: Tone;
  setTone: (value: Tone) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export interface LetterDisplayProps {
  letter: string;
  isLoading: boolean;
  error: string | null;
}
