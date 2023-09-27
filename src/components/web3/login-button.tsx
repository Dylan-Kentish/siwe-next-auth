'use client';

import React, { useState } from 'react';

import { useWeb3Modal } from '@web3modal/react';
import { useSession } from 'next-auth/react';
import { useAccount, useDisconnect } from 'wagmi';

import { useLogin } from '@/hooks/useLogin';

import { Button } from '../ui/button';

export const LoginButton: React.FC = () => {
  const { loginAsync } = useLogin();
  const { status: sessionStatus } = useSession();
  const { open, isOpen } = useWeb3Modal();
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

  return (
    <Button size="lg" onClick={open} disabled={sessionStatus === 'loading' || isOpen || disabled}>
      Login
    </Button>
  );
};
