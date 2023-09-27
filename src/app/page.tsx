import React from 'react';

import { type NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import nextAuthLogo from '@/public/next-auth.png';
import siweLogo from '@/public/siwe.png';

const HomePage: NextPage = () => (
  <div className="flex grow flex-col items-center justify-center">
    <div className="flex h-[20vh] w-full max-w-3xl items-center justify-evenly gap-5 self-center px-5">
      <Link href="https://next-auth.js.org/" className="h-full" rel="noreferrer" target="_blank">
        <Image src={nextAuthLogo} alt="Next Auth Logo" className="h-full w-auto object-contain" />
      </Link>
      <Link href="https://login.xyz/" className="h-full" rel="noreferrer" target="_blank">
        <Image src={siweLogo} alt="SIWE Logo" className="h-full w-auto object-contain" />
      </Link>
    </div>
    <h1 className="text-center text-5xl font-semibold">Next Auth + SIWE</h1>
  </div>
);

export default HomePage;
