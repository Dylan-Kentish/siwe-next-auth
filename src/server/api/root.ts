import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({});

export type AppRouter = typeof appRouter;
