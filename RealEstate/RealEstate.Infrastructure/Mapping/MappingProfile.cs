using AutoMapper;
using RealEstate.Application.DTOs;
using RealEstate.Domain.Entities;
using RealEstate.Domain.ValueObjects; // Para PropertyFilter

namespace RealEstate.Infrastructure.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Mapeo simple: Entity → DTO
        CreateMap<Property, PropertyDto>();
        CreateMap<Owner, OwnerDto>();

        // Mapeo de filtros: DTO → ValueObject
        CreateMap<PropertyFilterDto, PropertyFilter>();

        // Mapeo parcial para PropertyDetail
        // Las propiedades Ignore() se llenan manualmente en PropertyService
        CreateMap<Property, PropertyDetailDto>()
            .ForMember(dest => dest.Owner, opt => opt.Ignore())
            .ForMember(dest => dest.MainImageUrl, opt => opt.Ignore())
            .ForMember(dest => dest.Gallery, opt => opt.Ignore())
            .ForMember(dest => dest.LastSaleValue, opt => opt.Ignore())
            .ForMember(dest => dest.LastSaleDate, opt => opt.Ignore())
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
            .ForMember(dest => dest.CodeInternal, opt => opt.MapFrom(src => src.CodeInternal))
            .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year));
    }
}