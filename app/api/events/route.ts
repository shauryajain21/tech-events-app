import { NextRequest, NextResponse } from 'next/server';
import { searchEvents, searchEventsWithQuery } from '@/lib/linkup';
import { Event } from '@/lib/types';

// Cache for storing event results (1 hour TTL)
const cache = new Map<string, { data: Event[]; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

function generateMockEvents(city: string): Event[] {
  const eventTypes: Event['eventType'][] = ['Meetup', 'Conference', 'Workshop', 'Hackathon'];
  const venues = [
    'Innovation Hub',
    'Tech Center',
    'Startup Campus',
    'Convention Center',
    'Community Space',
  ];

  return Array.from({ length: 10 }, (_, i) => ({
    id: `${city}-${Date.now()}-${i}`,
    title: `${city} Tech ${eventTypes[i % eventTypes.length]} #${i + 1}`,
    date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
    time: `${(i % 12) + 6}:00 PM`,
    venue: `${venues[i % venues.length]}, ${city}`,
    description: `Join us for an exciting ${eventTypes[i % eventTypes.length].toLowerCase()} featuring industry experts, networking opportunities, and hands-on sessions. Learn about the latest trends in technology and connect with fellow professionals.`,
    url: `https://example.com/events/${i}`,
    eventType: eventTypes[i % eventTypes.length],
    city,
    imageUrl: `https://source.unsplash.com/800x600/?technology,${eventTypes[i % eventTypes.length].toLowerCase()}`,
  }));
}

function parseEventsFromLinkup(linkupResponse: any, city: string): Event[] {
  try {
    const events: Event[] = [];

    // Extract from answer text and sources
    if (linkupResponse && linkupResponse.answer) {
      const answerText = linkupResponse.answer;
      const sources = linkupResponse.sources || [];

      // Parse sources for event URLs
      sources.forEach((source: any, index: number) => {
        const snippet = source.snippet || '';
        const url = source.url || '';
        const name = source.name || '';

        // Try to extract event information from the snippet
        const eventInfo = extractEventInfo(snippet, name, url, city, index);
        if (eventInfo) {
          events.push(eventInfo);
        }
      });

      // If we found events from sources, return them
      if (events.length > 0) {
        return events;
      }

      // Otherwise try to parse from the answer text
      const parsedEvents = parseEventsFromText(answerText, city);
      if (parsedEvents.length > 0) {
        return parsedEvents;
      }
    }

    // Fallback to mock events if parsing fails
    console.log('No events parsed from Linkup, using mock data');
    return generateMockEvents(city);
  } catch (error) {
    console.error('Error parsing Linkup response:', error);
    return generateMockEvents(city);
  }
}

function extractEventInfo(snippet: string, name: string, url: string, city: string, index: number): Event | null {
  try {
    // Common event type keywords
    const eventTypeMap: { [key: string]: Event['eventType'] } = {
      'meetup': 'Meetup',
      'conference': 'Conference',
      'workshop': 'Workshop',
      'hackathon': 'Hackathon',
      'summit': 'Conference',
      'networking': 'Meetup',
      'seminar': 'Workshop',
    };

    // Detect event type from text
    let eventType: Event['eventType'] = 'Other';
    for (const [keyword, type] of Object.entries(eventTypeMap)) {
      if (name.toLowerCase().includes(keyword) || snippet.toLowerCase().includes(keyword)) {
        eventType = type;
        break;
      }
    }

    // Try to extract date (common formats)
    const datePatterns = [
      /(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/,
      /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/i,
      /(\d{4}-\d{2}-\d{2})/,
    ];

    let date = new Date(Date.now() + index * 86400000).toISOString().split('T')[0];
    for (const pattern of datePatterns) {
      const match = snippet.match(pattern) || name.match(pattern);
      if (match) {
        const parsedDate = new Date(match[0]);
        if (!isNaN(parsedDate.getTime())) {
          date = parsedDate.toISOString().split('T')[0];
          break;
        }
      }
    }

    // Try to extract time
    const timePattern = /(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/i;
    const timeMatch = snippet.match(timePattern);
    const time = timeMatch ? timeMatch[0] : undefined;

    // Create event object
    return {
      id: `linkup-${city}-${index}-${Date.now()}`,
      title: name || `${city} Tech Event`,
      date,
      time,
      venue: city,
      description: snippet.substring(0, 200) + (snippet.length > 200 ? '...' : ''),
      url,
      eventType,
      city,
      imageUrl: `https://source.unsplash.com/800x600/?technology,${eventType.toLowerCase()}`,
    };
  } catch (error) {
    console.error('Error extracting event info:', error);
    return null;
  }
}

function parseEventsFromText(text: string, city: string): Event[] {
  const events: Event[] = [];

  // Split by common event delimiters
  const lines = text.split(/\n+/);

  lines.forEach((line, index) => {
    // Look for event-like patterns
    if (line.length > 20 && (
      line.toLowerCase().includes('event') ||
      line.toLowerCase().includes('meetup') ||
      line.toLowerCase().includes('conference') ||
      line.toLowerCase().includes('workshop') ||
      line.toLowerCase().includes('hackathon')
    )) {
      const event = extractEventInfo(line, line, '', city, index);
      if (event) {
        events.push(event);
      }
    }
  });

  return events;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || searchParams.get('city') || 'tech events';

    // Check cache first
    const cacheKey = query.toLowerCase();
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({ events: cached.data, cached: true });
    }

    // Fetch from Linkup with freeform query
    try {
      const linkupResponse = await searchEventsWithQuery(query);

      // Extract city from query for context (fallback to 'Global')
      const cityMatch = query.match(/(?:in|at|@)\s+([A-Za-z\s]+)/i);
      const city = cityMatch ? cityMatch[1].trim() : 'Global';

      const events = parseEventsFromLinkup(linkupResponse, city);

      // Cache the results
      cache.set(cacheKey, { data: events, timestamp: Date.now() });

      return NextResponse.json({ events, cached: false });
    } catch (linkupError) {
      console.error('Linkup API error, using mock data:', linkupError);

      // Fallback to mock data if Linkup fails
      const mockEvents = generateMockEvents('Demo City');
      return NextResponse.json({
        events: mockEvents,
        cached: false,
        warning: 'Using mock data due to API error'
      });
    }
  } catch (error) {
    console.error('Error in events API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
