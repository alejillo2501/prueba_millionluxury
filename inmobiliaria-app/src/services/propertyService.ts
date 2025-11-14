import { createApiClient } from '../lib/api/client';
import type { 
  Property, 
  PropertyDetail, 
  PropertyFilter, 
  PaginatedResponse 
} from '@/types/property';

const api = createApiClient();

const buildQueryParams = (filters: PropertyFilter): Record<string, string> => {
  const params: Record<string, string> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = value.toString();
    }
  });
  
  return params;
};

// SRP: Single Responsibility - only API calls
export const propertyApi = {
  async getProperties(filter: PropertyFilter): Promise<PaginatedResponse<Property>> {
    try {
      //const params = buildQueryParams(filter);
      
      const response = await api.get<PaginatedResponse<Property>>('/properties', filter);
      
      return response;
    } catch (error) {
      // Manejo de errores...
      throw error;
    }    
  },

  async getPropertyById(id: string): Promise<PropertyDetail> {
    return api.get<PropertyDetail>(`/properties/${id}`);
  },
} as const;