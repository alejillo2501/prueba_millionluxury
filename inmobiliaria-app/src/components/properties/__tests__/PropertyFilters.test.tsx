import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropertyFilters from '@/components/properties/PropertyFilters';

describe('PropertyFilters component', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders inputs and buttons', () => {
    render(<PropertyFilters onFilterChange={mockOnFilterChange} isLoading={false} />);
    expect(screen.getByPlaceholderText('Nombre de propiedad...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Dirección...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Limpiar/i })).toBeInTheDocument();
  });

  it('calls onFilterChange when searching', async () => {
    const user = userEvent.setup();
    render(<PropertyFilters onFilterChange={mockOnFilterChange} isLoading={false} />);
    await user.type(screen.getByPlaceholderText('Nombre de propiedad...'), 'Casa');
    await user.click(screen.getByRole('button', { name: /Buscar/i }));
    expect(mockOnFilterChange).toHaveBeenCalled();
  });

  it('resets fields on Limpiar', async () => {
    const user = userEvent.setup();
    render(<PropertyFilters onFilterChange={mockOnFilterChange} isLoading={false} />);
    const input = screen.getByPlaceholderText('Nombre de propiedad...') as HTMLInputElement;
    await user.type(input, 'Casa');
    expect(input.value).toBe('Casa');
    await user.click(screen.getByRole('button', { name: /Limpiar/i }));
    expect(input.value).toBe('');
    expect(mockOnFilterChange).toHaveBeenCalled();
  });
});