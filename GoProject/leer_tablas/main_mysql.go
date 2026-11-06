package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"os"
	"text/tabwriter"

	// Importamos los cuatro drivers; la importación anónima asegura que se ejecute su init() y queden registrados
	_ "github.com/go-sql-driver/mysql" // MySQL y MariaDB comparten driver
	_ "github.com/lib/pq"              // PostgreSQL
	_ "modernc.org/sqlite"             // SQLite (implementación pura en Go, sin CGO)
)

// Configuración de conexión por defecto (se puede sobrescribir con parámetros de línea de comandos)
const (
	defaultHost     = "localhost"
	defaultPort     = 5432
	defaultUser     = "postgres"
	defaultPassword = "password2017"
	defaultDBName   = "oxdiccionariodb"
)

func main() {
	// 1. Definimos los parámetros de línea de comandos
	driverName := flag.String("driver", "postgres", "Driver de base de datos: mysql (compatible con MariaDB), postgres, sqlite")
	host := flag.String("host", defaultHost, "Host de la base de datos (válido para mysql/postgres)")
	port := flag.Int("port", defaultPort, "Puerto de la base de datos (válido para mysql/postgres)")
	user := flag.String("user", defaultUser, "Usuario (válido para mysql/postgres)")
	password := flag.String("password", defaultPassword, "Contraseña (válida para mysql/postgres)")
	dbname := flag.String("dbname", defaultDBName, "Nombre de la base de datos (válido para mysql/postgres)")
	dsnFlag := flag.String("dsn", "", "DSN directo (tiene prioridad sobre los parámetros anteriores; obligatorio para sqlite)")
	flag.Parse()

	// 2. Construimos el DSN según el driver seleccionado
	var dsn string
	var driverRegisteredName string

	switch *driverName {
	case "mysql", "mariadb": // MariaDB utiliza el driver de mysql
		driverRegisteredName = "mysql"
		if *dsnFlag != "" {
			dsn = *dsnFlag
		} else {
			// Formato MySQL/MariaDB: usuario:contraseña@tcp(host:puerto)/dbname
			dsn = fmt.Sprintf("%s:%s@tcp(%s:%d)/%s",
				*user, *password, *host, *port, *dbname)
		}
	case "postgres", "postgresql":
		driverRegisteredName = "postgres"
		if *dsnFlag != "" {
			dsn = *dsnFlag
		} else {
			// Formato PostgreSQL: host=... port=... user=... password=... dbname=... sslmode=disable
			dsn = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
				*host, *port, *user, *password, *dbname)
		}
	case "sqlite", "sqlite3":
		driverRegisteredName = "sqlite"
		if *dsnFlag != "" {
			dsn = *dsnFlag
		} else {
			// SQLite usa por defecto un archivo oxdiccionariodb.db en el directorio actual
			dsn = "oxdiccionariodb.db"
		}
	default:
		log.Fatalf("Driver no soportado: %s. Opciones válidas: mysql, mariadb, postgres, sqlite", *driverName)
	}

	// 3. Abrimos la conexión a la base de datos
	db, err := sql.Open(driverRegisteredName, dsn)
	if err != nil {
		log.Fatal("Error al abrir la conexión: ", err)
	}
	defer db.Close()

	// 4. Verificamos la conexión
	if err := db.Ping(); err != nil {
		log.Fatal("No se pudo hacer ping a la base de datos: ", err)
	}
	fmt.Printf("Conectado exitosamente usando el driver: %s\n", driverRegisteredName)

	// 5. Consultamos la lista de tablas (information_schema varía ligeramente entre motores; lo unificamos aquí)
	//    SQLite no tiene information_schema, por lo que usamos sqlite_master
	var tablesQuery string
	switch driverRegisteredName {
	case "sqlite":
		tablesQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`
	default:
		// MySQL/MariaDB y PostgreSQL soportan information_schema.tables;
		// PostgreSQL requiere excluir los esquemas del sistema, MySQL normalmente no,
		// pero la misma consulta es segura para ambos
		tablesQuery = `SELECT table_name FROM information_schema.tables 
			WHERE table_schema NOT IN ('information_schema', 'pg_catalog') 
			AND table_type = 'BASE TABLE' ORDER BY table_name`
	}

	rowsTables, err := db.Query(tablesQuery)
	if err != nil {
		log.Fatal("Error al obtener las tablas: ", err)
	}
	defer rowsTables.Close()

	// 6. Creamos el archivo de salida
	file, err := os.Create("tablas.txt")
	if err != nil {
		log.Fatal("Error al crear el archivo: ", err)
	}
	defer file.Close()

	w := tabwriter.NewWriter(file, 0, 0, 2, ' ', 0)
	fmt.Fprintln(w, "TABLA\tCAMPO\tTIPO\t¿NULO?\tCLAVE PRIMARIA")

	// 7. Recorremos cada tabla y consultamos su información de columnas
	for rowsTables.Next() {
		var tableName string
		if err := rowsTables.Scan(&tableName); err != nil {
			log.Fatal("Error al escanear la tabla: ", err)
		}
		fmt.Println("Tabla ", tableName)

		// La consulta de columnas cambia según el motor de base de datos
		var colsQuery string
		switch driverRegisteredName {
		case "sqlite":
			// SQLite usa PRAGMA table_info para obtener las columnas.
			// Nota: PRAGMA no admite parámetros vinculantes, hay que concatenar el nombre de la tabla
			// (el nombre proviene de la tabla del sistema, por lo que el riesgo es bajo)
			colsQuery = fmt.Sprintf("PRAGMA table_info('%s')", tableName)
		case "mysql":
			// MySQL/MariaDB: el marcador de posición es ?
			colsQuery = `
				SELECT
					column_name,
					data_type,
					is_nullable,
					COALESCE(
						(SELECT 'YES'
						 FROM information_schema.key_column_usage
						 WHERE table_name = ?
						   AND column_name = c.column_name
						   AND constraint_name = 'PRIMARY'
						), 'NO') AS is_primary
				FROM information_schema.columns c
				WHERE table_name = ?
				ORDER BY ordinal_position`
		case "postgres":
			// PostgreSQL: los marcadores de posición son $1, $2
			colsQuery = `
				SELECT
					column_name,
					data_type,
					is_nullable,
					COALESCE(
						(SELECT 'YES'
						 FROM information_schema.key_column_usage
						 WHERE table_name = $1
						   AND column_name = c.column_name
						   AND constraint_name LIKE '%pkey%'
						), 'NO') AS is_primary
				FROM information_schema.columns c
				WHERE table_name = $1
				ORDER BY ordinal_position`
		}

		var rowsCols *sql.Rows
		if driverRegisteredName == "sqlite" {
			rowsCols, err = db.Query(colsQuery)
		} else if driverRegisteredName == "mysql" {
			rowsCols, err = db.Query(colsQuery, tableName, tableName)
		} else {
			rowsCols, err = db.Query(colsQuery, tableName)
		}
		if err != nil {
			log.Printf("Error al obtener las columnas de %s: %v", tableName, err)
			continue
		}

		// Procesamos el resultado de las columnas (PRAGMA de SQLite devuelve nombres de campo distintos, se trata por separado)
		if driverRegisteredName == "sqlite" {
			// PRAGMA table_info devuelve: cid, name, type, notnull, dflt_value, pk
			for rowsCols.Next() {
				var cid int
				var colName, dataType string
				var notNull, pk int
				var dfltValue sql.NullString
				if err := rowsCols.Scan(&cid, &colName, &dataType, &notNull, &dfltValue, &pk); err != nil {
					log.Printf("Error al escanear la columna de %s: %v", tableName, err)
					continue
				}
				isNullable := "YES"
				if notNull == 1 {
					isNullable = "NO"
				}
				isPrimary := "NO"
				if pk > 0 {
					isPrimary = "YES"
				}
				fmt.Fprintf(w, "%s\t%s\t%s\t%s\t%s\n", tableName, colName, dataType, isNullable, isPrimary)
			}
		} else {
			for rowsCols.Next() {
				var colName, dataType, isNullable, isPrimary string
				if err := rowsCols.Scan(&colName, &dataType, &isNullable, &isPrimary); err != nil {
					log.Printf("Error al escanear la columna de %s: %v", tableName, err)
					continue
				}
				fmt.Fprintf(w, "%s\t%s\t%s\t%s\t%s\n", tableName, colName, dataType, isNullable, isPrimary)
			}
		}
		rowsCols.Close()
	}

	w.Flush()
	fmt.Println("Información guardada en tablas.txt")
}