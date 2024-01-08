'use client';

import { createSIWEConfig } from '@web3modal/siwe';
import { getCsrfToken, getSession, signIn, signOut } from 'next-auth/react';
import { SiweMessage } from 'siwe';

export const siweConfig = createSIWEConfig({
  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      nonce,
      chainId,
      address,
      version: '1',
      uri: window.location.origin,
      domain: window.location.host,
      statement: 'Sign In With Ethereum to prove you control this wallet.',
    }).prepareMessage();
  },
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
    try {
      const success = await signIn('siwe', {
        message,
        redirect: false,
        signature,
        callbackUrl: '/',
      });

      return Boolean(success?.ok);
    } catch (error) {
      return false;
    }
  },
  signOut: async () => {
    try {
      await signOut({
        redirect: false,
      });

      return true;
    } catch (error) {
      return false;
    }
  },
});
