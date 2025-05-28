#!/bin/bash

# Crear carpetas (si no existen)
mkdir -p backend frontend nginx mariadb

# Copiar frontend
cp -r ../proyecto/soma/frontend/public frontend/
cp -r ../proyecto/soma/frontend/src frontend/
cp ../proyecto/soma/frontend/angular.json frontend/
cp ../proyecto/soma/frontend/package.json frontend/
cp ../proyecto/soma/frontend/tsconfig.json frontend/

# Copiar backend
cp -r ../proyecto/soma/backend/src backend/
cp ../proyecto/soma/backend/tsconfig.json backend/
cp ../proyecto/soma/backend/package.json backend/

# Copiar configuración de Nginx
cp /etc/nginx/sites-available/proyecto.pablitoda.com nginx/

# Copiar docker-compose.yml
cp ../proyecto/soma/docker-compose.yml .

# Crear backup de la base de datos
mariadb-dump -u proyecto_usr -pLolerS33://usr proyecto_db > mariadb/backup.sql

# Opcional: añadir todo y hacer commit
git add .
git commit -m "Backup completo del proyecto: frontend, backend, nginx, mariadb"
