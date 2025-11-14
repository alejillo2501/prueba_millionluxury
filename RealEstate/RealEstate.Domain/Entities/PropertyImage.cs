namespace RealEstate.Domain.Entities;

public class PropertyImage
{
    public string Id { get; set; } = null!;
    public string PropertyId { get; set; } = null!;
    public string File { get; set; } = string.Empty;
    public bool Enabled { get; set; } = true;
}
