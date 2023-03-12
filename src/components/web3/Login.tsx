import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useDisconnect, useNetwork, useSignMessage } from "wagmi";
import { Web3Button } from "@web3modal/react";
import { useCallback, useEffect } from "react";

const Login: React.FC = () => {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, status: accountStatus } = useAccount();
  const { data: session, status } = useSession();
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

      const response = await signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });

      if (!response) {
        throw new Error("Response is empty");
      }

      if (response.error) {
        throw new Error(response.error);
      }
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

  useEffect(() => {
    if (session?.user?.id && address !== session.user.id) {
      signOut().catch(console.error);
    }
  }, [address, session?.user.id]);

  return <Web3Button />;
};

export default Login;
