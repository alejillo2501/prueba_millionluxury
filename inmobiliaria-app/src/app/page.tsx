import { Suspense } from 'react';
import PropertiesContainer from '@/containers/PropertiesContainer';
import { Metadata } from 'next';

// ISR: Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Inmobiliaria Medellín | Propiedades',
  description: 'Encuentra las mejores propiedades en Medellín y Antioquia',
};

// SRP: Page only handles layout and metadata
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Inmobiliaria Medellín
          </h1>
          <p className="text-gray-600">
            Encuentra tu próxima propiedad con nosotros
          </p>
        </header>
        
        <Suspense fallback={<div>Cargando...</div>}>
          <PropertiesContainer />
        </Suspense>
      </div>
    </main>
  );
}