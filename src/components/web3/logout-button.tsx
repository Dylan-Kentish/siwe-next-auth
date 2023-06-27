import React from 'react';
import { useLogout } from '@/hooks/useLogout';

const LogoutButton: React.FC = () => {
  const { logoutAsync } = useLogout();

  const handleClick = async () => {
    await logoutAsync().catch(console.error);
  };

  return (
    <button className="rounded-md bg-white px-6 py-2" onClick={handleClick}>
      Logout
    </button>
  );
};

export default LogoutButton;
