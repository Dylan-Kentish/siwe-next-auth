'use client';

import React, { PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';

import { EthereumProvider } from './web3/ethereum-provider';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <SessionProvider>
    <EthereumProvider>{children}</EthereumProvider>
  </SessionProvider>
);
