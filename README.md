# Tech Events Discovery App

A modern, swipeable tech events discovery application built with Next.js 14+, TypeScript, and the Linkup SDK.

## Features

- 🎯 **Swipeable Interface**: Tinder-style card swiping to browse through tech events
- 🌍 **Multi-City Support**: Discover events in major tech hubs worldwide
- 📱 **Responsive Design**: Beautiful UI that works on desktop and mobile
- 💾 **Local Storage**: Save events you're interested in with persistent storage
- 🔍 **Smart Filtering**: Filter events by type and date range
- 🌓 **Dark Mode**: Automatic dark mode support
- 🔗 **Share Events**: Share event details via multiple channels
- ⚡ **Real-time Search**: Powered by Linkup SDK for up-to-date event information

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Swipe Gestures**: react-tinder-card
- **State Management**: Zustand with persist middleware
- **Icons**: Lucide React
- **API**: Linkup SDK for web searching
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Linkup API key ([Get one here](https://linkup.so))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tech-events-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
LINKUP_API_KEY=your_linkup_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
tech-events-app/
├── app/
│   ├── api/
│   │   └── events/
│   │       └── route.ts          # API route for fetching events
│   ├── saved/
│   │   └── page.tsx              # Saved events page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page with event swiper
│   └── globals.css               # Global styles
├── components/
│   ├── EventCard.tsx             # Individual event card
│   ├── EventSwiper.tsx           # Swipeable card container
│   ├── CitySelector.tsx          # City selection dropdown
│   ├── EventFilters.tsx          # Date and type filters
│   └── ShareButton.tsx           # Share functionality
├── lib/
│   ├── linkup.ts                 # Linkup SDK configuration
│   └── types.ts                  # TypeScript interfaces
├── store/
│   └── eventStore.ts             # Zustand state management
└── public/                       # Static assets
```

## Usage

### Discovering Events

1. Select a city from the dropdown
2. Apply filters for date range and event type
3. Swipe right (or click ❤️) to save events
4. Swipe left (or click ✕) to pass on events

### Managing Saved Events

1. Click the "Saved" button in the header
2. View all your saved events in a grid layout
3. Click "More Info" to visit event pages
4. Remove individual events or clear all at once

### Sharing Events

1. Click the share button on any event card
2. Choose from:
   - Copy event details
   - Copy event URL
   - Share via Web Share API (mobile)
   - Share via email

## Deployment on Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Manual Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your repository on Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository

3. Configure environment variables:
   - Add `LINKUP_API_KEY` in the Vercel project settings

4. Deploy!

### Environment Variables

Make sure to set the following environment variable in your Vercel project:

- `LINKUP_API_KEY`: Your Linkup API key

## Customization

### Adding New Cities

Edit `components/CitySelector.tsx` to add more cities:

```typescript
const POPULAR_CITIES: City[] = [
  { name: 'Your City', country: 'Your Country' },
  // ... more cities
];
```

### Modifying Event Types

Update the `Event` interface in `lib/types.ts`:

```typescript
eventType: 'Meetup' | 'Conference' | 'Workshop' | 'Hackathon' | 'YourNewType';
```

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-specific styles: Inline Tailwind classes

## Features Roadmap

- [ ] Event calendar view
- [ ] Export saved events to calendar
- [ ] User authentication
- [ ] Event recommendations based on interests
- [ ] Social sharing integrations
- [ ] Event reminders
- [ ] Map view of events

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
- Open an issue on GitHub
- Check the [Linkup SDK documentation](https://linkup.so/docs)
- Review [Next.js documentation](https://nextjs.org/docs)

---

Built with ❤️ using Next.js and Linkup SDK
