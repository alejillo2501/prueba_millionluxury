// ============================================
// REAL ESTATE PLATFORM - MONGODB SETUP
// Database: RealEstatePlatform
// Created for: Alejo (Medellín, Colombia)
// ============================================

// Conectar a MongoDB (ejecutar en mongosh)
// mongosh "mongodb://localhost:27017"

// Crear base de datos
use('RealEstatePlatform');

// ============================================
// COLECCIÓN: Owners (Propietarios)
// ============================================

db.Owners.dropIndexes();
db.Owners.drop();

db.createCollection("Owners");

db.Owners.insertMany([
  {
    "_id": ObjectId("507f191e810c19729de860ea"),
    "Name": "Carlos Andrés Méndoza",
    "Address": "Carrera 45 #10-30, El Poblado, Medellín",
    "Photo": "https://i.pravatar.cc/150?img=3",
    "Birthday": ISODate("1980-05-15T00:00:00Z"),
    "IsActive": true
  },
  {
    "_id": ObjectId("507f191e810c19729de860eb"),
    "Name": "Ana María Gómez Vélez",
    "Address": "Calle 80 #50-20, Laureles, Medellín",
    "Photo": "https://i.pravatar.cc/150?img=5",
    "Birthday": ISODate("1975-11-22T00:00:00Z"),
    "IsActive": true
  },
  {
    "_id": ObjectId("507f191e810c19729de860ec"),
    "Name": "Javier Rodríguez Castaño",
    "Address": "Calle 10 #25-45, Envigado, Antioquia",
    "Photo": "https://i.pravatar.cc/150?img=8",
    "Birthday": ISODate("1990-03-08T00:00:00Z"),
    "IsActive": true
  },
  {
    "_id": ObjectId("507f191e810c19729de860ed"),
    "Name": "María Paula Londoño",
    "Address": "Carrera 70 #45-10, Sabaneta, Antioquia",
    "Photo": "https://i.pravatar.cc/150?img=9",
    "Birthday": ISODate("1985-07-30T00:00:00Z"),
    "IsActive": true
  }
]);

// Índice de texto para búsqueda y activos
db.Owners.createIndex({ "Name": "text" });
db.Owners.createIndex({ "IsActive": 1 });

// ============================================
// COLECCIÓN: Properties (Propiedades)
// ============================================

db.Properties.dropIndexes();
db.Properties.drop();

db.createCollection("Properties");

db.Properties.insertMany([
  {
    "_id": ObjectId("65a1e0b8c9f1b2a3d4e5f678"),
    "Name": "Apartamento Moderno El Poblado",
    "Address": "Carrera 43A #10-50, El Poblado, Medellín",
    "Price": 850000000,
    "CodeInternal": "PROP-2024-001",
    "Year": 2022,
    "OwnerId": "507f191e810c19729de860ea",
    "IsActive": true
  },
  {
    "_id": ObjectId("65a1e0b8c9f1b2a3d4e5f679"),
    "Name": "Casa Campestre El Retiro",
    "Address": "Vereda San José, El Retiro, Antioquia",
    "Price": 1200000000,
    "CodeInternal": "PROP-2024-002",
    "Year": 2019,
    "OwnerId": "507f191e810c19729de860eb",
    "IsActive": true
  },
  {
    "_id": ObjectId("65a1e0b8c9f1b2a3d4e5f680"),
    "Name": "Loft Industrial Laureles",
    "Address": "Calle 80 #35-45, Laureles, Medellín",
    "Price": 420000000,
    "CodeInternal": "PROP-2024-003",
    "Year": 2021,
    "OwnerId": "507f191e810c19729de860ec",
    "IsActive": true
  },
  {
    "_id": ObjectId("65a1e0b8c9f1b2a3d4e5f681"),
    "Name": "Penthouse Lujoso Ciudad del Río",
    "Address": "Carrera 44 #19-30, Ciudad del Río, Medellín",
    "Price": 1800000000,
    "CodeInternal": "PROP-2024-004",
    "Year": 2023,
    "OwnerId": "507f191e810c19729de860ed",
    "IsActive": true
  },
  {
    "_id": ObjectId("65a1e0b8c9f1b2a3d4e5f682"),
    "Name": "Casa de Descanso Guatapé",
    "Address": "Vereda El Peñón, Guatapé, Antioquia",
    "Price": 980000000,
    "CodeInternal": "PROP-2024-005",
    "Year": 2020,
    "OwnerId": "507f191e810c19729de860ea",
    "IsActive": true
  },
  {
    "_id": ObjectId("65a1e0b8c9f1b2a3d4e5f683"),
    "Name": "Apartamento Estudiantal Universidad",
    "Address": "Calle 45 #78-90, Estadio, Medellín",
    "Price": 280000000,
    "CodeInternal": "PROP-2024-006",
    "Year": 2018,
    "OwnerId": "507f191e810c19729de860eb",
    "IsActive": true
  }
]);

