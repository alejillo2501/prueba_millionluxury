using RealEstate.Domain.Entities;

namespace RealEstate.Domain.Interfaces;

public interface IPropertyImageRepository
{
    Task<IEnumerable<PropertyImage>> GetByPropertyIdAsync(string propertyId);
    Task<PropertyImage?> GetMainImageAsync(string propertyId);
}
