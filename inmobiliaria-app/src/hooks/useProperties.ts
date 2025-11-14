// frontend/inmobiliaria-app/hooks/useProperties.ts

import { useState, useEffect, useCallback } from 'react';
import { propertyApi } from '@/services/propertyService';
import type { Property, PropertyFilter, PaginatedResponse } from '@/types/property';
import { isValidPriceRange } from '@/lib/utils/validators';

export function useProperties(initialFilters: PropertyFilter = { pageNumber: 1, pageSize: 12 }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginatedResponse<Property> | null>(null);
  const [filters, setFilters] = useState<PropertyFilter>(initialFilters);

  // useCallback MEMOIZADO para evitar recreación en cada render
  const loadProperties = useCallback(async (currentFilters: PropertyFilter) => {
    setLoading(true);
    setError(null);

    try {
      // Validación
      if (!isValidPriceRange(currentFilters.minPrice, currentFilters.maxPrice)) {
        throw new Error('Rango de precios inválido');
      }

      const data = await propertyApi.getProperties(currentFilters);
      setProperties(data.items? data.items : []);
      setPagination(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []); // Sin dependencias para evitar loops

  // Efecto solo para carga inicial
  useEffect(() => {
    loadProperties(filters);
  }, [filters]); // Solo dependencias estables

  // useCallback MEMOIZADO para filtros
  const applyFilters = useCallback((newFilters: Partial<PropertyFilter>) => {    
    setFilters(initialFilters);
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      pageNumber: 1, // Reset a página 1
    }));
  }, [initialFilters]);

  // useCallback MEMOIZADO para paginación
  const changePage = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, pageNumber: page }));
  }, []);

  return {
    properties,
    loading,
    error,
    pagination,
    filters,
    applyFilters,
    changePage,
    reload: () => loadProperties(filters),
  } as const;
}