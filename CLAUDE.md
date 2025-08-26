# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
**シャッフルもじ** - A word unscrambling challenge game with three specialized modes for programming education. Players rearrange scrambled characters to form correct words under time pressure in a continuous challenge format.

### Core Concept
- **Word unscrambling**: Rearrange scattered characters to form correct words
- **Continuous challenge**: Play until one mistake (streak-based scoring)
- **Time pressure**: 15-second limit per question with progressive reduction
- **Interactive controls**: Click-to-select and click-to-swap functionality
- **Triple learning modes**: HTML/CSS, Ruby methods, and FE exam terms for programming education

### Game Mechanics
- **Basic Rules**:
  - Rearrange scrambled characters into correct words
  - Continuous challenge format (game ends on first mistake)
  - 20-second time limit per question with countdown timer (reduced progressively in later rounds)
  - Early solving allowed (no need to wait full time)

- **Controls**:
  - Click characters in sequence to select
  - Reset selection functionality
  - Click selection for character reordering
  - Mobile-responsive touch controls

### Three Game Modes

#### HTML/CSS Mode
- HTML elements and CSS properties unscrambling
- Frontend development learning reinforcement
- Examples: "vdi" → "div", "loroc" → "color"
- 75 carefully selected terms for HTML and CSS development
- Blue color theme (`blue-400`)

#### Ruby Methods Mode
- Ruby method name unscrambling
- Rails development learning support
- Examples: "pma" → "map", "hcae" → "each"
- 80 essential Ruby methods covering arrays, strings, hashes, enumerable
- Rose color theme (`rose-400`)

#### FE Mode (基本情報技術者試験)
- IT fundamental terms unscrambling
- FE exam preparation support
- Examples: "ipa" → "api", "qls" → "sql"
- 100 terms from FE exam syllabus Ver.9.1
- Emerald color theme (`emerald-400`)

### Mode Design Philosophy
- **Problem**: Single mode difficulty balancing is challenging
- **Issue**: Important terms with fewer characters become too easy
- **Solution**: Three specialized modes balance learning effectiveness with game difficulty
- **Benefit**: Maintains educational value while ensuring engaging gameplay

## Tech Stack
- **Frontend**: Next.js 15.4.6 + React 19.1.0 + TypeScript 5.0
- **Styling**: Tailwind CSS v4 + DaisyUI 5.0.50
- **Authentication**: NextAuth.js 4.24.11 (Google OAuth)
- **Database**: PostgreSQL + Prisma ORM 6.14.0
- **Development**: Node.js 18 + npm
- **Deployment**: Vercel (production)

### Technology Choice: Next.js
**Reasons for Next.js Selection**:
- **Full-stack capabilities**: API routes for authentication and database operations
- **App Router**: Modern routing with server components and layouts
- **Performance**: Built-in optimizations, code splitting, image optimization
- **SEO benefits**: Server-side rendering for better search visibility
- **Authentication**: NextAuth.js integration for Google OAuth
- **Database**: Prisma ORM for type-safe database access

## Development Guidelines

### Language Rules
- **Internal thinking must be in English** for optimal Claude Code performance
- **All responses to user must be in Japanese**
- **Documentation (JSDoc, TypeScript interfaces)**: English
- **Inline code comments**: English for technical descriptions
- **Implementation reasoning comments**: Japanese for context
- **No emojis in code or documentation**

### Japanese Text Formatting
- No unnecessary spaces in Japanese text
- ✅ Correct: "Claude Code入門"
- ❌ Incorrect: "Claude Code 入門"

### Development Workflow
1. **Requirements analysis**: Understand user needs and technical constraints
2. **Task breakdown**: Break complex features into manageable tasks
3. **Branch strategy**: Use descriptive branch names (`feature/responsive-design`)
4. **Incremental development**: Small, focused commits
5. **Code quality**: ESLint + Prettier formatting
6. **Testing**: Manual testing across devices and browsers
7. **Pull Request**: Comprehensive description with testing notes

### Concurrent Execution
- **Execute multiple independent processes concurrently** for maximum efficiency
- Use parallel tool invocations when possible
- Batch related operations together

## Development Commands

### Setup & Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run type-check
```

### Database Management
```bash
# Generate Prisma client
npx prisma generate

# Apply schema changes
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Seed database
npm run db:seed

# Reset database (development)
npx prisma migrate reset
```

### Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code (when available)
npm run format
```

## Architecture Overview

