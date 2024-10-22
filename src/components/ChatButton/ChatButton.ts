import { Block } from '../../framework/Block';
import './styles.pcss';

interface IButtonProps {
  onClick?: VoidFunction;
  elementForRender: string;
}

export class ChatButton extends Block<StringIndexed> {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: {
        click: () => props.onClick && props.onClick(),
      },
    });
  }

  render(): string {
    return '<Button class="button-icon"> {{elementForRender}}</Button>';
  }
}
