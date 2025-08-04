# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
**Word Scramble Game** - A word unscrambling challenge game with two specialized modes for programming education. Players rearrange scrambled characters to form correct words under time pressure in a continuous challenge format.

### Core Concept
- **Word unscrambling**: Rearrange scattered characters to form correct words
- **Continuous challenge**: Play until one mistake (streak-based scoring)
- **Time pressure**: 10-second limit per question with early submission
- **Interactive controls**: Click-to-select and drag-and-drop functionality
- **Dual learning modes**: HTML/CSS and Ruby methods for programming education

### Game Mechanics
- **Basic Rules**:
  - Rearrange scrambled characters into correct words
  - Continuous challenge format (game ends on first mistake)
  - 10-second time limit per question
  - Early solving allowed (no need to wait full 10 seconds)

- **Controls**:
  - Click characters in sequence to select
  - Reset selection functionality
  - Drag & drop for character reordering

### Two Game Modes

#### HTML/CSS Mode
- HTML elements and CSS properties unscrambling
- Frontend development learning reinforcement
- Examples: "vdi" → "div", "loroc" → "color"

#### Ruby Methods Mode
- Ruby method name unscrambling
- Rails development learning support
- Examples: "hacm_se" → "each_ms", "pma" → "map"

### Mode Design Philosophy
- **Problem**: Single mode difficulty balancing is challenging
- **Issue**: Important terms with fewer characters become too easy
- **Solution**: Two specialized modes balance learning effectiveness with game difficulty
- **Benefit**: Maintains educational value while ensuring engaging gameplay

## Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + DaisyUI
- **Routing**: React Router v6
- **Backend**: Firebase (Future - for leaderboards/stats)
- **Build Tool**: Vite
- **Development**: Windows + VS Code + dev container
- **Deployment**: Firebase Hosting (Future)

### Technology Choice: React
**Reasons for React Selection**:
- Smooth transitions from top page to mode selection
- Shared component architecture across two modes
- SPA benefits for statistics and modal displays
- Complex animation and state management capabilities
- Unified data management across modes (high scores, settings)

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
  osascript -e 'display notification "${TASK_DESCRIPTION} is complete" with title "Word Scramble"'
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

### Firebase Operations (Future)
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
├── pages/                  # Page-level components
│   ├── TopPage.tsx         # Landing page with mode selection
│   ├── GamePage.tsx        # Main game interface
│   ├── ResultPage.tsx      # Game over screen with stats
│   └── NotFoundPage.tsx    # 404 error page
├── components/
│   ├── game/               # Game-specific components
│   │   ├── ScrambledWord.tsx    # Character display and interaction
│   │   ├── CharacterButton.tsx  # Individual character buttons
│   │   ├── Timer.tsx            # Countdown timer (10s)
│   │   ├── ScoreDisplay.tsx     # Current streak/score
│   │   ├── GameModeSelector.tsx # HTML/CSS vs Ruby mode selection
│   │   └── GameOverModal.tsx    # Game end confirmation
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── LoadingSpinner.tsx
│   └── layout/             # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── hooks/                  # Custom React hooks
│   ├── useGameState.ts     # Main game state management
│   ├── useTimer.ts         # Timer functionality
│   ├── useScramble.ts      # Word scrambling logic
│   └── useDragDrop.ts      # Drag and drop interactions
├── types/                  # TypeScript type definitions
│   ├── game.ts             # Game-related types
│   ├── word.ts             # Word/term data types
│   └── index.ts            # Type exports
├── data/                   # Static data and constants
│   ├── htmlCssTerms.ts     # HTML/CSS vocabulary
│   ├── rubyMethods.ts      # Ruby method names
│   └── constants.ts        # Game configuration constants
├── utils/                  # Utility functions
│   ├── gameLogic.ts        # Core game logic
│   ├── scrambleLogic.ts    # Word scrambling algorithms
│   ├── validation.ts       # Answer validation
│   └── storage.ts          # Local storage management
└── styles/                 # Global styles
    └── globals.css         # Global CSS with Tailwind
```

### Key Data Types
```typescript
interface Word {
  id: string;
  original: string;      // Correct word/term
  scrambled: string;     // Scrambled version
  mode: 'html-css' | 'ruby';
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;     // e.g., 'html-elements', 'css-properties', 'ruby-enumerable'
}

interface GameState {
  mode: 'html-css' | 'ruby';
  currentWord: Word | null;
  selectedChars: string[];
  currentStreak: number;
  bestStreak: number;
  timeRemaining: number;
  isGameActive: boolean;
  isGameOver: boolean;
  gameStartTime: Date | null;
}

interface GameResult {
  streak: number;
  mode: 'html-css' | 'ruby';
  totalTime: number;
  completedAt: Date;
  wordsCompleted: Word[];
}

