import {
  Button,
  InputBlock,
  LinkButton,
  LocalNav,
  Title,
} from "../../components";
import { Block } from "../../framework/Block";
import { validateFormFields } from "../../utils/validate";

export class LoginPage extends Block {
  constructor() {
    super({
      Title: new Title({ text: "Вход" }),
      Button: new Button({
        text: "Авторизоваться",
        fullWidth: true,
        dataName: "login",
        disabled: true,
        onClick: () => {
          const password = validateFormFields("password", this.props.password);

          const login = validateFormFields("login", this.props.login);

          if (login && password) {
            console.log({
              login: this.props.login,
              password: this.props.password,
            });
          }
        },
      }),
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
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const validateLogin = validateFormFields("login", e.target.value);

            this.setProps({
              disabled:
                validateFormFields("password", this.props.password) &&
                validateLogin
                  ? false
                  : true,
              login: e.target.value,
            });

            return !validateLogin && e.target.value !== ""
              ? "Неверный логин"
              : "";
          }
          return "";
        },
      }),
      InputPassword: new InputBlock({
        label: "Пароль",
        id: "password",
        placeholder: "Введите пароль",
        name: "password",
        type: "text",
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const validatePassword = validateFormFields(
              "password",
              e.target.value,
            );

            this.setProps({
              disabled:
                validateFormFields("login", this.props.login) &&
                validateFormFields("password", e.target.value)
                  ? false
                  : true,
              password: e.target.value,
            });

            return !validatePassword && e.target.value !== ""
              ? "Запрещенные символы"
              : "";
          }
          return "";
        },
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
