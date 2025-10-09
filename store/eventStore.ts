import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Event } from '@/lib/types';

interface EventStore {
  savedEvents: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (eventId: string) => void;
  isEventSaved: (eventId: string) => boolean;
  clearAllEvents: () => void;
}

export const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      savedEvents: [],

      addEvent: (event: Event) => {
        const { savedEvents } = get();
        if (!savedEvents.find((e) => e.id === event.id)) {
          set({ savedEvents: [...savedEvents, event] });
        }
      },

      removeEvent: (eventId: string) => {
        set((state) => ({
          savedEvents: state.savedEvents.filter((e) => e.id !== eventId),
        }));
      },

      isEventSaved: (eventId: string) => {
        const { savedEvents } = get();
        return savedEvents.some((e) => e.id === eventId);
      },

      clearAllEvents: () => {
        set({ savedEvents: [] });
      },
    }),
    {
      name: 'event-storage',
    }
  )
);
