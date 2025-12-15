# QFC AI Assistant Frontend

Next.js 15 frontend application for the QFC AI Assistant chatbot. Features iframe communication via Penpal.js, state management with React Context, and comprehensive TypeScript types.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.18.0
- npm >= 9.0.0

### Installation

```bash
# Navigate to project directory
cd C:\dev\QFC\qfc-ai-assistant-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
qfc-ai-assistant-frontend/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page (redirects to /chat)
│   └── chat/                # Chat page
│       └── page.tsx         # Main chat interface
├── components/              # React components
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Spinner.tsx
│   │   └── index.ts
│   ├── chat/                # Chat-specific components
│   ├── forms/               # Form components
│   └── layout/              # Layout components
├── contexts/                # React Context providers
│   ├── PenpalProvider.tsx   # Iframe communication
│   └── ChatProvider.tsx     # Chat state management
├── lib/                     # Utility libraries
│   ├── api-client.ts        # Axios HTTP client
│   └── utils.ts             # Helper functions
├── types/                   # TypeScript definitions
│   ├── index.ts             # Main application types
│   └── penpal.ts            # Penpal-specific types
├── config/                  # Configuration files
│   └── api.ts               # API endpoints config
├── styles/                  # Global styles
│   └── globals.css          # Tailwind + custom CSS
├── public/                  # Static assets
├── .env.local               # Environment variables
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.js           # Next.js configuration
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript compiler check
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.6.3
- **Styling**: Tailwind CSS 3.4.14
- **Icons**: Lucide React
- **HTTP Client**: Axios 1.7.2
- **Iframe Communication**: Penpal 6.2.2
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion

## 🔧 Configuration

### Environment Variables

Create or edit `.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# Allowed iframe origins (comma-separated)
NEXT_PUBLIC_ALLOWED_ORIGINS=https://qfc.qa,https://*.qfc.qa,http://localhost:3000

# App name
NEXT_PUBLIC_APP_NAME=QFC AI Assistant

# Environment
NODE_ENV=development
```

### Tailwind Configuration

The project uses QFC brand colors:
- **Primary**: `#1B4B8C` (Deep Blue)
- **Secondary**: `#C8102E` (Red)
- **Accent**: `#00A651` (Green)

Colors are available as:
```tsx
className="bg-qfc-primary text-white"
className="bg-accent-500 text-success-700"
```

## 📡 Architecture

### Two-Tier State Management

1. **PenpalProvider** (Top-level)
   - Manages iframe communication with parent application
   - Handles connection state and host methods
   - Auto-reconnect on connection loss

2. **ChatProvider** (Application-level)
   - Manages chat messages and conversation state
   - Session persistence via sessionStorage
   - Application flow control (steps, IDs, data)

### Penpal Communication Flow

```
Parent App (Host)          QFC Assistant (Widget)
     │                             │
     │──── connectToParent() ─────>│
     │                             │
     │<──── exposes methods ───────│
     │      (openChat, sendMessage)│
     │                             │
     │──── getAuthToken() ─────────>│
     │<──── returns JWT ────────────│
     │                             │
     │──── trackEvent() ───────────>│
```

### Component Usage

```tsx
import { useChat } from '@/contexts/ChatProvider';
import { usePenpal } from '@/contexts/PenpalProvider';
import { Button, Card, Badge } from '@/components/ui';

function MyComponent() {
  const { messages, sendMessage, isLoading } = useChat();
  const { hostMethods, connectionState } = usePenpal();

  // Use authentication from host
  const token = await hostMethods?.getAuthToken();

  // Send message
  sendMessage('Hello!');

  return (
    <Card>
      <Badge variant="success">{connectionState}</Badge>
      <Button onClick={() => sendMessage('Test')}>
        Send Message
      </Button>
    </Card>
  );
}
```

### API Client Usage

```tsx
import { get, post } from '@/lib/api-client';
import { API_CONFIG } from '@/config/api';

// GET request
const applications = await get(
  API_CONFIG.ENDPOINTS.APPLICATIONS.PREQUALIFICATION
);

// POST request with data
const result = await post(
  API_CONFIG.ENDPOINTS.AI.VERTEX_CHAT,
  { message: 'Hello', sessionId: '123' }
);

// File upload
import { uploadFile } from '@/lib/api-client';
const uploaded = await uploadFile(
  API_CONFIG.ENDPOINTS.DOCUMENTS.UPLOAD,
  file,
  (progress) => console.log(progress)
);
```

## 🎯 Key Features

### ✅ Completed (Week 1)

- [x] Project setup and configuration
- [x] Penpal iframe communication bridge
- [x] Global state management (PenpalProvider + ChatProvider)
- [x] Base UI component library (Button, Input, Card, Badge, Spinner)
- [x] API client with interceptors and retry logic
- [x] TypeScript type definitions
- [x] Tailwind CSS with QFC branding
- [x] Session persistence
- [x] Development environment

### 🔄 In Progress (Weeks 2-4)

- [ ] Chat interface components (ChatBox, ChatMessage, ChatInput)
- [ ] Decision navigation components
- [ ] Multi-step form components
- [ ] File upload with document extraction
- [ ] Legal structure forms
- [ ] Company information forms
- [ ] Director/Shareholder management
- [ ] Compliance checking UI
- [ ] API service layer integration
- [ ] i18n (English/Arabic)
- [ ] Testing & QA

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format check
npm run format:check
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables for Production

Update `.env.local` with production values:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.qfc.qa/v1
NEXT_PUBLIC_ALLOWED_ORIGINS=https://qfc.qa,https://*.qfc.qa
NODE_ENV=production
```

## 📝 Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier with Tailwind plugin
- **Linting**: ESLint with Next.js config
- **Naming**: camelCase for variables, PascalCase for components
- **File naming**: kebab-case for utilities, PascalCase for components

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### TypeScript Errors

```bash
# Check types
npm run type-check

# Restart TypeScript server in VS Code
Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

### Penpal Connection Issues

- Verify `NEXT_PUBLIC_ALLOWED_ORIGINS` includes parent domain
- Check browser console for CORS errors
- Ensure parent app loads widget in iframe
- In development, all origins are allowed by default

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Penpal.js](https://github.com/Aaronius/penpal)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 👥 Team

- **Project**: QFC AI Assistant
- **Client**: Qatar Financial Centre
- **Tech Lead**: [Your Name]

## 📄 License

Proprietary - Qatar Financial Centre © 2024

---

**Status**: ✅ Week 1 Foundation Complete | 🔄 Week 2 In Progress

For questions or issues, contact the development team.
