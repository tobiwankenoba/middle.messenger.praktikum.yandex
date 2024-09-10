import Handlebars, { Exception } from "handlebars";
import * as Pages from "./pages";

import {
  Avatar,
  Button,
  ButtonBlockProfile,
  Input,
  LinkButton,
  LocalNav,
  ProfileRow,
  Sidebar,
  Title,
} from "./components";
import { IProfile, IProfileState } from "./types/profile";

Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
});

Handlebars.registerPartial("Title", Title);
Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("LinkButton", LinkButton);
Handlebars.registerPartial("LocalNav", LocalNav);
Handlebars.registerPartial("Sidebar", Sidebar);
Handlebars.registerPartial("Avatar", Avatar);
Handlebars.registerPartial("ProfileRow", ProfileRow);
Handlebars.registerPartial("ButtonBlockProfile", ButtonBlockProfile);

export default class App {
  appElement: HTMLElement | null;
  state: {
    currentPage: string;
    preventPage: string;
    error?: {
      statusCode: number;
      message: string;
    };
    profileState: IProfileState | null;
    needUpdateValue: Partial<IProfile>;
  };

  constructor() {
    this.appElement = document.getElementById("app");
    this.state = {
      currentPage: "login",
      preventPage: "",
      profileState: {
        isDraft: false,
        profile: {
          firstName: "Иван",
          secondName: "Иванов",
          email: "pochta@yandex.ru",
          phone: "+7 (909) 967 30 30",
          displayName: "Ванька",
          login: "ivanivanov",
          avatar: "https://iconape.com/wp-content/png_logo_vector/avatar.png",
          password: "dLKE39v7|kT",
        },
      },
      needUpdateValue: {},
    };
  }

  render() {
    if (this.appElement !== null) {
      const { currentPage } = this.state;

      const template = Handlebars.compile(this.#getPage(currentPage));

      const { error, preventPage, profileState } = this.state;

      this.appElement.innerHTML = template({
        preventPage,
        profileState,
        error,
      });

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
        if (e.target && e.target instanceof HTMLElement) {
          this.#changePage(String(e.target.dataset.url));
        }
      });
    });

    if (this.state.currentPage === "changeProfileData") {
      const inputs = document.querySelectorAll("input[type='text']");

      this.#updateNeedUpdateFields(inputs);
    }

    const saveChangesButton = document.querySelector(
      "[data-name='saveChanges']"
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

  #getPage(currentPage: string) {
    switch (currentPage) {
      case "notFound":
        this.state.error = { statusCode: 404, message: "Не туда попали" };

        return Pages.ErrorPage;

      case "serverError":
        this.state.error = { statusCode: 500, message: "Уже фиксим" };

        return Pages.ErrorPage;

      case "register":
        return Pages.RegisterPage;

      case "login":
      case "logout":
        return Pages.LoginPage;

      case "profile":
        if (this.state.profileState) {
          this.state.profileState.isDraft = false;
        }

        return Pages.Profile;

      case "changeProfileData":
        if (this.state.profileState) {
          this.state.profileState.isDraft = true;
        }

        return Pages.Profile;

      case "changeProfilePassword":
        if (this.state.profileState) {
          this.state.profileState.isDraft = true;
        }

        return Pages.ChangePassword;

      default:
        throw new Exception("page not exist");
    }
  }
}
