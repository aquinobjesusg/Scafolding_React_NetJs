#!/bin/bash
# Mi primer script en Bash

echo "Instalar el Proyectp"

echo " "
echo "Ejecutar el Composer"
composer update

echo " "
echo "Ejecutar el NodeJs"
npm install --with-all-dependencies

echo " "
echo "Servidor en http://localhost:8080"
npm run servidor

