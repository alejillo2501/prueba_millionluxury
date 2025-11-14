namespace RealEstate.Application.DTOs;

public record PropertyDetailDto(
    string Id,
    string Name,
    string Address,
    decimal Price,
    string CodeInternal,
    int Year,
    OwnerDto Owner,
    string MainImageUrl,
    IEnumerable<string> Gallery,
    decimal? LastSaleValue,
    DateTime? LastSaleDate
);
