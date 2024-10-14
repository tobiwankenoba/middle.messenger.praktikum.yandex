import Handlebars from "handlebars";
import "./styles/main.pcss";

import {
  LoginPage,
  ProfilePage,
  RegisterPage,
  ChatPage,
  NotFoundPage,
} from "./pages";
import { router } from "./framework/Router";

Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
});

const routes: Record<string, string> = {
  RegisterPage: "/sign-up",
  LoginPage: "/",
  ProfilePage: "/profile",
  ChatPage: "/chat",
  ServerError: "/500",
  NotFoundPage: "/404",
};

const pages: StringIndexed = {
  NotFoundPage,
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
