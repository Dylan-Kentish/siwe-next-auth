import React from 'react';

import { getServerSession } from '@/app/api/auth/options';

import { LoginButton } from './web3/login-button';
import { LogoutButton } from './web3/logout-button';

export const AccountButton: React.FC = async () => {
  const session = await getServerSession();

  return session ? <LogoutButton /> : <LoginButton />;
};
