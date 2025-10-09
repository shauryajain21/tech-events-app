'use client';

import { EventFilters as Filters } from '@/lib/types';
import { Calendar, Filter } from 'lucide-react';

interface EventFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export default function EventFilters({ filters, onFilterChange }: EventFiltersProps) {
  return (
    <div className="w-full max-w-md space-y-4">
      {/* Date Range Filter */}
      <div>
        <label htmlFor="date-range" className="flex items-center space-x-2 mb-2 text-gray-700 dark:text-gray-200 font-medium">
          <Calendar className="w-5 h-5" />
          <span>Date Range</span>
        </label>
        <select
          id="date-range"
          value={filters.dateRange}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              dateRange: e.target.value as Filters['dateRange'],
            })
          }
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-gray-100"
        >
          <option value="This week">This week</option>
          <option value="This month">This month</option>
          <option value="Next month">Next month</option>
          <option value="All">All</option>
        </select>
      </div>

      {/* Event Type Filter */}
      <div>
        <label htmlFor="event-type" className="flex items-center space-x-2 mb-2 text-gray-700 dark:text-gray-200 font-medium">
          <Filter className="w-5 h-5" />
          <span>Event Type</span>
        </label>
        <select
          id="event-type"
          value={filters.eventType}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              eventType: e.target.value as Filters['eventType'],
            })
          }
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-gray-100"
        >
          <option value="All">All Types</option>
          <option value="Meetup">Meetup</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Hackathon">Hackathon</option>
        </select>
      </div>
    </div>
  );
}
