using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using RealEstate.Domain.Entities;

namespace RealEstate.Infrastructure.Data;

public class MongoContext
{
    public IMongoCollection<Owner> Owners { get; }
    public IMongoCollection<Property> Properties { get; }
    public IMongoCollection<PropertyImage> PropertyImages { get; }
    public IMongoCollection<PropertyTrace> PropertyTraces { get; }

    public MongoContext(IConfiguration config)
    {
        var connectionString = config.GetConnectionString("MongoDB");
        if (string.IsNullOrEmpty(connectionString))
            throw new InvalidOperationException("MongoDB connection string is missing");

        var client = new MongoClient(connectionString);
        var database = client.GetDatabase("RealEstatePlatform");

        Owners = database.GetCollection<Owner>("Owners");
        Properties = database.GetCollection<Property>("Properties");
        PropertyImages = database.GetCollection<PropertyImage>("PropertyImages");
        PropertyTraces = database.GetCollection<PropertyTrace>("PropertyTraces");

        // Ejecutar índices de forma segura (sincrona pero en background)
        Task.Run(async () => await CreateIndexesAsync()).GetAwaiter().GetResult();
    }

    private async Task CreateIndexesAsync()
    {
        try
        {
            // SOLUCIÓN AL ERROR: Convertir a lista primero para usar LINQ to Objects
            var ownerIndexes = await (await Owners.Indexes.ListAsync()).ToListAsync();
            if (!ownerIndexes.Any(idx => idx.GetValue("name", string.Empty) == "Owners_Text_Name"))
            {
                await Owners.Indexes.CreateOneAsync(
                    new CreateIndexModel<Owner>(
                        Builders<Owner>.IndexKeys.Text(o => o.Name),
                        new CreateIndexOptions { Name = "Owners_Text_Name" }
                    )
                );
                Console.WriteLine("✅ Created Owners_Text_Name index");
            }

            var propertyIndexes = await (await Properties.Indexes.ListAsync()).ToListAsync();
            if (!propertyIndexes.Any(idx => idx.GetValue("name", string.Empty) == "Properties_Text_Name_Address"))
            {
                await Properties.Indexes.CreateOneAsync(
                    new CreateIndexModel<Property>(
                        Builders<Property>.IndexKeys
                            .Text(p => p.Name)
                            .Text(p => p.Address),
                        new CreateIndexOptions { Name = "Properties_Text_Name_Address" }
                    )
                );
                Console.WriteLine("✅ Created Properties_Text_Name_Address index");
            }

            // Resto de índices normales (no texto) - siempre seguros de crear
            await TryCreateIndexAsync(Properties, "Properties_Price", Builders<Property>.IndexKeys.Ascending(p => p.Price));
            await TryCreateIndexAsync(Properties, "Properties_Year", Builders<Property>.IndexKeys.Descending(p => p.Year));
            await TryCreateIndexAsync(Properties, "Properties_OwnerId", Builders<Property>.IndexKeys.Ascending(p => p.OwnerId));

            await TryCreateIndexAsync(PropertyImages, "PropertyImages_PropertyId", Builders<PropertyImage>.IndexKeys.Ascending(img => img.PropertyId));
            await TryCreateIndexAsync(PropertyImages, "PropertyImages_Enabled", Builders<PropertyImage>.IndexKeys.Ascending(img => img.Enabled));

            await TryCreateIndexAsync(PropertyTraces, "PropertyTraces_PropertyId", Builders<PropertyTrace>.IndexKeys.Ascending(t => t.PropertyId));
            await TryCreateIndexAsync(PropertyTraces, "PropertyTraces_DateSale", Builders<PropertyTrace>.IndexKeys.Descending(t => t.DateSale));
        }
        catch (Exception ex)
        {
            Console.WriteLine($"⚠️  Index creation skipped: {ex.Message}");
        }
    }

    private async Task TryCreateIndexAsync<T>(IMongoCollection<T> collection, string indexName, IndexKeysDefinition<T> keys)
    {
        try
        {
            var indexes = await (await collection.Indexes.ListAsync()).ToListAsync();
            if (!indexes.Any(idx => idx.GetValue("name", string.Empty) == indexName))
            {
                await collection.Indexes.CreateOneAsync(
                    new CreateIndexModel<T>(keys, new CreateIndexOptions { Name = indexName })
                );
                Console.WriteLine($"✅ Created {indexName} index");
            }
        }
        catch
        {
            // Ignorar si ya existe
        }
    }
}