import Constants from 'expo-constants';
import { HealthResponse, DatabaseHealthResponse, ErrorResponse } from '@optiguide/shared';

// Determine initial base URL from Expo Constants or environment variables
const resolveDefaultApiUrl = (): string => {
  if (process.env.EXPO_PUBLIC_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_API_BASE_URL;
  }
  const extraUrl = Constants.expoConfig?.extra?.apiBaseUrl;
  if (extraUrl) {
    return extraUrl;
  }
  return 'http://localhost:8000';
};

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = resolveDefaultApiUrl();
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public setBaseUrl(url: string): void {
    // Trim trailing slash for consistent concatenation
    this.baseUrl = url.trim().replace(/\/+$/, '');
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options?.headers as Record<string, string>),
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        if (isJson && data.error) {
          throw new Error(data.error.message || `Request failed with status ${response.status}`);
        }
        throw new Error(typeof data === 'string' ? data : `Request failed with status ${response.status}`);
      }

      return data as T;
    } catch (error: any) {
      if (error instanceof TypeError && error.message.includes('Network request failed')) {
        throw new Error(`Unable to reach backend at ${this.baseUrl}. Please verify your network and server status.`);
      }
      throw error;
    }
  }

  /**
   * Root service health (GET /health)
   */
  public async getRootHealth(): Promise<HealthResponse> {
    return this.request<HealthResponse>('/health');
  }

  /**
   * System composite health with database status (GET /api/v1/health)
   */
  public async getV1Health(): Promise<HealthResponse> {
    return this.request<HealthResponse>('/api/v1/health');
  }

  /**
   * Dedicated database ping diagnostic (GET /api/v1/health/db)
   */
  public async getDatabaseHealth(): Promise<DatabaseHealthResponse> {
    return this.request<DatabaseHealthResponse>('/api/v1/health/db');
  }
}

export const apiClient = new ApiClient();
export default apiClient;
