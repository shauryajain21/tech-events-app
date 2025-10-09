export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  venue: string;
  description: string;
  url?: string;
  eventType: 'Meetup' | 'Conference' | 'Workshop' | 'Hackathon' | 'Other';
  city: string;
  imageUrl?: string;
}

export interface EventFilters {
  dateRange: 'This week' | 'This month' | 'Next month' | 'All';
  eventType: 'All' | 'Meetup' | 'Conference' | 'Workshop' | 'Hackathon';
}

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

export interface City {
  name: string;
  country: string;
}
