import React from 'react';

import { Session } from 'next-auth';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

function secondsSinceEpochToDate(secondsSinceEpoch: number) {
  return new Date(secondsSinceEpoch * 1000);
}

export const SessionInfo: React.FC<{ session: Session }> = ({ session }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Info</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Session:</p>
        <p className="truncate">
          Issued At: {secondsSinceEpochToDate(session.iat).toLocaleString()}
        </p>
        <p className="truncate">
          Expires At: {secondsSinceEpochToDate(session.exp).toLocaleString()}
        </p>
      </CardContent>
      <CardContent>
        <p>User:</p>
        <p className="truncate">ID: {session.user.id}</p>
        <p>Chain: {session.user.chainId}</p>
        <p>
          Role: <strong>{session.user.role}</strong>
        </p>
      </CardContent>
    </Card>
  );
};
