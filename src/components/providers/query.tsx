'use client';

import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

const queryClient = new QueryClient();

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
  </QueryClientProvider>
);
