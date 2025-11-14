'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePropertyDetail } from '@/hooks/usePropertyDetail';
import { formatCOP, formatDate } from '@/lib/utils/formatters';

interface Props {
  id: string;
}

export default function PropertyDetailClient({ id }: Props) {
  const router = useRouter();
  const { property, loading, error } = usePropertyDetail(id);  

  if (loading) {
    return <div className="text-center py-8">Cargando detalles...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error al cargar la propiedad.</div>;
  }

  if (!property) {
    return <div className="text-center py-8">Propiedad no encontrada.</div>;
  }

  return (
    <article className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push('/')}
        className="fixed top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 pl-4 pr-4 font-semibold shadow-lg z-50 transition-colors duration-200 cursor-pointer"
        title="Volver a propiedades"
      >
        X
      </button>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-96 w-full">
          <Image
            src={property.mainImageUrl || 'https://acortar.link/BHI5sX'}
            alt={property.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <header className="p-8 border-b">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
          <p className="text-gray-600 mb-4">{property.address}</p>
          <p className="text-4xl font-bold text-blue-600">{formatCOP(property.price)}</p>
        </header>

        <section className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-900">
          <div>
            <h2 className="text-xl font-semibold mb-4">Información General</h2>
            <dl className="space-y-2">
              <div><dt className="font-medium">Código Interno:</dt><dd>{property.codeInternal}</dd></div>
              <div><dt className="font-medium">Año:</dt><dd>{property.year}</dd></div>              
            </dl>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Propietario</h2>
            <div className="flex items-center gap-4">
              {property.owner.photo && (
                <Image
                  src={property.owner.photo}
                  alt={property.owner.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{property.owner.name}</p>
                <p className="text-sm text-gray-600">{property.owner.address}</p>
                <p className="text-sm text-gray-600">
                  Cumpleaños: {formatDate(property.owner.birthday)}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}