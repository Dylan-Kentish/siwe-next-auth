import { createProxySSGHelpers } from "@trpc/react-query/ssg";

import { appRouter } from "./root";
import superjson from "superjson";

import type { GetServerSidePropsContext } from "next/types";
import { createTRPCContext } from "./trpc";

async function createTrpcSsgHelper(ctx: GetServerSidePropsContext) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createTRPCContext(ctx),
    transformer: superjson,
  });

  return ssg;
}

export { createTrpcSsgHelper };
