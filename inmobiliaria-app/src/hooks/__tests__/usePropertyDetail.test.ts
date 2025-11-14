import { renderHook, waitFor } from '@testing-library/react';
import { usePropertyDetail } from '@/hooks/usePropertyDetail';
import { propertyApi } from '@/services/propertyService';

jest.mock('@/services/propertyService');

describe('usePropertyDetail', () => {
  const mockedPropertyApi = propertyApi as jest.Mocked<typeof propertyApi>;
  const sample = { id: '1', name: 'Casa Test', price: 123 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads property by id', async () => {
    mockedPropertyApi.getPropertyById.mockResolvedValue(sample as any);

    const { result } = renderHook(() => usePropertyDetail('1'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.property).toEqual(sample);
    expect(result.current.error).toBeNull();
    expect(mockedPropertyApi.getPropertyById).toHaveBeenCalledWith('1');
  });

  it('handles error when not found', async () => {
    mockedPropertyApi.getPropertyById.mockRejectedValue(new Error('Not found'));

    const { result } = renderHook(() => usePropertyDetail('bad-id'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.property).toBeNull();
    expect(result.current.error).toBeTruthy();
    expect(mockedPropertyApi.getPropertyById).toHaveBeenCalledWith('bad-id');
  });
});