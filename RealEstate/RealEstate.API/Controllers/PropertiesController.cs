using Microsoft.AspNetCore.Mvc;
using RealEstate.Application.DTOs;
using RealEstate.Application.Interfaces;

namespace RealEstate.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _service;

    public PropertiesController(IPropertyService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(typeof(PaginatedResponseDto<PropertyDto>), 200)]
    public async Task<ActionResult<PaginatedResponseDto<PropertyDto>>> Get(
        [FromQuery] string? name,
        [FromQuery] string? address,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] int? year,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 12)
    {
        var filter = new PropertyFilterDto(name, address, minPrice, maxPrice, year, null, pageNumber, pageSize);
        var result = await _service.GetPropertiesAsync(filter);
        return Ok(result);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PropertyDetailDto), 200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<PropertyDetailDto>> GetById(string id)
    {
        var property = await _service.GetPropertyDetailAsync(id);
        return property == null ? NotFound() : Ok(property);
    }
}
