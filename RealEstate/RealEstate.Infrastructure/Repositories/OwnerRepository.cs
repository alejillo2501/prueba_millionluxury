using MongoDB.Driver;
using RealEstate.Domain.Entities;
using RealEstate.Domain.Interfaces;
using RealEstate.Infrastructure.Data;

namespace RealEstate.Infrastructure.Repositories;

public class OwnerRepository : IOwnerRepository
{
    private readonly IMongoCollection<Owner> _collection;

    public OwnerRepository(MongoContext context)
    {
        _collection = context.Owners;
    }

    public async Task<Owner?> GetByIdAsync(string id)
    {
        return await _collection.Find(o => o.Id == id && o.IsActive).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Owner>> GetAllAsync()
    {
        return await _collection.Find(o => o.IsActive).ToListAsync();
    }
}
