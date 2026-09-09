@echo off
echo ==================================
echo Compilando para Linux (CGI)
echo ==================================

REM Limpiar compilaciones anteriores
if exist mi-app4 del mi-app4

REM Configurar variables
set CGO_ENABLED=0
set GOOS=linux
set GOARCH=amd64

REM Compilar con optimizaciones
echo Compilando...
REM go build -ldflags="-s -w" -o mi-app.cgi
go build -o mi-app4 .


if exist mi-app4 (
    echo ✅ ¡Compilación exitosa!
    echo 📦 Archivo: mi-app4
    dir mi-app4
) else (
    echo ❌ Error en la compilación
    pause
)