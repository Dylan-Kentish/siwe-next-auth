'use client';

import type { ReactNode } from 'react';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { mainnet } from 'viem/chains';
import { type State, WagmiProvider } from 'wagmi';

import { siweConfig } from '@/lib/siwe';
import { config, projectId } from '@/lib/wagmi';

// Create modal
createWeb3Modal({
  siweConfig,
  wagmiConfig: config,
  projectId,
  defaultChain: mainnet,
});

function ContextProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
}

export { ContextProvider as WagmiProvider };
