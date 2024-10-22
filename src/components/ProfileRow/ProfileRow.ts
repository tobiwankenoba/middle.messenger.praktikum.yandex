import { Block } from '../../framework/Block';
import { IInput } from '../../types/input';
import { Input } from '../Input';
import './styles.pcss';

interface IProfileRowProps extends IInput {
  label: string;
  onBlur?: (e: Event) => string | undefined;
}

export class ProfileRow extends Block<StringIndexed> {
  constructor(props: IProfileRowProps) {
    const { label } = props;
    super({
      label,
      Input: new Input({
        ...props,
        class: 'row-input',
        onBlur: (e: Event) => {
          if (props.onBlur) {
            const res = props.onBlur(e);

            this.setProps({
              errorMessage: res !== '' ? res : undefined,
            });
          }
        },
      }),
    });
  }

  render() {
    return `
      <div class="profile-row">
        <label class="row-label">{{label}}</label>
        {{{ Input }}}
        {{# if errorMessage }}<div class="input-error-message input-error-profile-row">{{ errorMessage }}</div>{{/if}}
      </div>
    `;
  }
}
