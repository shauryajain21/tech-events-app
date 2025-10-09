# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Prerequisites
- Node.js 18+ installed
- Linkup API key (you already have one set up!)

### Steps

1. **Navigate to the project**:
   ```bash
   cd tech-events-app
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

### Discover Events
1. **Select a city** from the dropdown (default: San Francisco)
2. **Apply filters** for date range and event type
3. **Start swiping**:
   - Swipe **RIGHT** (or click ❤️) → Save event
   - Swipe **LEFT** (or click ✕) → Pass on event

### View Saved Events
1. Click **"Saved"** button in the top-right corner
2. View all your saved events in a beautiful grid
3. Click **"More Info"** to visit event pages
4. **Remove** events you're no longer interested in

### Share Events
1. Click the **share icon** (top-right of event card)
2. Choose how to share:
   - Copy event details
   - Copy event URL
   - Share via Web Share API (mobile)
   - Share via email

## 🎨 Features at a Glance

✅ **Swipeable cards** with smooth animations
✅ **12 major tech cities** to choose from
✅ **Smart filtering** by date and event type
✅ **Persistent storage** for saved events
✅ **Dark mode** support
✅ **Share functionality** across platforms
✅ **Responsive design** for all devices

## 🛠️ Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📱 Mobile Experience

The app works great on mobile! Features include:
- Touch-based swiping gestures
- Native Web Share API integration
- Responsive card sizing
- Optimized performance

## 🌍 Supported Cities

- San Francisco, USA
- New York, USA
- London, UK
- Berlin, Germany
- Tokyo, Japan
- Singapore
- Austin, USA
- Seattle, USA
- Toronto, Canada
- Amsterdam, Netherlands
- Tel Aviv, Israel
- Bangalore, India

## 🔧 Customization

### Add More Cities
Edit `components/CitySelector.tsx`:
```typescript
const POPULAR_CITIES: City[] = [
  { name: 'Your City', country: 'Your Country' },
  // ...
];
```

### Change Theme Colors
Edit `tailwind.config.ts` to customize colors, fonts, and more.

### Modify Event Types
Update `lib/types.ts` to add new event types:
```typescript
eventType: 'Meetup' | 'Conference' | 'Workshop' | 'Hackathon' | 'NewType';
```

## ❓ Troubleshooting

**Events not loading?**
- Check your internet connection
- Verify your Linkup API key in `.env.local`
- Check the browser console for errors

**Swipe not working?**
- Try refreshing the page
- Use the heart/X buttons as an alternative
- Check if JavaScript is enabled

**Dark mode not switching?**
- Your system preferences control dark mode
- On macOS: System Preferences → General → Appearance
- On Windows: Settings → Personalization → Colors

## 📚 Next Steps

1. ⭐ **Star the repo** if you find it useful
2. 🚀 **Deploy to Vercel** (see DEPLOYMENT.md)
3. 🎨 **Customize** the design to match your brand
4. 🔗 **Share** with friends and colleagues

## 🐛 Issues?

Found a bug? Have a suggestion?
- Open an issue on GitHub
- Check the README.md for more details
- Review the code in the `components/` folder

---

**Happy Event Hunting! 🎉**

Built with ❤️ using Next.js, TypeScript, and Linkup SDK
