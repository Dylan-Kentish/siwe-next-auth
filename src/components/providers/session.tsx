'use client';

import React, { PropsWithChildren } from 'react';

import { SessionProvider as SessionProviderInternal } from 'next-auth/react';

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <SessionProviderInternal>{children}</SessionProviderInternal>
);
