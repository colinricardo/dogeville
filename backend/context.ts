// TODO: maybe put redis and prisma in here.
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerAuthSession } from "backend/services/auth";

type CreateContextOptions = {
  session: {
    user: {
      id: string;
      image: string;
      name: string;
      email: string;
    };
  };
};

export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
  };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });

  return await createContextInner({
    session: session as CreateContextOptions["session"],
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
