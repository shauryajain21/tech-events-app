import { LinkupClient } from 'linkup-sdk';

if (!process.env.LINKUP_API_KEY) {
  throw new Error('LINKUP_API_KEY is not set in environment variables');
}

export const linkupClient = new LinkupClient({
  apiKey: process.env.LINKUP_API_KEY,
});

export const searchEvents = async (city: string, month?: string) => {
  const currentMonth = month || new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  // More specific query to find actual events
  const query = `upcoming tech events ${city} ${currentMonth} ${currentYear} meetup conference workshop hackathon`;

  try {
    const response = await linkupClient.search({
      query,
      depth: 'deep',
      outputType: 'sourcedAnswer',
    });

    console.log('Linkup Response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Error searching events with Linkup:', error);
    throw error;
  }
};

export const searchEventsWithQuery = async (userQuery: string) => {
  // Enhance user query with event-related keywords if not already present
  const enhancedQuery = userQuery.toLowerCase().includes('event') ||
                        userQuery.toLowerCase().includes('meetup') ||
                        userQuery.toLowerCase().includes('conference')
    ? userQuery
    : `${userQuery} tech events`;

  try {
    const response = await linkupClient.search({
      query: enhancedQuery,
      depth: 'deep',
      outputType: 'sourcedAnswer',
    });

    console.log('Linkup Search Query:', enhancedQuery);
    console.log('Linkup Response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Error searching events with Linkup:', error);
    throw error;
  }
};
