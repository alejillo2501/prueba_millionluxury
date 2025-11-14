using AutoMapper;
using RealEstate.Application.DTOs;
using RealEstate.Application.Interfaces;
using RealEstate.Domain.Entities;
using RealEstate.Domain.Interfaces;
using RealEstate.Domain.ValueObjects;
using System.ComponentModel.DataAnnotations;

namespace RealEstate.Application.Services;

public class PropertyService : IPropertyService
{
    private readonly IPropertyRepository _propertyRepo;
    private readonly IOwnerRepository _ownerRepo;
    private readonly IPropertyImageRepository _imageRepo;
    private readonly IPropertyTraceRepository _traceRepo;
    private readonly IMapper _mapper;

    public PropertyService(
        IPropertyRepository propertyRepo,
        IOwnerRepository ownerRepo,
        IPropertyImageRepository imageRepo,
        IPropertyTraceRepository traceRepo,
        IMapper mapper)
    {
        _propertyRepo = propertyRepo ?? throw new ArgumentNullException(nameof(propertyRepo));
        _ownerRepo = ownerRepo ?? throw new ArgumentNullException(nameof(ownerRepo));
        _imageRepo = imageRepo ?? throw new ArgumentNullException(nameof(imageRepo));
        _traceRepo = traceRepo ?? throw new ArgumentNullException(nameof(traceRepo));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<PaginatedResponseDto<PropertyDto>> GetPropertiesAsync(PropertyFilterDto filter)
    {
        if (filter.PageNumber < 1 || filter.PageSize < 1)
            throw new ValidationException("Pagination parameters must be positive");

        var domainFilter = _mapper.Map<PropertyFilter>(filter);

        var properties = await _propertyRepo.GetFilteredAsync(domainFilter);
        var totalCount = await _propertyRepo.CountFilteredAsync(domainFilter);

        var propertyDtos = await MapPropertiesWithImages(properties);

        return CreatePaginatedResponse(propertyDtos, filter, totalCount);
    }

    public async Task<PropertyDetailDto?> GetPropertyDetailAsync(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new ValidationException("Property ID is required");

        var property = await _propertyRepo.GetByIdAsync(id);
        if (property == null) return null;

        // Cargar datos en paralelo
        var ownerTask = _ownerRepo.GetByIdAsync(property.OwnerId);
        var imagesTask = _imageRepo.GetByPropertyIdAsync(property.Id);
        var tracesTask = _traceRepo.GetByPropertyIdAsync(property.Id);

        await Task.WhenAll(ownerTask, imagesTask, tracesTask);

        var owner = ownerTask.Result;
        var images = imagesTask.Result.ToList();
        var lastTrace = tracesTask.Result.OrderByDescending(t => t.DateSale).FirstOrDefault();

        return BuildPropertyDetailDto(property, owner, images, lastTrace);
    }

    private async Task<IEnumerable<PropertyDto>> MapPropertiesWithImages(IEnumerable<Property> properties)
    {
        var propertyList = properties.ToList();
        var propertyIds = propertyList.Select(p => p.Id).ToList();

        // Obtener imágenes principales (una por propiedad)
        var images = await _propertyRepo.GetPropertiesWithImagesAsync(propertyIds);

        // Usar ToLookup para manejar múltiples propiedades sin duplicados (más seguro)
        var imageLookup = images.ToLookup(img => img.PropertyId, img => img.File);

        return propertyList.Select(property =>
            new PropertyDto(
                property.Id,
                property.Name,
                property.Address,
                property.Price,
                property.CodeInternal,
                property.Year,
                property.OwnerId,
                imageLookup[property.Id].FirstOrDefault() ?? string.Empty
            )
        );
    }

    private PaginatedResponseDto<PropertyDto> CreatePaginatedResponse(
        IEnumerable<PropertyDto> items,
        PropertyFilterDto filter,
        long totalCount)
    {
        var totalPages = (int)Math.Ceiling(totalCount / (double)filter.PageSize);

        return new PaginatedResponseDto<PropertyDto>(
            items,
            filter.PageNumber,
            totalPages,
            (int)totalCount,
            filter.PageNumber < totalPages,
            filter.PageNumber > 1
        );
    }

    private PropertyDetailDto BuildPropertyDetailDto(
        Property property,
        Owner? owner,
        IEnumerable<PropertyImage> images,
        PropertyTrace? lastTrace)
    {
        var ownerDto = owner != null
            ? _mapper.Map<OwnerDto>(owner)
            : new OwnerDto(string.Empty, "Desconocido", string.Empty, string.Empty, DateTime.MinValue);

        var enabledImages = images.Where(img => img.Enabled).ToList();
        var mainImage = enabledImages.FirstOrDefault();

        return new PropertyDetailDto(
            property.Id,
            property.Name,
            property.Address,
            property.Price,
            property.CodeInternal,
            property.Year,
            ownerDto,
            mainImage?.File ?? string.Empty,
            enabledImages.Select(img => img.File),
            lastTrace?.Value,
            lastTrace?.DateSale
        );
    }
}