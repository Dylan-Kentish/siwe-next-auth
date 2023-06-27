import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import '@/styles/globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// ====================

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={`${inter.variable} font-inter`}>
      <Providers>{children}</Providers>
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
