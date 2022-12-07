import prisma from "prisma/client";

const setUserName = async ({
  userId,
  name,
}: {
  userId: string;
  name: string;
}) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });

  return { user };
};

export default { setUserName };
