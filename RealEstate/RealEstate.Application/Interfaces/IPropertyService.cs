using RealEstate.Application.DTOs;

namespace RealEstate.Application.Interfaces;

public interface IPropertyService
{
    /// <summary>
    /// Retrieves paginated properties with applied filters
    /// </summary>
    Task<PaginatedResponseDto<PropertyDto>> GetPropertiesAsync(PropertyFilterDto filter);

    /// <summary>
    /// Retrieves complete property details by ID including owner, images and trace history
    /// </summary>
    Task<PropertyDetailDto?> GetPropertyDetailAsync(string id);
}
