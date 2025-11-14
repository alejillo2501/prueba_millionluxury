using RealEstate.Domain.Entities;
using RealEstate.Domain.ValueObjects;

namespace RealEstate.Domain.Interfaces;

public interface IPropertyRepository
{
    Task<Property?> GetByIdAsync(string id);
    Task<IEnumerable<Property>> GetFilteredAsync(PropertyFilter filter);
    Task<long> CountFilteredAsync(PropertyFilter filter);
    Task<IEnumerable<PropertyImage>> GetPropertiesWithImagesAsync(IEnumerable<string> propertyIds);
}
