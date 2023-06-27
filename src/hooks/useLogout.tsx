import { signOut } from 'next-auth/react';
import { useDisconnect } from 'wagmi';

export const useLogout = () => {
  const { disconnect } = useDisconnect();

  async function logoutAsync() {
    try {
      await signOut();
      disconnect();
    } catch (error) {
      console.log('error', error);
      await Promise.reject(error);
    }
  }

  return { logoutAsync };
};
