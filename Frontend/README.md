# Career Guidance Platform - Frontend

Next.js 14 application for the Career Guidance Platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
# or
yarn install
```

2. **Create environment file**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── jobs/
│   ├── profile/
│   ├── roadmap/
│   ├── layout.tsx
│   └── page.tsx
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── jobs/
│   │   ├── JobCard.tsx
│   │   ├── JobList.tsx
│   │   └── JobDetails.tsx
│   └── roadmap/
│       ├── RoadmapTimeline.tsx
│       └── PhaseCard.tsx
├── lib/                   # Utilities
│   ├── api.ts            # API client
│   ├── utils.ts          # Helper functions
│   └── auth.ts           # Auth utilities
├── hooks/                 # Custom hooks
│   ├── useAuth.ts
│   ├── useJobs.ts
│   └── useRoadmap.ts
├── types/                 # TypeScript types
│   ├── user.ts
│   ├── job.ts
│   └── roadmap.ts
├── public/               # Static files
│   ├── images/
│   └── icons/
└── styles/               # Global styles
    └── globals.css
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **State Management**: React Context / Zustand
- **HTTP Client**: Axios

## 📄 Pages & Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page

### Protected Routes
- `/dashboard` - User dashboard overview
- `/profile` - User profile & settings
- `/profile/edit` - Edit profile
- `/jobs` - Browse all jobs
- `/jobs/[id]` - Job details
- `/companies` - Browse companies
- `/companies/[id]` - Company profile
- `/roadmap` - View roadmaps
- `/roadmap/[id]` - Specific roadmap details

## 🔐 Authentication

The app uses JWT tokens stored in localStorage/cookies.

### Auth Flow
```typescript
// Login
const login = async (email: string, password: string) => {
  const response = await api.post('/api/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  router.push('/dashboard');
};

// Protected Route
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
};
```

## 🛠️ Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm run start
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npm run type-check
```

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "typescript": "5.2.0",
    "tailwindcss": "3.3.0",
    "axios": "1.6.0",
    "react-hook-form": "7.48.0",
    "zod": "3.22.0",
    "recharts": "2.10.0",
    "lucide-react": "0.292.0",
    "@radix-ui/react-dialog": "1.0.5"
  }
}
```

## 🎨 UI Components

### Using shadcn/ui
```bash
# Add new component
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

### Example Usage
```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function JobCard({ job }) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold">{job.title}</h3>
      <Button onClick={handleApply}>Apply Now</Button>
    </Card>
  );
}
```

## 🔧 Environment Variables

Create `.env.local` file:

```env
# API URLs
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# Optional: Sentry
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## 📱 Responsive Design

All components are mobile-first and responsive:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {jobs.map(job => <JobCard key={job.id} job={job} />)}
</div>
```

## 🚨 Common Issues

### API Connection Error
- Check if backend is running on port 5000
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for CORS errors

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## 📞 Support

For issues or questions, contact the frontend team lead.