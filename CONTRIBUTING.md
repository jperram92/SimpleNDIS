# Contributing to NDIS Platform

Welcome! This document provides guidelines for contributing to the NDIS Platform monorepo.

## Monorepo Structure

This is a pnpm workspace monorepo using Turborepo for task orchestration. The structure is organized as follows:

```
ndis-platform/
├── apps/                    # Applications
│   └── web/                 # Next.js web application
├── packages/                # Shared packages
│   ├── ui/                  # Shared UI components
│   ├── validation/          # Zod validation schemas
│   ├── config/              # Shared configuration
│   ├── database/            # Prisma database layer
│   └── types/               # Shared TypeScript types
├── tooling/                 # Development tools
│   ├── eslint-config/       # Shared ESLint configuration
│   └── tsconfig/            # Shared TypeScript configuration
├── .github/workflows/       # CI/CD workflows
├── .changeset/              # Changeset configuration for versioning
└── .husky/                  # Git hooks
```

## Development Workflow

### Prerequisites

- Node.js 18+ and pnpm 8+
- Git

### Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment variables (copy `.env.example` to `.env.local`)
4. Run database migrations: `pnpm db:migrate`
5. Start development: `pnpm dev`

### Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all packages
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test` - Run tests
- `pnpm format` - Format code with Prettier
- `pnpm db:migrate` - Run database migrations
- `pnpm changeset` - Create a changeset for versioning

### Git Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and linting: `pnpm test && pnpm lint && pnpm typecheck`
4. Format code: `pnpm format`
5. Create a changeset if your changes affect package versions: `pnpm changeset`
6. Commit your changes with conventional commit messages
7. Push and create a pull request

### Conventional Commits

Use conventional commit format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks

Example: `feat: add user authentication`

### Code Quality

- All code must pass linting (`pnpm lint`)
- All code must pass type checking (`pnpm typecheck`)
- Tests must pass (`pnpm test`)
- Code must be formatted (`pnpm format`)

### Pre-commit Hooks

Pre-commit hooks are automatically installed and will run:

- ESLint linting
- TypeScript type checking

### Versioning and Releases

This project uses Changesets for automated versioning:

1. When making changes that affect package versions, run `pnpm changeset`
2. Select the packages and type of change (major, minor, patch)
3. Commit the changeset file
4. On merge to main, a release PR will be created automatically
5. Merge the release PR to publish packages

### Testing

- Write tests for new features
- Run tests locally: `pnpm test`
- CI will run tests on all pull requests

### Documentation

- Update documentation for any new features
- Keep code comments up to date
- Update this CONTRIBUTING.md if the development process changes

### Pull Request Process

1. Ensure all checks pass
2. Request review from maintainers
3. Address review feedback
4. Merge when approved

### Getting Help

- Check existing issues and documentation
- Ask questions in pull request comments
- Contact maintainers for guidance

Thank you for contributing to the NDIS Platform!
