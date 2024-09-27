import Handlebars, { Exception } from "handlebars";

import { IProfile, IProfileState } from "./types/profile";
import {
  ChangePasswordPage,
  ErrorPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from "./pages";
import { ChatPage } from "./pages/ChatPage";
import { MOCK_CHAT } from "./constants/chatMock";

Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
});

export default class App {
  appElement: HTMLElement | null;
  state: {
    currentPage: string;
    preventPage: string;
    error?: {
      statusCode: number;
      message: string;
    };
    profileState: IProfileState;
    needUpdateValue: Partial<IProfile>;
  };

  constructor() {
    this.appElement = document.getElementById("app");
    this.state = {
      currentPage: "profile",
      preventPage: "",
      profileState: {
        isDraft: false,
        profile: {
          firstName: "Иван",
          secondName: "Иванов",
          email: "pochta@yandex.ru",
          phone: "79992223311",
          displayName: "Ванька",
          login: "ivanivanov",
          avatar: "https://iconape.com/wp-content/png_logo_vector/avatar.png",
          password: "dLKE39v7|kT",
        },
        chatsState: MOCK_CHAT,
      },
      needUpdateValue: {},
    };
  }

  render() {
    if (this.appElement !== null) {
      const { currentPage } = this.state;

      const template = this._getPage(currentPage);

      this.appElement.replaceChildren(template);

      this.attachEventListners();
    } else {
      throw new Exception("missing app container");
    }
  }

  attachEventListners() {
    const pageLinks = document.querySelectorAll("[data-name='pageLink']");

    pageLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target instanceof HTMLElement) {
          const { target } = e;

          const url = String(
            target.dataset.url
              ? target.dataset.url
              : target.parentElement?.dataset.url,
          );

          this.#changePage(url);
        }
      });
    });

    if (this.state.currentPage === "changeProfileData") {
      const inputs = document.querySelectorAll("input[type='text']");

      this.#updateNeedUpdateFields(inputs);
    }

    const saveChangesButton = document.querySelector(
      "[data-name='saveChanges']",
    );

    if (saveChangesButton) {
      saveChangesButton.addEventListener("click", (e) => {
        e.preventDefault();

        this.#updateProfile(this.state.needUpdateValue);

        this.#changePage("profile");
      });
    }
  }

  #updateNeedUpdateFields(inputs: NodeListOf<Element>) {
    let objectValues = {};

    inputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        if (e.target instanceof HTMLInputElement) {
          objectValues = {
            ...objectValues,
            ...{ [(input as HTMLInputElement).id]: e.target.value },
          };
        }
        this.state.needUpdateValue = objectValues;
      });
    });
  }

  #updateProfile(object: Partial<IProfile>) {
    if (Object.keys(object).length !== 0 && this.state.profileState) {
      this.state.profileState.profile = {
        ...this.state.profileState.profile,
        ...object,
      };
    }
  }

  #changePage(newPage: string) {
    this.state.preventPage = this.state.currentPage;

    this.state.currentPage = newPage;

    this.render();
  }

  _getPage(currentPage: string) {
    switch (currentPage) {
      case "notFound":
        return new ErrorPage({
          errorMessage: "Ошибка, тестовая!",
          statusCode: 404,
        }).getContent();

      case "serverError":
        return new ErrorPage({
          errorMessage: "Уже фиксим",
          statusCode: 500,
        }).getContent();

      case "login":
      case "logout":
        return new LoginPage().getContent();

      case "register":
        return new RegisterPage().getContent();

      case "profile":
        return new ProfilePage({
          profileState: this.state.profileState,
        }).getContent();

      case "changeProfileData":
        return new ProfilePage({
          profileState: { ...this.state.profileState, isDraft: true },
        }).getContent();

      case "changeProfilePassword":
        return new ChangePasswordPage({
          profileState: { ...this.state.profileState, isDraft: true },
        }).getContent();

      case "chat":
        return new ChatPage({
          chatState: this.state.profileState.chatsState,
        }).getContent();

      default:
        throw new Exception("page not exist");
    }
  }
}
