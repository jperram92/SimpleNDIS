// Supabase session types used across the app (replaces next-auth augmentation)
declare global {
  namespace SupabaseAuth {
    interface User {
      id: string;
      email?: string | null;
      user_metadata?: Record<string, unknown>;
    }
    interface Session {
      user?: User | null;
    }
  }
}

export {};
