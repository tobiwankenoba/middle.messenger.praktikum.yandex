import {
  Button,
  InputBlock,
  LinkButton,
  LocalNav,
  Title,
} from "../../components";
import { Block } from "../../framework/Block";

export class LoginPage extends Block {
  constructor() {
    super({
      Title: new Title({ text: "Вход" }),
      Button: new Button({ text: "Авторизоваться", fullWidth: true }),
      LinkButton: new LinkButton({
        text: "Нет аккаунта?",
        url: "register",
      }),
      InputLogin: new InputBlock({
        label: "Логин",
        id: "login",
        placeholder: "Введите логин",
        type: "text",
        name: "login",
      }),
      InputPassword: new InputBlock({
        label: "Пароль",
        id: "password",
        placeholder: "Введите пароль",
        name: "password",
        type: "text",
      }),
      LocalNav: new LocalNav(),
    });
  }

  override render() {
    return `
    <div class="container">
      {{{ LocalNav }}}
      <div class="wrapper login-wrapper">
          {{{ Title }}}
          <form class="form" onclick="return false;">
              <div class="inputs-block">
                  {{{ InputLogin }}}
                  {{{ InputPassword }}}
              </div>
              <div class="btns-block">
                  {{{ Button }}}
                  {{{ LinkButton }}}
              </div>
          </form>
      </div>
    </div>
    `;
  }
}
