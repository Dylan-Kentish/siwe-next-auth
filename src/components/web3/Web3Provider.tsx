import { configureChains, createClient, goerli, mainnet, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { EthereumClient, modalConnectors } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { env } from "@/env.mjs";

import type { PropsWithChildren } from "react";
// eslint-disable-next-line no-duplicate-imports
import React from "react";

const apiKey = env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const chainId = env.NEXT_PUBLIC_CHAIN_ID;

const chain = chainId === "1" ? mainnet : goerli;

const keys = apiKey.split(",");

const { chains, provider, webSocketProvider } = configureChains(
  [chain],
  [
    ...keys.map((k, i) => alchemyProvider<typeof chain>({ apiKey: k, priority: i, weight: 1 })),
    publicProvider({ priority: keys.length, weight: 2 }),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
  webSocketProvider,
});

const ethereumClient = new EthereumClient(client, chains);

const Web3Provider: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <WagmiConfig client={client}>{children}</WagmiConfig>

    <Web3Modal
      projectId={env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}
      ethereumClient={ethereumClient}
    />
  </>
);

export { Web3Provider };
