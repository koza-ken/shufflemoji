# Task Completion Checklist

## After Completing Any Development Task

### 1. Code Quality Checks
```bash
# Run linting to check for code quality issues
npm run lint

# Build the project to check for TypeScript/build errors
npm run build
```

### 2. Database Integrity (if DB changes made)
```bash
# Ensure Prisma client is up to date
npx prisma generate

# Apply any schema changes
npx prisma db push
```

### 3. Manual Testing  
- Test functionality on desktop browser
- Test responsive behavior on mobile simulation
- Verify dark mode switching works correctly
- Test authentication flow (if auth-related changes)
- Check game functionality across all three modes (if game-related changes)

### 4. Git Workflow (if committing changes)
```bash
# Check status and stage files
git status
git add .

# Commit with descriptive message
git commit -m "feat: descriptive commit message"

# Push to remote (if ready)
git push
```

## Important Notes
- **Build errors are temporarily ignored** in `next.config.ts` for TypeScript and ESLint
- **No automated testing** is configured - rely on manual testing
- **Production deployment** uses Vercel with database migrations handled by Prisma
- **Branch naming**: Use descriptive names like `feature/responsive-design`

## Performance Considerations
- Verify loading states work properly with `ShamojiSpinner` component
- Test database query performance for rankings and history
- Check mobile touch interactions for game components
- Validate responsive design across different screen sizes