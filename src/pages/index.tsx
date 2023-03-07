import { getCsrfToken, useSession } from "next-auth/react";
import { type NextPage, type GetServerSideProps } from "next";
import Login from "@/components/web3/Login";
import Image from "next/image";

import nextAuthLogo from "@/assets/next-auth.png";
import siweLogo from "@/assets/siwe.png";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen grow flex-col items-center justify-center bg-gradient-radial from-gray-700 to-black">
      <header className="fixed top-0 flex w-full justify-end gap-5 bg-gray-700 p-2 shadow-lg shadow-black">
        <Login />
      </header>

      <div className="flex grow flex-col items-center justify-evenly font-semibold text-white">
        <div className="flex h-48 w-1/2 items-center justify-between overflow-hidden">
          <Image src={nextAuthLogo} alt="Next Auth Logo" className="h-full object-contain" />
          <Image src={siweLogo} alt="SIWE Logo" className="h-full object-contain" />
        </div>
        <h1 className="text-5xl">Next Auth + SIWE</h1>
        <p>Session: {JSON.stringify(session)}</p>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      csrfToken: await getCsrfToken(ctx),
    },
  };
};

export default Home;
