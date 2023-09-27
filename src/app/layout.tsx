import React from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import { Header } from '@/components/header';
import { Providers } from '@/components/providers';

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// ====================

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" className="dark min-h-screen">
    <body className={`${inter.variable} font-inter`}>
      <Providers>
        <main>
          <Header />
          <div className="flex h-full w-full items-start justify-center p-5 pt-[15vh]">
            {children}
          </div>
        </main>
      </Providers>
    </body>
  </html>
);

// ====================

const metadata: Metadata = {
  title: 'SIWE | NextAuth',
  description: 'Simple example of NextAuth with SIWE',
  icons: {
    icon: './favicon.ico',
  },
};

export { RootLayout as default, metadata };
