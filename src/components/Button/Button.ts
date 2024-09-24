import { Block } from "../../framework/Block";
import "./styles.pcss";

interface IButtonProps {
  text: string;
  dataName?: string;
  fullWidth: boolean;
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return '<Button data-name="{{dataName}}" class="hidden-border button-primary {{#if fullWidth }}full-width{{/if}}">{{text}}</Button>';
  }
}
