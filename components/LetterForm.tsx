
import React from 'react';
import type { LetterFormProps, Tone } from '../types';
import { tones } from '../types';

const InputField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; }> = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition"
    />
  </div>
);

const ToneSelector: React.FC<{ selectedTone: Tone; onToneChange: (tone: Tone) => void; }> = ({ selectedTone, onToneChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">Tone</label>
    <div className="flex flex-wrap gap-2">
      {tones.map((tone) => (
        <button
          key={tone}
          type="button"
          onClick={() => onToneChange(tone)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white
            ${selectedTone === tone
              ? 'bg-white text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          aria-pressed={selectedTone === tone}
        >
          {tone}
        </button>
      ))}
    </div>
  </div>
);


const LetterForm: React.FC<LetterFormProps> = ({
  recipient,
  setRecipient,
  signature,
  setSignature,
  complaint,
  setComplaint,
  tone,
  setTone,
  onGenerate,
  isLoading,
}) => {
  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value);
  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => setSignature(e.target.value);
  const handleComplaintChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComplaint(e.target.value);

  return (
    <div className="bg-black p-6 rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InputField
          label="Recipient"
          value={recipient}
          onChange={handleRecipientChange}
          placeholder="e.g., The Curators of the Void"
        />
        <InputField
          label="Signed By"
          value={signature}
          onChange={handleSignatureChange}
          placeholder="e.g., The Collective for Aesthetic Purity"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-1">The Grievance</label>
        <textarea
          value={complaint}
          onChange={handleComplaintChange}
          placeholder="e.g., The hexadecimal color codes lack emotional depth..."
          rows={3}
          className="block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition"
        />
      </div>
      <div className="mb-6">
        <ToneSelector selectedTone={tone} onToneChange={setTone} />
      </div>
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Brewing Artistic Discontent...
          </>
        ) : (
          'Generate Open Letter'
        )}
      </button>
    </div>
  );
};

export default LetterForm;
