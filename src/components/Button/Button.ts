import { Block } from "../../framework/Block";
import "./styles.pcss";

interface IButtonProps {
  text: string;
  dataName?: string;
  fullWidth: boolean;
  disabled: boolean;
  onClick?: VoidFunction;
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: {
        click: () => props.onClick && props.onClick(),
      },
    });
  }

  render(): string {
    return '<Button data-name="{{dataName}}" {{#if disabled}}disabled{{/if}}  class="hidden-border button-primary {{#if fullWidth }}full-width{{/if}} {{#if disabled}}disabled{{/if}}">{{text}}</Button>';
  }
}
