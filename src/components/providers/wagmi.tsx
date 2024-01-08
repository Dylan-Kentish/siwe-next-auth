'use client';

import React, { type PropsWithChildren } from 'react';

import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { configureChains, createConfig, mainnet, WagmiConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { env } from '@/env.mjs';
import { siweConfig } from '@/lib/siwe';

const apiKey = env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const metadata = {
  name: 'SIWE + Next Auth',
  description: 'SIWE + Next Auth Example',
  url: 'https://siwe-next-auth.vercel.app',
  icons: ['https://siwe-next-auth.vercel.app/siwe.png'],
};

const keys = apiKey.split(',');

const chain = mainnet;

const { chains, publicClient } = configureChains(
  [chain],
  [
    ...keys.map(k => alchemyProvider<typeof chain>({ apiKey: k })),
    walletConnectProvider({ projectId }),
    publicProvider(),
  ]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } }),
  ],
  publicClient,
});

createWeb3Modal({
  siweConfig,
  wagmiConfig,
  projectId,
  chains,
});

export const WagmiProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
);
