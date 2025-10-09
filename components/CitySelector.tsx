'use client';

import { City } from '@/lib/types';
import { MapPin } from 'lucide-react';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const POPULAR_CITIES: City[] = [
  { name: 'San Francisco', country: 'USA' },
  { name: 'New York', country: 'USA' },
  { name: 'London', country: 'UK' },
  { name: 'Berlin', country: 'Germany' },
  { name: 'Tokyo', country: 'Japan' },
  { name: 'Singapore', country: 'Singapore' },
  { name: 'Austin', country: 'USA' },
  { name: 'Seattle', country: 'USA' },
  { name: 'Toronto', country: 'Canada' },
  { name: 'Amsterdam', country: 'Netherlands' },
  { name: 'Tel Aviv', country: 'Israel' },
  { name: 'Bangalore', country: 'India' },
];

export default function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  return (
    <div className="w-full max-w-md">
      <label htmlFor="city-select" className="flex items-center space-x-2 mb-2 text-gray-700 dark:text-gray-200 font-medium">
        <MapPin className="w-5 h-5" />
        <span>Select City</span>
      </label>
      <select
        id="city-select"
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-gray-100"
      >
        {POPULAR_CITIES.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}, {city.country}
          </option>
        ))}
      </select>
    </div>
  );
}
