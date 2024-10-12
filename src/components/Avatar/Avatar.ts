import { Block } from "../../framework/Block";
import { Input } from "../Input";
import "./styles.pcss";

interface IAvatarProps {
  isDraft: boolean;
  avatarUrl: string | null;
  name: string;
}

export class Avatar extends Block<StringIndexed> {
  constructor(props: IAvatarProps) {
    super({
      ...props,
      Input: new Input({ type: "hidden", name: "avatar" }),
    });
  }

  override render(): string {
    return `
      <div class="avatar-block">
        <img class="avatar" alt="аватар {{name}}" src="{{#if avatarUrl }}{{avatarUrl}}{{else}}src/assets/defaultAvatar.svg{{/if}}"  />
        {{{ Input }}}
        {{#if isDraft }}{{else}}<div class="avatar-title">{{name}}</div>{{/if}}
      </div>
    `;
  }
}
