import { Block } from '../../framework/Block';
import './styles.pcss';

interface ITitleProps {
  text: string;
  class?: string;
}

export class Title extends Block<StringIndexed> {
  constructor(props: ITitleProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return '<div class="title">{{text}}</div>';
  }
}
