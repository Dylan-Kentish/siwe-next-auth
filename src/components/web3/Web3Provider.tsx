import { configureChains, createConfig, sepolia, mainnet, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { env } from "@/env.mjs";

import type { PropsWithChildren } from "react";
// eslint-disable-next-line no-duplicate-imports
import React from "react";

const apiKey = env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const chainId = env.NEXT_PUBLIC_CHAIN_ID;
const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const chain = chainId === "1" ? mainnet : sepolia;

const keys = apiKey.split(",");

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [chain],
  [...keys.map(k => alchemyProvider<typeof chain>({ apiKey: k })), publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, version: 2, projectId }),
  publicClient,
  webSocketPublicClient,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(config, chains);

const Web3Provider: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <WagmiConfig config={config}>{children}</WagmiConfig>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>
);

export { Web3Provider };
