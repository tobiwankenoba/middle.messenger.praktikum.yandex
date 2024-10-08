import {
  Button,
  InputBlock,
  LinkButton,
  LocalNav,
  Title,
} from "../../components";
import { Block } from "../../framework/Block";
import { EFormFieldNames } from "../../types/registerForm";
import { getFieldFormError } from "../../utils/getFieldFormError";
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
          const password = validateFormFields(
            EFormFieldNames.Password,
            this.props.password,
          );

          const login = validateFormFields(
            EFormFieldNames.Login,
            this.props.login,
          );

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
            const login = { login: e.target.value };

            const validateLogin = validateFormFields(
              EFormFieldNames.Login,
              login.login,
            );

            this.setProps({
              disabled:
                !(
                  validateFormFields(
                    EFormFieldNames.Password,
                    this.props.password,
                  ) && validateLogin
                ) || login.login === "",
              ...login,
            });

            return getFieldFormError(EFormFieldNames.Login, validateLogin);
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
            const password = { password: e.target.value };

            const validatePassword = validateFormFields(
              EFormFieldNames.Password,
              password.password,
            );

            this.setProps({
              disabled:
                !(
                  validateFormFields(EFormFieldNames.Login, this.props.login) &&
                  validatePassword
                ) || password.password === "",
              ...password,
            });

            return getFieldFormError(
              EFormFieldNames.Password,
              validatePassword,
            );
          }
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
