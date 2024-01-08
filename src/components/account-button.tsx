'use client';

import React from 'react';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useSession } from 'next-auth/react';

import { Button } from './ui/button';

export const AccountButton: React.FC = () => {
  const { open } = useWeb3Modal();
  const { status } = useSession();

  function handleClick() {
    open().catch(console.error);
  }

  return (
    <Button size="lg" onClick={handleClick}>
      {status === 'authenticated' ? 'Connected' : 'Connect'}
    </Button>
  );
};
