import {
  Avatar,
  ButtonBlockProfile,
  LocalNav,
  ProfileRow,
  Sidebar,
} from "../../components";
import { Block } from "../../framework/Block";
import { IProfileState } from "../../types/profile";

interface IProfileProps {
  profileState: IProfileState;
}

export class ChangePasswordPage extends Block<StringIndexed> {
  constructor({ profileState }: IProfileProps) {
    const { isDraft, profile } = profileState;

    super({
      Avatar: new Avatar({
        isDraft: isDraft,
        name: profile.firstName,
        avatarUrl: profile.avatar,
      }),
      Sidebar: new Sidebar(),
      LocalNav: new LocalNav(),
      RowOldPassword: new ProfileRow({
        id: "password",
        name: "password",
        label: "Старый пароль",
        type: "password",
        placeholder: "*****",
        readonly: isDraft,
      }),
      RowNewPassword: new ProfileRow({
        id: "newPassword",
        name: "new_password",
        label: "Новый пароль",
        type: "password",
        placeholder: "*****",
        readonly: isDraft,
      }),
      RowRepeatNewPassword: new ProfileRow({
        id: "repeatNewPassword",
        name: "repeat_new_password",
        label: "Повторите новый пароль",
        type: "password",
        placeholder: "*****",
        readonly: isDraft,
      }),
      ButtonBlockProfile: new ButtonBlockProfile({
        isDraft: isDraft,
        disabled: false,
      }),
    });
  }

  override render() {
    return `
    <div>
      {{{ Sidebar }}}
      {{{ LocalNav }}}
      <div class="wrapper profile-wrapper">
            {{{ Avatar }}}

            <div class="profile-info">
                {{{ RowOldPassword }}}
                {{{ RowNewPassword }}}
                {{{ RowRepeatNewPassword }}}
            </div>

            {{{ ButtonBlockProfile }}}
        </div>
    </div>

    `;
  }
}

// {{> ProfileRow isDraft=profileState.isDraft id="login" name="login" label="Логин" value=profileState.profile.login }}
// {{> ProfileRow isDraft=profileState.isDraft id="firstName" name="first_name" label="Имя" value=profileState.profile.firstName }}
// {{> ProfileRow isDraft=profileState.isDraft id="secondName" name="second_name" label="Фамилия" value=profileState.profile.secondName }}
// {{> ProfileRow isDraft=profileState.isDraft id="displayName" name="display_name" label="Имя в чате" value=profileState.profile.displayName }}
// {{> ProfileRow isDraft=profileState.isDraft id="phone" name="phone" label="Телефон" value=profileState.profile.phone }}

// {{> ButtonBlockProfile }}
