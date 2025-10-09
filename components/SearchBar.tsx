'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, placeholder = "Search for tech events...", initialValue = "", isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-5 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-14 pr-32 py-4 text-base border-2 border-gray-900 rounded-full focus:outline-none focus:border-gray-900 bg-white transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="absolute right-2 px-8 py-3 bg-[#2d5016] hover:bg-[#1f3910] text-white font-semibold rounded-full transition-colors duration-200 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}
