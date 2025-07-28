# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
**てててて** - A Japanese music intro quiz application where users guess songs from rhythm patterns displayed as "ててて" characters. The app features a gamified quiz system with social sharing capabilities and competitive elements.

### Core Concept
- Music intros are represented by text patterns like "ててて♪タンタタン♪"
- Characters display progressively (one by one) 
- Users can answer at any point during the display
- 4-choice quiz format with immediate feedback
- Social sharing integration with X (Twitter)

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (with Material-UI consideration)
- **Backend**: Firebase (Firestore + Authentication + Hosting)
- **Build Tool**: Vite
- **Development**: Windows + VS Code + dev container
- **Deployment**: Firebase Hosting

## Development Guidelines

### Language Rules
- **Internal thinking must be in English** for optimal Claude Code performance
- **All responses to user must be in Japanese** 
- **Documentation (JSDoc, TypeScript interfaces)**: English
- **Inline code comments (test descriptions, zod schemas)**: English  
- **Implementation reasoning comments**: Japanese
- **No emojis in code or documentation**

### Japanese Text Formatting
- No unnecessary spaces in Japanese text
- ✅ Correct: "Claude Code入門"
- ❌ Incorrect: "Claude Code 入門"

### Development Workflow
1. **Requirements documentation**: Document all requirements and design decisions in `.tmp/design.md`
2. **Task breakdown**: Define detailed sub-tasks in `.tmp/task.md` and update progress regularly
3. **Branch strategy**: Create feature branches using `feature/` prefix followed by brief task summary
4. **Incremental development**: Break tasks into small, single-commit units
5. **Progress tracking**: Use checklists for task management
6. **Code formatting**: Always apply code formatter for readability
7. **Confirmation before commit**: Ask for confirmation before making commits
8. **Pull Request format** (when requested):
   - **Title**: Brief task summary
   - **Key Changes**: Describe changes and important notes
   - **Testing**: Specify passed tests, added tests, and how to run them
   - **Related Tasks**: Link related tasks or issues
   - **Other**: Any special notes or relevant information

### Task Completion Notifications
- **Required for ALL task completions** including minor tasks like formatting, refactoring, or documentation
- Use osascript for macOS notifications:
  ```bash
  osascript -e 'display notification "${TASK_DESCRIPTION} is complete" with title "てててて"'
  ```
- For Windows environment, adapt notification system as appropriate

### Concurrent Execution
- **Execute multiple independent processes concurrently, not sequentially** for maximum efficiency
- Use parallel tool invocations when possible

## Development Commands

### Setup & Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install

# Type checking
npm run type-check
```

### Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Firebase Operations
```bash
# Firebase login
firebase login

# Initialize Firebase project
firebase init

# Deploy to Firebase
firebase deploy

# Start Firebase emulators
firebase emulators:start
```

### Testing (Future Implementation)
```bash
# Run tests (when implemented)
npm run test

# Run tests with coverage
npm run test:coverage
```

## Architecture Overview

### Core Components Structure
```
src/
├── components/
│   ├── pages/              # Page-level components
│   │   ├── TopPage.tsx     # Landing page with "Start" button
│   │   ├── GamePage.tsx    # Main quiz game interface
│   │   └── ResultPage.tsx  # Results display and X sharing
│   ├── game/               # Game-specific components
│   │   ├── RhythmDisplay.tsx    # Progressive "ててて" text display
│   │   ├── OptionButtons.tsx    # 4-choice answer buttons
│   │   ├── JudgmentDisplay.tsx  # ○/× result display
│   │   ├── Timer.tsx           # Game timer component
│   │   └── ProgressBar.tsx     # Question progress (1/10)
│   ├── result/             # Result-related components
│   │   ├── ScoreDisplay.tsx    # Final score presentation
│   │   ├── ShareButton.tsx     # X (Twitter) sharing
│   │   └── RankingDisplay.tsx  # Rankings (future)
│   └── ui/                 # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── LoadingSpinner.tsx
├── hooks/                  # Custom React hooks
│   ├── useQuizGame.ts     # Main game state management
│   ├── useTimer.ts        # Timer functionality
│   └── useFirestore.ts    # Firebase operations
├── types/                  # TypeScript type definitions
│   ├── game.ts            # Game-related types
│   ├── song.ts            # Song data types
│   └── index.ts           # Type exports
├── data/                   # Static data and constants
│   ├── songs.ts           # Song database with rhythm patterns
│   └── constants.ts       # Game configuration constants
├── utils/                  # Utility functions
│   ├── gameLogic.ts       # Game logic utilities
│   ├── shareUtils.ts      # Social sharing utilities
│   └── firebaseUtils.ts   # Firebase helper functions
└── styles/                 # Global styles
    └── globals.css        # Global CSS with Tailwind
