/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  InputBlock,
  LinkButton,
  LocalNav,
  Title,
} from '../../components';
import AuthController from '../../controllers/AuthController';
import { Block } from '../../framework/Block';
import { router } from '../../framework/Router';
import { EFormFieldNames } from '../../types/registerForm';
import { getFieldFormError } from '../../utils/getFieldFormError';

import { validateFormRegister } from '../../utils/validates/validateRegisterForm';

export class RegisterPage extends Block<StringIndexed> {
  constructor() {
    super({
      Title: new Title({ text: 'Регистрация' }),
      Button: new Button({
        text: 'Зарегистрироваться',
        fullWidth: true,
        dataName: 'register',
        disabled: true,
        onClick: () => {
          const validateRegisterForm = validateFormRegister({
            ...this.props,
          });

          if (
            validateRegisterForm.filter((item) => item.isValid === false)
              .length === 0
          ) {
            const { phone, email, first_name, second_name, password, login } =
              this.props;

            const form = {
              phone,
              email,
              first_name,
              second_name,
              password,
              login,
            };

            AuthController.register(form);
          }
        },
      }),
      LinkButton: new LinkButton({
        text: 'Войти',
        url: 'login',
        onClick: () => {
          router.go('/');
        },
      }),
      InputEmail: new InputBlock({
        label: 'Почта',
        id: 'email',
        placeholder: 'Введите почту',
        type: 'text',
        name: 'email',
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const email = { email: e.target.value };

            const validateRegisterForm = validateFormRegister({
              ...this.props,
              ...email,
            });

            this.setProps({
              disabled:
                validateRegisterForm.filter((item) => item.isValid === false)
                  .length !== 0,
              ...email,
            });

            const isValid = Boolean(
              validateRegisterForm.find(
                (item) => item.name === EFormFieldNames.Email,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.Email, isValid);
          }
        },
      }),
      InputLogin: new InputBlock({
        label: 'Логин',
        id: 'login',
        placeholder: 'Введите логин',
        type: 'text',
        name: 'login',
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const login = { login: e.target.value };

            const validateRegisterForm = validateFormRegister({
              ...this.props,
              ...login,
            });

            this.setProps({
              disabled:
                validateRegisterForm.filter((item) => item.isValid === false)
                  .length !== 0,
              ...login,
            });

            const isValid = Boolean(
              validateRegisterForm.find(
                (item) => item.name === EFormFieldNames.Login,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.Login, isValid);
          }
        },
      }),
      InputName: new InputBlock({
        label: 'Имя',
        id: 'name',
        placeholder: 'Введите имя',
        name: 'first_name',
        type: 'text',
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const firstName = { first_name: e.target.value };

            const validateRegisterForm = validateFormRegister({
              ...this.props,
              ...firstName,
            });

            this.setProps({
              disabled:
                validateRegisterForm.filter((item) => item.isValid === false)
                  .length !== 0,
              ...firstName,
            });

            const isValid = Boolean(
              validateRegisterForm.find(
                (item) => item.name === EFormFieldNames.FirstName,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.FirstName, isValid);
          }
        },
      }),
      InputLastName: new InputBlock({
        label: 'Фамилия',
        id: 'lastname',
        placeholder: 'Введите фамилию',
        name: 'second_name',
        type: 'text',
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const secondName = { second_name: e.target.value };

            const validateRegisterForm = validateFormRegister({
              ...this.props,
              ...secondName,
            });

            this.setProps({
              disabled:
                validateRegisterForm.filter((item) => item.isValid === false)
                  .length !== 0,
              ...secondName,
            });

            const isValid = Boolean(
              validateRegisterForm.find(
                (item) => item.name === EFormFieldNames.SecondName,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.SecondName, isValid);
          }
        },
      }),
      InputPhone: new InputBlock({
        label: 'Телефон',
        id: 'phone',
        placeholder: 'Введите телефон',
        name: 'phone',
        type: 'text',
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const phone = { phone: e.target.value };

            const validateRegisterForm = validateFormRegister({
              ...this.props,
              ...phone,
            });

            this.setProps({
              disabled:
                validateRegisterForm.filter((item) => item.isValid === false)
                  .length !== 0,
              ...phone,
            });

            const isValid = Boolean(
              validateRegisterForm.find(
                (item) => item.name === EFormFieldNames.Phone,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.Phone, isValid);
          }
        },
      }),
      InputPassword: new InputBlock({
        label: 'Пароль',
        id: 'password',
        placeholder: 'Введите пароль',
        name: 'password',
        type: 'text',
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const password = { password: e.target.value };

            const validateRegisterForm = validateFormRegister({
              ...this.props,
              ...password,
            });

            this.setProps({
              disabled:
                validateRegisterForm.filter((item) => item.isValid === false)
                  .length !== 0,
              ...password,
            });

            const isValid = Boolean(
              validateRegisterForm.find(
                (item) => item.name === EFormFieldNames.Password,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.Password, isValid);
          }
        },
      }),
      InputRepeatPassword: new InputBlock({
        label: 'Пароль (ещё раз)',
        id: 'passwordRepeat',
        placeholder: 'Повторите пароль',
        name: 'passwordRepeat',
        type: 'text',
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const passwordRepeat = { passwordRepeat: e.target.value };

            const validateRegisterForm = validateFormRegister({
              ...this.props,
              ...passwordRepeat,
            });

            this.setProps({
              disabled:
                validateRegisterForm.filter((item) => item.isValid === false)
                  .length !== 0,
              ...passwordRepeat,
            });

            const isValid = Boolean(
              validateRegisterForm.find(
                (item) => item.name === EFormFieldNames.PasswordRepeat,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.PasswordRepeat, isValid);
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
