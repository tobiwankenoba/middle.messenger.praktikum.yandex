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
      events: {
        click: (e: Event) => {
          if (e.target instanceof HTMLElement) {
            const { target } = e;

            const url = String(
              target.dataset.url
                ? target.dataset.url
                : target.parentElement?.dataset.url,
            );

            // this.#changePage(url);

            console.log(url);
          }
        },
      },
    });
  }

  render() {
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