// Índices optimizados para filtros
db.Properties.createIndex({ "Name": "text", "Address": "text" });
db.Properties.createIndex({ "Price": 1 });
db.Properties.createIndex({ "Year": 1 });
db.Properties.createIndex({ "OwnerId": 1 });
db.Properties.createIndex({ "IsActive": 1 });

// ============================================
// COLECCIÓN: PropertyImages (Imágenes)
// ============================================

db.PropertyImages.dropIndexes();
db.PropertyImages.drop();

db.createCollection("PropertyImages");

db.PropertyImages.insertMany([
  // Imágenes de PROP-2024-001
  {
    "_id": ObjectId("65a1f2c3d4e5b6a7c8d9e0f1"),
    "PropertyId": "65a1e0b8c9f1b2a3d4e5f678",
    "File": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "Enabled": true
  },
  {
    "_id": ObjectId("65a1f2c3d4e5b6a7c8d9e0f2"),
    "PropertyId": "65a1e0b8c9f1b2a3d4e5f678",
    "File": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    "Enabled": true
  },
  // Imágenes de PROP-2024-002
  {
    "_id": ObjectId("65a1f2c3d4e5b6a7c8d9e0f3"),
    "PropertyId": "65a1e0b8c9f1b2a3d4e5f679",
    "File": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "Enabled": true
  },
  // Imágenes de PROP-2024-003
  {
    "_id": ObjectId("65a1f2c3d4e5b6a7c8d9e0f4"),
    "PropertyId": "65a1e0b8c9f1b2a3d4e5f680",
    "File": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "Enabled": true
  },
  // Imágenes de PROP-2024-004
  {
    "_id": ObjectId("65a1f2c3d4e5b6a7c8d9e0f5"),
    "PropertyId": "65a1e0b8c9f1b2a3d4e5f681",
    "File": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "Enabled": true
  },
  // Imágenes de PROP-2024-005
  {
    "_id": ObjectId("65a1f2c3d4e5b6a7c8d9e0f6"),
    "PropertyId": "65a1e0b8c9f1b2a3d4e5f682",
    "File": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "Enabled": true
  }
]);

// Índices para imágenes
db.PropertyImages.createIndex({ "PropertyId": 1 });
db.PropertyImages.createIndex({ "Enabled": 1 });
db.PropertyImages.createIndex({ "PropertyId": 1, "Enabled": 1 });

// ============================================
// COLECCIÓN: PropertyTraces (Historial de Ventas)
// ============================================

db.PropertyTraces.dropIndexes();
db.PropertyTraces.drop();

db.createCollection("PropertyTraces");

db.PropertyTraces.insertMany([
  {
    "_id": ObjectId("65a1g3d4e5c6b7a8d9e0f1a"),
    "PropertyId": "65a1e0b8c9f1b2a3d4e5f678",
    "DateSale": ISODate("2023-06-15T10:30:00Z"),
    "Value": 800000000,
    "Tax": 32000000,
    "IsActive": true
  },
  {
    "_id": ObjectId("65a1g3d4e5c6b7a8d9e0f1b"),
    "PropertyId": "65a1e0b8c9f1b2a3d4e5f679",
    "DateSale": ISODate("2022-08-20T14:15:00Z"),
    "Value": 1100000000,
    "Tax": 44000000,
    "IsActive": true
  },
  {
    "_id": ObjectId("65a1g3d4e5c6b7a8d9e0f1c"),
    "PropertyId": "65a1e0b8c9f1b2a3d4e5f680",
    "DateSale": ISODate("2023-01-10T09:45:00Z"),
    "Value": 390000000,
    "Tax": 15600000,
    "IsActive": true
  }
]);

// Índices para trazas (histórico)
db.PropertyTraces.createIndex({ "PropertyId": 1 });
db.PropertyTraces.createIndex({ "DateSale": -1 });
db.PropertyTraces.createIndex({ "PropertyId": 1, "DateSale": -1 });

// ============================================
// VERIFICACIÓN FINAL
// ============================================

print("✅ Base de datos 'RealEstatePlatform' creada exitosamente!");
print("📊 Estadísticas:");
print(`   - Owners: ${db.Owners.countDocuments()}`);
print(`   - Properties: ${db.Properties.countDocuments()}`);
print(`   - PropertyImages: ${db.PropertyImages.countDocuments()}`);
print(`   - PropertyTraces: ${db.PropertyTraces.countDocuments()}`);

// ============================================
// CONSULTAS DE PRUEBA
// ============================================

print("\n🔍 Prueba de búsqueda de propiedades:");
var searchResult = db.Properties.aggregate([
  {
    $match: {
      $text: { $search: "Apartamento" }
    }
  },
  {
    $project: {
      Name: 1,
      Address: 1,
      Price: 1,
      score: { $meta: "textScore" }
    }
  },
  {
    $sort: { score: -1 }
  }
]).toArray();

printjson(searchResult);

// Salir
exit;