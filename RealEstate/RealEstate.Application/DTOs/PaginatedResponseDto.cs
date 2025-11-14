namespace RealEstate.Application.DTOs;

public record PaginatedResponseDto<T>(
    IEnumerable<T> Items,
    int CurrentPage,
    int TotalPages,
    int TotalCount,
    bool HasNextPage,
    bool HasPreviousPage
);
