'use client';
import { useState, useEffect, useCallback } from 'react';
import { propertyApi } from '@/services/propertyService';
import type { PropertyDetail } from '@/types/property';

export function usePropertyDetail(id: string) {
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProperty = useCallback(async () => {
    if (!id) {
      setError('ID de propiedad inválido');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await propertyApi.getPropertyById(id);
      setProperty(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar propiedad';
      setError(message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProperty();
  }, [loadProperty]);

  return {
    property,
    loading,
    error,
    reload: loadProperty,
  };
}