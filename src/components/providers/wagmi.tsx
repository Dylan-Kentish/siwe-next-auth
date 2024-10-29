'use client';

import type { ReactNode } from 'react';

import { createAppKit } from '@reown/appkit/react';
import { mainnet } from 'viem/chains';
import { type State, WagmiProvider } from 'wagmi';

import { siweConfig } from '@/lib/siwe';
import { config, projectId } from '@/lib/wagmi';

const metadata = {
  name: 'SIWE + Next Auth',
  description: 'SIWE + Next Auth Example',
  url: 'https://siwe-next-auth.vercel.app',
  icons: ['https://siwe-next-auth.vercel.app/siwe.png'],
};

// Create modal
createAppKit({
  siweConfig,
  adapters: [config],
  networks: [mainnet],
  metadata: metadata,
  projectId,
  features: {
    email: false,
    socials: [],
    onramp: false,
  },
});

function ContextProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config.wagmiConfig} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
}

export { ContextProvider as WagmiProvider };
