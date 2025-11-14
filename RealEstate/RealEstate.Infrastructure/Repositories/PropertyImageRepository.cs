using MongoDB.Driver;
using RealEstate.Domain.Entities;
using RealEstate.Domain.Interfaces;
using RealEstate.Infrastructure.Data;

namespace RealEstate.Infrastructure.Repositories;

public class PropertyImageRepository : IPropertyImageRepository
{
    private readonly IMongoCollection<PropertyImage> _collection;

    public PropertyImageRepository(MongoContext context)
    {
        _collection = context.PropertyImages;
    }

    public async Task<IEnumerable<PropertyImage>> GetByPropertyIdAsync(string propertyId)
    {
        return await _collection
            .Find(img => img.PropertyId.ToString() == propertyId && img.Enabled)
            .SortBy(img => img.Id) // Asume que el orden de inserción determina la principal
            .ToListAsync();
    }

    public async Task<PropertyImage?> GetMainImageAsync(string propertyId)
    {
        return await _collection
            .Find(img => img.PropertyId == propertyId && img.Enabled)
            .SortBy(img => img.Id)
            .FirstOrDefaultAsync();
    }
}
