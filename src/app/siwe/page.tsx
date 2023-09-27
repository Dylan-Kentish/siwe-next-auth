import { NextPage } from 'next';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { getServerSession } from '../api/auth/options';

const SIWEPage: NextPage = async () => {
  const session = await getServerSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>SIWE</CardTitle>
        <CardDescription>
          Sign in with ethereum is the sign method used to identify users using their unique
          ethereum based wallets.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {session ? (
          <p>
            You are currently <strong>signed in</strong>.
            <br />
            <br />
            You are registered as a <strong>{session?.user.role}</strong>.
          </p>
        ) : (
          <p>
            You are currently <strong>not signed in</strong>.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SIWEPage;
