import Image from 'next/image';
import { formatCOP, truncateText } from '@/lib/utils/formatters';
import type { Property } from '@/types/property';
import { defaultPropertyImage } from '@/lib/utils/constants';

// SRP: Only renders property card, no logic
interface PropertyCardProps {
  property: Property;
  onClick: (id: string) => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <article 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
      onClick={() => onClick(property.id)}
      aria-label={`Ver detalles de ${property.name}`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={property.imageUrl || `data:image/svg+xml;base64,${btoa(defaultPropertyImage)}`}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1" title={property.name}>
          {truncateText(property.name, 35)}
        </h3>
        
        <p className="text-gray-600 text-sm mb-2" title={property.address}>
          {truncateText(property.address, 40)}
        </p>
        
        <p className="text-blue-600 font-bold text-xl">
          {formatCOP(property.price)}
        </p>
        
        <footer className="mt-3 text-xs text-gray-500">
          <span>Código: {property.codeInternal}</span>
          <span className="ml-3">Año: {property.year}</span>
        </footer>
      </div>
    </article>
  );
}