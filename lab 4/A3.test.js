const { computeValue } = require('./labAssignment-lab4');

describe('computeValue', () => {
  test(' перевіряє, що повернуте значення дорівнює `94`', async () => {
    const result = await computeValue();
    expect(result).toBe(94);
  });
});