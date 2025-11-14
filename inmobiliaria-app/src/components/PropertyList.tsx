'use client';

import { useProperties } from '@/hooks/useProperties';
import PropertyFilters from '@/components/properties/PropertyFilters';
import PropertyCard from '@/components/properties/PropertyCard';
import Pagination from '@/components/shared/Pagination';
import PropertySkeleton from '@/components/properties/PropertySkeleton';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function PropertyList() {
  const router = useRouter();
  
  const {
    properties,
    loading,
    error,
    pagination,
    applyFilters,
    changePage,
  } = useProperties();

  // Memoizado para evitar recreación de funciones
  const handlePropertyClick = useMemo(() => 
    (id: string) => router.push(`/properties/${id}`), 
    [router]
  );

  if (error) {
    return (
      <div className="text-center py-8 text-red-600" role="alert">
        <h2 className="text-xl font-semibold mb-2">Error al cargar propiedades</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <PropertyFilters onFilterChange={applyFilters} isLoading={loading} />
      
      <section aria-label="Lista de propiedades">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <PropertySkeleton key={`skeleton-${i}`} />)
            : properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={handlePropertyClick}
                />
              ))
          }
        </div>
        
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={changePage}
            isLoading={loading}
          />
        )}
      </section>
    </div>
  );
}