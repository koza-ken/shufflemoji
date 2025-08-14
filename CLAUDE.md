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
│   ├── GamePage.tsx        # Main game interface (mode-aware)
│   ├── ResultPage.tsx      # Game over screen with stats
│   └── NotFoundPage.tsx    # 404 error page
├── components/
│   ├── game/               # Game-specific components
│   │   ├── HTMLCSSQuestion.tsx  # HTML/CSS mode question display
│   │   ├── RubyQuestion.tsx     # Ruby mode question display
│   │   ├── Answer.tsx           # Answer input with drag & drop
│   │   ├── Header.tsx           # Game header (timer, count)
│   │   ├── Hint.tsx             # Educational hint display
│   │   └── GuideModal.tsx       # Game instructions modal
│   ├── ui/                 # Reusable UI components (Future)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── LoadingSpinner.tsx
│   └── layout/             # Layout components (Future)
│       ├── Header.tsx
│       └── Footer.tsx
├── hooks/                  # Custom React hooks
│   ├── useModal.ts         # Modal state management
│   ├── use-timer.ts        # Timer functionality
│   └── useDragDrop.ts      # Drag and drop interactions (Future)
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
// Current Implementation
export type GameMode = 'html-css' | 'ruby';

export type Word = {
  id: string;
  original: string;      // Correct word/term (e.g., "div")
  mode: GameMode;
  category: string;      // 'HTML', 'CSS', or 'ruby'
  hint: string;          // Educational hint text (60+ characters)
}

export type GameWord = Word & {
  scrambled: string;     // Dynamically generated scrambled version
}

export type AllChars = {
  char: string;
  id: string;
  isSelected: boolean;
}

export type SelectedChars = {
  char: string;
  id: string;
}

// Game State (Current Implementation)
interface GamePageState {
  currentWord: GameWord | null;
  questionCount: number;
  selectedChars: { char: string; id: string }[];
  currentAnswer: string;
  draggedIndex: number | null;    // For drag & drop
  dragOverIndex: number | null;   // For visual feedback
  isAnswered: boolean;
  isCorrect: boolean | null;
}

// Future Implementation
interface GameResult {
  streak: number;
  mode: 'html-css' | 'ruby';
  totalTime: number;
  completedAt: Date;
  wordsCompleted: Word[];
}
```

## Feature Implementation Priorities

### Phase 1: Core Game (Priority: High)
- [x] Project setup with routing
- [x] Word data structure and sample HTML/CSS data
- [x] Basic game interface with character display
- [x] Word validation and answer checking
- [x] Game progression (next question functionality)
- [x] Timer implementation with Header component
- [x] Hint system with educational content
- [x] **Drag and drop character reordering** ✨
- [x] Selection reset functionality
- [x] **Mode selection with URL parameters** (/game/html-css, /game/ruby)
- [x] **Ruby methods database** (100 methods with hints)
- [x] **HTML/CSS terms database** (100 terms with hints)
- [x] **Mode-specific question components**
- [ ] Streak tracking and game over logic
- [ ] Local high score storage

### Phase 2: Enhanced UX (Priority: Medium)
- [x] **Advanced drag & drop with visual feedback** ✨
- [x] **Game instructions modal** (遊び方)
- [x] **Mode-specific UI styling** (blue for HTML/CSS, red for Ruby)
- [x] Smooth animations and transitions
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

### HTML/CSS Terms Database (100 terms)
```typescript
// htmlCssTerms.ts
export const htmlCssTerms: Word[] = [
  // HTML Elements (31 terms)
  {
    id: 'div-1',
    original: 'div',
    mode: 'html-css',
    category: 'HTML',
    hint: 'HTMLで最もよく使われるブロック要素。コンテンツをグループ化してレイアウトを作ったり、CSSでスタイリングするための汎用的なコンテナとして利用される。'
  },
  // ... 30 more HTML elements
  
  // CSS Properties (69 terms)
  {
    id: 'color-1',
    original: 'color',
    mode: 'html-css', 
    category: 'CSS',
    hint: 'テキストの文字色を指定するCSSプロパティ。16進数カラーコード、RGB値、色名などで指定でき、要素の前景色を変更する基本的なスタイル設定。'
  },
  // ... 68 more CSS properties
];

export const getRandomHtmlCssTerm = (): GameWord => {
  const randomIndex = Math.floor(Math.random() * htmlCssTerms.length);
  const word = htmlCssTerms[randomIndex];
  return {
    ...word,
    scrambled: scrambleWord(word.original)
  };
};
```

### Ruby Methods Database (100 methods)
```typescript
// rubyMethods.ts
export const rubyMethods: Word[] = [
  // Array Methods
  {
    id: 'map-1',
    original: 'map',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の各要素に対してブロック内の処理を実行し、その結果を新しい配列として返すイテレータメソッド'
  },
  // ... 99 more Ruby methods covering:
  // - Array Methods, String Methods, Hash Methods
  // - Basic Concepts, Object/Class Methods
  // - Type Checking, Flow Control, Enumerable Methods
];

export const getRandomRubyMethod = (): GameWord => {
  const randomIndex = Math.floor(Math.random() * rubyMethods.length);
  const word = rubyMethods[randomIndex];
  return {
    ...word,
    scrambled: scrambleWord(word.original)
  };
};
```

## Routing Structure

### URL Pattern
- **Top Page**: `/` - Game mode selection with instructions
- **HTML/CSS Mode**: `/game/html-css` - HTML/CSS terms game
- **Ruby Mode**: `/game/ruby` - Ruby methods game  
- **Results**: `/result` - Game over screen with statistics
- **404**: `/*` - Not found page

### State Management
- **Mode Selection**: URL parameters (`useParams`)
- **Game State**: Local component state with hooks
- **Result Data**: React Router state passing

## Development Context

### Git Workflow
- **Strategy**: GitHub Flow (feature branches → main)
- **Branch naming**: `feature/character-selection`, `feature/timer-implementation`
- **Commits**: Small, focused commits with descriptive messages
- **Repository**: Individual GitHub repository

### Current Development Status
- **Timeline**: 2-week development sprint  
- **Current Phase**: Dual-mode game system completed ✅
- **Recent Achievement**: 
  - URL-based mode selection (/game/html-css, /game/ruby)
  - 100 HTML/CSS terms with educational hints
  - 100 Ruby methods with educational hints
  - Mode-specific question components
  - Game instructions modal
- **Next Milestone**: User registration and score history system
- **Environment**: Windows + VS Code + dev container setup

### Branch Status
- **Current Branch**: `16_GamePage_component_arrange`  
- **Main Branch**: `main`
- **Recent Work**: Dual-mode implementation with URL parameters

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