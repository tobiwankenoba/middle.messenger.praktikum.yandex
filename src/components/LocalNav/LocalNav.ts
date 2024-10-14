import { LinkButton } from "../../components";
import { Block } from "../../framework/Block";
import { router } from "../../framework/Router";
import "./styles.pcss";

export class LocalNav extends Block<StringIndexed> {
  constructor() {
    super({
      AuthLink: new LinkButton({
        text: "Авторизация",
        url: "#",
        onClick: () => {
          router.go("/");
        },
      }),
      RegisterLink: new LinkButton({
        text: "Регистрация",
        url: "/sign-up",
        onClick: () => {
          router.go("/sign-up");
        },
      }),
      ProfileLink: new LinkButton({
        text: "Профиль",
        url: "profile",
        onClick: () => {
          router.go("/profile");
        },
      }),
      ChatLink: new LinkButton({
        text: "Чат",
        url: "chat",
        onClick: () => {
          router.go("/chat");
        },
      }),
      ChangeProfileLink: new LinkButton({
        text: "Изменить данные",
        url: "/change-prof",
      }),
      ChangePasswordLink: new LinkButton({
        text: "Изменить пароль",
        url: "/change-pass",
      }),
      NotFoundLink: new LinkButton({
        text: "404",
        url: "/404",
        onClick: () => {
          router.go("/404");
        },
      }),
      ServerErrorLink: new LinkButton({
        text: "500",
        url: "/500",
        onClick: () => {
          router.go("/500");
        },
      }),
    });
  }

  override render() {
    return `
      <nav class="local-nav-container">
          <ul class="local-nav">
              <li>{{{ AuthLink }}}</li>
              <li>{{{ RegisterLink }}}</li>
              <li>{{{ ChatLink }}}</li>
              <li>{{{ ProfileLink }}}</li>
              <li>{{{ ChangeProfileLink }}}</li>
              <li>{{{ ChangePasswordLink }}}</li>
              <li>{{{ NotFoundLink }}}</li>
              <li>{{{ ServerErrorLink }}}</li>
          </ul>
      </nav>
    `;
  }
}
