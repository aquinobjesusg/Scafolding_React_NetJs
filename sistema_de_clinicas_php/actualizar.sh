#!/bin/bash
echo "Actualizando"
git fetch origin
git reset --hard origin
echo "Listo"
