import Head from "next/head";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div>
        <Head>
          <meta name="theme-color" content="#FFFFFF" />

          <title>SIWE | NextAuth</title>

          <meta content="var(--geist-background)" name="theme-color" />

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>{children}</main>
      </div>
    </>
  );
};
