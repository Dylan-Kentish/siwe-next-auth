'use client';

import React from 'react';

import { useLogout } from '@/hooks/useLogout';

import { Button } from '../ui/button';

export const LogoutButton: React.FC = () => {
  const { logoutAsync } = useLogout();

  const handleClick = async () => {
    await logoutAsync().catch(console.error);
  };

  return (
    <Button size="lg" onClick={handleClick}>
      Logout
    </Button>
  );
};
