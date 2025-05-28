# Proyecto-rep-SOMA
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/pablitodab/Proyecto-rep-SOMA.git
git push -u origin main

mkdir backend
mkdir frontend
mkdir nginx
mkdir mariadb
cp -r ../proyecto/soma/frontend/public frontend/
cp -r ../proyecto/soma/frontend/src frontend/
cp ../proyecto/soma/frontend/angular.json frontend/
cp ../proyecto/soma/frontend/package.json frontend/
cp ../proyecto/soma/frontend/tsconfig.json frontend/
cp -r ../proyecto/soma/backend/src backend/
cp ../proyecto/soma/backend/tsconfig.json backend/
cp ../proyecto/soma/backend/package.json backend/
cp ../proyecto/soma/docker-compose.yml .
cp /etc/nginx/sites-available/proyecto.pablitoda.com nginx/
mariadb-dump -uproyecto_usr -pLolerS33://usr proyecto_db > mariadb/backup.sql
