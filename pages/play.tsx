import AppShell from "@/components/layout/AppShell";
import { Button, ColorInput, MantineSize, Select } from "@mantine/core";

import { ROUTE_LOGIN } from "navigation/routes";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useState } from "react";

const sizeOptions = [
  { value: "xs", label: "Extra small" },
  { value: "xl", label: "Extra large" },
  { value: "md", label: "Medium" },
  // { value: "xs", label: "Extra small" },
];

export default () => {
  const [buttonColor, setButtonColor] = useState("#ec4f27");
  const [buttonSize, setButtonSize] = useState<MantineSize>("lg");
  const [isUppercase, setIsUppercase] = useState(false);
  const [buttonText, setButtonText] = useState("Click me");

  const renderButtonControls = () => {
    return (
      <div className="flex flex-col items-center space-y-4">
        <Select
          placeholder="Pick size"
          data={sizeOptions}
          onChange={(value) => {
            setButtonSize(value as MantineSize);
          }}
        />
        <ColorInput
          placeholder="Pick color"
          value={buttonColor}
          onChange={(value) => {
            setButtonColor(value);
          }}
        />
      </div>
    );
  };

  const renderButton = () => {
    return (
      <div>
        <Button
          style={{
            background: buttonColor,
          }}
          uppercase={isUppercase}
          onClick={() => {
            const _ = prompt();
            if (!_) return;
            setButtonText(_);
          }}
          size={buttonSize}
        >
          {buttonText}
        </Button>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div>
        <div className="flex flex-col items-center justify-center w-full h-screen space-y-4">
          {renderButtonControls()}
          {renderButton()}
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
