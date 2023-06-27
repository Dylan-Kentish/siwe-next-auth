import React from 'react';
import { useSession } from 'next-auth/react';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { useLogin } from '@/hooks/useLogin';
import { Button } from '../button';

const LoginButton: React.FC = () => {
  const { loginAsync } = useLogin();
  const { status: sessionStatus } = useSession();
  const { open, isOpen } = useWeb3Modal();
  const { disconnectAsync } = useDisconnect();
  const [disabled, setDisabled] = React.useState(false);

  useAccount({
    onConnect: ({ address }) => {
      if (!address || sessionStatus === 'loading') {
        return;
      }

      setDisabled(true);

      loginAsync(address).catch(err => {
        disconnectAsync().then(() => setDisabled(false), console.error);
        console.error(err);
      });
    },
  });

  return (
    <Button onClick={open} disabled={sessionStatus === 'loading' || isOpen || disabled}>
      Login
    </Button>
  );
};

export default LoginButton;
