import { Suspense } from 'react';
import PropertyDetailClient from '@/components/PropertyDetailClient';

interface Props {
  params: { id: string };
}

// OCP: Can extend with generateStaticParams for SSG
export async function generateStaticParams() {
  // Return empty for ISR/SSR, or fetch popular property IDs
  return [];
}

export default async function PropertyDetailPage({ params }: Props) {
  
  const { id } = await params;
  return(
    <Suspense fallback={<div className="text-center py-8">Cargando detalles...</div>}>
        <PropertyDetailClient id={id} />
    </Suspense>
  )
}