'use client';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export default function SearchSuggestions({ suggestions, onSuggestionClick }: SearchSuggestionsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-4xl mx-auto">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
          className="px-5 py-2.5 bg-white border-2 border-gray-900 rounded-full text-sm text-gray-800 hover:bg-gray-50 transition-all duration-200"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
