import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { env } from '@/env.mjs';

import { transports } from './viem';

export const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const metadata = {
  name: 'SIWE + Next Auth',
  description: 'SIWE + Next Auth Example',
  url: 'https://siwe-next-auth.vercel.app',
  icons: ['https://siwe-next-auth.vercel.app/siwe.png'],
};

export const config = defaultWagmiConfig({
  chains: [mainnet],
  projectId,
  metadata,
  ssr: true,
  transports,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
