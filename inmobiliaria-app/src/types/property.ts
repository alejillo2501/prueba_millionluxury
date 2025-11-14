export interface Owner {
  id: string;
  name: string;
  address: string;
  photo: string;
  birthday: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  ownerId: string;
  imageUrl: string;
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  file: string;
  enabled: boolean;
}

export interface PropertyTrace {
  id: string;
  propertyId: string;
  dateSale: string;
  value: number;
  tax: number;
}

export interface PropertyDetail extends Property {
  owner: Owner;
  mainImageUrl: string;
  gallery: string[];
  lastSaleValue: number | null;
  lastSaleDate: string | null;
}

export interface PropertyFilter {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  year?: number;
  pageNumber?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}