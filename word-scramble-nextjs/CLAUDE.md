# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
**Word Scramble Game** - A word unscrambling challenge game with two specialized modes for programming education. Players rearrange scrambled characters to form correct words under time pressure in a continuous challenge format.

### Core Concept
- **Word unscrambling**: Rearrange scattered characters to form correct words
- **Continuous challenge**: Play until one mistake (streak-based scoring)
- **Time pressure**: 15-second limit per question with early submission
- **Interactive controls**: Click-to-select and drag-and-drop functionality
- **Dual learning modes**: HTML/CSS and Ruby methods for programming education

### Game Mechanics
- **Basic Rules**:
  - Rearrange scrambled characters into correct words
  - Continuous challenge format (game ends on first mistake)
  - 15-second time limit per question
  - Early solving allowed (no need to wait full 15 seconds)

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
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + DaisyUI
- **Routing**: Next.js App Router
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL + Prisma ORM
- **Development**: Docker + WSL2 環境
- **Deployment**: Vercel (推奨) / Firebase Hosting

### Technology Choice: Next.js
**Reasons for Next.js Migration**:
- **Full-stack capabilities**: API routes for user authentication and data management
- **App Router**: Modern routing with server components and layouts
- **Performance optimization**: Built-in image optimization, code splitting
- **SEO benefits**: Server-side rendering for better search visibility
- **Database integration**: Prisma ORM with PostgreSQL for user data and statistics
- **Authentication**: NextAuth.js for user registration and session management

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

### Docker Environment
```bash
# Start development environment
docker compose up -d

# Rebuild containers (after config changes)
docker compose up --build --no-cache -d

# View logs
docker compose logs shufflemoji-web -f

# Stop containers
docker compose down
```

### Next.js Development
```bash
# Start development server (inside container)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Install dependencies
npm install

# Type checking
npm run type-check
```

### Database Operations
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
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
app/
├── page.tsx                # Root page (mode selection)
├── game/
│   └── [mode]/
│       └── page.tsx        # Dynamic game page (/game/html-css, /game/ruby)
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts    # NextAuth API routes
├── layout.tsx              # Root layout
└── globals.css             # Global styles
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

### URL Pattern (Next.js App Router)
- **Top Page**: `/` - Game mode selection with instructions
- **HTML/CSS Mode**: `/game/html-css` - HTML/CSS terms game
- **Ruby Mode**: `/game/ruby` - Ruby methods game  
- **Authentication**: `/api/auth/*` - NextAuth.js endpoints
- **Dynamic Routes**: `/game/[mode]` - Mode-specific game pages

### State Management
- **Mode Selection**: Dynamic routes (`params.mode`)
- **Game State**: React hooks + local storage
- **User Session**: NextAuth.js session management
- **Database State**: Prisma ORM + PostgreSQL

## Development Context

### Git Workflow
- **Strategy**: GitHub Flow (feature branches → main)
- **Branch naming**: `feature/character-selection`, `feature/timer-implementation`
- **Commits**: Small, focused commits with descriptive messages
- **Repository**: Individual GitHub repository

### Current Development Status
- **Timeline**: Next.js移行フェーズ完了 ✅
- **Current Phase**: Full-stack development ready
- **Recent Achievement**: 
  - ✅ **Next.js環境移行完了**: React→Next.js移行成功
  - ✅ **Docker環境構築**: WSL2 + Alpine Linux + Node.js 18
  - ✅ **Bus Error解決**: プロジェクト分離とメモリ最適化により解決
  - ✅ **認証基盤**: NextAuth.js + PostgreSQL + Prisma設定完了
  - ✅ **既存機能移行**: ゲームロジックとコンポーネントをNext.jsに移植
- **Next Milestone**: ユーザー登録機能とスコア履歴システムの実装
- **Environment**: Docker + WSL2 + Next.js + PostgreSQL

### Branch Status
- **Current Branch**: `34_game_page_routing`
- **Main Branch**: `main`
- **Recent Work**: Next.js移行とDocker環境構築完了

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

## Environment Setup

### WSL2 Configuration
**File**: `C:\Users\<username>\.wslconfig`
```ini
[wsl2]
memory=8GB
processors=4
swap=4GB
localhostForwarding=true

[experimental]
autoMemoryReclaim=gradual
```

### Docker Environment
- **Base Image**: `node:18-alpine` (軽量・安定性重視)
- **Container Names**: `shufflemoji-web`, `shufflemoji-postgres`
- **Network**: `shufflemoji_network`
- **Database**: `shufflemoji_development`

### Bus Error解決経緯
**問題**: WSL2 + Docker環境でNext.jsがSIGBUS errorで起動失敗

**解決策**:
1. **プロジェクト分離**: React/Next.js混在環境の分離
2. **メモリ最適化**: 不要ファイル除外で802MB→3MB転送量削減
3. **WSL2設定**: memory=8GB, autoMemoryReclaim=gradual
4. **Alpine Linux**: 軽量ベースイメージでメモリ効率化

## Library Usage Guidelines
- **Next.js 15**: App Router、Server Components活用
- **NextAuth.js**: 認証・セッション管理
- **Prisma**: Type-safe database access
- **TypeScript**: Strict mode enabled
- 公式ドキュメント優先、最新パターン採用

## Debugging & Development
- **Browser**: React DevTools, Next.js DevTools
- **Database**: Prisma Studio (`npx prisma studio`)
- **Container Logs**: `docker compose logs shufflemoji-web -f`
- **Authentication**: NextAuth.js debug mode
- **WSL2 Memory**: `free -h` でメモリ使用量確認