import { Block } from "../../framework/Block";
import { router } from "../../framework/Router";
import { Button } from "../Button/Button";
import { LinkButton } from "../LinkButton";
import "./styles.pcss";

interface IButtonBlockProfileProps {
  isDraft: boolean;
  disabled: boolean;
  onClickSaveBtn?: () => void;
  onClickLogout?: () => void;
  onClickChangeData?: () => void;
}

export class ButtonBlockProfile extends Block<StringIndexed> {
  constructor(props: IButtonBlockProfileProps) {
    super({
      ...props,
      LinkChangeData: new LinkButton({
        text: "Изменить данные",
        url: "changeProfileData",
        onClick: () => props.onClickChangeData && props.onClickChangeData(),
      }),
      LinkChangePassword: new LinkButton({
        text: "Изменить пароль",
        url: "changeProfilePassword",
        onClick: () => {
          router.go("/profile/change-password");
        },
      }),
      LinkLogout: new LinkButton({
        text: "Выйти",
        url: "#",
        onClick: () => props.onClickLogout && props.onClickLogout(),
      }),
      SaveButton: new Button({
        dataName: "saveChanges",
        text: "Сохранить",
        fullWidth: true,
        disabled: props.disabled,
        onClick: () => props.onClickSaveBtn && props.onClickSaveBtn(),
      }),
    });
  }

  render() {
    return `
      {{#unless isDraft }}
        <div class="profile-info">
            <div class="profile-row">{{{ LinkChangeData }}}</div>
            <div class="profile-row">{{{ LinkChangePassword }}}</div>
            <div class="profile-row">{{{ LinkLogout }}}</div>
        </div>
        {{else}}
        <div class="btns-block">
            {{{ SaveButton }}}
        </div>
      {{/unless}}
    `;
  }
}
