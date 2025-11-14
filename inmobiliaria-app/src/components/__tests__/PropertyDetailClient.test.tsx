import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyDetailClient from '@/components/PropertyDetailClient';
import * as hook from '@/hooks/usePropertyDetail';
import { useRouter } from 'next/navigation';

jest.mock('@/hooks/usePropertyDetail');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('PropertyDetailClient', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('shows loading state', () => {
    jest.spyOn(hook, 'usePropertyDetail').mockReturnValue({ property: null, loading: true, error: null, reload: jest.fn() });
    render(<PropertyDetailClient id="1" />);
    expect(screen.getByText('Cargando detalles...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    jest.spyOn(hook, 'usePropertyDetail').mockReturnValue({ property: null, loading: false, error: 'err', reload: jest.fn() });
    render(<PropertyDetailClient id="1" />);
    expect(screen.getByText('Error al cargar la propiedad.')).toBeInTheDocument();
  });

  it('renders property and navigates back', () => {
    const property = {
      id: '1',
      name: 'Casa X',
      price: 100,
      address: 'Addr',
      mainImageUrl: '',
      codeInternal: 'C1',
      year: 2020,
      area: 100,
      bedrooms: 2,
      bathrooms: 1,
      owner: { id: 'o1', name: 'Owner', address: '', photo: '', birthday: '2000-01-01T00:00:00.000Z' },
      gallery: [],
      lastSaleValue: null,
      lastSaleDate: null,
      ownerId: 'o1',
      imageUrl: '',
    };
    jest.spyOn(hook, 'usePropertyDetail').mockReturnValue({ property, loading: false, error: null, reload: jest.fn() });
    render(<PropertyDetailClient id="1" />);
    expect(screen.getByText('Casa X')).toBeInTheDocument();
    const btn = screen.getByTitle('Volver a propiedades');
    fireEvent.click(btn);
    expect(pushMock).toHaveBeenCalledWith('/');
  });
});