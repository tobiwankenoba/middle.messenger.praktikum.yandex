import {
  Button,
  InputBlock,
  LinkButton,
  LocalNav,
  Title,
} from "../../components";
import { Block } from "../../framework/Block";

export class RegisterPage extends Block {
  constructor() {
    super({
      Title: new Title({ text: "Регистрация" }),
      Button: new Button({
        text: "Зарегистрироваться",
        fullWidth: true,
        dataName: "register",
        disabled: true,
      }),
      LinkButton: new LinkButton({
        text: "Войти",
        url: "login",
      }),
      InputEmail: new InputBlock({
        label: "Почта",
        id: "email",
        placeholder: "Введите почту",
        type: "text",
        name: "email",
      }),
      InputLogin: new InputBlock({
        label: "Логин",
        id: "login",
        placeholder: "Введите логин",
        type: "text",
        name: "login",
      }),
      InputName: new InputBlock({
        label: "Имя",
        id: "name",
        placeholder: "Введите имя",
        name: "first_name",
        type: "text",
      }),
      InputLastName: new InputBlock({
        label: "Фамилия",
        id: "lastname",
        placeholder: "Введите фамилию",
        name: "last_name",
        type: "text",
      }),
      InputPhone: new InputBlock({
        label: "Телефон",
        id: "phone",
        placeholder: "Введите телефон",
        name: "phone",
        type: "text",
      }),
      InputPassword: new InputBlock({
        label: "Пароль",
        id: "password",
        placeholder: "Введите пароль",
        name: "password",
        type: "text",
      }),
      InputRepeatPassword: new InputBlock({
        label: "Пароль (ещё раз)",
        id: "passwordRepeat",
        placeholder: "Повторите пароль",
        name: "passwordRepeat",
        type: "text",
      }),
      LocalNav: new LocalNav(),
    });
  }

  override render() {
    return `
      <div class="container">
          {{{ LocalNav }}}
          <div class="wrapper register-wrapper">
              {{{ Title }}}
              <form class="form" onclick="return false;">
                  <div class="inputs-block">
                      {{{ InputEmail }}}
                      {{{ InputLogin }}}
                      {{{ InputName }}}
                      {{{ InputLastName }}}
                      {{{ InputPhone }}}
                      {{{ InputPassword }}}
                      {{{ InputRepeatPassword }}}
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
