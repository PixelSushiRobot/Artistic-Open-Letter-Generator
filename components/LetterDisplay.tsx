
import React from 'react';
import type { LetterDisplayProps } from '../types';

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
    <div className="h-4 bg-gray-800 rounded w-full"></div>
    <div className="h-4 bg-gray-800 rounded w-full"></div>
    <div className="h-4 bg-gray-800 rounded w-5/6"></div>
    <div className="h-4 bg-gray-800 rounded w-1/2 mt-6"></div>
    <div className="space-y-3 pt-4">
      <div className="h-4 bg-gray-800 rounded w-full"></div>
      <div className="h-4 bg-gray-800 rounded w-full"></div>
    </div>
    <div className="h-4 bg-gray-800 rounded w-1/3 ml-auto mt-6"></div>
    <div className="h-4 bg-gray-800 rounded w-1/4 ml-auto"></div>
  </div>
);

const LetterDisplay: React.FC<LetterDisplayProps> = ({ letter, isLoading, error }) => {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 sm:p-8 min-h-[300px]">
      {isLoading && <LoadingSkeleton />}
      {error && <p className="text-red-400 text-center">{error}</p>}
      {!isLoading && !error && !letter && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 italic">Your magnificent complaint will appear here.</p>
        </div>
      )}
      {letter && (
        <div className="prose prose-invert prose-lg max-w-none font-serif text-gray-300 whitespace-pre-wrap">
          {letter}
        </div>
      )}
    </div>
  );
};

export default LetterDisplay;
