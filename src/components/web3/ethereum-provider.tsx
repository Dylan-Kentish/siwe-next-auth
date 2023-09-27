'use client';

import React, { type PropsWithChildren } from 'react';

import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, sepolia, mainnet, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { env } from '@/env.mjs';

const apiKey = env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const chainId = env.NEXT_PUBLIC_CHAIN_ID;
const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const chain = chainId === '1' ? mainnet : sepolia;

const keys = apiKey.split(',');

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [chain],
  [...keys.map(k => alchemyProvider<typeof chain>({ apiKey: k })), publicProvider()]
);

const config = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
  webSocketPublicClient,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(config, chains);

export const EthereumProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <WagmiConfig config={config}>{children}</WagmiConfig>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>
);
