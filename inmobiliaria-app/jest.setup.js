import '@testing-library/jest-dom';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/properties',
}));

// Mock next/image to render a plain img in tests
jest.mock('next/image', () => {
  return ({ src, alt, ...props }) => {
    return /* jsx */ <img src={src} alt={alt} {...props} />;
  };
});