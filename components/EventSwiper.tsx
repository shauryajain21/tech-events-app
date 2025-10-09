'use client';

import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { Event, SwipeDirection } from '@/lib/types';
import { useEventStore } from '@/store/eventStore';
import EventCard from './EventCard';
import { Heart, X, RotateCcw } from 'lucide-react';

interface EventSwiperProps {
  events: Event[];
  onRefresh: () => void;
}

export default function EventSwiper({ events, onRefresh }: EventSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(events.length - 1);
  const [lastDirection, setLastDirection] = useState<SwipeDirection | undefined>();
  const currentIndexRef = useRef(currentIndex);
  const { addEvent } = useEventStore();

  const childRefs = useMemo(
    () =>
      Array(events.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    [events.length]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: SwipeDirection, event: Event, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    // If swiped right, save the event
    if (direction === 'right') {
      addEvent(event);
    }
  };

  const outOfFrame = (idx: number) => {
    console.log(`${events[idx].title} left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current >= idx && childRefs[idx].current) {
      childRefs[idx].current.restoreCard();
    }
  };

  const swipe = async (dir: SwipeDirection) => {
    if (canSwipe && currentIndex < events.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Card Container */}
      <div className="relative w-[90vw] max-w-[450px] h-[600px] mb-8">
        {events.map((event, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={event.id}
            onSwipe={(dir) => swiped(dir as SwipeDirection, event, index)}
            onCardLeftScreen={() => outOfFrame(index)}
            preventSwipe={['up', 'down']}
            className="absolute w-full h-full"
            swipeRequirementType="position"
            swipeThreshold={100}
          >
            <div
              className="relative w-full h-full transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${1 - (events.length - 1 - index) * 0.05}) translateY(${(events.length - 1 - index) * 10}px)`,
                zIndex: index,
              }}
            >
              <EventCard event={event} />
            </div>
          </TinderCard>
        ))}

        {/* No More Events */}
        {currentIndex < 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl">
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
              No more events!
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Check back later or try a different city
            </p>
            <button
              onClick={onRefresh}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Refresh Events</span>
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-8">
        <button
          onClick={() => swipe('left')}
          disabled={!canSwipe}
          className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Pass"
        >
          <X className="w-8 h-8 text-red-500" />
        </button>

        <button
          onClick={() => swipe('right')}
          disabled={!canSwipe}
          className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Save"
        >
          <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
        </button>
      </div>

      {/* Swipe Indicator */}
      {lastDirection && (
        <div className="absolute top-24 text-center">
          <p className="text-2xl font-bold text-white bg-black/50 px-6 py-3 rounded-full">
            {lastDirection === 'right' ? '❤️ Saved!' : '👎 Passed'}
          </p>
        </div>
      )}
    </div>
  );
}
