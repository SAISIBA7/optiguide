import { apiClient } from '../src/services/apiClient';

describe('ApiClient', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    apiClient.setBaseUrl('http://test-server:8000');
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('should trim trailing slashes from base URL', () => {
    apiClient.setBaseUrl('http://example.com/api///');
    expect(apiClient.getBaseUrl()).toBe('http://example.com/api');
  });

  it('should fetch root health correctly', async () => {
    const mockHealth = {
      status: 'ok',
      service: 'optiguide-api',
      version: '1.0.0',
      environment: 'test',
      timestamp: '2026-11-02T01:00:00Z',
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: {
        get: (header: string) => (header === 'content-type' ? 'application/json' : null),
      },
      json: async () => mockHealth,
    } as any);

    const result = await apiClient.getRootHealth();
    expect(result).toEqual(mockHealth);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://test-server:8000/health',
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: 'application/json',
        }),
      })
    );
  });

  it('should handle API errors and parse error envelope message', async () => {
    const mockError = {
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details: [],
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 422,
      headers: {
        get: (header: string) => (header === 'content-type' ? 'application/json' : null),
      },
      json: async () => mockError,
    } as any);

    await expect(apiClient.getV1Health()).rejects.toThrow('Invalid request data');
  });

  it('should handle network connection failure', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('Network request failed'));

    await expect(apiClient.getDatabaseHealth()).rejects.toThrow(
      'Unable to reach backend at http://test-server:8000'
    );
  });
});
