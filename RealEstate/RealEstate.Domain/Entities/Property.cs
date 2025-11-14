namespace RealEstate.Domain.Entities;

public class Property
{
    public string Id { get; set; } = null!;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string CodeInternal { get; set; } = string.Empty;
    public int Year { get; set; }
    public string OwnerId { get; set; } = null!;
    public bool IsActive { get; set; } = true;
}