interface GameSettings {
  timeLimit: number;      // Default: 10 seconds
  soundEnabled: boolean;
  animationsEnabled: boolean;
}
```

## Feature Implementation Priorities

### Phase 1: Core Game (Priority: High)
- [x] Project setup with routing
- [ ] Mode selection page (HTML/CSS vs Ruby)
- [ ] Word data structure and sample data
- [ ] Basic game interface with character buttons
- [ ] Click-to-select character functionality
- [ ] Word validation and streak tracking
- [ ] 10-second timer implementation
- [ ] Game over screen with results
- [ ] Local high score storage

### Phase 2: Enhanced UX (Priority: Medium)
- [ ] Drag and drop character reordering
- [ ] Selection reset functionality
- [ ] Smooth animations and transitions
- [ ] Sound effects and feedback
- [ ] Responsive design optimization
- [ ] Keyboard shortcuts support
- [ ] Pause/resume functionality

### Phase 3: Advanced Features (Priority: Low)
- [ ] Firebase integration for global leaderboards
- [ ] User accounts and progress tracking
- [ ] Achievement system
- [ ] Custom word list creation
- [ ] Difficulty progression system
- [ ] Statistics and analytics
- [ ] PWA features

## Game Data Structure

### HTML/CSS Terms Database
```typescript
// htmlCssTerms.ts
export const htmlCssTerms: Word[] = [
  // HTML Elements
  { id: 'div-1', original: 'div', scrambled: 'vdi', mode: 'html-css', difficulty: 'easy', category: 'html-elements' },
  { id: 'span-1', original: 'span', scrambled: 'pans', mode: 'html-css', difficulty: 'easy', category: 'html-elements' },
  { id: 'header-1', original: 'header', scrambled: 'redaeh', mode: 'html-css', difficulty: 'medium', category: 'html-elements' },
  
  // CSS Properties
  { id: 'color-1', original: 'color', scrambled: 'loroc', mode: 'html-css', difficulty: 'easy', category: 'css-properties' },
  { id: 'margin-1', original: 'margin', scrambled: 'nirgam', mode: 'html-css', difficulty: 'medium', category: 'css-properties' },
  { id: 'flex-direction-1', original: 'flex-direction', scrambled: 'xelf-noitcerid', mode: 'html-css', difficulty: 'hard', category: 'css-properties' },
];
```

### Ruby Methods Database
```typescript
// rubyMethods.ts
export const rubyMethods: Word[] = [
  // Array Methods
  { id: 'map-1', original: 'map', scrambled: 'pam', mode: 'ruby', difficulty: 'easy', category: 'array-methods' },
  { id: 'each-1', original: 'each', scrambled: 'hcae', mode: 'ruby', difficulty: 'easy', category: 'array-methods' },
  { id: 'select-1', original: 'select', scrambled: 'tceles', mode: 'ruby', difficulty: 'medium', category: 'array-methods' },
  
  // String Methods
  { id: 'gsub-1', original: 'gsub', scrambled: 'busg', mode: 'ruby', difficulty: 'medium', category: 'string-methods' },
  { id: 'downcase-1', original: 'downcase', scrambled: 'esacnwod', mode: 'ruby', difficulty: 'medium', category: 'string-methods' },
];
```

## Development Context

### Git Workflow
- **Strategy**: GitHub Flow (feature branches → main)
- **Branch naming**: `feature/character-selection`, `feature/timer-implementation`
- **Commits**: Small, focused commits with descriptive messages
- **Repository**: Individual GitHub repository

### Current Development Status
- **Timeline**: 2-week development sprint
- **Current Phase**: Routing setup and page structure
- **Next Milestone**: Core game mechanics implementation
- **Environment**: Windows + VS Code + dev container setup

### Code Conventions
- **React**: Functional components with hooks
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind utility-first approach with DaisyUI components
- **File naming**: PascalCase for components, camelCase for utilities
- **Import organization**: External libs → Internal components → Types/Utils

### Performance Considerations
- **React optimization**: Use React.memo for character buttons
- **State management**: useReducer for complex game state
- **Bundle optimization**: Code splitting for different game modes
- **Local storage**: Efficient high score and settings persistence

## Library Usage Guidelines
- **Always use Context7 MCP** to retrieve the latest library information and usage patterns
- Prefer official documentation and examples
- Follow React 19 patterns and concurrent features when applicable
- Use TypeScript strict mode for type safety

## Hidden Files & Debugging
- Use **Bash tool** for finding hidden folders like `.tmp`, not List tool
- Debug using browser dev tools and React DevTools
- Firebase debugging through Firebase console and emulator suite (future)