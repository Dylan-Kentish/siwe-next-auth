'use client';

import { createSIWEConfig, formatMessage } from '@reown/appkit-siwe';
import { getCsrfToken, getSession, signIn, signOut } from 'next-auth/react';
import { mainnet } from 'viem/chains';

export const siweConfig = createSIWEConfig({
  getMessageParams: async () => ({
    uri: window.location.origin,
    domain: window.location.host,
    chains: [mainnet.id],
    statement: 'Sign In With Ethereum to prove you control this wallet.',
  }),
  createMessage: ({ address, ...args }) => formatMessage(args, address),
  getNonce: async () => {
    const nonce = await getCsrfToken();
    if (!nonce) {
      throw new Error('Failed to get nonce!');
    }

    return nonce;
  },
  getSession: async () => {
    const session = await getSession();
    if (!session) {
      throw new Error('Failed to get session!');
    }

    return {
      address: session.user.id,
      chainId: session.user.chainId,
    };
  },
  verifyMessage: async ({ message, signature }) => {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const callbackUrl = searchParams.get('callbackUrl') || `${path}?${searchParams}`;

    try {
      await signIn('siwe', {
        message,
        signature,
        callbackUrl,
      });

      return true;
    } catch {
      return false;
    }
  },
  signOut: async () => {
    try {
      const session = await getSession();
      console.log('session', session);

      // TODO: this is required because for some reason, clicking sign (message) calls signout...
      if (session) {
        await signOut();
      }

      return true;
    } catch {
      return false;
    }
  },
});
