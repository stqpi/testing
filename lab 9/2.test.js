const { spec } = require('pactum');

describe('Bank Holidays API Tests', () => {
  const EXPECTED_EASTER_MONDAY_DATE_ENGLAND_WALES_2025 = '2025-04-21';
  const BANK_HOLIDAYS_URL = 'https://www.gov.uk/bank-holidays.json';

  it('Кількість святкових днів', () => {
    return spec()
      .get(BANK_HOLIDAYS_URL)
      .expectStatus(200)
      .then(({ body }) => {
        const totalHolidays = Object.values(body)
          .filter(regionData => Array.isArray(regionData?.events))
          .reduce((sum, regionData) => sum + regionData.events.length, 0);
        expect(totalHolidays).toBeGreaterThan(0);
      });
  });

  it('Дата Пасхи в 2025', () => {
    return spec()
      .get(BANK_HOLIDAYS_URL)
      .expectStatus(200)
      .then(({ body }) => {
        const englandWalesEvents = body['england-and-wales']?.events;
        const easterMondayEvent = englandWalesEvents?.find(event =>
          event.date === EXPECTED_EASTER_MONDAY_DATE_ENGLAND_WALES_2025 &&
          event.title.toLowerCase().includes('easter monday')
        );
        expect(easterMondayEvent?.date).toBe(EXPECTED_EASTER_MONDAY_DATE_ENGLAND_WALES_2025);
      });
  });
});