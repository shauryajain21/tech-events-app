'use client';

import { useState } from 'react';
import { Event } from '@/lib/types';
import SearchBar from '@/components/SearchBar';
import SearchSuggestions from '@/components/SearchSuggestions';
import EventGrid from '@/components/EventGrid';
import { useEventStore } from '@/store/eventStore';
import { Bookmark, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const SEARCH_SUGGESTIONS = [
  'AI Conference San Francisco',
  'NYC Tech Meetups December',
  'Web3 Events London',
  'Startup Workshop Berlin',
  'Hackathon Seattle',
  'Developer Meetup Austin',
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { savedEvents } = useEventStore();

  const fetchEvents = async (query: string) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/events?query=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data.events || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchEvents(query);
  };

  return (
    <main className="min-h-screen bg-[#f5f4f0] flex flex-col">
      {/* Saved Events Button - Top Right */}
      <div className="absolute top-6 right-6">
        <Link
          href="/saved"
          className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-100 rounded-lg transition-colors duration-200 shadow-sm"
        >
          <Bookmark className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-700 text-sm">
            Saved ({savedEvents.length})
          </span>
        </Link>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          {/* Title and Search */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <h1 className="text-5xl md:text-6xl font-bold text-[#2d5016] mb-3 inline-block">
                Tech Events
              </h1>
              <span className="ml-3 px-3 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded align-top">Beta</span>
            </div>

            <p className="text-gray-700 text-base mb-8">
              by <span className="font-semibold">linkup</span>
            </p>

            <div className="mb-6">
              <p className="text-left text-sm font-medium text-gray-700 mb-2 max-w-3xl mx-auto">
                Search for tech events
              </p>
              <SearchBar
                onSearch={handleSearch}
                placeholder=""
                initialValue={searchQuery}
                isLoading={loading}
              />
            </div>

            {/* Search Suggestions */}
            {!hasSearched && (
              <SearchSuggestions
                suggestions={SEARCH_SUGGESTIONS}
                onSuggestionClick={handleSearch}
              />
            )}
          </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-8">
            {/* Skeleton Cards */}
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded-full w-40"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-red-600 text-lg font-semibold mb-2">
              Error loading events
            </p>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => fetchEvents(searchQuery)}
              className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && hasSearched && events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-2xl font-bold text-gray-700 mb-2">
              No events found
            </p>
            <p className="text-gray-500 mb-6">
              Try a different search query
            </p>
          </div>
        )}

        {/* Event Grid */}
        {!loading && !error && events.length > 0 && (
          <EventGrid events={events} />
        )}
        </div>
      </div>
    </main>
  );
}
