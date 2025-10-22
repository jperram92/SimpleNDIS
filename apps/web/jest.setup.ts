import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '';
  },
}));

// Mock supabase client used by client code/tests
const mockSignIn = jest.fn();
const mockGetSession = jest.fn().mockResolvedValue({ data: { session: null } });
const mockOnAuth = jest.fn(() => ({ data: { subscription: { unsubscribe: () => {} } } }));
jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      signInWithPassword: () => mockSignIn(),
      getSession: () => mockGetSession(),
      onAuthStateChange: () => mockOnAuth(),
    },
  },
}));

// Mock PrismaAdapter
jest.mock('@auth/prisma-adapter', () => ({
  PrismaAdapter: jest.fn(() => ({
    createUser: jest.fn(),
    getUser: jest.fn(),
    getUserByEmail: jest.fn(),
    getUserByAccount: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    linkAccount: jest.fn(),
    unlinkAccount: jest.fn(),
    createSession: jest.fn(),
    getSessionAndUser: jest.fn(),
    updateSession: jest.fn(),
    deleteSession: jest.fn(),
    createVerificationToken: jest.fn(),
    useVerificationToken: jest.fn(),
  })),
}));

// Mock password utilities
jest.mock('./src/lib/utils/password', () => ({
  hashPassword: jest.fn(() => Promise.resolve(`hashed-${Date.now()}-${Math.random()}`)),
  verifyPassword: jest.fn((password, hash) => {
    // Simple mock logic: return true if password matches hash pattern, false otherwise
    if (!password || !hash) return Promise.resolve(false);
    if (hash === 'invalid-hash') return Promise.resolve(false);
    if (password === 'wrongPassword' || password === '' || password === 'wrong')
      return Promise.resolve(false);
    return Promise.resolve(true);
  }),
}));

// Mock environment variables
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'test-secret';

// Global test utilities
global.fetch = jest.fn();

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
