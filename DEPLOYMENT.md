# Deployment Guide

## Deploying to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the project directory:
```bash
cd tech-events-app
vercel
```

4. Follow the prompts and set the environment variable:
```bash
vercel env add LINKUP_API_KEY
```

5. For production deployment:
```bash
vercel --prod
```

### Method 2: Using Vercel Dashboard

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Tech Events Discovery App"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Project**:
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add `LINKUP_API_KEY` with your API key
   - Apply to: Production, Preview, and Development

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 3: One-Click Deploy

Click the button below to deploy directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/tech-events-app&env=LINKUP_API_KEY&envDescription=Your%20Linkup%20API%20key&envLink=https://linkup.so)

## Environment Variables

Required environment variables for deployment:

| Variable | Description | Required |
|----------|-------------|----------|
| `LINKUP_API_KEY` | Your Linkup API key from linkup.so | Yes |

## Post-Deployment

### Custom Domain

1. Go to your Vercel project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

### Analytics

Enable Vercel Analytics:
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

// Add <Analytics /> to your layout
```

### Performance Monitoring

Enable Vercel Speed Insights:
```bash
npm install @vercel/speed-insights
```

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check that all environment variables are set
2. Verify Node.js version (18+)
3. Clear build cache: `vercel --force`

### API Errors

If the Linkup API is not working:

1. Verify your API key is correct
2. Check API rate limits
3. Review API logs in Vercel dashboard

### Deployment Failed

Common fixes:

1. **Module not found**: Run `npm install` locally
2. **TypeScript errors**: Run `npm run build` locally to check
3. **Environment variables**: Double-check all required vars are set

## Monitoring

Access deployment logs:
```bash
vercel logs <deployment-url>
```

View real-time logs:
```bash
vercel logs --follow
```

## Rollback

To rollback to a previous deployment:

1. Go to Vercel dashboard
2. Navigate to Deployments
3. Find the working deployment
4. Click "Promote to Production"

## CI/CD

Vercel automatically deploys:
- **Production**: On push to `main` branch
- **Preview**: On pull requests
- **Development**: On push to other branches

Configure in `vercel.json` or Vercel dashboard.

## Security

### Environment Variables

- Never commit `.env.local` to Git
- Use Vercel's encrypted environment variables
- Rotate API keys regularly

### Content Security Policy

Add CSP headers in `next.config.mjs`:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
        }
      ]
    }
  ];
}
```

## Cost Optimization

- Enable ISR (Incremental Static Regeneration) for better caching
- Use Vercel Edge Network for faster global delivery
- Monitor bandwidth usage in Vercel dashboard
- Consider upgrading to Pro for higher limits

---

Need help? Check [Vercel Documentation](https://vercel.com/docs) or [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
