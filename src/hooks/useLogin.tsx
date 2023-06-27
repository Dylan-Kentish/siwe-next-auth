import { env } from '@/env.mjs';
import { getCsrfToken, signIn } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { useSignMessage } from 'wagmi';

const chainId = env.NEXT_PUBLIC_CHAIN_ID;

export const useLogin = () => {
  const { signMessageAsync } = useSignMessage();

  async function loginAsync(address: string) {
    try {
      const callbackUrl = '/';
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: +chainId,
        nonce: await getCsrfToken(),
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      if (!signature) {
        throw new Error('Signature is empty');
      }

      const response = await signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });

      if (!response) {
        throw new Error('Response is empty');
      }

      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log('error', error);
      return Promise.reject(error);
    }
  }

  return { loginAsync };
};
