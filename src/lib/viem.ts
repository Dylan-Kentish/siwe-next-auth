import type { Chain } from 'viem';
import { fallback, http } from 'viem';
import { mainnet } from 'viem/chains';

import { env } from '@/env.mjs';

export const transports = {
  [mainnet.id]: fallback([
    ...env.NEXT_PUBLIC_ALCHEMY_API_KEY.split(',').map(k =>
      http(`https://eth-mainnet.g.alchemy.com/v2/${k}`)
    ),
    http(),
  ]),
} as const;

export type SupportedChain = Chain & {
  id: keyof typeof transports;
};
