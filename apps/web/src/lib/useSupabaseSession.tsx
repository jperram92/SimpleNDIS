'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type SupabaseSession = {
  user?: { id: string; email?: string | null; user_metadata?: Record<string, unknown> } | null;
};

export function useSupabaseSession() {
  const [session, setSession] = useState<SupabaseSession | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession({ user: data.session?.user ?? null });
    }

    load();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      // Re-fetch session on change
      supabase.auth
        .getSession()
        .then(({ data }) => setSession({ user: data.session?.user ?? null }));
    });

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  return { data: session };
}
