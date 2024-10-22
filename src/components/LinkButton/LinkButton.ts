import { Block } from '../../framework/Block';
import './styles.pcss';

interface IButtonProps {
  text: string;
  theme?: string;
  dataName?: string;
  url?: string;
  onClick?: () => void;
}

export class LinkButton extends Block<StringIndexed> {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: {
        click: () => props.onClick && props.onClick(),
      },
    });
  }

  render() {
    return `
      <a
      data-name="{{#if dataName }}{{dataName}}{{else}}pageLink{{/if}}"

      class="button-link {{theme}}"
      >
      {{text}}
      </a>
    `;
  }
}
