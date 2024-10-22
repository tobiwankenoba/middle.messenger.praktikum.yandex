import sinon from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from '../helper';
import { EMethods } from '../../../types/fetch';

describe('HTTPTransport', () => {
  it('Построение строки запроса', async () => {
    const http = new HTTPTransport('/test');

    const stub = sinon.stub(http, 'request').resolves();

    const method = EMethods.GET;

    await http.get('', { data: { a: 'qwerty', b: 'zxcv' } });

    expect(
      stub.calledWithMatch(
        'https://ya-praktikum.tech/api/v2/test?a=qwerty&b=zxcv',
        { method },
      ),
    );
  });

  it('Возвращает ошибку при попытке получить данные пользователя', async () => {
    const http = new HTTPTransport('/auth');

    await http.get('/user', {}).catch((error) => {
      expect(error.message.toString()).to.equal(
        'Request failed with status 401, Cookie is not valid',
      );
    });
  });

  it('Возвращает ошибку при авторизации из-за невалидных данных', async () => {
    const http = new HTTPTransport('/auth');

    await http.post('/signin', {}).catch((error) => {
      const errorMessage = error.message.toString();

      expect(errorMessage).to.equal(
        'Request failed with status 400, login is empty, but required',
      );
    });
  });
});
