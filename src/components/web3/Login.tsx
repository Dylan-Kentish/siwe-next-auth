import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useDisconnect, useNetwork, useSignMessage } from "wagmi";
import { type NextPage, type GetServerSideProps } from "next";
import { Web3Button } from "@web3modal/react";
import { useCallback, useEffect } from "react";

const Login: React.FC = () => {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, status: accountStatus } = useAccount();
  const { status } = useSession();
  const { disconnect } = useDisconnect();

  const login = useCallback(async () => {
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

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      if (!signature) {
        throw new Error("Signature is empty");
      }

      console.log("signature", signature);

      await signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error) {
      console.log("error", error);
      await Promise.reject(error);
    }
  }, [address, chain?.id, signMessageAsync]);

  useEffect(() => {
    if (status === "unauthenticated" && accountStatus === "connected") {
      login().then(
        () => {
          console.log("login success");
        },
        (err: string) => {
          console.error(err);
          disconnect();
        }
      );
    } else if (status === "authenticated" && accountStatus === "disconnected") {
      signOut().catch(console.error);
    }
  }, [status, accountStatus, disconnect, login]);

  return <Web3Button />;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      csrfToken: await getCsrfToken(ctx),
    },
  };
};

export default Login;
