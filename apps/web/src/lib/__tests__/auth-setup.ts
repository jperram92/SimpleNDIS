// Setup file for auth tests
jest.mock('next-auth/providers/credentials', () => ({
  default: jest.fn(() => ({
    id: 'credentials',
    name: 'credentials',
    type: 'credentials',
    authorize: jest.fn(),
  })),
}));

jest.mock('@auth/prisma-adapter', () => ({
  PrismaAdapter: jest.fn(() => ({})),
}));

jest.mock('@ndis/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));
