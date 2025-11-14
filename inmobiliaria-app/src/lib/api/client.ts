import { PropertyFilter } from '@/types/property';
import axios, { AxiosInstance, AxiosError } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptors for cross-cutting concerns
    this.client.interceptors.response.use(
      (response) => response,
      this.handleError
    );
  }

  private handleError(error: AxiosError) {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout - please try again'));
    }
    
    const status = error.response?.status;
    
    if (status === 404) {
      return Promise.reject(new Error('Resource not found'));
    }
    
    if (typeof status === 'number' && status >= 500) {
      return Promise.reject(new Error('Server error - please try again later'));
    }

    return Promise.reject(error);
  }

  async get<T>(url: string, params?: PropertyFilter): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }
}

// Dependency Injection via factory
export const createApiClient = () => 
  new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5144/api/v1');