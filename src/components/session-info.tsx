'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

export const SessionInfo: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="p-5 text-center">
      <p>Session:</p>
      <p className="truncate">
        Expires: {session?.expires && new Date(session?.expires).toLocaleString()}
      </p>
      <p>User:</p>
      <p className="truncate">ID: {session?.user?.id}</p>
      <p>Role: {session?.user?.role}</p>
    </div>
  );
};
