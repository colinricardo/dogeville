import { TRPCError } from "@trpc/server";
import prisma from "prisma/client";

const getUser = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Could not find user.",
    });
  }

  return { user };
};

const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
    },
  });

  if (!users) {
    return { users: [] };
  }

  return { users };
};

export default {
  getUser,
  getUsers,
};