### App Router Structure
```
app/
├── page.tsx                    # Root page (mode selection)
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles + dark mode
├── game/
│   └── [mode]/
│       └── page.tsx            # Dynamic game page
├── result/
│   └── page.tsx                # Game result page
├── ranking/
│   └── page.tsx                # Ranking display
├── history/
│   └── page.tsx                # Play history
├── profile/
│   ├── page.tsx                # User profile
│   └── setup/
│       └── page.tsx            # Profile setup
├── auth/
│    └── signin/
│        └── page.tsx            # Sign-in page
├── terms/
│   └── page.tsx                 # Terms of service page
└── privacy/
    └── page.tsx                 # Privacy policy page

api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts            # NextAuth endpoints
├── game/
│   └── save-result/
│       └── route.ts            # Save game result
├── ranking/
│   └── route.ts                # Ranking data
└── history/
    └── route.ts                # User history
```

### Component Structure
```
components/
├── game/                       # Game-specific components
│   ├── HTMLCSSQuestion.tsx     # HTML/CSS mode questions
│   ├── RubyQuestion.tsx        # Ruby mode questions
│   ├── FEQuestion.tsx          # FE mode questions
│   ├── Answer.tsx              # Answer input with click-to-swap
│   ├── Header.tsx              # Game header (timer, progress)
│   ├── Hint.tsx                # Educational hint display
│   ├── GuideModal.tsx          # Game instructions
│   └── QuestionList.tsx        # Result question list
├── auth/
│   └── UserProfile.tsx         # User profile dropdown
└── ui/                         # Reusable UI components
    ├── ModeButton.tsx          # Mode selection buttons
    ├── ShamojiSpinner.tsx      # Loading spinner
    ├── LoadingScreen.tsx       # Full screen loading
    ├── ConfirmModal.tsx        # Confirmation dialogs
    └── Footer.tsx              # Site footer with legal links
```

### Key Data Types
```typescript
// Core game types
export type GameMode = 'html-css' | 'ruby' | 'fe'

export type Word = {
  id: string
  original: string      // Correct word (e.g., "div")
  mode: GameMode
  category: string      // 'HTML', 'CSS', 'ruby', 'fe'
  hint: string          // Educational hint (60+ characters)
}

export type GameWord = Word & {
  scrambled: string     // Dynamically scrambled version
}

export type AllChars = {
  char: string
  id: string
  isSelected: boolean
}

export type SelectedChars = {
  char: string
  id: string
}

// Database types
export interface GameResultData {
  mode: 'HTML_CSS' | 'RUBY' | 'FE'
  score: number
  correctAnswers: CorrectAnswer[]
  incorrectAnswer?: IncorrectAnswer
  gameEndReason: 'wrong_answer' | 'timeout' | 'completed'
  guestName?: string
}

export interface RankingEntry {
  id: string
  userName: string
  score: number
  playedAt: Date
  mode: 'HTML_CSS' | 'RUBY' | 'FE'
}
```

## Feature Implementation Status

### ✅ Completed Features

#### Core Game Functionality
- [x] 3-mode game system (HTML/CSS, Ruby, FE)
- [x] Character selection with click interaction
- [x] Click-to-swap character reordering with visual feedback
- [x] 15-second countdown timer with progressive reduction and auto-fail
- [x] Answer validation and feedback
- [x] Educational hints (60+ characters each)
- [x] Game progression and streak tracking
- [x] Game over logic and result display

#### User Experience
- [x] **Complete responsive design** (mobile, tablet, desktop)
- [x] **Dark mode support** with automatic theme switching
- [x] **Loading animations** with custom shamoji spinner
- [x] **Instant loading feedback** on all page transitions
- [x] Game instructions modal
- [x] X (Twitter) sharing functionality

#### Authentication & Data
- [x] Google OAuth authentication via NextAuth.js
- [x] Guest user support with custom names
- [x] Game result saving and retrieval
- [x] **Ranking system** (TOP10 per mode)
- [x] **Play history** with detailed statistics
- [x] User profile management

#### Technical Infrastructure
- [x] PostgreSQL database with Prisma ORM
- [x] Type-safe API routes
- [x] **Comprehensive error handling**
- [x] **TypeScript type definitions** for all components
- [x] ESLint configuration and code quality

#### UI/UX Enhancements
- [x] **Mobile-first responsive design**
- [x] **Optimized touch interactions** for mobile devices
- [x] **8-character word support** in mobile answer area
- [x] **Unified color palette** with softer tones
- [x] **Consistent loading states** across all pages
- [x] **Back button prevention** during active gameplay
- [x] **Legal pages and footer** (Terms of Service, Privacy Policy, Copyright)

### 🚧 Potential Future Enhancements

#### Phase 1: User Experience
- [ ] Keyboard shortcuts for desktop users
- [ ] Sound effects and audio feedback
- [ ] Game pause/resume functionality
- [ ] Performance analytics and monitoring

#### Phase 2: Learning Features
- [ ] Progress tracking and learning analytics
- [ ] Wrong answer review system
- [ ] Difficulty adjustment based on performance
- [ ] Custom study lists

#### Phase 3: Social Features
- [ ] Friend system and challenges
- [ ] Team/group competitions
- [ ] Achievement badges
- [ ] Study groups and collaborative learning

