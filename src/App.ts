import Handlebars, { Exception } from "handlebars";

import { IProfile, IProfileState } from "./types/profile";
import { ErrorPage, LoginPage } from "./pages";

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

      const template = this._getPage(currentPage);

      this.appElement.replaceWith(template);

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

    console.log(newPage);

    this.state.currentPage = newPage;

    this.render();
  }

  _getPage(currentPage: string) {
    console.log(currentPage, "getPage");
    switch (currentPage) {
      case "notFound":
        return new ErrorPage().getContent();

      case "login":
      case "logout":
        return new LoginPage().getContent();

      default:
        throw new Exception("page not exist");
    }
  }
}
