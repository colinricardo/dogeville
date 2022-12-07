import AppShell from "@/components/layout/AppShell";
import { trpc } from "@/utils/trpc";
import { Card, Loader } from "@mantine/core";

import { ROUTE_LOGIN } from "navigation/routes";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

const UserCard = ({ id, email }: { id: string; email: string }) => {
  return (
    <Card key={id} p="lg" radius="xs" withBorder>
      {email}
    </Card>
  );
};

export default () => {
  const {
    data: usersData,
    isLoading: loadingUsers,
    error,
  } = trpc.user.getUsers.useQuery();

  const renderList = () => {
    if (usersData) {
      const { users } = usersData;

      return (
        <div className="flex flex-col w-64 space-y-4">
          {users.map((user) => {
            const { id, email } = user;
            return <UserCard id={id} email={email} />;
          })}
        </div>
      );
    }
  };

  const renderMain = () => {
    if (loadingUsers) {
      return (
        <div>
          <div className="flex flex-col items-center justify-center w-full h-screen space-y-4">
            <Loader color="dark" variant="dots" />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <div className="flex flex-col items-center justify-center w-full h-screen space-y-4">
            {error.message}
          </div>
        </div>
      );
    }

    if (usersData) {
      return (
        <div>
          <div className="flex flex-col items-center justify-center w-full h-screen space-y-4">
            <div>All users</div>
            {renderList()}
          </div>
        </div>
      );
    }

    return null;
  };

  const render = () => {
    return <AppShell>{renderMain()}</AppShell>;
  };

  return render();
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: ROUTE_LOGIN,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
