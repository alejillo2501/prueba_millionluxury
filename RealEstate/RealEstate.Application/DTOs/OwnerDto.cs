namespace RealEstate.Application.DTOs;

public record OwnerDto
(
    string Id,
    string Name,
    string Address,
    string Photo,
    DateTime Birthday
);
