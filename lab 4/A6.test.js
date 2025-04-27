const { ApiHelper } = require('./labAssignment-lab4');

describe('ApiHelper', () => {
  let apiHelper;
  let mockApiCall;

  beforeEach(() => {
    apiHelper = new ApiHelper();
    mockApiCall = jest.fn();
  });

  it('повертає дані, отримані від apiCallFunction', async () => {
    const mockData = { id: 123, value: 'Test Value' };

    mockApiCall.mockResolvedValue(mockData);

    const result = await apiHelper.fetchViaHelper(mockApiCall);
    expect(mockApiCall).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });

  it('повинен викидати помилку, якщо apiCallFunction повертає null', async () => {
    mockApiCall.mockResolvedValue(null);
    await expect(apiHelper.fetchViaHelper(mockApiCall)).rejects.toThrow('Invalid data');
    expect(mockApiCall).toHaveBeenCalledTimes(1);
  });

  it('повинен викидати помилку, якщо apiCallFunction повертає не обєкт', async () => {
    mockApiCall.mockResolvedValue('not an object');
    await expect(apiHelper.fetchViaHelper(mockApiCall)).rejects.toThrow('Invalid data');
    expect(mockApiCall).toHaveBeenCalledTimes(1);
  });
});