# Technical Stack

## Frontend
- **Next.js 15.4.6**: App Router with React 19.1.0
- **TypeScript 5.0**: Strict mode disabled temporarily 
- **Tailwind CSS v4**: Utility-first CSS framework
- **Lucide React**: Icon library

## Backend & Database  
- **NextAuth.js 4.24.11**: Google OAuth authentication
- **Prisma 6.14.0**: PostgreSQL ORM with client generation
- **PostgreSQL**: Production database
- **API Routes**: Next.js server-side API endpoints

## Development Tools
- **ESLint**: Next.js configuration with TypeScript support
- **Prettier**: Code formatting with specific rules
- **TSX**: TypeScript execution for scripts (Prisma seeding)

## Architecture
- **App Router Structure**: Modern Next.js routing with layouts
- **Server Components**: Default server-side rendering
- **Component Organization**: 
  - `components/game/` - Game-specific components
  - `components/ui/` - Reusable UI components
  - `components/auth/` - Authentication components
- **Type Safety**: Comprehensive TypeScript types in `types/` directory
- **Database**: Prisma schema with User and GameRecord models

## Deployment
- **Platform**: Configured for Vercel with Docker optimization
- **Build**: Standalone output for containerization
- **Environment**: PostgreSQL database with connection pooling