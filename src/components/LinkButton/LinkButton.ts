import { Block } from "../../framework/Block";
import "./styles.pcss";

interface IButtonProps {
  text: string;
  theme?: string;
  dataName?: string;
  url: string;
}

export class LinkButton extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return `
      <a
      data-name="{{#if dataName }}{{dataName}}{{else}}pageLink{{/if}}"
      data-url="{{url}}"
      class="button-link {{theme}}"
      >
      {{text}}
      </a>
    `;
  }
}
