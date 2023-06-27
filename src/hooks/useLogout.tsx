import { signOut } from 'next-auth/react';
import { useDisconnect } from 'wagmi';

export const useLogout = () => {
  const { disconnect } = useDisconnect();

  async function logoutAsync() {
    await signOut();
    disconnect();
  }

  return { logoutAsync };
};
