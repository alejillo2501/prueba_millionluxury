using NUnit.Framework;
using Moq;
using RealEstate.Application.Services;
using RealEstate.Application.Interfaces;
using RealEstate.Domain.Entities;
using RealEstate.Domain.Interfaces;
using RealEstate.Domain.ValueObjects;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using RealEstate.Application.DTOs;

namespace RealEstate.Tests
{
    public class PropertyServiceTests
    {
        private Mock<IPropertyRepository> _propertyRepositoryMock = null!;
        private Mock<IOwnerRepository> _ownerRepositoryMock = null!;
        private Mock<IPropertyImageRepository> _imageRepositoryMock = null!;
        private Mock<IPropertyTraceRepository> _traceRepositoryMock = null!;
        private Mock<IMapper> _mapperMock = null!;
        private PropertyService _propertyService = null!;

        [SetUp]
        public void SetUp()
        {
            _propertyRepositoryMock = new Mock<IPropertyRepository>();
            _ownerRepositoryMock = new Mock<IOwnerRepository>();
            _imageRepositoryMock = new Mock<IPropertyImageRepository>();
            _traceRepositoryMock = new Mock<IPropertyTraceRepository>();
            _mapperMock = new Mock<IMapper>();

            _propertyService = new PropertyService(
                _propertyRepositoryMock.Object,
                _ownerRepositoryMock.Object,
                _imageRepositoryMock.Object,
                _traceRepositoryMock.Object,
                _mapperMock.Object
            );
        }

        [Test]
        public async Task GetPropertiesAsync_ReturnsPaginatedProperties()
        {
            // Arrange
            var filterDto = new PropertyFilterDto(null, null, null, null, null, null, 1,12);
            var filter = new PropertyFilter(pageNumber: 1, pageSize: 10);
            var properties = new List<Property>
            {
                new Property { 
                    Id = "65a1e0b8c9f1b2a3d4e5f678", 
                    Name = "Apartamento Moderno El Poblado", 
                    Address = "Carrera 43A #10-50, El Poblado, Medellín", 
                    Price = 850000000,
                    CodeInternal = "PROP-2024-001",
                    Year = 2022, 
                    OwnerId = "507f191e810c19729de860ea", 
                    IsActive = true 
                }
            };
            var propertyDtos = new List<PropertyDto>
            {
                new PropertyDto(
                    "65a1e0b8c9f1b2a3d4e5f678", 
                    "Apartamento Moderno El Poblado",
                    "Carrera 43A #10-50, El Poblado, Medellín",
                    850000000,
                    "PROP-2024-001",
                    2022,
                    "507f191e810c19729de860ea",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                    )
            };

            _mapperMock.Setup(m => m.Map<PropertyFilter>(filterDto)).Returns(filter);
            _propertyRepositoryMock.Setup(r => r.GetFilteredAsync(filter)).ReturnsAsync(properties);
            _propertyRepositoryMock.Setup(r => r.CountFilteredAsync(filter)).ReturnsAsync(properties.Count);
            _mapperMock.Setup(m => m.Map<IEnumerable<PropertyDto>>(properties)).Returns(propertyDtos);

            // Act
            var result = await _propertyService.GetPropertiesAsync(filterDto);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Items.Count(), Is.EqualTo(1));
            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Items.First().Name, Is.EqualTo("Apartamento Moderno El Poblado"));
        }

        [Test]
        public async Task GetPropertyDetailAsync_ReturnsDetail_WhenPropertyExists()
        {
            // Arrange
            var propertyId = "1";
            var property = new Property { Id = propertyId, Name = "Casa", Address = "Calle 1", Price = 100000, Year = 2020, OwnerId = "O1", IsActive = true };
            var owner = new Owner { Id = "O1", Name = "Juan", Address = "Calle 2", IsActive = true };
            var images = new List<PropertyImage> { new PropertyImage { Id = "img1", PropertyId = propertyId, File = "img.jpg", Enabled = true } };
            var traces = new List<PropertyTrace> { new PropertyTrace { Id = "t1", PropertyId = propertyId, Value = 100000, Tax = 1000, IsActive = true } };
            var detailDto = new PropertyDetailDto
            (
                propertyId,
                "Apartamento Moderno El Poblado",
                "Carrera 43A #10-50, El Poblado, Medellín",
                850000000,
                "PROP-2024-001",
                2022,
                new OwnerDto(
                    "507f191e810c19729de860ea", 
                    "Carlos Andrés Méndoza",
                    "Carrera 45 #10-30, El Poblado, Medellín",
                    "https://i.pravatar.cc/150?img=3", 
                    DateTime.MinValue),
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
                images.Select(img => img.File),
                traces.FirstOrDefault()?.Value,
                DateTime.MinValue
            );

            _propertyRepositoryMock.Setup(r => r.GetByIdAsync(propertyId)).ReturnsAsync(property);
            _ownerRepositoryMock.Setup(r => r.GetByIdAsync(property.OwnerId)).ReturnsAsync(owner);
            _imageRepositoryMock.Setup(r => r.GetByPropertyIdAsync(propertyId)).ReturnsAsync(images);
            _traceRepositoryMock.Setup(r => r.GetByPropertyIdAsync(propertyId)).ReturnsAsync(traces);
            _mapperMock.Setup(m => m.Map<PropertyDetailDto>(It.IsAny<object>())).Returns(detailDto);

            // Act
            var result = await _propertyService.GetPropertyDetailAsync(propertyId);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(propertyId));
            Assert.That(result.Name, Is.EqualTo("Casa"));
        }

        [Test]
        public async Task GetPropertyDetailAsync_ReturnsNull_WhenPropertyDoesNotExist()
        {
            // Arrange
            var propertyId = "notfound";
            _propertyRepositoryMock.Setup(r => r.GetByIdAsync(propertyId)).ReturnsAsync((Property?)null);

            // Act
            var result = await _propertyService.GetPropertyDetailAsync(propertyId);

            // Assert
            Assert.That(result, Is.Null);
        }
    }
}
