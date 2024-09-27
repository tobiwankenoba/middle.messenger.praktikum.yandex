import { Block } from "../../framework/Block";
import { IInput } from "../../types/input";
import "./styles.pcss";

type TInputProps = IInput;

export class Input extends Block {
  constructor(props: TInputProps) {
    super({
      ...props,
      events: {
        blur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.setProps({ value: e.target.value });
          }
          if (props.onBlur) {
            props.onBlur(e);
          }
        },
      },
    });
  }

  render() {
    return '<input id="{{id}}" {{#if readonly }}readonly{{/if}} type="{{#if type }}{{type}}{{else}}text{{/if}}" name="{{name}}" value="{{value}}" placeholder="{{placeholder}}" class="hidden-border {{#if class }}{{class}}{{else}}input{{/if}}"/>';
  }
}
