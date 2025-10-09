'use client';

import { useEventStore } from '@/store/eventStore';
import { Calendar, MapPin, Clock, ExternalLink, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SavedEventsPage() {
  const { savedEvents, removeEvent, clearAllEvents } = useEventStore();

  return (
    <main className="min-h-screen bg-[#f5f4f0] p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-[#2d5016]" />
            </Link>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016]">
                Saved Events
              </h1>
            </div>
          </div>

          {savedEvents.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all saved events?')) {
                  clearAllEvents();
                }
              }}
              className="flex items-center space-x-2 bg-white hover:bg-gray-100 border-2 border-gray-900 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5 text-gray-800" />
              <span className="font-semibold text-gray-800">Clear All</span>
            </button>
          )}
        </div>

        <p className="text-gray-700 text-base">
          {savedEvents.length === 0
            ? 'No saved events yet. Start searching to save events!'
            : `You have ${savedEvents.length} saved event${savedEvents.length === 1 ? '' : 's'}`}
        </p>
      </header>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto">
        {savedEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-gray-200 p-8">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              No saved events yet
            </p>
            <p className="text-gray-600 mb-6">
              Go back and start searching to save events you&apos;re interested in!
            </p>
            <Link
              href="/"
              className="bg-[#2d5016] hover:bg-[#1f3910] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Discover Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Event Image */}
                {event.imageUrl && (
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.imageUrl})` }}
                  />
                )}

                {/* Event Content */}
                <div className="p-6">
                  {/* Event Type Badge */}
                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold mb-3">
                    {event.eventType}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {event.title}
                  </h3>

                  {/* Date & Time */}
                  <div className="flex items-start space-x-2 mb-3 text-gray-600">
                    <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      {event.time && (
                        <p className="text-sm flex items-center mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.time}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-center space-x-2 mb-4 text-gray-600">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{event.venue}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {event.url && (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 border-2 border-gray-900 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-full transition-colors duration-200 text-sm"
                      >
                        <span>Learn more</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      onClick={() => removeEvent(event.id)}
                      className="p-2 bg-white hover:bg-gray-100 border-2 border-gray-900 text-gray-800 rounded-lg transition-colors duration-200"
                      aria-label="Remove event"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
