import AppShell from "@/components/layout/AppShell";
import useAppStore from "@/stores/app";
import { trpc } from "@/utils/trpc";
import { Button, Loader } from "@mantine/core";

import { ROUTE_LOGIN } from "navigation/routes";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default () => {
  const { data: userData, isLoading, error } = trpc.user.getUser.useQuery();

  const goDown = useAppStore((state) => state.decrement);
  const goUp = useAppStore((state) => state.increment);

  const renderButtons = () => {
    return (
      <div className="flex flex-row space-x-2">
        <Button
          onClick={() => {
            goDown(1);
          }}
          color="dark"
        >
          -1
        </Button>
        <Button
          onClick={() => {
            goUp(1);
          }}
          color="dark"
        >
          +1
        </Button>
      </div>
    );
  };

  const renderMain = () => {
    if (isLoading) {
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

    if (userData) {
      const { user } = userData;
      const { email, name } = user;

      return (
        <div>
          <div className="flex flex-col items-center justify-center w-full h-screen space-y-4">
            <div>Welcome back {email}</div>
            <div>Your name is {name}</div>
            {renderButtons()}
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
