using RealEstate.Domain.Entities;

namespace RealEstate.Domain.Interfaces;

public interface IOwnerRepository
{
    Task<Owner?> GetByIdAsync(string id);
    Task<IEnumerable<Owner>> GetAllAsync();
}
