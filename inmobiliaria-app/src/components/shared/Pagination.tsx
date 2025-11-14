interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

// SRP: Only handles pagination UI
export default function Pagination({ currentPage, totalPages, onPageChange, isLoading }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisible = 5;
  const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  const visiblePages = pages.slice(start - 1, end);

  return (
    <nav aria-label="Paginación" className="flex justify-center mt-8 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="px-4 py-2 rounded-lg disabled:opacity-50"
        aria-label="Página anterior"
      >
        Anterior
      </button>
      
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={`Ir a página ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="px-4 py-2 rounded-lg disabled:opacity-50"
        aria-label="Página siguiente"
      >
        Siguiente
      </button>
    </nav>
  );
}