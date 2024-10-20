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
import { connect } from "../../hoc/connectStore";
import { EFormFieldNames } from "../../types/registerForm";
import { getFieldFormError } from "../../utils/getFieldFormError";
import { validateFormProfile } from "../../utils/validates/validateProfileForm";

class ChageProfileData extends Block<StringIndexed> {
  constructor() {
    const { profileState } = store.getState();

    const { profile } = profileState;

    super({
      Avatar: new Avatar({
        isDraft: true,
        name: profile.firstName,
        avatarUrl: profile.avatar,
        onChange: (e) => {
          if (e.target instanceof HTMLInputElement && e.target.files) {
            const formData = new window.FormData();

            formData.append("avatar", e.target.files[0]);

            this.setProps({ avatar: formData });
          }
        },
      }),
      Sidebar: new Sidebar({
        onClick: () => {
          router.go("/profile");
        },
      }),
      LocalNav: new LocalNav(),
      RowEmail: new ProfileRow({
        id: "email",
        name: "email",
        label: "Почта",
        value: profile.email,
        readonly: false,
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const email = { email: e.target.value };

            const validateProfileForm = validateFormProfile(
              {
                ...this.props,
                ...email,
              },
              profile,
            );

            this.setProps({
              disabled:
                validateProfileForm.filter((item) => item.isValid === false)
                  .length !== 0 || email.email === "",
              ...email,
            });

            const isValid = Boolean(
              validateProfileForm.find(
                (item) => item.name === EFormFieldNames.Email,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.Email, isValid);
          }
        },
      }),
      RowFirstName: new ProfileRow({
        id: "firstName",
        name: "first_name",
        label: "Имя",
        value: profile.firstName,
        readonly: false,
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const firstName = { first_name: e.target.value };

            const validateProfileForm = validateFormProfile(
              {
                ...this.props,
                ...firstName,
              },
              profile,
            );

            this.setProps({
              disabled:
                validateProfileForm.filter((item) => item.isValid === false)
                  .length !== 0 || firstName.first_name === "",
              ...firstName,
            });

            const isValid = Boolean(
              validateProfileForm.find(
                (item) => item.name === EFormFieldNames.FirstName,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.FirstName, isValid);
          }
        },
      }),
      RowLastName: new ProfileRow({
        id: "lastName",
        name: "second_name",
        label: "Фамилия",
        value: profile.secondName,
        readonly: false,
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const secondName = { second_name: e.target.value };

            const validateProfileForm = validateFormProfile(
              {
                ...this.props,
                ...secondName,
              },
              profile,
            );

            this.setProps({
              disabled:
                validateProfileForm.filter((item) => item.isValid === false)
                  .length !== 0 || secondName.second_name === "",
              ...secondName,
            });

            const isValid = Boolean(
              validateProfileForm.find(
                (item) => item.name === EFormFieldNames.SecondName,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.SecondName, isValid);
          }
        },
      }),
      RowDisplayName: new ProfileRow({
        id: "displayName",
        name: "display_name",
        label: "Имя в чате",
        value: profile.displayName,
        readonly: false,
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const displayName = { displayName: e.target.value };

            const validateProfileForm = validateFormProfile(
              {
                ...this.props,
                ...displayName,
              },
              profile,
            );

            this.setProps({
              disabled:
                validateProfileForm.filter((item) => item.isValid === false)
                  .length !== 0,
              ...displayName,
            });

            const isValid = Boolean(
              validateProfileForm.find(
                (item) => item.name === EFormFieldNames.DisplayName,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.DisplayName, isValid);
          }
        },
      }),
      RowPhone: new ProfileRow({
        id: "phone",
        name: "phone",
        label: "Телефон",
        value: profile.phone,
        readonly: false,
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const phone = { phone: e.target.value };

            const validateProfileForm = validateFormProfile(
              {
                ...this.props,
                ...phone,
              },
              profile,
            );

            this.setProps({
              disabled:
                validateProfileForm.filter((item) => item.isValid === false)
                  .length !== 0 || phone.phone === "",
              ...phone,
            });

            const isValid = Boolean(
              validateProfileForm.find(
                (item) => item.name === EFormFieldNames.Phone,
              )?.isValid,
            );

            return getFieldFormError(EFormFieldNames.Phone, isValid);
          }
        },
      }),
      ButtonBlockProfile: new ButtonBlockProfile({
        isDraft: true,
        disabled: false,
        onClickSaveBtn: async () => {
          try {
            UserController.updateProfile({
              first_name: this.props.first_name ?? profile.firstName,
              second_name: this.props.second_name ?? profile.secondName,
              email: this.props.email ?? profile.email,
              phone: this.props.phone ?? profile.phone,
              display_name: this.props.displayName ?? profile.displayName,
            });

            if (this.props.avatar) {
              await UserController.updateAvatar(this.props.avatar);
            }

            router.go("/profile");
          } catch (e) {
            store.set("error", e);
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

export default connect(ChageProfileData);
