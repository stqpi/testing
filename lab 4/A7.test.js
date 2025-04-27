const { calculateFinalPrice } = require("./labAssignment-lab4");

describe("calculateFinalPrice", () => {
  const discountService = { getDiscount: jest.fn(() => 0.3) }; 
  test("розраховує фінальну ціну коректно", () => {
    const order = { items: [{ price: 100, quantity: 2 }], taxRate: 0.1, discountService };
    expect(calculateFinalPrice(order, discountService)).toBe(154); 
});

  test("обмежує знижку до 50%", () => {
    discountService.getDiscount.mockReturnValue(0.6); 
    const order = { items: [{ price: 100, quantity: 1 }], taxRate: 0.1, discountService };
    expect(calculateFinalPrice(order, discountService)).toBe(55); 
  });

  test("викидає помилку для невалідних даних", () => {
    expect(() => calculateFinalPrice({}, discountService)).toThrow("Invalid order");
    expect(() => calculateFinalPrice({ items: [] }, discountService)).toThrow("Invalid order");
    expect(() => calculateFinalPrice({ items: [{ price: -10, quantity: 1 }] }, discountService)).toThrow("Invalid item data");
  });
});
