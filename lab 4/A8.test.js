const { OrderProcessor, calculateFinalPrice } = require('./labAssignment-lab4');

describe('OrderProcessor', () => {
  let mockCurrencyConverter;
  let orderProcessor;
  const mockOrder = {
    items: [{ price: 20, quantity: 2 }],
    taxRate: 0.1,
    currency: 'USD',
  };
  const initialFinalPrice = calculateFinalPrice(mockOrder, null);

  beforeEach(() => {
    mockCurrencyConverter = jest.fn();
    orderProcessor = new OrderProcessor(mockCurrencyConverter);
  });

  it('повинен коректно розраховувати та конвертувати фінальну ціну замовлення', async () => {
    const targetCurrency = 'EUR';
    const convertedPrice = 88; 
    mockCurrencyConverter.mockResolvedValue(convertedPrice);

    const processedPrice = await orderProcessor.processOrder(mockOrder, targetCurrency);

    expect(mockCurrencyConverter).toHaveBeenCalledWith(initialFinalPrice, 'USD', 'EUR');
    expect(processedPrice).toBe(convertedPrice);
  });

  it('повинен повертати оригінальну ціну, якщо конвертер кидає помилку', async () => {
    const targetCurrency = 'UAH';
    mockCurrencyConverter.mockRejectedValue(new Error('Conversion failed'));

    const processedPrice = await orderProcessor.processOrder(mockOrder, targetCurrency);

    expect(mockCurrencyConverter).toHaveBeenCalledWith(initialFinalPrice, 'USD', 'UAH');
    expect(processedPrice).toBe(initialFinalPrice);
});
});