```

### Key Data Types
```typescript
interface Song {
  id: string;
  title: string;
  artist: string;
  rhythm: string;  // "ててて♪タンタタン♪"
  genre: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

interface GameState {
  mode: 'fixed' | 'survival';
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  timeElapsed: number;
  isGameActive: boolean;
  currentSong: Song | null;
  options: Song[];
  selectedAnswer: string | null;
  showResult: boolean;
  gameFinished: boolean;
}

interface GameResult {
  score: number;
  totalQuestions: number;
  timeSeconds: number;
  mode: 'fixed' | 'survival';
  completedAt: Date;
}
```

## Feature Implementation Priorities

### Phase 1: Core Game (Priority: High)
- [x] Project setup with dev container
- [ ] Top page with start button
- [ ] Progressive rhythm text display ("ててて" animation)
- [ ] 4-choice option buttons display before rhythm
- [ ] Click-to-answer functionality during rhythm display
- [ ] Immediate judgment display (○/× with correct answer for wrong answers)
- [ ] 10-question game loop with score tracking
- [ ] Timer implementation for total game time
- [ ] Result page with score and time display
- [ ] X (Twitter) sharing functionality

### Phase 2: Enhanced Features (Priority: Medium)
- [ ] Survival mode (play until wrong answer)
- [ ] Survival mode score sharing
- [ ] Ranking system for survival mode
- [ ] Firebase Firestore integration for rankings
- [ ] Responsive design optimization

### Phase 3: Quality & Polish (Priority: Low)
- [ ] Unit tests implementation (Jest + React Testing Library)
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Material-UI integration (if needed)
- [ ] PWA features

## Firebase Configuration

### Services in Use
- **Firestore**: Game results and rankings storage
- **Hosting**: Production deployment
- **Authentication**: Future user accounts (optional)

### Firestore Collections
```typescript
// gameResults collection
interface GameResultDoc {
  playerName: string;
  score: number;
  totalQuestions: number;
  timeSeconds: number;
  mode: 'fixed' | 'survival';
  createdAt: Timestamp;
}

// songs collection (future)
interface SongDoc {
  title: string;
  artist: string;
  rhythm: string;
  genre: string;
  difficulty: string;
  playCount: number;
}
```

## Development Context

### Git Workflow
- **Strategy**: GitHub Flow (feature branches → main)
- **Branch naming**: `feature/rhythm-display`, `feature/timer-implementation`
- **Commits**: Small, focused commits with descriptive messages
- **Repository**: Individual GitHub repository

### Current Development Status
- **Timeline**: 2-week development sprint
- **Current Phase**: Project initialization
- **Next Milestone**: Core game functionality completion
- **Environment**: Windows + VS Code + dev container setup

### Code Conventions
- **React**: Functional components with hooks
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind utility-first approach
- **File naming**: PascalCase for components, camelCase for utilities
- **Import organization**: External libs → Internal components → Types/Utils

### Performance Considerations
- **React optimization**: Use React.memo for expensive components
- **State management**: useReducer for complex game state
- **Bundle optimization**: Code splitting for different game modes
- **Firebase optimization**: Batch reads/writes, offline persistence

## Library Usage Guidelines
- **Always use Contex7 MCP** to retrieve the latest library information and usage patterns
- Prefer official documentation and examples
- Follow React 18 patterns and concurrent features when applicable
- Use TypeScript strict mode for type safety

## Hidden Files & Debugging
- Use **Bash tool** for finding hidden folders like `.tmp`, not List tool
- Debug using browser dev tools and React DevTools
- Firebase debugging through Firebase console and emulator suite