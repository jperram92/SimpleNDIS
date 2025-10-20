import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '../components/AuthProvider';
import AppShell from '../components/AppShell';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simple NDIS',
  description: 'NDIS Management System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
