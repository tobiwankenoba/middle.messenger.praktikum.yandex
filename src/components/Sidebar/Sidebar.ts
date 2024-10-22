import { Block } from '../../framework/Block';
import { SidebarButton } from './SidebarButton';
import './styles.pcss';

interface ISidebarProps {
  onClick?: VoidFunction;
}

export class Sidebar extends Block<StringIndexed> {
  constructor(props: ISidebarProps) {
    super({
      button: new SidebarButton({
        onClick: () => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          props.onClick && props.onClick();
        },
      }),
    });
  }

  render() {
    return `
      <div class="sidebar">
        {{{ button }}}
      </div>
    `;
  }
}
