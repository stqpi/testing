const { ApiClient } = require('./labAssignment-lab4');

describe('ApiClient', () => {
  let mockFetch;
  let apiClient;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    apiClient = new ApiClient();
  });

  afterEach(() => {
    global.fetch = global.fetch;
  });

  it('повертає замокані дані з полем fetchedAt', async () => {
    const mockData = { id: 1, name: 'Test Data' };

    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await apiClient.fetchData();

    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/data');
    expect(result).toEqual({
      id: 1,
      name: 'Test Data',
      fetchedAt: expect.any(Number),
    });
  });
});