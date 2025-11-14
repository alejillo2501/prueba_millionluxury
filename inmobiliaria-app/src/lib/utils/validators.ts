export const isValidPriceRange = (min?: number, max?: number): boolean => {
  if (min === undefined || max === undefined) return true;
  return min <= max;
};

export const isValidId = (id: unknown): id is string => {
  return typeof id === 'string' && id.length > 0;
};