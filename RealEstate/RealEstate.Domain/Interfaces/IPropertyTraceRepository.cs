using RealEstate.Domain.Entities;

namespace RealEstate.Domain.Interfaces;

public interface IPropertyTraceRepository
{
    Task<IEnumerable<PropertyTrace>> GetByPropertyIdAsync(string propertyId);
}
