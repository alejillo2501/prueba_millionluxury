using MongoDB.Driver;
using RealEstate.Domain.Entities;
using RealEstate.Domain.Interfaces;
using RealEstate.Infrastructure.Data;

namespace RealEstate.Infrastructure.Repositories;

public class PropertyTraceRepository : IPropertyTraceRepository
{
    private readonly IMongoCollection<PropertyTrace> _collection;

    public PropertyTraceRepository(MongoContext context)
    {
        _collection = context.PropertyTraces;
    }

    public async Task<IEnumerable<PropertyTrace>> GetByPropertyIdAsync(string propertyId)
    {
        return await _collection
            .Find(trace => trace.PropertyId == propertyId && trace.IsActive)
            .SortByDescending(trace => trace.DateSale)
            .ToListAsync();
    }
}
