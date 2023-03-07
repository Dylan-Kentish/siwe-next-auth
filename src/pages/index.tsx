import { getCsrfToken, useSession } from "next-auth/react";
import { type NextPage, type GetServerSideProps } from "next";
import Login from "@/components/web3/Login";

const Home: NextPage = () => {
  const { data: session } = useSession();


  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex w-full justify-end gap-5 bg-gray-500 p-2">
        <Login />
      </div>

      <div>
        <p>{JSON.stringify(session)}</p>
      </div>
    </div>
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
