const { spec } = require('pactum');

const VERSION = '2025-04-27';
const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${VERSION}/v1`;

describe('Currency API Tests', () => {

  it('Cписок доступних валют, включаючи долари США та євро', () => {
    return spec()
      .get(`${BASE_URL}/currencies.json`)
      .expectStatus(200)
      .expectJsonLike({
        usd: 'US Dollar',
        eur: 'Euro'
      });
  });

  it('Курс євро до інших валют', () => {
    return spec()
      .get(`${BASE_URL}/currencies/eur.json`)
      .expectStatus(200)
      .then(({ body }) => {
        expect(typeof body.eur.usd).toBe('number');
        expect(typeof body.eur.uah).toBe('number');
      });
  });

  it('Курс євро до долара', () => {
    return spec()
      .get(`${BASE_URL}/currencies/eur.json`)
      .expectStatus(200)
      .then(({ body }) => {
        expect(typeof body.eur.usd).toBe('number');
      });
  });

  it('Запит на неіснуючу валюту', () => {
    return spec()
      .get(`${BASE_URL}/currencies/nonexistent.json`)
      .expectStatus(404);
  });
});