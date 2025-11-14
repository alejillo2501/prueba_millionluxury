using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using RealEstate.Domain.Entities;

namespace RealEstate.Infrastructure.Data;

public class StringObjectIdSerializer : SerializerBase<string>
{
    public override string Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        var bsonReader = context.Reader;
        if (bsonReader.CurrentBsonType == BsonType.ObjectId)
        {
            return bsonReader.ReadObjectId().ToString();
        }
        return bsonReader.ReadString();
    }

    public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, string value)
    {
        if (!string.IsNullOrEmpty(value) && ObjectId.TryParse(value, out var objectId))
        {
            context.Writer.WriteObjectId(objectId);
        }
        else
        {
            context.Writer.WriteString(value ?? string.Empty);
        }
    }
}

public static class MongoDbSerializationProvider
{
    public static void Configure()
    {
        BsonSerializer.RegisterSerializer(typeof(string), new StringObjectIdSerializer());

        // También para las entidades específicas si es necesario
        BsonClassMap.RegisterClassMap<Property>(cm =>
        {
            cm.AutoMap();
            cm.MapIdProperty(p => p.Id)
              .SetSerializer(new StringObjectIdSerializer());
        });

        BsonClassMap.RegisterClassMap<Owner>(cm =>
        {
            cm.AutoMap();
            cm.MapIdProperty(o => o.Id)
              .SetSerializer(new StringObjectIdSerializer());
        });

        BsonClassMap.RegisterClassMap<PropertyImage>(cm =>
        {
            cm.AutoMap();
            cm.MapIdProperty(img => img.Id)
              .SetSerializer(new StringObjectIdSerializer());
            cm.MapProperty(img => img.PropertyId)
              .SetSerializer(new StringObjectIdSerializer());
        });

        BsonClassMap.RegisterClassMap<PropertyTrace>(cm =>
        {
            cm.AutoMap();
            cm.MapIdProperty(trace => trace.Id)
              .SetSerializer(new StringObjectIdSerializer());
            cm.MapProperty(trace => trace.PropertyId)
              .SetSerializer(new StringObjectIdSerializer());
        });
    }
}