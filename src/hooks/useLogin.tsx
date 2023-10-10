import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getCsrfToken, signIn } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { useSignMessage } from 'wagmi';

import { env } from '@/env.mjs';

const chainId = env.NEXT_PUBLIC_CHAIN_ID;

export const useLogin = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();

  async function loginAsync(address: string) {
    const callbackUrl = searchParams.get('callbackUrl') || `${path}?${searchParams}`;
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

    const response = await signIn('siwe', {
      message: JSON.stringify(message),
      redirect: false,
      signature,
    });

    if (!response) {
      throw new Error('Response is empty');
    }

    if (response.error) {
      throw new Error(response.error);
    }

    router.replace(callbackUrl);
  }

  return { loginAsync };
};
