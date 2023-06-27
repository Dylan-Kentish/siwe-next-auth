import React from 'react';
import { type NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AccountButton } from '@/components/account-button';

import nextAuthLogo from '@/assets/next-auth.png';
import siweLogo from '@/assets/siwe.png';
import { SessionInfo } from '@/components/session-info';

const HomePage: NextPage = () => (
  <main className="flex min-h-screen grow flex-col bg-gradient-radial from-gray-700 to-black">
    <header className="fixed top-0 flex w-full justify-end gap-5 p-5">
      <AccountButton />
    </header>

    <div className="flex grow flex-col justify-evenly text-center font-semibold text-white">
      <div className="flex h-[20vh] w-full max-w-3xl items-center justify-evenly gap-5 self-center px-5">
        <Link href="https://next-auth.js.org/" className="h-full" rel="noreferrer" target="_blank">
          <Image src={nextAuthLogo} alt="Next Auth Logo" className="h-full w-auto object-contain" />
        </Link>
        <Link href="https://login.xyz/" className="h-full" rel="noreferrer" target="_blank">
          <Image src={siweLogo} alt="SIWE Logo" className="h-full w-auto object-contain" />
        </Link>
      </div>
      <h1 className="text-5xl">Next Auth + SIWE</h1>
      <SessionInfo />
    </div>
  </main>
);

export default HomePage;