## Game Data

### Content Statistics
- **HTML/CSS Mode**: 75 terms for HTML and CSS development
- **Ruby Mode**: 80 Ruby methods (arrays, strings, hashes, enumerable)
- **FE Mode**: 100 terms from FE exam syllabus Ver.9.1

### Educational Design
- **Hint Quality**: 60+ characters per hint with practical context
- **Term Selection**: High-frequency terms from real development
- **Difficulty Balance**: Mixed character lengths (3-10 characters)
- **Learning Reinforcement**: Detailed explanations for each term

## Responsive Design System

### Breakpoints (Tailwind CSS)
- **Mobile**: `< 640px` (sm breakpoint)
- **Tablet**: `640px - 1024px`
- **Desktop**: `> 1024px`

### Mobile Optimizations
- **Character Cards**: 40x40px (mobile) → 48x48px (desktop)
- **Answer Area**: 32x32px cards for 8-character word support
- **Text Sizes**: `text-lg` (mobile) → `text-xl` (desktop)
- **Spacing**: `gap-1` (mobile) → `gap-2` (desktop)
- **Touch Targets**: Minimum 44px for accessibility

### Color System
- **HTML/CSS**: `blue-400` with `blue-500` hover
- **Ruby**: `rose-400` with `rose-500` hover
- **FE**: `emerald-400` with `emerald-500` hover
- **UI Accents**: `amber-400` for rankings, `indigo-400` for guides

## Performance Considerations

### React Optimizations
- Functional components with hooks
- React.memo for character buttons
- useCallback for event handlers
- Efficient state updates

### Loading Performance
- **Instant feedback**: Immediate loading states on button clicks
- **Code splitting**: Dynamic imports for different game modes
- **Image optimization**: Next.js Image component
- **Bundle analysis**: Regular size monitoring

### Database Performance
- **Indexed queries**: Optimized ranking and history queries
- **Connection pooling**: Efficient database connections
- **Query optimization**: Minimal data transfer

## Environment & Deployment

### Development Setup
- **Node.js**: Version 18+ required
- **Database**: PostgreSQL for development and production
- **Environment Variables**: Google OAuth, NextAuth secret, database URL

### Production Deployment
- **Platform**: Vercel (recommended)
- **Database**: PostgreSQL (Vercel Postgres or external)
- **Domain**: Custom domain with SSL
- **Monitoring**: Built-in Vercel analytics

### Environment Variables
```bash
# Authentication
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=https://yourdomain.com

# Database
DATABASE_URL=postgresql://xxx

# Optional
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Code Quality & Standards

### TypeScript Configuration
- Strict mode enabled
- Path mapping for @/* imports
- Comprehensive type definitions

### Code Style
- ESLint with Next.js configuration
- Consistent component patterns
- Proper error boundaries
- Accessibility considerations

### Testing Strategy
- Manual testing across devices
- Browser compatibility testing
- Performance testing on mobile devices
- User acceptance testing

## Debugging & Development

### Development Tools
- **Next.js DevTools**: Component and routing inspection
- **React DevTools**: Component state and props
- **Prisma Studio**: Database management interface
- **Browser DevTools**: Network, performance, responsive testing

### Common Issues & Solutions
- **Type errors**: Usually resolved with proper imports and type definitions
- **Database connection**: Check DATABASE_URL and network connectivity
- **Authentication**: Verify Google OAuth configuration
- **Responsive design**: Test on actual devices, not just browser simulation

## Security Considerations

### Authentication Security
- Google OAuth with NextAuth.js
- Secure session management
- CSRF protection enabled
- Secure cookie configuration

### Data Protection
- Minimal personal data collection
- Guest user privacy preservation
- Secure database connections
- Input validation and sanitization

### Performance Security
- Rate limiting on API routes
- Input validation for game results
- SQL injection prevention via Prisma
- XSS protection via React

## Library Usage Guidelines
- **Always check official documentation** for latest patterns
- **Prefer TypeScript-first libraries** when available
- **Use Next.js built-in optimizations** (Image, Font, etc.)
- **Follow React 19 best practices** for concurrent features
- **Maintain backward compatibility** when updating dependencies

## Development Context

### Current Status
- **Phase**: Production-ready release preparation ✅
- **Branch Strategy**: Feature branches with descriptive names
- **Recent Achievements**:
  - ✅ Complete responsive design implementation
  - ✅ Unified loading experience with shamoji spinners
  - ✅ Dark mode support with theme switching
  - ✅ Type-safe development environment
  - ✅ Production database and authentication setup
  - ✅ Comprehensive ranking and history system

### Active Development Areas
- Performance optimization and monitoring
- User experience refinements
- Additional educational content
- Advanced learning features

This project represents a complete, production-ready educational game with modern web technologies, responsive design, and comprehensive user features.
