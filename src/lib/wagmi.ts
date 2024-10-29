import { mainnet } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { cookieStorage, createStorage } from 'wagmi';

import { env } from '@/env.mjs';

export const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const config = new WagmiAdapter({
  networks: [mainnet],
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
