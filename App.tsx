
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import LetterForm from './components/LetterForm';
import LetterDisplay from './components/LetterDisplay';
import Footer from './components/Footer';
import { generateLetter } from './services/geminiService';
import type { Tone, LetterLength } from './types';

const App: React.FC = () => {
  const [recipient, setRecipient] = useState<string>('the pfp collection');
  const [signature, setSignature] = useState<string>('the artistic community');
  const [complaint, setComplaint] = useState<string>('this tezos pfp art bad');
  const [tone, setTone] = useState<Tone>('Serious & Formal');
  const [letterLength, setLetterLength] = useState<LetterLength>('Medium');
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!recipient || !signature || !complaint) {
      setError('Please provide a recipient, a signature, and something to complain about.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedLetter('');

    try {
      const letter = await generateLetter(recipient, signature, complaint, tone, letterLength);
      setGeneratedLetter(letter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [recipient, signature, complaint, tone, letterLength]);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col font-bold">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <Header />
          <LetterForm
            recipient={recipient}
            setRecipient={setRecipient}
            signature={signature}
            setSignature={setSignature}
            complaint={complaint}
            setComplaint={setComplaint}
            tone={tone}
            setTone={setTone}
            letterLength={letterLength}
            setLetterLength={setLetterLength}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <LetterDisplay
            letter={generatedLetter}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;