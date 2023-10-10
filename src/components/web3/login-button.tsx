'use client';

import React, { useState } from 'react';

import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react';
import { useSession } from 'next-auth/react';
import { useAccount, useDisconnect } from 'wagmi';

import { useLogin } from '@/hooks/useLogin';

import { Button } from '../ui/button';

export const LoginButton: React.FC = () => {
  const { loginAsync } = useLogin();
  const { status: sessionStatus } = useSession();
  const { open } = useWeb3Modal();
  const { open: isOpen } = useWeb3ModalState();
  const { disconnectAsync } = useDisconnect();
  const [disabled, setDisabled] = useState(false);

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

  function handleClick() {
    open().catch(console.error);
  }

  return (
    <Button
      size="lg"
      onClick={handleClick}
      disabled={sessionStatus === 'loading' || isOpen || disabled}
    >
      Login
    </Button>
  );
};
