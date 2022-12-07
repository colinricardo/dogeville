import AppShell from "@/components/layout/AppShell";
import { trpc } from "@/utils/trpc";
import { Button, Input, Text } from "@mantine/core";

import { ROUTE_LOGIN } from "navigation/routes";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Router from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useState } from "react";

export default () => {
  const ctx = trpc.useContext();

  const { data, isLoading } = trpc.user.current.useQuery();
  const { mutateAsync: setNameFn, isLoading: isSettingName } =
    trpc.user.setName.useMutation({
      onSuccess: () => {
        ctx.user.getUser.invalidate();
      },
    });

  const [newName, setNewName] = useState("");

  const handleNameSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      await setNameFn({ name: newName });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleLogout = async () => {
    try {
      const data = await signOut({ redirect: false, callbackUrl: ROUTE_LOGIN });
      const { url } = data;
      Router.push(url);
    } catch (err) {
      alert(err.message);
    }
  };

  const renderForm = () => {
    return (
      <form
        className="flex flex-col items-center justify-center h-64 p-8 space-y-4 w-96 "
        onSubmit={handleNameSubmit}
      >
        <Input
          autoFocus
          value={newName}
          placeholder="Your name"
          onChange={handleNameChange}
        />

        <Button
          uppercase
          color="dark"
          loading={isSettingName}
          onClick={handleNameSubmit}
        >
          Update name
        </Button>
      </form>
    );
  };

  const renderMain = () => {
    if (isLoading) {
      return null;
    }

    const { user } = data!;
    const { email } = user;

    return (
      <div className="flex flex-col items-center justify-center w-full pt-24 space-y-4">
        <Text>
          You are signed in as: <strong>{email}</strong>
        </Text>

        {renderForm()}

        <div className="flex flex-col w-32 space-y-2">
          <Button
            color="dark"
            fullWidth
            variant="outline"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </div>
    );
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
