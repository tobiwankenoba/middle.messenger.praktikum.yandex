import {
  Avatar,
  ButtonBlockProfile,
  LocalNav,
  ProfileRow,
  Sidebar,
} from "../../components";
import AuthController from "../../controllers/AuthController";
import { Block } from "../../framework/Block";
import { router } from "../../framework/Router";
import { store } from "../../framework/Store";
import { connect } from "../../hoc/connectStore";

class ProfilePage extends Block<StringIndexed> {
  constructor() {
    const { profileState } = store.getState();

    const { profile } = profileState;

    console.log(profile);

    super({
      Avatar: new Avatar({
        isDraft: false,
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
        readonly: true,
      }),
      RowFirstName: new ProfileRow({
        id: "firstName",
        name: "first_name",
        label: "Имя",
        value: profile.firstName,
        readonly: true,
      }),
      RowLastName: new ProfileRow({
        id: "lastName",
        name: "second_name",
        label: "Фамилия",
        value: profile.secondName,
        readonly: true,
      }),
      RowDisplayName: new ProfileRow({
        id: "displayName",
        name: "display_name",
        label: "Имя в чате",
        value: profile.displayName,
        readonly: true,
      }),
      RowPhone: new ProfileRow({
        id: "phone",
        name: "phone",
        label: "Телефон",
        value: profile.phone,
        readonly: true,
      }),
      ButtonBlockProfile: new ButtonBlockProfile({
        isDraft: false,
        disabled: false,
        onClickLogout() {
          AuthController.logout();
        },
        onClickChangeData: () => {
          router.go("/profile/change-data");
        },
      }),
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

export default connect(ProfilePage);
