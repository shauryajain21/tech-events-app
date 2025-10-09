'use client';

import { Event } from '@/lib/types';
import EventGridCard from './EventGridCard';

interface EventGridProps {
  events: Event[];
}

export default function EventGrid({ events }: EventGridProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventGridCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
