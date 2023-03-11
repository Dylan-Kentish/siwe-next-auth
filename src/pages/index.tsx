import { getCsrfToken, useSession } from "next-auth/react";
import { type NextPage, type GetServerSideProps } from "next";
import Login from "@/components/web3/Login";
import Image from "next/image";
import Link from "next/link";

import nextAuthLogo from "@/assets/next-auth.png";
import siweLogo from "@/assets/siwe.png";
import { env } from "@/env.mjs";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen grow flex-col bg-gradient-radial from-gray-700 to-black">
      <header className="fixed top-0 flex w-full justify-end gap-5 p-5">
        <Login />
      </header>

      <div className="flex grow flex-col justify-evenly text-center font-semibold text-white">
        <div className="flex h-[20vh] w-full max-w-3xl items-center justify-evenly gap-5 self-center px-5">
          <Link
            href="https://next-auth.js.org/"
            className="h-full"
            rel="noreferrer"
            target="_blank"
          >
            <Image
              src={nextAuthLogo}
              alt="Next Auth Logo"
              className="h-full w-auto object-contain"
            />
          </Link>
          <Link href="https://login.xyz/" className="h-full" rel="noreferrer" target="_blank">
            <Image src={siweLogo} alt="SIWE Logo" className="h-full w-auto object-contain" />
          </Link>
        </div>
        <h1 className="text-5xl">Next Auth + SIWE</h1>
        <div className="p-5 text-center">
          <p>Session:</p>
          <p className="truncate">
            Expires: {session?.expires && new Date(session?.expires).toLocaleString()}
          </p>
          <p>User:</p>
          <p className="truncate">ID: {session?.user?.id}</p>
          <p>Role: {session?.user?.role}</p>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  console.log("NEXTAUTH_URL", env.NEXTAUTH_URL);
  console.log("VERCEL_URL", process.env.VERCEL_URL);

  return {
    props: {
      csrfToken: await getCsrfToken(ctx),
    },
  };
};

export default Home;
