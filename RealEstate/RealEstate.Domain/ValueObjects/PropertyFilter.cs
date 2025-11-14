namespace RealEstate.Domain.ValueObjects;
public class PropertyFilter
{
    public string? Name { get; private set; }
    public string? Address { get; private set; }
    public decimal? MinPrice { get; private set; }
    public decimal? MaxPrice { get; private set; }
    public int? Year { get; private set; }
    public int PageNumber { get; private set; }
    public int PageSize { get; private set; }

    public PropertyFilter(
        string? name = null,
        string? address = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        int? year = null,
        int pageNumber = 1,
        int pageSize = 12)
    {
        // LSP: Validate preconditions
        if (pageNumber < 1)
            throw new ArgumentException("Page number must be positive", nameof(pageNumber));

        if (pageSize is < 1 or > 100)
            throw new ArgumentException("Page size must be between 1 and 100", nameof(pageSize));

        if (minPrice.HasValue && maxPrice.HasValue && minPrice > maxPrice)
            throw new ArgumentException("Min price cannot exceed max price", nameof(minPrice));

        Name = name;
        Address = address;
        MinPrice = minPrice;
        MaxPrice = maxPrice;
        Year = year;
        PageNumber = pageNumber;
        PageSize = pageSize;
    }

    // OCP: Extension method for validation
    public bool IsValid() => IsValidPriceRange();

    private bool IsValidPriceRange() =>
        !MinPrice.HasValue || !MaxPrice.HasValue || MinPrice <= MaxPrice;
}
