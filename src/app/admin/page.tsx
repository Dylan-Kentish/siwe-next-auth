import { NextPage } from 'next';

import { SessionInfo } from '@/components/session-info';

import { getServerSession } from '../api/auth/options';

const Page: NextPage = async () => {
  const session = await getServerSession();

  return <SessionInfo session={session!} />;
};

export default Page;
