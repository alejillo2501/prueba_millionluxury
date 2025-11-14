namespace RealEstate.Application.DTOs;

public record PropertyDto
(
    string Id,
    string Name,
    string Address,
    decimal Price,
    string CodeInternal,
    int Year,
    string OwnerId,
    string ImageUrl
);
