'use client';

import React, { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);
