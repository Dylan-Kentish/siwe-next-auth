import React from 'react';
import { useLogout } from '@/hooks/useLogout';
import { Button } from '../button';

const LogoutButton: React.FC = () => {
  const { logoutAsync } = useLogout();

  const handleClick = async () => {
    await logoutAsync().catch(console.error);
  };

  return <Button onClick={handleClick}>Logout</Button>;
};

export default LogoutButton;
