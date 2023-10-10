'use client';

import React, { Suspense } from 'react';

import { useSession } from 'next-auth/react';

import { LoginButton } from './web3/login-button';
import { LogoutButton } from './web3/logout-button';

export const AccountButton: React.FC = () => {
  const { data: session } = useSession();

  return session ? (
    <LogoutButton />
  ) : (
    <Suspense>
      <LoginButton />
    </Suspense>
  );
};
