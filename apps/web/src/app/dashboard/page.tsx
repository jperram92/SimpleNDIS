import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabaseServerAdmin';

export const dynamic = 'force-dynamic';

async function getUserFromEnv() {
  try {
    const token = process.env.__SB_ACCESS_TOKEN__;
    if (!token) return null;
    const { data } = await supabaseAdmin.auth.getUser(token);
    return data.user
      ? {
          id: data.user.id,
          email: data.user.email || undefined,
          role: (data.user.user_metadata as Record<string, unknown> | undefined)?.role as
            | string
            | undefined,
        }
      : null;
  } catch (err) {
    return null;
  }
}

export default async function Dashboard() {
  const user = await getUserFromEnv();
  if (!user) redirect('/auth/signin');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Simple NDIS</h1>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.role}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
