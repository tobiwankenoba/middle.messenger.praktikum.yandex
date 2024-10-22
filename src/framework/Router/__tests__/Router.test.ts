/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import { stub } from 'sinon';
import router from '../Router';
import { Block } from '../../Block';

class Test extends Block<StringIndexed> {
  protected render() {
    return '<div>Test</div>';
  }
}

describe('Router', () => {
  const pushStateStub = stub(window.history, 'pushState');

  const historyBackStub = stub(history, 'back');

  const historyForwardStub = stub(history, 'forward');

  before(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.use('/test-1', Test).use('/test-2', Test).start();

    router.go('/');
  });

  after(() => {
    pushStateStub.restore();
  });

  it('Возвращает длинну истории роутера', () => {
    router.go('/test-1');

    router.go('/test-2');

    expect(pushStateStub.callCount).to.equal(3);
  });

  it('Возвращается назад по истории роутера', () => {
    router.back();

    expect(historyBackStub.calledOnce).to.be.true;
  });

  it('Идет вперед по истории роутера', () => {
    router.forward();

    expect(historyForwardStub.calledOnce).to.be.true;
  });
});
