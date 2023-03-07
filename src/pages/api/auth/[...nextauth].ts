import { type NextApiRequest, type NextApiResponse } from "next";

import NextAuth from "next-auth/next";
import { getAuthOptions } from "@/server/auth";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await NextAuth(req, res, getAuthOptions(req));
}
