'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import LogoutButton from './web3/logout-button';
import LoginButton from './web3/login-button';
import { Web3Provider } from './web3/web3-provider';

export const AccountButton: React.FC = () => {
  const { status } = useSession();

  return status === 'loading' ? (
    <div className="h-10 w-24 animate-pulse rounded-md bg-gray-500" />
  ) : (
    <Web3Provider>{status === 'authenticated' ? <LogoutButton /> : <LoginButton />}</Web3Provider>
  );
};
