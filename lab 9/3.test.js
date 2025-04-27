const { spec } = require('pactum');

const API_URL = 'https://catfact.ninja';

describe('Cat Facts API Tests (Specific Requirements)', () => {

  describe('Перевірка структури об\'єктів', () => {
    it('перевіряє структуру повернутих обєктів для запитів breed', () => {
        return spec()
        .get(`${API_URL}/breeds`)
        .expectStatus(200)
        .expectJsonSchema({
          type: 'object',
          properties: {
            current_page: { type: 'integer' },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  breed: { type: 'string' },
                  country: { type: 'string' },
                  origin: { type: 'string' },
                  coat: { type: ['string', 'null'] },
                  pattern: { type: ['string', 'null'] },
                },
                required: ['breed', 'country', 'origin'],
              },
            },
            first_page_url: { type: 'string' },
            from: { type: ['integer', 'null'] },
            last_page: { type: 'integer' },
            last_page_url: { type: 'string' },
            links: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  url: { type: ['string', 'null'] },
                  label: { type: 'string' },
                  active: { type: 'boolean' },
                },
                required: ['label', 'active'],
              },
            },
            next_page_url: { type: ['string', 'null'] },
            path: { type: 'string' },
            per_page: { type: 'integer' },
            prev_page_url: { type: ['string', 'null'] },
            to: { type: ['integer', 'null'] },
            total: { type: 'integer' },
          },
          required: ['current_page', 'data', 'first_page_url', 'last_page', 'last_page_url', 'links', 'path', 'per_page', 'total'],
        });
    });

    it('перевіряє структуру повернутих обєктів для запитів fact', () => {
      return spec()
        .get(`${API_URL}/fact`)
        .expectStatus(200)
        .expectJsonSchema({
          type: 'object',
          properties: {
            fact: { type: 'string' },
            length: { type: 'number' }
          },
          required: ['fact', 'length']
        });
    });

    it('перевіряє структуру повернутих обєктів для запитів facts/', () => {
      return spec()
        .get(`${API_URL}/facts/`)
        .expectStatus(200)
        .expectJsonSchema({
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  fact: { type: 'string' },
                  length: { type: 'number' }
                },
                required: ['fact', 'length']
              }
            }
          },
          required: ['data']
        });
    });
  })

  describe('Перевірка параметрів запиту', () => {
    it('перевіряє коректну роботу параметра limit', () => {
      const limit = 3;
      return spec()
        .get(`${API_URL}/facts?limit=${limit}`)
        .expectStatus(200)
        .then(({ body }) => {
          expect(body.data.length).toBe(limit);
        });
    });

    it('перевіряє коректну роботу параметра max_length', () => {
      const maxLength = 30;
      return spec()
        .get(`${API_URL}/fact?max_length=${maxLength}`)
        .expectStatus(200)
        .then(({ body }) => {
          expect(body.length).toBeLessThanOrEqual(maxLength);
        });
    });
  });

  describe('Перевірка заголовків', () => {
    it('перевіряє присутність заголовків server, cache-control, date та їх значення', () => {
      return spec()
        .get(`${API_URL}/fact`)
        .expectStatus(200)
        .expectHeader('server', /.+/)
        .expectHeader('cache-control', /.+/)
        .expectHeader('date', /.+/);
    });
  });

  describe('Перевірка типів полів', () => {
    it('перевіряє, що поля fact та length правильного типу', () => {
      return spec()
        .get(`${API_URL}/facts/?limit=2`)
        .expectStatus(200)
        .then(({ body }) => {
          body.data.forEach(factObject => {
            expect(typeof factObject.fact).toBe('string');
            expect(typeof factObject.length).toBe('number');
          });
        });
    });
  });
});