/* eslint-disable @typescript-eslint/no-floating-promises */
import Handlebars from 'handlebars';
import './styles/main.pcss';

import {
  LoginPage,
  ProfilePage,
  RegisterPage,
  ChangePasswordPage,
  ChatPage,
  NotFoundPage,
  ServerErrorPage,
} from './pages';
import { router } from './framework/Router';
import ChangeProfileData from './pages/ChangeProfileData/ChangeProfileData';

Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
});

const routes: Record<string, string> = {
  RegisterPage: '/sign-up',
  LoginPage: '/',
  ProfilePage: '/profile',
  ChatPage: '/messenger',
  ServerErrorPage: '/500',
  NotFoundPage: '/404',
  ChangePasswordPage: '/profile/change-password',
  ChangeProfileData: '/profile/change-data',
};

const pages: StringIndexed = {
  NotFoundPage,
  ServerErrorPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ChatPage,
  ChangePasswordPage,
  ChangeProfileData,
};

document.addEventListener('DOMContentLoaded', () => {
  Object.keys(pages).forEach((page) => {
    router.use(routes[page], pages[page]);
  });
  router.start();
});
