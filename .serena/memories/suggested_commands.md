# Essential Development Commands

## Development Workflow
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server  
npm start

# Lint code (ESLint with Next.js config)
npm run lint
```

## Database Management
```bash
# Generate Prisma client (runs automatically on npm install)
npx prisma generate

# Apply schema changes to database
npx prisma db push

# Open Prisma Studio for database inspection
npx prisma studio

# Seed database with initial data
npm run db:seed

# Reset database (development only)
npx prisma migrate reset
```

## Code Quality
```bash
# Lint TypeScript and React code
npm run lint

# Format code (if Prettier script available)
# Note: Project has .prettierrc config but no format script in package.json
```

## System Commands (Linux)
```bash
# File operations
ls -la          # List files with details
find . -name    # Find files by pattern
grep -r         # Search in files recursively

# Git operations  
git status      # Check working directory status
git add .       # Stage all changes
git commit -m   # Commit with message
git push        # Push to remote repository
```

## Key Files to Monitor
- `package.json` - Dependencies and scripts
- `prisma/schema.prisma` - Database schema
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `.env.example` - Environment variables template