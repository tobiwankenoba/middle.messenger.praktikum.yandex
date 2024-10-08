import { LinkButton } from "../../components";
import { Block } from "../../framework/Block";
import "./styles.pcss";

export class LocalNav extends Block {
  constructor() {
    super({
      AuthLink: new LinkButton({
        text: "Авторизация",
        url: "login",
      }),
      RegisterLink: new LinkButton({
        text: "Регистрация",
        url: "register",
      }),
      ProfileLink: new LinkButton({
        text: "Профиль",
        url: "profile",
      }),
      ChatLink: new LinkButton({
        text: "Чат",
        url: "chat",
      }),
      ChangeProfileLink: new LinkButton({
        text: "Изменить данные",
        url: "changeProfileData",
      }),
      ChangePasswordLink: new LinkButton({
        text: "Изменить пароль",
        url: "changeProfilePassword",
      }),
      NotFoundLink: new LinkButton({
        text: "404",
        url: "notFound",
      }),
      ServerErrorLink: new LinkButton({
        text: "500",
        url: "serverError",
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
