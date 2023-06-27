import React from 'react';
import { useSession } from 'next-auth/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Web3Button } from '@web3modal/react';
import { useLogin } from '@/hooks/useLogin';

const LoginButton: React.FC = () => {
  const { loginAsync } = useLogin();
  const { status } = useSession();
  const { disconnect } = useDisconnect();

  useAccount({
    onConnect: ({ address }) => {
      if (!address || status === 'loading') {
        return;
      }

      loginAsync(address).catch(err => {
        console.error(err);
        disconnect();
      });
    },
  });

  return <Web3Button />;
};

export default LoginButton;
