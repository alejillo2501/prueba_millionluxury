namespace RealEstate.Domain.Entities;

public class PropertyTrace
{
    public string Id { get; set; } = null!;
    public string PropertyId { get; set; } = null!;
    public DateTime DateSale { get; set; }
    public decimal Value { get; set; }
    public decimal Tax { get; set; }
    public bool IsActive { get; set; } = true;
}
