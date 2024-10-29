'use client';

import React from 'react';

import { useAppKit } from '@reown/appkit/react';
import { useSession } from 'next-auth/react';

import { Button } from './ui/button';

export const AccountButton: React.FC = () => {
  const { open } = useAppKit();
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
