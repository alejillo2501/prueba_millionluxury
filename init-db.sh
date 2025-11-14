#!/bin/bash
set -e

# Esperar a que MongoDB esté listo
sleep 5

# Ejecutar el script de inicialización con mongosh
mongosh "mongodb://localhost:27017" /docker-entrypoint-initdb.d/init-db.js