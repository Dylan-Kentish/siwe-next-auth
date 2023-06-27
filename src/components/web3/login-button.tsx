import React from 'react';
import { useSession } from 'next-auth/react';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { useLogin } from '@/hooks/useLogin';
import { Button } from '../button';

const LoginButton: React.FC = () => {
  const { loginAsync } = useLogin();
  const { status: sessionStatus } = useSession();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const { status } = useAccount({
    onConnect: ({ address }) => {
      if (!address || sessionStatus === 'loading') {
        return;
      }

      loginAsync(address).catch(err => {
        console.error(err);
        disconnect();
      });
    },
  });

  return (
    <Button onClick={open} disabled={status !== 'disconnected' || sessionStatus === 'loading'}>
      Login
    </Button>
  );
};

export default LoginButton;
