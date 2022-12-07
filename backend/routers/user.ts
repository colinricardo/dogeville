import getters from "@/db/getters";
import setters from "@/db/setters";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  current: protectedProcedure.query(({ ctx }) => {
    return { user: ctx.session.user };
  }),

  getUser: protectedProcedure.query(async ({ ctx }) => {
    const u = ctx.session.user;
    const { id } = u;
    const { user } = await getters.user.getUser({ userId: id });
    return { user };
  }),

  getUsers: protectedProcedure.query(async () => {
    const { users } = await getters.user.getUsers();
    return { users };
  }),

  setName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const u = ctx.session.user;
      const { id } = u;
      const { name } = input;
      const { user } = await setters.user.setUserName({ userId: id, name });
      return { user };
    }),
});

export type UserRouter = typeof userRouter;
