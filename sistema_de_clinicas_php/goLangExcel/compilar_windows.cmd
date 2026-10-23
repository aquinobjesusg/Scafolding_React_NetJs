set GOOS=linux
set GOARCH=amd64
go build -o carga_masiva.sh main.go

set GOOS=windows
set GOARCH=amd64
go build -o carga_masiva.exe main.go
