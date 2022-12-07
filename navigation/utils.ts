import { WEB_APP_URL } from "@/config/environment";
import Router from "next/router";

export const reloadPage = () => {
  window.location.reload();
};

export const goToUrl = (url: string) => {
  window.location.href = url;
  return;
};

export const routeTo = (url: string) => {
  Router.push(url);
  return;
};

export const openUrl = (url: string, inNewTab = true) => {
  return window.open(url, inNewTab ? "_blank" : "/");
};

export const makeRouteIntoUrl = (route: string) => {
  let prefix = "http";

  if (process.env.NODE_ENV === "production") {
    prefix === "https";
  }

  return `${prefix}://${WEB_APP_URL}${route}`;
};

export const getCurrentUrlClientSide = () => {
  return window.location.href;
};
