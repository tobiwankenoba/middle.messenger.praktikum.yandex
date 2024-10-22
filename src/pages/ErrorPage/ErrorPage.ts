import { LocalNav, Title } from '../../components';
import { Block } from '../../framework/Block';

interface IErrorProps {
  statusCode: number;
  errorMessage: string;
}

export class ErrorPage extends Block<StringIndexed> {
  constructor(props: IErrorProps) {
    super({
      ...props,
      Title: new Title({ text: 'Вход' }),
      LocalNav: new LocalNav(),
    });
  }

  override render() {
    return `
        <div class="container">
          {{{ LocalNav }}}
          <div class="wrapper no-shadow">
              <div class="not-found-text-block">
                  <div class="not-found-error">{{ statusCode }}</div>
                  <div class="not-found-notice">{{ errorMessage }}</div>
              </div>
          </div>
        </div>`;
  }
}
