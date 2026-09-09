@echo off
echo ==================================
echo Compilando para Linux (CGI)
echo ==================================

REM Limpiar compilaciones anteriores
if exist mi-app4.exe del mi-app4.exe

REM Configurar variables
set CGO_ENABLED=0
set GOOS=windows
set GOARCH=386

REM Compilar con optimizaciones
echo Compilando...
REM go build -ldflags="-s -w" -o mi-app.cgi
go build -o mi-app4.exe .


if exist mi-app4.exe (
    echo ✅ ¡Compilación exitosa!
    echo 📦 Archivo: mi-app4.exe
    dir mi-app4.exe
) else (
    echo ❌ Error en la compilación
    pause
)