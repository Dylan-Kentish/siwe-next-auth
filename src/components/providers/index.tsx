import React, { PropsWithChildren } from 'react';

import { SessionProvider } from './session';
import { WagmiProvider } from './wagmi';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <SessionProvider>
    <WagmiProvider>{children}</WagmiProvider>
  </SessionProvider>
);
