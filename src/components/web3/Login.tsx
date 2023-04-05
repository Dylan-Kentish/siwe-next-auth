import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useDisconnect, useNetwork, useSignMessage } from "wagmi";
import { Web3Button } from "@web3modal/react";
import { useCallback, useEffect } from "react";

const Login: React.FC = () => {
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const { data: session, status } = useSession();
  const { disconnect } = useDisconnect();

  const login = useCallback(
    (address: string) => {
      async function loginAsync(address: string) {
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
      }

      loginAsync(address).catch(err => {
        console.error(err);
        disconnect();
      });
    },
    [chain?.id, disconnect, signMessageAsync]
  );

  const handleConnected = useCallback(
    (address: string) => {
      if (session?.user?.id) {
        if (session.user.id === address) {
          return;
        } else {
          signOut().catch(console.error);
        }
      } else {
        login(address);
      }
    },
    [login, session?.user?.id]
  );

  const { address } = useAccount({
    onConnect: ({ address: connectedAddress }) => {
      if (!connectedAddress || status === "loading") {
        return;
      }

      handleConnected(connectedAddress);
    },
    onDisconnect: () => {
      signOut().catch(console.error);
    },
  });

  useEffect(() => {
    if (!address || status !== "authenticated") {
      return;
    }

    handleConnected(address);
  }, [address, status, handleConnected]);

  return <Web3Button />;
};

export default Login;
