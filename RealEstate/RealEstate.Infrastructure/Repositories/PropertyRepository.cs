using MongoDB.Driver;
using RealEstate.Domain.Entities;
using RealEstate.Domain.Interfaces;
using RealEstate.Domain.ValueObjects;
using RealEstate.Infrastructure.Data;

namespace RealEstate.Infrastructure.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> _collection;
    private readonly IMongoCollection<PropertyImage> _imageCollection;

    public PropertyRepository(MongoContext context)
    {
        _collection = context.Properties;
        _imageCollection = context.PropertyImages;
    }

    public async Task<Property?> GetByIdAsync(string id)
    {
        return await _collection.Find(p => p.Id == id && p.IsActive).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Property>> GetFilteredAsync(PropertyFilter filter)
    {
        var mongoFilter = BuildFilter(filter);

        return await _collection
            .Find(mongoFilter)
            .Skip((filter.PageNumber - 1) * filter.PageSize)
            .Limit(filter.PageSize)
            .SortByDescending(p => p.Price)
            .ToListAsync();
    }

    public async Task<long> CountFilteredAsync(PropertyFilter filter)
    {
        var mongoFilter = BuildFilter(filter);
        return await _collection.CountDocumentsAsync(mongoFilter);
    }

    public async Task<IEnumerable<PropertyImage>> GetPropertiesWithImagesAsync(IEnumerable<string> propertyIds)
    {
        var allImages = await _imageCollection
            .Find(img => img.Enabled && !propertyIds.Contains(img.PropertyId))
            .SortBy(img => img.Id) // La primera imagen es la principal
            .ToListAsync();

        // Tomar solo la primera imagen por PropertyId (evita duplicados)
        return allImages
            .GroupBy(img => img.PropertyId)
            .Select(g => g.First())
            .ToList();
    }

    private FilterDefinition<Property> BuildFilter(PropertyFilter filter)
    {
        var builder = Builders<Property>.Filter;
        var mongoFilter = builder.Empty;

        // Active properties only
        mongoFilter &= builder.Eq(p => p.IsActive, true);

        if (!string.IsNullOrWhiteSpace(filter.Name))
            mongoFilter &= builder.Text(filter.Name);

        if (!string.IsNullOrWhiteSpace(filter.Address))
            mongoFilter &= builder.Text(filter.Address);

        if (filter.MinPrice.HasValue)
            mongoFilter &= builder.Gte(p => p.Price, filter.MinPrice.Value);

        if (filter.MaxPrice.HasValue)
            mongoFilter &= builder.Lte(p => p.Price, filter.MaxPrice.Value);

        if (filter.Year.HasValue)
            mongoFilter &= builder.Eq(p => p.Year, filter.Year.Value);

        return mongoFilter;
    }
}
