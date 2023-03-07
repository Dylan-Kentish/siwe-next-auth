import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { type NextPage, type GetServerSideProps } from "next";
import { Web3Button } from "@web3modal/react";

const Home: NextPage = () => {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, status: accountStatus } = useAccount();
  const { data: session, status } = useSession();

  const login = async () => {
    console.log("domian", window.location.host);

    try {
      const callbackUrl = "/";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });

      signMessageAsync({
        message: message.prepareMessage(),
      }).then(
        async (signature: string) => {
          await signIn("credentials", {
            message: JSON.stringify(message),
            redirect: false,
            signature,
            callbackUrl,
          });
        },
        (err: string) => {
          console.error(err);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  function handleLogin() {
    login().catch(console.error);
  }

  function handleLogout() {
    signOut().catch(console.error);
  }

  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex w-full justify-end gap-5 bg-gray-500 p-2">
        <Web3Button />

        <button
          onClick={handleLogin}
          disabled={accountStatus !== "connected"}
          hidden={status === "authenticated"}
          className="rounded-lg bg-green-600 px-2 font-semibold text-white disabled:bg-gray-300"
        >
          Sign in
        </button>

        <button
          onClick={handleLogout}
          hidden={status === "unauthenticated"}
          className="rounded-lg bg-purple-600 px-2 font-semibold text-white"
        >
          Sign out
        </button>
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
