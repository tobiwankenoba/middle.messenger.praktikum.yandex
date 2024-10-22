import { LinkButton } from '../../components';
import { Block } from '../../framework/Block';
import { router } from '../../framework/Router';
import './styles.pcss';

export class LocalNav extends Block<StringIndexed> {
  constructor() {
    super({
      AuthLink: new LinkButton({
        text: 'Авторизация',
        onClick: () => {
          router.go('/');
        },
      }),
      RegisterLink: new LinkButton({
        text: 'Регистрация',
        onClick: () => {
          router.go('/sign-up');
        },
      }),
      ProfileLink: new LinkButton({
        text: 'Профиль',
        onClick: () => {
          router.go('/profile');
        },
      }),
      ChatLink: new LinkButton({
        text: 'Чат',
        onClick: () => {
          router.go('/messenger');
        },
      }),
      ChangeProfileLink: new LinkButton({
        text: 'Изменить данные',
        onClick: () => {
          router.go('/profile/change-data');
        },
      }),
      ChangePasswordLink: new LinkButton({
        text: 'Изменить пароль',
        onClick: () => {
          router.go('/profile/change-password');
        },
      }),
      NotFoundLink: new LinkButton({
        text: '404',
        onClick: () => {
          router.go('/404');
        },
      }),
      ServerErrorLink: new LinkButton({
        text: '500',
        onClick: () => {
          router.go('/500');
        },
      }),
    });
  }

  override render() {
    return `
      <nav class="local-nav-container">
          <ul class="local-nav">
              <li>{{{ AuthLink }}}</li>
              <li>{{{ RegisterLink }}}</li>
              <li>{{{ ChatLink }}}</li>
              <li>{{{ ProfileLink }}}</li>
              <li>{{{ ChangeProfileLink }}}</li>
              <li>{{{ ChangePasswordLink }}}</li>
              <li>{{{ NotFoundLink }}}</li>
              <li>{{{ ServerErrorLink }}}</li>
          </ul>
      </nav>
    `;
  }
}
