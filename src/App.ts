import Handlebars from "handlebars";
import "./styles/main.pcss";

import {
  ErrorPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ChatPage,
} from "./pages";
import { router } from "./framework/Router";

Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
});

const routes: Record<string, string> = {
  RegisterPage: "/register",
  LoginPage: "/",
  ProfilePage: "/profile",
  ChatPage: "/chat",
  ErrorPage: "/500",
};

const pages: StringIndexed = {
  ErrorPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ChatPage,
};

document.addEventListener("DOMContentLoaded", () => {
  Object.keys(pages).forEach((page) => {
    router.use(routes[page], pages[page]);
  });
  router.start();
});
