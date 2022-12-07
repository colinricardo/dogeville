import { Button, Card, Input } from "@mantine/core";
import { ROUTE_HOME } from "navigation/routes";
import { makeRouteIntoUrl } from "navigation/utils";
import { signIn } from "next-auth/react";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";

export default () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!email || !isEmail(email)) {
      return alert("Please enter a valid email.");
    }

    const callbackUrl = makeRouteIntoUrl(ROUTE_HOME);

    try {
      setLoading(true);
      await signIn("email", { email, callbackUrl });
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const renderForm = () => {
    return (
      <Card p="lg" radius="xs" withBorder>
        <form
          className="flex flex-col items-center justify-center h-64 p-8 space-y-4 w-96 "
          onSubmit={handleSubmit}
        >
          <Input
            autoFocus
            value={email}
            placeholder="Email"
            onChange={handleChange}
          />

          <Button
            uppercase
            color="dark"
            loading={loading}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
      </Card>
    );
  };

  const renderMain = () => {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen ">
        {renderForm()}
      </div>
    );
  };

  const render = () => {
    return renderMain();
  };

  return render();
};
