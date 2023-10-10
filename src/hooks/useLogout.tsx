import { signOut } from 'next-auth/react';
import { useDisconnect } from 'wagmi';

export const useLogout = () => {
  const { disconnectAsync } = useDisconnect();

  async function logoutAsync() {
    await disconnectAsync();
    await signOut();
  }

  return { logoutAsync };
};
