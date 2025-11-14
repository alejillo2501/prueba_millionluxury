namespace RealEstate.Application.DTOs;

public record PropertyFilterDto(
    string? Name,
    string? Address,
    decimal? MinPrice,
    decimal? MaxPrice,
    int? Year,
    string? OwnerName,
    int PageNumber = 1,
    int PageSize = 12
);
