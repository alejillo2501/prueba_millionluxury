import { renderHook, act, waitFor } from '@testing-library/react';
import { useProperties } from '@/hooks/useProperties';
import { propertyApi } from '@/services/propertyService';

jest.mock('@/services/propertyService');

describe('useProperties', () => {
  const mockedPropertyApi = propertyApi as jest.Mocked<typeof propertyApi>;
  const sampleResponse = {
    items: [{ id: '1', name: 'Casa 1', price: 100 }],
    pageNumber: 1,
    pageSize: 12,
    totalCount: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedPropertyApi.getProperties.mockResolvedValue(sampleResponse);
  });

  it('initial state and loads properties', async () => {
    const { result } = renderHook(() => useProperties());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.properties).toEqual(sampleResponse.items);
    expect(result.current.pagination?.totalCount).toBe(1);
    expect(mockedPropertyApi.getProperties).toHaveBeenCalledWith({ pageNumber: 1, pageSize: 12 });
  });

  it('applyFilters updates filters and resets page', async () => {
    const { result } = renderHook(() => useProperties());

    await act(async () => {
      result.current.applyFilters({ name: 'Casa', minPrice: 50 });
    });

    expect(result.current.filters.name).toBe('Casa');
    expect(result.current.filters.pageNumber).toBe(1);
    expect(mockedPropertyApi.getProperties).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSize: 12,
      name: 'Casa',
      minPrice: 50,
    });
  });

  it('changePage sets new page', async () => {
    const { result } = renderHook(() => useProperties());

    await act(async () => {
      result.current.changePage(3);
    });

    expect(result.current.filters.pageNumber).toBe(3);
    expect(mockedPropertyApi.getProperties).toHaveBeenCalledWith({ pageNumber: 3, pageSize: 12 });
  });
});