# Code Style and Conventions

## Language and Documentation Rules
- **Internal thinking**: English (for optimal Claude Code performance)
- **User responses**: Japanese
- **Code documentation (JSDoc, interfaces)**: English
- **Inline code comments**: English for technical descriptions  
- **Implementation reasoning comments**: Japanese for context
- **No emojis** in code or documentation

## Japanese Text Formatting
- No unnecessary spaces in Japanese text
- ✅ Correct: `Claude Code入門`
- ❌ Incorrect: `Claude Code 入門`

## Code Formatting (Prettier Configuration)
```json
{
  "semi": true,
  "trailingComma": "es5", 
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## TypeScript Configuration
- **Strict mode**: Currently disabled (`"strict": false`)
- **Path mapping**: `@/*` points to project root
- **Module resolution**: Bundler mode
- **Build errors**: Temporarily ignored in Next.js config

## Component Organization
- **Game components**: `components/game/` - Mode-specific game logic
- **UI components**: `components/ui/` - Reusable interface elements
- **Auth components**: `components/auth/` - Authentication-related
- **Type definitions**: `types/` directory with domain-specific files

## Naming Conventions  
- **Files**: PascalCase for React components (`UserProfile.tsx`)
- **Directories**: kebab-case for routes (`auth/signin/`)
- **Types**: PascalCase (`GameMode`, `GameWord`)
- **Variables**: camelCase (`gameEndReason`, `correctAnswers`)

## Import/Export Patterns
- **Default exports**: For React components and pages
- **Named exports**: For utility functions and types
- **Path imports**: Use `@/` prefix for project-relative imports