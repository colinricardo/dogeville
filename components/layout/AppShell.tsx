import DarkModeToggle from "@/components/common/DarkModeToggle";
import useAppStore from "@/stores/app";
import { trpc } from "@/utils/trpc";
import { AppShell, Header } from "@mantine/core";
import { ROUTE_ME } from "navigation/routes";

export default ({ children }) => {
  const { data: userData } = trpc.user.getUser.useQuery();

  const counter = useAppStore((state) => state.counter);

  const renderWordmark = () => {
    return (
      <a href={ROUTE_ME}>
        <div className="font-serif text-3xl font-bold ">Dogeville</div>
      </a>
    );
  };

  const renderAvatar = () => {
    if (userData) {
      const { user } = userData;
      const { name } = user;

      return (
        <div className="flex flex-row items-center justify-center">
          {/* <Link href={ROUTE_ME}>{name}(counter)</Link> */}
          <DarkModeToggle />
        </div>
      );
    }
  };

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <div className="flex flex-row items-center justify-between w-full">
            {renderWordmark()}
            {renderAvatar()}
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
