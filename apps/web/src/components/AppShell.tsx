'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      roles: ['ADMIN', 'FINANCE', 'SCHEDULER', 'SUPPORT_WORKER'],
    },
    { name: 'Admin', href: '/admin', roles: ['ADMIN'] },
    { name: 'Finance', href: '/finance', roles: ['ADMIN', 'FINANCE'] },
    { name: 'Scheduler', href: '/scheduler', roles: ['ADMIN', 'SCHEDULER'] },
    { name: 'Support', href: '/support', roles: ['ADMIN', 'SUPPORT_WORKER'] },
  ];

  const filteredNavigation = navigation.filter((item) => item.roles.includes(userRole || ''));

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Simple NDIS</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {filteredNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-4">Role: {userRole}</span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default AppShell;
