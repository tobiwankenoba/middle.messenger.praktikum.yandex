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

export class ProfilePage extends Block {
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
      RowEmail: new ProfileRow({
        id: "email",
        name: "email",
        label: "Почта",
        value: profile.email,
        readonly: isDraft,
      }),
      RowFirstName: new ProfileRow({
        id: "firstName",
        name: "first_name",
        label: "Имя",
        value: profile.firstName,
        readonly: isDraft,
      }),
      RowLastName: new ProfileRow({
        id: "lastName",
        name: "last_name",
        label: "Фамилия",
        value: profile.secondName,
        readonly: isDraft,
      }),
      RowDisplayName: new ProfileRow({
        id: "displayName",
        name: "display_name",
        label: "Имя в чате",
        value: profile.displayName,
        readonly: isDraft,
      }),
      RowPhone: new ProfileRow({
        id: "phone",
        name: "phone",
        label: "Телефон",
        value: profile.phone,
        readonly: isDraft,
      }),
      ButtonBlockProfile: new ButtonBlockProfile({ isDraft: isDraft }),
    });
  }

  override render() {
    return `
    <div>
      {{{ Sidebar }}}
      {{{ LocalNav }}}
      <div class="container">
          <div class="wrapper profile-wrapper no-shadow">
              {{{ Avatar }}}
              <div class="profile-info">
                  {{{ RowEmail }}}
                  {{{ RowFirstName }}}
                  {{{ RowLastName }}}
                  {{{ RowDisplayName }}}
                  {{{ RowPhone }}}
              </div>
              {{{ ButtonBlockProfile }}}
          </div>
      </div>
    </div>
    `;
  }
}
