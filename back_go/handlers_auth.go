package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"

	"github.com/jackc/pgx/v5"
)

// ---------- USERS ----------

func registerUsers(mux *http.ServeMux) {
	cols := []string{
		"apellido", "avatar", "edad", "email", "emailverified",
		"fechadenacimiento", "incambioclave", "nombre", "password",
		"remembertoken", "userrole_id", "usuario", "lenguajesnativo_id",
	}
	registerSimpleCRUD(mux, "/users", crudSpec{
		Table:   "users",
		Columns: cols,
		Scan: func(rows pgx.Rows) (any, error) {
			var u User
			err := rows.Scan(&u.ID, &u.Apellido, &u.Avatar, &u.Edad, &u.Email, &u.EmailVerified,
				&u.FechaDeNacimiento, &u.InCambioClave, &u.Nombre, &u.Password,
				&u.RememberToken, &u.UserRoleID, &u.Usuario, &u.LenguajesNativoID)
			return u, err
		},
		Insert: func(r *http.Request) ([]any, error) {
			var b User
			if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
				return nil, errors.New("JSON inválido")
			}
			return []any{b.Apellido, b.Avatar, b.Edad, b.Email, b.EmailVerified,
				b.FechaDeNacimiento, b.InCambioClave, b.Nombre, b.Password,
				b.RememberToken, b.UserRoleID, b.Usuario, b.LenguajesNativoID}, nil
		},
		Update: func(r *http.Request) (map[string]any, error) {
			var b User
			if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
				return nil, errors.New("JSON inválido")
			}
			m := map[string]any{}
			if b.Apellido != nil { m["apellido"] = *b.Apellido }
			if b.Avatar != nil { m["avatar"] = *b.Avatar }
			if b.Edad != nil { m["edad"] = *b.Edad }
			if b.Email != nil { m["email"] = *b.Email }
			if b.EmailVerified != nil { m["emailverified"] = *b.EmailVerified }
			if b.FechaDeNacimiento != nil { m["fechadenacimiento"] = *b.FechaDeNacimiento }
			if b.InCambioClave != nil { m["incambioclave"] = *b.InCambioClave }
			if b.Nombre != nil { m["nombre"] = *b.Nombre }
			if b.Password != nil { m["password"] = *b.Password }
			if b.RememberToken != nil { m["remembertoken"] = *b.RememberToken }
			if b.UserRoleID != nil { m["userrole_id"] = *b.UserRoleID }
			if b.Usuario != nil { m["usuario"] = *b.Usuario }
			if b.LenguajesNativoID != nil { m["lenguajesnativo_id"] = *b.LenguajesNativoID }
			return m, nil
		},
	})
}

// ---------- USERSROLES ----------

func registerUsersRoles(mux *http.ServeMux) {
	registerSimpleCRUD(mux, "/usersroles", crudSpec{
		Table:   "usersroles",
		Columns: []string{"role_id", "user_id"},
		Scan: func(rows pgx.Rows) (any, error) {
			var ur UserRole
			err := rows.Scan(&ur.ID, &ur.RoleID, &ur.UserID)
			return ur, err
		},
		Insert: func(r *http.Request) ([]any, error) {
			var b UserRole
			if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
				return nil, errors.New("JSON inválido")
			}
			return []any{b.RoleID, b.UserID}, nil
		},
		Update: func(r *http.Request) (map[string]any, error) {
			var b UserRole
			if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
				return nil, errors.New("JSON inválido")
			}
			m := map[string]any{}
			if b.RoleID != nil { m["role_id"] = *b.RoleID }
			if b.UserID != nil { m["user_id"] = *b.UserID }
			return m, nil
		},
	})
}

// ---------- AUTH ----------

type loginReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	var b loginReq
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		writeErr(w, 400, "JSON inválido")
		return
	}
	if b.Email == "" || b.Password == "" {
		writeErr(w, 400, "Los campos son requeridos")
		return
	}
	var exists bool
	err := pool.QueryRow(r.Context(),
		`SELECT EXISTS(SELECT 1 FROM users WHERE email=$1 AND password=$2)`,
		b.Email, b.Password).Scan(&exists)
	if err != nil {
		writeErrDetail(w, 500, "Error al obtener registros", err.Error())
		return
	}
	if !exists {
		writeJSON(w, 200, map[string]string{"error": "Credenciales Inválidas"})
		return
	}
	writeJSON(w, 200, map[string]string{"error": "ok"})
}

type registrarReq struct {
	Nombre   string `json:"nombre"`
	Apellido string `json:"apellido"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Usuario  string `json:"usuario"`
	Idioma   *int   `json:"idioma"`
}

func handleRegistrar(w http.ResponseWriter, r *http.Request) {
	var b registrarReq
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		writeErr(w, 400, "JSON inválido")
		return
	}
	if b.Nombre == "" || b.Apellido == "" || b.Email == "" || b.Password == "" || b.Usuario == "" || b.Idioma == nil {
		writeErr(w, 400, "Los campos son requeridos")
		return
	}
	_, err := pool.Exec(r.Context(),
		`INSERT INTO users (nombre, apellido, email, password, usuario, inactivo, incambioclave, id_languajes)
		 VALUES ($1,$2,$3,$4,$5,1,0,$6)`,
		b.Nombre, b.Apellido, b.Email, b.Password, b.Usuario, *b.Idioma)
	if err != nil {
		if isUniqueViolation(err) {
			writeErr(w, 409, "El Usuario se encuentra Duplicado")
			return
		}
		writeErrDetail(w, 500, "Error al crear registro", err.Error())
		return
	}
	writeJSON(w, 200, map[string]string{"error": "ok"})
}

type contraseniaReq struct {
	Email    string `json:"email"`
	Usuario  string `json:"usuario"`
	Password string `json:"password"`
}

func handleContrasenia(w http.ResponseWriter, r *http.Request) {
	var b contraseniaReq
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		writeErr(w, 400, "JSON inválido")
		return
	}
	if strings.TrimSpace(b.Email) == "" || b.Password == "" {
		writeErr(w, 400, "Los campos son requeridos")
		return
	}
	tag, err := pool.Exec(r.Context(),
		`UPDATE users SET password=$1 WHERE email=$2`, b.Password, b.Email)
	if err != nil {
		writeErrDetail(w, 500, "Error al actualizar la contrasenia", err.Error())
		return
	}
	if tag.RowsAffected() == 0 {
		writeErr(w, 404, "Registro no encontrado")
		return
	}
	writeJSON(w, 200, map[string]string{"error": "ok"})
}