package main

import (
	"database/sql"
	"fmt"
	"log"

	//	"os"
	"path/filepath"
	"strings"

	_ "github.com/lib/pq"
	"github.com/xuri/excelize/v2"
)

// ------------------------------------------------------------------
// 1. Configuración de la base de datos PostgreSQL
// ------------------------------------------------------------------
const (
	dbHost     = "172.17.10.23"
	dbPort     = 9876
	dbUser     = "admin"
	dbPassword = "S1s-bienes"
	dbName     = "sgp"
)

// DSN para lib/pq
func dsn() string {
	return fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName,
	)
}

// ------------------------------------------------------------------
// 2. Función principal
// ------------------------------------------------------------------
func main_old() {
	// ------------------------------------------------------------------
	// 2.1 Abrir el archivo Excel (equivalente a $reader->open(...))
	// ------------------------------------------------------------------
	rutaExcel := filepath.Join("descarga", "hoja1.xlsx")

	f, err := excelize.OpenFile(rutaExcel)
	if err != nil {
		log.Fatalf("Error al abrir el archivo Excel: %v", err)
	}
	defer func() {
		if err := f.Close(); err != nil {
			log.Printf("Error al cerrar el archivo Excel: %v", err)
		}
	}()

	// ------------------------------------------------------------------
	// 2.2 Obtener todas las hojas (equivalente a getSheetIterator)
	// ------------------------------------------------------------------
	hojas := f.GetSheetList()
	fmt.Printf("Hojas encontradas: %d\n", len(hojas))
	for i, h := range hojas {
		fmt.Printf("  [%d] %s\n", i+1, h)
	}
	fmt.Println(strings.Repeat("-", 60))

	// ------------------------------------------------------------------
	// 2.3 Conexión a PostgreSQL
	// ------------------------------------------------------------------
	db, err := sql.Open("postgres", dsn())
	if err != nil {
		log.Fatalf("Error al abrir la conexión: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("Error al conectar con PostgreSQL: %v", err)
	}
	fmt.Println("Conexión a PostgreSQL establecida correctamente.")
	fmt.Println(strings.Repeat("-", 60))

	// ------------------------------------------------------------------
	// 2.4 Recorrer cada hoja
	// ------------------------------------------------------------------
	for _, nombreHoja := range hojas {
		fmt.Printf("\n>>> Procesando hoja: %s\n", nombreHoja)
		procesarHoja(f, db, nombreHoja)
	}

	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("Importación completada correctamente.")
}

// ------------------------------------------------------------------
// 3. Procesar una hoja completa
// ------------------------------------------------------------------
func procesarHoja(f *excelize.File, db *sql.DB, nombreHoja string) {

	// Obtener todas las filas de la hoja
	// excelize.GetRows devuelve [][]string (fila -> celdas)
	filas, err := f.GetRows(nombreHoja)
	if err != nil {
		log.Printf("Error al leer las filas de la hoja '%s': %v", nombreHoja, err)
		return
	}

	// ------------------------------------------------------------------
	// 3.1 Mostrar todas las celdas en la consola
	// ------------------------------------------------------------------
	fmt.Println("--- Contenido de la hoja ---")
	for i, fila := range filas {
		fmt.Printf("Fila %d: ", i+1)
		for j, celda := range fila {
			// Convertir índice de columna (0) a letra (A, B, C...)
			col, _ := excelize.ColumnNumberToName(j + 1)
			fmt.Printf("[%s%d]=%q ", col, i+1, celda)
		}
		fmt.Println()
	}
	fmt.Println("--- Fin del contenido ---")

	// ------------------------------------------------------------------
	// 3.2 Calcular total de registros a procesar (saltando encabezado)
	// ------------------------------------------------------------------
	totalRegistros := len(filas) - 1 // -1 por la fila de encabezados
	if totalRegistros < 0 {
		totalRegistros = 0
	}
	fmt.Printf("Total de registros a procesar (sin encabezado): %d\n", totalRegistros)

	if totalRegistros == 0 {
		fmt.Println("No hay registros para procesar en esta hoja.")
		return
	}

	// ------------------------------------------------------------------
	// 3.3 Preparar sentencia INSERT
	// ------------------------------------------------------------------
	// Ajusta el nombre de la tabla y columnas a tu esquema real.

	sqlInsert := `
		INSERT INTO carga_masiva (
			cedula_beneficiario_ref,
			numero_1, universidad_institucion, numero_2, cedula_titular, apellidos,
			nombres, cedula_beneficiario, parentesco, sexo, fecha_nacimiento,
			edad, telefono_1, correo, cargo, campo15, campo16
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
			$11, $12, $13, $14, $17, $15, $16
		)
	`

	/*	sqlInsert := `
		INSERT INTO carga_masiva (
			id_carga_masiva, id_usuario, fecha_carga_hora, nombre_archivo_seleccionado, cedula_beneficiario_ref,
			numero_1, universidad_institucion, numero_2, cedula_titular, apellidos,
			nombres, cedula_beneficiario, parentesco, sexo, fecha_nacimiento,
			edad, telefono_1, correo, cargo, id_log_archivo
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
			$11, $12, $13, $14, $15, $16, $17
		)
	`*/

	/*	sqlInsert := `
			INSERT INTO carga_masiva (
				nombre_archivo_seleccionado
			) VALUES (
				$1
			)
		`
	*/

	/*sqlInsert := `
		INSERT INTO carga_masiva (
			id_log_archivo
		) VALUES (
			$1
		)
	`*/

	stmt, err := db.Prepare(sqlInsert)
	if err != nil {
		log.Fatalf("Error al preparar el INSERT: %v", err)
	}
	defer stmt.Close()

	// ------------------------------------------------------------------
	// 3.4 Recorrer filas (saltando encabezado) e insertar
	// ------------------------------------------------------------------
	const numColumnas = 17
	procesados := 0

	// Nota: podrías envolver todo en una transacción para más velocidad:
	// tx, _ := db.Begin()
	// stmt = tx.Stmt(stmt)
	// ... y al final tx.Commit()

	for i, fila := range filas {
		if i == 0 {
			continue // saltar encabezados
		}

		// Normalizar: asegurar 17 columnas aunque la fila venga corta
		valores := make([]interface{}, numColumnas)
		for j := 0; j < numColumnas; j++ {
			if j < len(fila) {
				valores[j] = fila[j]
				/*if j == 1 {
					valores[j] = procesados
				}*/
			} else {
				valores[j] = nil
			}
		}

		// Omitir filas completamente vacías (primeras 3 columnas)
		if esVacia(valores) {
			continue
		}

		// Ejecutar inserción
		if _, err := stmt.Exec(valores...); err != nil {
			log.Printf("Error al insertar fila %d: %v", i+1, err)
			continue
		}

		procesados++

		// ------------------------------------------------------------------
		// 3.5 Mostrar progreso (registro actual y porcentaje)
		// ------------------------------------------------------------------
		porcentaje := float64(procesados) / float64(totalRegistros) * 100.0
		fmt.Printf(
			"Registro %d/%d procesado (%.2f%%)\n",
			procesados, totalRegistros, porcentaje,
		)
	}

	fmt.Printf(
		"Hoja '%s' finalizada. Registros insertados: %d/%d\n",
		nombreHoja, procesados, totalRegistros,
	)
}

// ------------------------------------------------------------------
// 4. Utilidad: detectar fila vacía (primeras 3 columnas en nil/"" )
// ------------------------------------------------------------------
func esVacia(valores []interface{}) bool {
	for i := 0; i < 3 && i < len(valores); i++ {
		if valores[i] != nil && strings.TrimSpace(fmt.Sprint(valores[i])) != "" {
			return false
		}
	}
	return true
}
