import {
  Avatar,
  ButtonBlockProfile,
  LocalNav,
  ProfileRow,
  Sidebar,
} from "../../components";
import UserController from "../../controllers/UserController";
import { Block } from "../../framework/Block";
import { router } from "../../framework/Router";
import { store } from "../../framework/Store";
import { EFormFieldNames } from "../../types/registerForm";
import { getFieldFormError } from "../../utils/getFieldFormError";
import { validatePassword } from "../../utils/validates/validatePassword";

export class ChangePasswordPage extends Block<StringIndexed> {
  constructor() {
    const { profileState } = store.getState();

    const { profile } = profileState;

    super({
      Avatar: new Avatar({
        isDraft: false,
        name: profile.firstName,
        avatarUrl: profile.avatar,
      }),
      Sidebar: new Sidebar({
        onClick: () => {
          router.go("/profile");
        },
      }),
      LocalNav: new LocalNav(),
      RowOldPassword: new ProfileRow({
        id: "password",
        name: "password",
        label: "Старый пароль",
        type: "password",
        placeholder: "*****",
        readonly: false,
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const password = { oldPassword: e.target.value };

            const validateProfileForm = validatePassword({
              ...this.props,
              ...password,
            });

            this.setProps({
              disabled:
                validateProfileForm.filter((item) => item.isValid === false)
                  .length !== 0,
              ...password,
            });

            const isValid = Boolean(
              validateProfileForm.find(
                (item) => item.name === EFormFieldNames.OldPassword,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.Password, isValid);
          }
        },
      }),
      RowNewPassword: new ProfileRow({
        id: "newPassword",
        name: "new_password",
        label: "Новый пароль",
        type: "password",
        placeholder: "*****",
        readonly: false,
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const password = { newPassword: e.target.value };

            const validateProfileForm = validatePassword({
              ...this.props,
              ...password,
            });

            this.setProps({
              disabled:
                validateProfileForm.filter((item) => item.isValid === false)
                  .length !== 0,
              ...password,
            });

            const isValid = Boolean(
              validateProfileForm.find(
                (item) => item.name === EFormFieldNames.Password,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.Password, isValid);
          }
        },
      }),
      RowRepeatNewPassword: new ProfileRow({
        id: "repeatNewPassword",
        name: "repeat_new_password",
        label: "Повторите новый пароль",
        type: "password",
        placeholder: "*****",
        readonly: false,
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const password = { passwordRepeat: e.target.value };

            const validateProfileForm = validatePassword({
              ...this.props,
              ...password,
            });

            this.setProps({
              disabled:
                validateProfileForm.filter((item) => item.isValid === false)
                  .length !== 0,
              ...password,
            });

            const isValid = Boolean(
              validateProfileForm.find(
                (item) => item.name === EFormFieldNames.PasswordRepeat,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.PasswordRepeat, isValid);
          }
        },
      }),
      ButtonBlockProfile: new ButtonBlockProfile({
        isDraft: true,
        disabled: false,
        onClickSaveBtn: async () => {
          const res = await UserController.updatePassword({
            oldPassword: this.props.oldPassword,
            newPassword: this.props.newPassword,
          });

          if (res && res.status === "error") {
            this.setProps({
              passwordError: res.message,
            });
          } else {
            router.go("/profile");
          }
        },
      }),
    });
  }

  override render() {
    return `
    <div>
      {{{ Sidebar }}}
      {{{ LocalNav }}}
      <div class="wrapper profile-wrapper no-shadow">
            {{{ Avatar }}}

            <div class="profile-info">
                {{{ RowOldPassword }}}
                {{{ RowNewPassword }}}
                {{{ RowRepeatNewPassword }}}
            </div>
            {{passwordError}}
            {{{ ButtonBlockProfile }}}
        </div>
    </div>

    `;
  }
}
