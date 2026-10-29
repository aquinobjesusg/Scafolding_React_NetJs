package main

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

// ---------- Helpers ----------

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if v != nil {
		_ = json.NewEncoder(w).Encode(v)
	}
}

func writeErr(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}

func writeErrDetail(w http.ResponseWriter, status int, msg, detail string) {
	writeJSON(w, status, map[string]string{"error": msg, "detalle": detail})
}

// parseID extrae y valida el :id de la URL.
func parseID(r *http.Request) (int, bool) {
	idStr := r.PathValue("id")
	id, err := strconv.Atoi(idStr)
	if err != nil || id <= 0 {
		return 0, false
	}
	return id, true
}

// isUniqueViolation detecta el código 23505 de PostgreSQL.
func isUniqueViolation(err error) bool {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		return pgErr.Code == "23505"
	}
	return false
}

// scanRow escanea una fila de pgx.Rows en un slice de destinos.
func scanRow(rows pgx.Rows, dest ...any) error {
	return rows.Scan(dest...)
}

// listQuery ejecuta un SELECT y devuelve los rows (el caller hace rows.Close()).
func listQuery(ctx context.Context, sql string, args ...any) (pgx.Rows, error) {
	return pool.Query(ctx, sql, args...)
}

// ---------- CRUD genérico parametrizado por tabla ----------
//
// Cada recurso se implementa con funciones específicas porque las columnas
// y tipos varían. Sin embargo, seguimos el mismo patrón que Express.

// ---------- DICCIONARIO ----------

func getDiccionario(w http.ResponseWriter, r *http.Request) {
	rows, err := pool.Query(r.Context(), `SELECT id, grupo, texto, lenguajes_id, nivel_id, tipodiccionario_id, tipopalabra_id FROM diccionario ORDER BY id`)
	if err != nil {
		writeErrDetail(w, 500, "Error al obtener registros", err.Error())
		return
	}
	defer rows.Close()

	var list []Diccionario
	for rows.Next() {
		var d Diccionario
		if err := rows.Scan(&d.ID, &d.Grupo, &d.Texto, &d.LenguajesID, &d.NivelID, &d.TipodiccionarioID, &d.TipopalabraID); err != nil {
			writeErrDetail(w, 500, "Error al leer registros", err.Error())
			return
		}
		list = append(list, d)
	}
	if len(list) == 0 {
		writeErr(w, 404, "No Existen Registros")
		return
	}
	writeJSON(w, 200, list)
}

func getDiccionarioByID(w http.ResponseWriter, r *http.Request) {
	id, ok := parseID(r)
	if !ok {
		writeErr(w, 400, "ID inválido")
		return
	}
	var d Diccionario
	err := pool.QueryRow(r.Context(),
		`SELECT id, grupo, texto, lenguajes_id, nivel_id, tipodiccionario_id, tipopalabra_id FROM diccionario WHERE id=$1`, id).
		Scan(&d.ID, &d.Grupo, &d.Texto, &d.LenguajesID, &d.NivelID, &d.TipodiccionarioID, &d.TipopalabraID)
	if errors.Is(err, pgx.ErrNoRows) {
		writeErr(w, 404, "Registro no encontrado")
		return
	}
	if err != nil {
		writeErrDetail(w, 500, "Error al obtener registro", err.Error())
		return
	}
	writeJSON(w, 200, d)
}

func postDiccionario(w http.ResponseWriter, r *http.Request) {
	var body Diccionario
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeErr(w, 400, "JSON inválido")
		return
	}
	var d Diccionario
	err := pool.QueryRow(r.Context(),
		`INSERT INTO diccionario (grupo, texto, lenguajes_id, nivel_id, tipodiccionario_id, tipopalabra_id)
		 VALUES ($1,$2,$3,$4,$5,$6)
		 RETURNING id, grupo, texto, lenguajes_id, nivel_id, tipodiccionario_id, tipopalabra_id`,
		body.Grupo, body.Texto, body.LenguajesID, body.NivelID, body.TipodiccionarioID, body.TipopalabraID).
		Scan(&d.ID, &d.Grupo, &d.Texto, &d.LenguajesID, &d.NivelID, &d.TipodiccionarioID, &d.TipopalabraID)
	if err != nil {
		if isUniqueViolation(err) {
			writeErr(w, 409, "El Registro se Encuentra Duplicado")
			return
		}
		writeErrDetail(w, 500, "Error al crear registro", err.Error())
		return
	}
	writeJSON(w, 201, d)
}

func putDiccionario(w http.ResponseWriter, r *http.Request) {
	id, ok := parseID(r)
	if !ok {
		writeErr(w, 400, "ID inválido")
		return
	}
	var body Diccionario
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeErr(w, 400, "JSON inválido")
		return
	}

	// Construcción dinámica (solo campos no-nil). Usamos $n parametrizado.
	set := []string{}
	args := []any{}
	n := 1
	add := func(col string, val any) { set = append(set, col+" = $"+strconv.Itoa(n)); args = append(args, val); n++ }
	if body.Grupo != nil { add("grupo", *body.Grupo) }
	if body.Texto != nil { add("texto", *body.Texto) }
	if body.LenguajesID != nil { add("lenguajes_id", *body.LenguajesID) }
	if body.NivelID != nil { add("nivel_id", *body.NivelID) }
	if body.TipodiccionarioID != nil { add("tipodiccionario_id", *body.TipodiccionarioID) }
	if body.TipopalabraID != nil { add("tipopalabra_id", *body.TipopalabraID) }

	if len(set) == 0 {
		writeErr(w, 400, "Debe proporcionar al menos un campo para actualizar")
		return
	}
	args = append(args, id)
	query := `UPDATE diccionario SET ` + strings.Join(set, ", ") +
		` WHERE id = $` + strconv.Itoa(n) +
		` RETURNING id, grupo, texto, lenguajes_id, nivel_id, tipodiccionario_id, tipopalabra_id`

	var d Diccionario
	err := pool.QueryRow(r.Context(), query, args...).
		Scan(&d.ID, &d.Grupo, &d.Texto, &d.LenguajesID, &d.NivelID, &d.TipodiccionarioID, &d.TipopalabraID)
	if errors.Is(err, pgx.ErrNoRows) {
		writeErr(w, 404, "Registro no encontrado")
		return
	}
	if err != nil {
		if isUniqueViolation(err) {
			writeErr(w, 409, "Error al Actualizar, El Registro esta Duplicado")
			return
		}
		writeErrDetail(w, 500, "Error al actualizar registro", err.Error())
		return
	}
	writeJSON(w, 200, d)
}

func deleteDiccionario(w http.ResponseWriter, r *http.Request) {
	id, ok := parseID(r)
	if !ok {
		writeErr(w, 400, "ID inválido")
		return
	}
	tag, err := pool.Exec(r.Context(), `DELETE FROM diccionario WHERE id=$1`, id)
	if err != nil {
		writeErrDetail(w, 500, "Error al eliminar registro", err.Error())
		return
	}
	if tag.RowsAffected() == 0 {
		writeErr(w, 404, "Registro no encontrado")
		return
	}
	w.WriteHeader(204)
}