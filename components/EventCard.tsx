'use client';

import { Event } from '@/lib/types';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import ShareButton from './ShareButton';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="absolute w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl shadow-2xl overflow-hidden">
      {/* Background Image */}
      {event.imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${event.imageUrl})` }}
        />
      )}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 text-white">
        {/* Top Section */}
        <div>
          {/* Share Button */}
          <div className="flex justify-end mb-4">
            <ShareButton event={event} />
          </div>

          {/* Event Type Badge */}
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
            {event.eventType}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-4 leading-tight drop-shadow-lg">
            {event.title}
          </h2>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4">
          {/* Date & Time */}
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <Calendar className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">{new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              {event.time && (
                <p className="text-sm flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {event.time}
                </p>
              )}
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <MapPin className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{event.venue}</p>
          </div>

          {/* Description */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-sm line-clamp-3">{event.description}</p>
          </div>

          {/* More Info Button */}
          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <span>More Info</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
