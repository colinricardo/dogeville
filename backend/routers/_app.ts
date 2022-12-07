import { authRouter } from "backend/routers/auth";
import { userRouter } from "backend/routers/user";

import { router } from "../trpc";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
