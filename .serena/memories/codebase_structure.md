# Codebase Structure

## Root Directory Structure
```
shufflemoji/
├── app/                    # Next.js App Router pages and API routes
├── components/             # React components organized by domain
├── data/                   # Game data files (terms for each mode) 
├── lib/                    # Utility libraries (auth, prisma client)
├── prisma/                 # Database schema and seeding
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## App Router Structure (`app/`)
```
app/
├── page.tsx                # Root page (mode selection)
├── layout.tsx              # Root layout with fonts and metadata
├── globals.css             # Global styles and dark mode CSS
├── game/[mode]/page.tsx    # Dynamic game pages for each mode
├── result/page.tsx         # Game result page
├── ranking/page.tsx        # Ranking display
├── history/page.tsx        # Play history
├── profile/                # User profile management
│   ├── page.tsx
│   └── setup/page.tsx
├── auth/signin/page.tsx    # Sign-in page
└── api/                    # API routes
    ├── auth/[...nextauth]/route.ts     # NextAuth endpoints
    ├── game/save-result/route.ts       # Save game results
    ├── ranking/route.ts                # Ranking data
    └── user/history/route.ts           # User history
```

## Components Organization (`components/`)
```
components/
├── game/                   # Game-specific components
│   ├── HTMLCSSQuestion.tsx # HTML/CSS mode questions
│   ├── RubyQuestion.tsx    # Ruby mode questions
│   ├── FEQuestion.tsx      # FE mode questions
│   ├── Answer.tsx          # Answer input with drag & drop
│   ├── Header.tsx          # Game header (timer, progress)
│   ├── Hint.tsx            # Educational hint display
│   ├── GuideModal.tsx      # Game instructions
│   └── QuestionList.tsx    # Result question list
├── auth/
│   └── UserProfile.tsx     # User profile dropdown
├── ui/                     # Reusable UI components
│   ├── ModeButton.tsx      # Mode selection buttons
│   ├── ShamojiSpinner.tsx  # Loading spinner
│   ├── LoadingScreen.tsx   # Full screen loading
│   └── ConfirmModal.tsx    # Confirmation dialogs
└── providers/
    └── SessionProvider.tsx # NextAuth session provider
```

## Data Organization (`data/`)
- `htmlCssTerms.ts` - 100 HTML/CSS terms with hints
- `rubyMethods.ts` - 100 Ruby methods with hints  
- `feTerms.ts` - 100 FE exam terms with hints

## Type Definitions (`types/`)
- `word.ts` - Core game types (Word, GameWord, GameMode, AllChars)
- `game-result.ts` - Result and ranking types
- `next-auth.d.ts` - NextAuth type extensions
- `react.d.ts` - React type extensions

## Database Schema (`prisma/`)
- `schema.prisma` - User and GameRecord models with PostgreSQL
- `seed.ts` - Database seeding script (run with `npm run db:seed`)

## Key Architectural Patterns
- **Server Components**: Default rendering mode
- **Client Components**: Only when interactivity needed (`"use client"`)
- **Dynamic Routes**: `[mode]` parameter for game modes
- **API Routes**: RESTful endpoints for database operations
- **Responsive Design**: Mobile-first with Tailwind breakpoints