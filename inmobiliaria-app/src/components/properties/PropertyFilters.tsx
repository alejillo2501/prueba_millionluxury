'use client';

import { useCallback, useState } from 'react';
import type { PropertyFilter } from '@/types/property';
import { isValidPriceRange } from '@/lib/utils/validators';

interface FiltersProps {
  onFilterChange: (filters: PropertyFilter) => void;
  isLoading: boolean;
}

export default function PropertyFilters({ onFilterChange, isLoading }: FiltersProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [year, setYear] = useState<string>('');

  // useCallback MEMOIZADO
  const handleFilterChange = useCallback(() => {
    const newFilters: PropertyFilter = {
      pageNumber: 1,
      pageSize: 12,
    };

    if (name.trim()) newFilters.name = name.trim();
    if (address.trim()) newFilters.address = address.trim();
    if (minPrice) newFilters.minPrice = parseInt(minPrice);
    if (maxPrice) newFilters.maxPrice = parseInt(maxPrice);
    if (year) newFilters.year = parseInt(year);
    


    if (isValidPriceRange(newFilters.minPrice, newFilters.maxPrice)) {
      onFilterChange(newFilters);      
    } else {
      console.warn('Invalid price range');
    }

  }, [name, address, minPrice, maxPrice, year, onFilterChange]);

  // useCallback MEMOIZADO
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();    
    handleFilterChange();
  }, [handleFilterChange]);

  const handleReset = useCallback(() => {
    setName('');
    setAddress('');
    setMinPrice('');
    setMaxPrice('');
    setYear('');
     const newFilters: PropertyFilter = {
      pageNumber: 1,
      pageSize: 12,
    };
    onFilterChange(newFilters);
  }, [onFilterChange]);

  return (
    <section className="bg-white text-gray-900 p-6 rounded-xl shadow-md mb-6" aria-label="Filtros de búsqueda">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Nombre de propiedad..."
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Dirección..."
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="number"
          placeholder="Precio mínimo"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="number"
          placeholder="Año"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
        <button 
          type="button" 
          className="flex-1 bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50 cursor-pointer"
          onClick={handleReset}
          disabled={isLoading}
        >
          Limpiar
        </button>
      </form>
    </section>
  );
}