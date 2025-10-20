# NDIS Platform

A comprehensive web application for managing National Disability Insurance Scheme (NDIS) services, participants, scheduling, timesheets, claims, and financial operations.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account (for database and storage)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ndis-platform
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up Supabase project**

   ```bash
   # Create a new Supabase project at https://supabase.com
   # Or use existing project
   ```

4. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

5. **Configure your environment**
   Edit `.env.local` with your Supabase values (see Environment Setup below)

6. **Set up the database**

   ```bash
   # Run migrations (connects to your Supabase database)
   pnpm db:migrate

   # (Optional) Seed with sample data
   pnpm db:seed
   ```

7. **Start development server**
   ```bash
   pnpm dev
   ```

Visit `http://localhost:3000` to access the application.

## 🔧 Environment Setup

### Setting up Supabase

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com) and create an account
   - Create a new project
   - Wait for the project to be fully provisioned

2. **Get your Supabase credentials:**
   - Go to Project Settings > API
   - Copy the Project URL and anon/public key
   - Go to Project Settings > Database
   - Copy the database password

3. **Set up Supabase Storage (optional):**
   - Go to Storage in your Supabase dashboard
   - Create buckets for file uploads (e.g., 'uploads', 'documents')

### Creating Your Environment File

1. **Copy the example file:**

   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with your Supabase values**

### Required Environment Variables

#### Supabase Configuration

```env
SUPABASE_URL="https://your-project-ref.supabase.co"
SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
DATABASE_URL="postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres"
```

- **SUPABASE_URL:** Found in Project Settings > API
- **SUPABASE_ANON_KEY:** Public key (safe for client-side)
- **SUPABASE_SERVICE_ROLE_KEY:** Secret key (server-side only!)
- **DATABASE_URL:** Use format shown, replace with your project ref and password

#### Authentication

```env
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

- **NEXTAUTH_SECRET:** Generate with `openssl rand -base64 32`
- **NEXTAUTH_URL:** Your application URL (localhost:3000 for development)

#### Storage Configuration

```env
SUPABASE_STORAGE_BUCKET="uploads"
```

- **SUPABASE_STORAGE_BUCKET:** Name of your Supabase storage bucket

#### Email Configuration (Optional)

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

- Configure if you need email functionality
- **Gmail:** Use App Passwords (not your regular password)

#### Monitoring (Optional)

```env
SENTRY_DSN="https://your-dsn@sentry.io/project-id"
```

- **Sentry:** Create project at [sentry.io](https://sentry.io) and copy DSN

### Environment Validation

The application will validate required environment variables on startup. Missing required variables will cause the application to fail with clear error messages.

### Environment-Specific Configuration

- **Development:** Use `.env.local` for local development
- **Staging:** Use deployment platform environment variables
- **Production:** Use secure secret management (see CI/CD setup)

## 🚀 Deployment

### CI/CD Setup

#### GitHub Actions Secrets

Set these secrets in your GitHub repository settings:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
DATABASE_URL=postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://yourdomain.com
SUPABASE_STORAGE_BUCKET=uploads
SENTRY_DSN=https://your-dsn@sentry.io/project-id
# Optional: SMTP configuration
```

#### Environment Variables by Platform

**Vercel:**

- Set variables in Project Settings > Environment Variables
- Use Supabase environment variables for all environments

**Railway:**

- Set variables in Project Variables section
- Supabase handles database hosting automatically

**Netlify:**

- Set variables in Site Settings > Environment Variables
- Use Supabase for both database and functions

**Docker (with Supabase):**

```env
# docker-compose.yml
environment:
  - SUPABASE_URL=https://your-project-ref.supabase.co
  - SUPABASE_ANON_KEY=your-anon-key
  - SUPABASE_SERVICE_ROLE_KEY=your-service-key
  - DATABASE_URL=postgresql://postgres:password@db.project-ref.supabase.co:5432/postgres
  - NEXTAUTH_SECRET=your-secret
  # ... other variables
```

### Database Deployment

```bash
# Run migrations (connects to your Supabase database)
pnpm db:migrate

# For production with Supabase:
# - Database is automatically managed by Supabase
# - Automatic backups and scaling included
# - Use Supabase dashboard for database management
# - Row Level Security (RLS) policies can be configured in Supabase
```

## 🏗️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:migrate       # Run database migrations
pnpm db:push          # Push schema changes (development)
pnpm db:seed          # Seed database with sample data
pnpm db:studio        # Open Prisma Studio

# Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm type-check       # TypeScript type checking
pnpm test             # Run tests
pnpm test:coverage    # Run tests with coverage

# Utilities
pnpm clean            # Clean build artifacts
```

### Project Structure

```
ndis-platform/
├── apps/
│   └── web/                 # Next.js application
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── validation/          # Zod schemas
│   ├── config/              # Shared configuration
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   └── database/            # Prisma database layer
├── .github/workflows/       # CI/CD pipelines
└── docs/                    # Documentation
```

### Code Quality

- **TypeScript:** Strict mode enabled
- **ESLint:** Configured for React/Next.js
- **Prettier:** Consistent code formatting
- **Testing:** Vitest with React Testing Library
- **Coverage:** Minimum 80% coverage required

## 🔒 Security

### Environment Variables Security

- Never commit `.env.local` or `.env.*.local` files
- Use strong, unique secrets for production
- Rotate secrets regularly
- Use secret management services in production

### Authentication

- NextAuth.js with JWT tokens
- Role-Based Access Control (RBAC)
- Session management with secure cookies
- Password hashing with bcrypt

### Data Protection

- PostgreSQL with SSL connections
- Sensitive data encryption at rest
- Audit logging for all changes
- NDIS compliance for participant data

## 📊 Monitoring

### Error Tracking

- Sentry integration for error monitoring
- Performance monitoring
- User feedback collection

### Logging

- Structured logging with context
- Log levels: error, warn, info, debug
- Centralized log aggregation (optional)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes with tests
3. Run quality checks: `pnpm lint && pnpm test`
4. Submit a pull request

### Commit Message Format

```
feat: add user authentication
fix: resolve timesheet calculation bug
docs: update API documentation
```

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the documentation in `/docs`
- Create an issue in the repository
- Contact the development team

## 🔄 Version History

- **v1.0.0:** Initial release with core NDIS functionality
- Complete participant management
- Scheduling and timesheet processing
- Claims and financial management
- Comprehensive UI component library
