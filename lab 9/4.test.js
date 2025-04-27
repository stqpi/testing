const { spec } = require('pactum');

const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';
const WORDS_TO_TEST = ['text', 'test', 'sun', 'dog', 'car'];

describe('Dictionary API Tests', () => {
  WORDS_TO_TEST.forEach(word => {
    it(`should confirm the presence of examples for "${word}"`, () => {
      return spec()
        .get(`${BASE_URL}/${word}`)
        .expectStatus(200)
        .then(({ body }) => {
          const hasExample = body.some(entry =>
            entry.meanings?.some(meaning =>
              meaning.definitions?.some(definition => definition.example)
            )
          );
          expect(hasExample).toBe(true);
        });
    });
  });
});