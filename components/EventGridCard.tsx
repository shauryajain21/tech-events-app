'use client';

import { Event } from '@/lib/types';
import { Calendar, MapPin, Bookmark } from 'lucide-react';
import { useEventStore } from '@/store/eventStore';
import { useState } from 'react';

interface EventGridCardProps {
  event: Event;
}

export default function EventGridCard({ event }: EventGridCardProps) {
  const { addEvent, removeEvent, isEventSaved } = useEventStore();
  const [saved, setSaved] = useState(isEventSaved(event.id));

  const handleBookmark = () => {
    if (saved) {
      removeEvent(event.id);
      setSaved(false);
    } else {
      addEvent(event);
      setSaved(true);
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-900 p-6 hover:shadow-lg transition-shadow duration-200 relative">
      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label={saved ? "Remove bookmark" : "Bookmark event"}
      >
        <Bookmark
          className={`w-5 h-5 ${saved ? 'fill-green-600 text-green-600' : 'text-gray-400'}`}
        />
      </button>

      {/* Event Type Badge */}
      <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 mb-3">
        {event.eventType}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 pr-8">
        {event.title}
      </h3>

      {/* Date and Location */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>
            {new Date(event.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            {event.time && ` • ${event.time}`}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{event.venue}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {event.description}
      </p>

      {/* Learn More Button */}
      {event.url ? (
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 border-2 border-gray-900 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-50 transition-all duration-200"
        >
          Learn more
        </a>
      ) : (
        <button className="inline-block px-6 py-2 border-2 border-gray-300 rounded-full text-sm font-medium text-gray-400 cursor-not-allowed">
          No Link Available
        </button>
      )}
    </div>
  );
}
