'use client';

import React from 'react';

// Minimal provider placeholder. We rely on client hooks to read Supabase session directly.
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
