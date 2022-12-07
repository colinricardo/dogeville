import { ROUTE_ME } from "navigation/routes";
import Router from "next/router";
import { useEffect } from "react";

export default () => {
  useEffect(() => {
    Router.push(ROUTE_ME);
  });

  return null;
};
