// main.go - Aplicación completa (Backend API + Frontend embebido)
// Ejecutar con: go run main.go
// Dependencias: github.com/lib/pq, golang.org/x/crypto/bcrypt

package main

import (
	"context"
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
	"golang.org/x/crypto/bcrypt"
)

// ============================================================================
// CONFIGURACIÓN
// ============================================================================
const (
	DB_HOST     = "localhost"
	DB_PORT     = 5432
	DB_USER     = "postgres"
	DB_PASSWORD = "postgres"
	DB_NAME     = "systemsy_dicc1"

	JWT_SECRET = "32bd05105002aa33120571d14604b6eb966479a20c4495b3eced1c5ef8b3b1fe" // Cambiar en producción
)

// ============================================================================
// MODELOS
// ============================================================================

type User struct {
	ID                int       `json:"id"`
	Nombre            string    `json:"nombre"`
	Alias             string    `json:"alias"`
	Correo            string    `json:"correo"`
	Nivel             string    `json:"nivel"`
	Clave             string    `json:"-"`
	TokenVerificacion *string   `json:"-"`
	Estado            string    `json:"estado"`
	CreatedAt         time.Time `json:"-"`
	UpdatedAt         time.Time `json:"-"`
}

type Entry struct {
	ID        int    `json:"id"`
	Texto     string `json:"texto"`
	Idioma    int    `json:"idioma"`    // 1=inglés, 2=español
	Categoria int    `json:"categoria"` // 1=palabra, 2=modismo, 3=verbo compuesto
	IdNivel   int    `json:"id_nivel"`
	IdTipo    *int   `json:"id_tipo"`
	Subtipo   *int   `json:"subtipo"`
	ParID     int    `json:"par_id"`
}

// ============================================================================
// BASE DE DATOS
// ============================================================================
var db *sql.DB

func initDB() {
	//connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
	//	DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME)

	connStr := fmt.Sprintf("postgres://%s:%s@%s:%d/%s", DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME)

	var err error
	//db, err := sql.Open("pgx", "postgres://usuario:password@localhost:5432/basedatos")
	db, err = sql.Open("pgx", connStr)

	//dsn := "host=localhost user=go-postgres-api password=go-postgres-api dbname=go-postgres-api port=5432 sslmode=disable TimeZone=America/Caracas"

	//	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Error conectando a BD:", err)
	}
	if err = db.Ping(); err != nil {
		log.Fatal("No se puede ping a BD:", err)
	}
	log.Println("Conectado a PostgreSQL")
	createTables()
}

func createTables() {
	// Tabla usuarios
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS usuarios (
			id SERIAL PRIMARY KEY,
			nombre TEXT NOT NULL,
			alias TEXT,
			correo TEXT UNIQUE NOT NULL,
			nivel TEXT NOT NULL,
			clave TEXT NOT NULL,
			token_verificacion TEXT,
			estado TEXT DEFAULT 'PENDIENTE',
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)
	`)
	if err != nil {
		log.Fatal("Error creando usuarios:", err)
	}

	// Tabla entries (unificada)
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS entries (
			id SERIAL PRIMARY KEY,
			texto TEXT NOT NULL,
			idioma INT NOT NULL,
			categoria INT NOT NULL,
			id_nivel INT NOT NULL,
			id_tipo INT,
			subtipo INT,
			par_id INT NOT NULL,
			created_at TIMESTAMP DEFAULT NOW()
		)
	`)
	if err != nil {
		log.Fatal("Error creando entries:", err)
	}

	// Niveles
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS niveles (
			id SERIAL PRIMARY KEY,
			nombre TEXT NOT NULL
		)
	`)
	if err != nil {
		log.Fatal("Error creando niveles:", err)
	}
	var count int
	db.QueryRow("SELECT COUNT(*) FROM niveles").Scan(&count)
	if count == 0 {
		_, err = db.Exec(`INSERT INTO niveles (nombre) VALUES ('Básico'), ('Intermedio'), ('Avanzado')`)
		if err != nil {
			log.Fatal("Error insertando niveles:", err)
		}
	}

	// Tipos
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS tipos_palabra (
			id SERIAL PRIMARY KEY,
			nombre TEXT NOT NULL
		)
	`)
	if err != nil {
		log.Fatal("Error creando tipos_palabra:", err)
	}
	db.QueryRow("SELECT COUNT(*) FROM tipos_palabra").Scan(&count)
	if count == 0 {
		_, err = db.Exec(`
			INSERT INTO tipos_palabra (nombre) VALUES
			('Sustantivo'), ('Verbo Regular'), ('Verbo Irregular'), ('Adjetivo'),
			('Adverbio'), ('Pronombre'), ('Preposición'), ('Conjunción'),
			('Determinante'), ('Interjección')
		`)
		if err != nil {
			log.Fatal("Error insertando tipos:", err)
		}
	}

	// Subtipos
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS subtipos (
			id SERIAL PRIMARY KEY,
			nombre TEXT NOT NULL
		)
	`)
	if err != nil {
		log.Fatal("Error creando subtipos:", err)
	}
	db.QueryRow("SELECT COUNT(*) FROM subtipos").Scan(&count)
	if count == 0 {
		_, err = db.Exec(`
			INSERT INTO subtipos (nombre) VALUES
			('Forma Base/Presente'), ('Pasado Simple'), ('Participio Pasado')
		`)
		if err != nil {
			log.Fatal("Error insertando subtipos:", err)
		}
	}
}

// ============================================================================
// UTILIDADES
// ============================================================================

func generateRandomToken() string {
	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		log.Fatal(err)
	}
	return hex.EncodeToString(b)
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// JWT con HMAC-SHA256
func generateJWT(userID int, alias string) string {
	payload := fmt.Sprintf(`{"user_id":%d,"alias":"%s","exp":%d}`,
		userID, alias, time.Now().Add(24*time.Hour).Unix())
	mac := hmac.New(sha256.New, []byte(JWT_SECRET))
	mac.Write([]byte(payload))
	signature := hex.EncodeToString(mac.Sum(nil))
	token := base64.URLEncoding.EncodeToString([]byte(payload)) + "." + signature
	return token
}

func validateJWT(token string) (int, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 2 {
		return 0, fmt.Errorf("token inválido")
	}
	payloadB64, signature := parts[0], parts[1]
	payload, err := base64.URLEncoding.DecodeString(payloadB64)
	if err != nil {
		return 0, err
	}
	mac := hmac.New(sha256.New, []byte(JWT_SECRET))
	mac.Write(payload)
	expectedSig := hex.EncodeToString(mac.Sum(nil))
	if signature != expectedSig {
		return 0, fmt.Errorf("firma incorrecta")
	}
	var data struct {
		UserID int   `json:"user_id"`
		Exp    int64 `json:"exp"`
	}
	if err := json.Unmarshal(payload, &data); err != nil {
		return 0, err
	}
	if data.Exp < time.Now().Unix() {
		return 0, fmt.Errorf("token expirado")
	}
	return data.UserID, nil
}

// ============================================================================
// MIDDLEWARES
// ============================================================================

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, `{"success":false,"error":"No autorizado"}`, http.StatusUnauthorized)
			return
		}
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, `{"success":false,"error":"Formato de token inválido"}`, http.StatusUnauthorized)
			return
		}
		userID, err := validateJWT(parts[1])
		if err != nil {
			http.Error(w, `{"success":false,"error":"Token inválido"}`, http.StatusUnauthorized)
			return
		}
		// Guardar en contexto
		ctx := context.WithValue(r.Context(), "userID", userID)
		next(w, r.WithContext(ctx))
	}
}

// ============================================================================
// HANDLERS DE API
// ============================================================================

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, `{"success":false,"error":"Método no permitido"}`, http.StatusMethodNotAllowed)
		return
	}
	var req struct {
		Correo string `json:"correo"`
		Pass   string `json:"pass"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"success":false,"error":"Datos inválidos"}`, http.StatusBadRequest)
		return
	}

	var user User
	err := db.QueryRow(
		"SELECT id, nombre, alias, clave FROM usuarios WHERE correo = $1 AND estado = 'ACTIVO'",
		req.Correo,
	).Scan(&user.ID, &user.Nombre, &user.Alias, &user.Clave)
	if err == sql.ErrNoRows {
		http.Error(w, `{"success":false,"error":"Credenciales inválidas"}`, http.StatusUnauthorized)
		return
	}
	if err != nil {
		log.Println("Error login:", err)
		http.Error(w, `{"success":false,"error":"Error interno"}`, http.StatusInternalServerError)
		return
	}

	if !checkPasswordHash(req.Pass, user.Clave) {
		http.Error(w, `{"success":false,"error":"Credenciales inválidas"}`, http.StatusUnauthorized)
		return
	}

	alias := user.Alias
	if alias == "" {
		alias = user.Nombre
	}
	token := generateJWT(user.ID, alias)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"token":   token,
		"usuario": alias,
	})
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, `{"success":false,"error":"Método no permitido"}`, http.StatusMethodNotAllowed)
		return
	}
	var req struct {
		Nombre string `json:"nombre"`
		Correo string `json:"correo"`
		Alias  string `json:"alias"`
		Nivel  string `json:"nivel"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"success":false,"error":"Datos inválidos"}`, http.StatusBadRequest)
		return
	}
	if req.Nombre == "" || req.Correo == "" {
		http.Error(w, `{"success":false,"error":"Nombre y correo son obligatorios"}`, http.StatusBadRequest)
		return
	}
	token := generateRandomToken()
	emptyHash, _ := hashPassword("")
	_, err := db.Exec(`
		INSERT INTO usuarios (nombre, alias, correo, nivel, clave, token_verificacion, estado)
		VALUES ($1, $2, $3, $4, $5, $6, 'PENDIENTE')
	`, req.Nombre, req.Alias, req.Correo, req.Nivel, emptyHash, token)
	if err != nil {
		log.Println("Error registro:", err)
		http.Error(w, `{"success":false,"error":"Error al registrar usuario"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"token":   token,
		"message": "Usuario registrado, revisa tu correo para activar",
	})
}

func createPasswordHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, `{"success":false,"error":"Método no permitido"}`, http.StatusMethodNotAllowed)
		return
	}
	var req struct {
		Token    string `json:"token"`
		Password string `json:"password"`
		Confirm  string `json:"confirm_password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"success":false,"error":"Datos inválidos"}`, http.StatusBadRequest)
		return
	}
	if len(req.Password) < 8 || len(req.Password) > 12 {
		http.Error(w, `{"success":false,"error":"La contraseña debe tener entre 8 y 12 caracteres"}`, http.StatusBadRequest)
		return
	}
	if req.Password != req.Confirm {
		http.Error(w, `{"success":false,"error":"Las contraseñas no coinciden"}`, http.StatusBadRequest)
		return
	}

	var userID int
	err := db.QueryRow("SELECT id FROM usuarios WHERE token_verificacion = $1", req.Token).Scan(&userID)
	if err == sql.ErrNoRows {
		http.Error(w, `{"success":false,"error":"El enlace es inválido o ya fue usado"}`, http.StatusBadRequest)
		return
	}
	if err != nil {
		log.Println("Error create-password:", err)
		http.Error(w, `{"success":false,"error":"Error interno"}`, http.StatusInternalServerError)
		return
	}

	hashed, _ := hashPassword(req.Password)
	_, err = db.Exec(`
		UPDATE usuarios SET clave = $1, estado = 'ACTIVO', token_verificacion = NULL
		WHERE id = $2
	`, hashed, userID)
	if err != nil {
		log.Println("Error actualizando password:", err)
		http.Error(w, `{"success":false,"error":"Error al actualizar"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Contraseña actualizada con éxito",
	})
}

func recoverHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, `{"success":false,"error":"Método no permitido"}`, http.StatusMethodNotAllowed)
		return
	}
	var req struct {
		Correo string `json:"correo"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"success":false,"error":"Datos inválidos"}`, http.StatusBadRequest)
		return
	}
	if req.Correo == "" {
		http.Error(w, `{"success":false,"error":"Correo requerido"}`, http.StatusBadRequest)
		return
	}

	var user User
	err := db.QueryRow(
		"SELECT id, nombre FROM usuarios WHERE correo = $1 AND estado = 'ACTIVO'",
		req.Correo,
	).Scan(&user.ID, &user.Nombre)
	if err == sql.ErrNoRows {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": true,
			"message": "Si el correo existe, recibirás un enlace",
		})
		return
	}
	if err != nil {
		log.Println("Error recuperar:", err)
		http.Error(w, `{"success":false,"error":"Error interno"}`, http.StatusInternalServerError)
		return
	}

	token := generateRandomToken()
	_, err = db.Exec("UPDATE usuarios SET token_verificacion = $1 WHERE id = $2", token, user.ID)
	if err != nil {
		log.Println("Error actualizando token:", err)
		http.Error(w, `{"success":false,"error":"Error interno"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"token":   token,
		"email":   req.Correo,
		"nombre":  user.Nombre,
		"message": "Token generado para recuperación",
	})
}

func cargarDatosHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, `{"success":false,"error":"Método no permitido"}`, http.StatusMethodNotAllowed)
		return
	}
	var req struct {
		Categoria string `json:"categoria"`
		Nivel     int    `json:"nivel"`
		Tipos     []int  `json:"tipos"`
		Subtipos  []int  `json:"subtipos"`
		IdiomaOri string `json:"idioma_ori"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"success":false,"error":"Datos inválidos"}`, http.StatusBadRequest)
		return
	}

	var catID int
	switch req.Categoria {
	case "Palabras":
		catID = 1
	case "Modismos":
		catID = 2
	case "Verbos Compuestos":
		catID = 3
	default:
		http.Error(w, `{"success":false,"error":"Categoría inválida"}`, http.StatusBadRequest)
		return
	}

	query := `
		SELECT e1.texto AS origen, e2.texto AS destino
		FROM entries e1
		JOIN entries e2 ON e1.par_id = e2.par_id AND e1.idioma != e2.idioma
		WHERE e1.categoria = $1 AND e1.id_nivel = $2
	`
	args := []interface{}{catID, req.Nivel}
	argIdx := 3

	if catID == 1 && len(req.Tipos) > 0 {
		placeholders := make([]string, len(req.Tipos))
		for i, t := range req.Tipos {
			placeholders[i] = fmt.Sprintf("$%d", argIdx)
			args = append(args, t)
			argIdx++
		}
		query += " AND e1.id_tipo IN (" + strings.Join(placeholders, ",") + ")"
	}
	if catID == 1 && len(req.Subtipos) > 0 {
		placeholders := make([]string, len(req.Subtipos))
		for i, st := range req.Subtipos {
			placeholders[i] = fmt.Sprintf("$%d", argIdx)
			args = append(args, st)
			argIdx++
		}
		query += " AND e1.subtipo IN (" + strings.Join(placeholders, ",") + ")"
	}

	var idiomaOrigen, idiomaDestino int
	if req.IdiomaOri == "es" {
		idiomaOrigen = 2
		idiomaDestino = 1
	} else {
		idiomaOrigen = 1
		idiomaDestino = 2
	}
	query += fmt.Sprintf(" AND e1.idioma = %d AND e2.idioma = %d", idiomaOrigen, idiomaDestino)

	rows, err := db.Query(query, args...)
	if err != nil {
		log.Println("Error cargando datos:", err)
		http.Error(w, `{"success":false,"error":"Error en consulta"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var pares []map[string]string
	for rows.Next() {
		var origen, destino string
		if err := rows.Scan(&origen, &destino); err != nil {
			continue
		}
		pares = append(pares, map[string]string{
			"origen":  origen,
			"destino": destino,
		})
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterando filas:", err)
		http.Error(w, `{"success":false,"error":"Error en procesamiento"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":  true,
		"total":    len(pares),
		"palabras": pares,
	})
}

func procesarVozHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, `{"success":false,"error":"Método no permitido"}`, http.StatusMethodNotAllowed)
		return
	}
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, `{"success":false,"error":"Error al leer audio"}`, http.StatusBadRequest)
		return
	}
	file, _, err := r.FormFile("audio")
	if err != nil {
		http.Error(w, `{"success":false,"error":"No se recibió audio"}`, http.StatusBadRequest)
		return
	}
	defer file.Close()
	// Simulación: leer y descartar
	io.ReadAll(file)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"texto":   "transcripción simulada",
	})
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, `{"success":false,"error":"Método no permitido"}`, http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

// ============================================================================
// PLANTILLAS HTML (frontend embebido)
// ============================================================================

const loginTemplate = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Diccionario Interactivo</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;display:flex;justify-content:center;align-items:center}
.container{background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.3);padding:40px;width:90%;max-width:400px;text-align:center}
.logo{font-size:60px;margin-bottom:10px}
h1{color:#333;margin-bottom:5px}
.subtitle{color:#666;margin-bottom:30px;font-style:italic}
input,select{width:100%;padding:12px;margin:10px 0;border:2px solid #ddd;border-radius:8px;font-size:16px;transition:all .3s}
input:focus,select:focus{outline:none;border-color:#667eea}
button{width:100%;padding:12px;margin:10px 0;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer;transition:transform .2s}
button:hover{transform:translateY(-2px)}
.btn-secondary{background:#f0f0f0;color:#333}
.message{padding:10px;margin:10px 0;border-radius:8px;display:none}
.message.error{background:#fee;color:#c33;display:block}
.message.success{background:#efe;color:#3c3;display:block}
.hidden{display:none}
.link{color:#667eea;cursor:pointer;text-decoration:underline;margin-top:10px;display:inline-block}
</style>
</head>
<body>
<div class="container">
<div class="logo">🎓</div>
<h1>Diccionario Interactivo</h1>
<div class="subtitle">Aprende inglés de forma divertida</div>
<div id="message" class="message"></div>

<div id="loginForm">
    <input type="text" id="correo" placeholder="Correo Electrónico" required>
    <input type="password" id="password" placeholder="Contraseña" required>
    <button onclick="login()">INICIAR SESIÓN</button>
    <button onclick="showRegistro()" class="btn-secondary">CREAR CUENTA</button>
    <div class="link" onclick="showRecuperar()">¿Olvidaste tu contraseña?</div>
</div>

<div id="registroForm" class="hidden">
    <input type="text" id="regNombre" placeholder="Nombre Completo">
    <input type="email" id="regCorreo" placeholder="Correo Electrónico">
    <input type="text" id="regAlias" placeholder="Alias (opcional)">
    <select id="regNivel"><option value="Básico">Básico</option><option value="Intermedio">Intermedio</option><option value="Avanzado">Avanzado</option></select>
    <button onclick="registro()">REGISTRARSE</button>
    <button onclick="showLogin()" class="btn-secondary">VOLVER</button>
</div>

<div id="recuperarForm" class="hidden">
    <input type="email" id="recCorreo" placeholder="Tu correo electrónico">
    <button onclick="recuperar()">ENVIAR ENLACE</button>
    <button onclick="showLogin()" class="btn-secondary">VOLVER</button>
</div>
</div>

<script>
function showMessage(msg,type){const d=document.getElementById('message');d.textContent=msg;d.className='message '+type;setTimeout(()=>{d.className='message';d.textContent='';},3000);}
async function login(){
    const correo=document.getElementById('correo').value, pass=document.getElementById('password').value;
    if(!correo||!pass){showMessage('Completa todos los campos','error');return;}
    try{
        const res=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({correo,pass})});
        const data=await res.json();
        if(data.success){localStorage.setItem('token',data.token);localStorage.setItem('usuario',data.usuario);window.location.href='/dashboard';}
        else showMessage(data.error||'Credenciales inválidas','error');
    }catch(e){showMessage('Error de conexión','error');}
}
async function registro(){
    const data={nombre:document.getElementById('regNombre').value, correo:document.getElementById('regCorreo').value, alias:document.getElementById('regAlias').value, nivel:document.getElementById('regNivel').value};
    if(!data.nombre||!data.correo){showMessage('Nombre y correo son obligatorios','error');return;}
    try{
        const res=await fetch('/api/registro',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
        const result=await res.json();
        if(result.success){
            // Enviar correo usando la API externa
            const link=window.location.origin+'/activar/'+result.token;
            const cuerpo='Hola '+data.nombre+', haz clic en el siguiente enlace para crear tu contraseña: '+link;
            await fetch('https://systemsya.com/correo/index.php?destino='+encodeURIComponent(data.correo)+'&asunto=Activa%20tu%20cuenta&cuerpo='+encodeURIComponent(cuerpo),{method:'GET'});
            showMessage('Registro exitoso. Revisa tu correo.','success');
            setTimeout(()=>showLogin(),2000);
        }else showMessage(result.error,'error');
    }catch(e){showMessage('Error de conexión','error');}
}
async function recuperar(){
    const correo=document.getElementById('recCorreo').value;
    if(!correo){showMessage('Ingresa tu correo','error');return;}
    try{
        const res=await fetch('/api/recuperar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({correo})});
        const data=await res.json();
        if(data.success){
            if(data.token){
                const link=window.location.origin+'/recuperar/'+data.token;
                const cuerpo='Hola '+data.nombre+', haz clic en el siguiente enlace para restablecer tu contraseña: '+link;
                await fetch('https://systemsya.com/correo/index.php?destino='+encodeURIComponent(correo)+'&asunto=Recuperaci%C3%B3n%20de%20contrase%C3%B1a&cuerpo='+encodeURIComponent(cuerpo),{method:'GET'});
            }
            showMessage(data.message,'success');setTimeout(()=>showLogin(),2000);
        }else showMessage(data.error,'error');
    }catch(e){showMessage('Error de conexión','error');}
}
function showRegistro(){document.getElementById('loginForm').classList.add('hidden');document.getElementById('recuperarForm').classList.add('hidden');document.getElementById('registroForm').classList.remove('hidden');}
function showRecuperar(){document.getElementById('loginForm').classList.add('hidden');document.getElementById('registroForm').classList.add('hidden');document.getElementById('recuperarForm').classList.remove('hidden');}
function showLogin(){document.getElementById('registroForm').classList.add('hidden');document.getElementById('recuperarForm').classList.add('hidden');document.getElementById('loginForm').classList.remove('hidden');}
</script>
</body>
</html>`

const createPasswordTemplate = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Crear Contraseña</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;display:flex;justify-content:center;align-items:center}
.container{background:#fff;border-radius:20px;padding:40px;width:90%;max-width:400px;text-align:center}
h2{color:#333;margin-bottom:20px}
input{width:100%;padding:12px;margin:10px 0;border:2px solid #ddd;border-radius:8px;font-size:16px}
button{width:100%;padding:12px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer}
.message{margin:10px 0;padding:10px;border-radius:8px}
.error{background:#fee;color:#c33}
.success{background:#efe;color:#3c3}
</style>
</head>
<body>
<div class="container">
<h2>🔑 Crear Nueva Contraseña</h2>
<input type="password" id="password" placeholder="Nueva Contraseña (8-12 caracteres)">
<input type="password" id="confirm" placeholder="Confirmar Contraseña">
<button onclick="crearPassword()">GUARDAR CONTRASEÑA</button>
<div id="message"></div>
</div>
<script>
const token = window.location.pathname.split('/').pop();
async function crearPassword(){
    const password=document.getElementById('password').value, confirm=document.getElementById('confirm').value, msg=document.getElementById('message');
    if(password.length<8||password.length>12){msg.className='message error';msg.textContent='La contraseña debe tener entre 8 y 12 caracteres';return;}
    if(password!==confirm){msg.className='message error';msg.textContent='Las contraseñas no coinciden';return;}
    try{
        const res=await fetch('/api/crear-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token,password,confirm_password:confirm})});
        const data=await res.json();
        if(data.success){msg.className='message success';msg.textContent=data.message;setTimeout(()=>window.location.href='/',2000);}
        else{msg.className='message error';msg.textContent=data.error;}
    }catch(e){msg.className='message error';msg.textContent='Error de conexión';}
}
</script>
</body>
</html>`

const dashboardTemplate = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard - Diccionario Interactivo</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f5f5f5}
.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}
.user-badge{background:rgba(255,255,255,0.2);padding:8px 16px;border-radius:20px}
.container{max-width:1200px;margin:20px auto;padding:0 20px}
.sidebar{background:#fff;border-radius:10px;padding:20px;margin-bottom:20px;box-shadow:0 2px 10px rgba(0,0,0,0.1)}
.form-group{margin-bottom:15px}
.form-group label{display:block;margin-bottom:5px;font-weight:bold;color:#555}
select,input{width:100%;padding:8px 12px;border:1px solid #ddd;border-radius:5px;font-size:14px}
button{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:bold;transition:transform .2s}
button:hover{transform:translateY(-2px)}
button.secondary{background:#f0f0f0;color:#333}
.menu-buttons{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px}
.menu-btn{padding:12px;background:#e0e0e0;border:none;border-radius:8px;cursor:pointer;font-weight:bold;transition:all .3s}
.menu-btn.active{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff}
.card{background:#fff;border-radius:10px;padding:20px;margin-bottom:20px;box-shadow:0 2px 10px rgba(0,0,0,0.1)}
.word-card{background:#fafafa;border-left:5px solid #667eea;padding:20px;margin:10px 0;border-radius:8px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}
.word-text{font-size:18px}
.word-origen{font-weight:bold;color:#333}
.word-destino{color:#667eea}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px}
.stat{background:#f0f0f0;padding:10px;text-align:center;border-radius:8px;font-weight:bold}
.game-area{text-align:center}
.game-word{font-size:32px;margin:20px 0}
.feedback{padding:10px;margin:10px 0;border-radius:8px;display:none}
.feedback.success{background:#d4edda;color:#155724;display:block}
.feedback.error{background:#f8d7da;color:#721c24;display:block}
.hidden{display:none}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
@media (max-width:768px){.grid-2{grid-template-columns:1fr}.word-card{flex-direction:column;text-align:center;gap:10px}}
</style>
</head>
<body>
<div class="header">
<h2>🎓 Diccionario Interactivo</h2>
<div class="user-badge">👤 <span id="usuario"></span></div>
</div>
<div class="container">
<div class="sidebar">
<h3>⚙️ Configuración</h3>
<div class="grid-2">
<div class="form-group"><label>Idioma Origen:</label><select id="idiomaOri"><option value="es">Español</option><option value="en">Inglés</option></select></div>
<div class="form-group"><label>Categoría:</label><select id="categoria" onchange="seleccionTipos()"><option value="Palabras">Palabras</option><option value="Modismos">Modismos</option><option value="Verbos Compuestos">Verbos Compuestos</option></select></div>
<div class="form-group"><label>Nivel:</label><select id="nivel"><option value="1">Nivel 1</option><option value="2">Nivel 2</option><option value="3">Nivel 3</option></select></div>
<div class="form-group" id="divtipos"><label>Tipos (solo Palabras):</label><select id="tipos" multiple size="7">
<option value="1">Sustantivo</option><option value="5">Verbos Regulares</option><option value="10">Verbos Irregulares</option>
<option value="2">Adjetivo</option><option value="6">Adverbio</option><option value="4">Pronombre</option>
<option value="7">Preposición</option><option value="8">Conjunción</option><option value="3">Determinante</option><option value="9">Interjección</option>
</select></div>
<div class="form-group" id="divsubtipos" style="display:none"><label>Tiempos Verbales:</label><select id="subtipos" multiple size="3"><option value="1">Forma Base/Presente</option><option value="2">Pasado Simple</option><option value="3">Participio Pasado</option></select></div>
<div class="form-group"><label>&nbsp;</label><button onclick="cargarDatos()">🔄 Cargar Datos</button></div>
</div></div>

<div class="menu-buttons" id="divmenu" style="display:none">
<button class="menu-btn active" onclick="cambiarMenu('repaso')">📋 REPASO</button>
<button class="menu-btn" onclick="cambiarMenu('entrena')">🎧 ENTRENA</button>
<button class="menu-btn" onclick="cambiarMenu('juego')">🎯 JUEGO</button>
</div>

<div id="contenido"><div class="card"><p>Selecciona una categoría y haz clic en "Cargar Datos" para comenzar.</p></div></div>

<div class="card" style="text-align:center"><button class="secondary" onclick="logout()">🚪 CERRAR SESIÓN</button></div>
</div>

<script>
// ---- AUDIO (Web Speech API) ----
class AudioProcessor {
    constructor(){this.synth=window.speechSynthesis;this.utterance=null;this.isSpeaking=false;}
    getLanguageCode(lang){const map={'en':'en-US','es':'es-ES','fr':'fr-FR','de':'de-DE','it':'it-IT','pt':'pt-PT','ja':'ja-JP','ko':'ko-KR','zh':'zh-CN','ru':'ru-RU'};return map[lang]||'en-US';}
    findVoice(langCode){const voices=this.synth.getVoices();let voice=voices.find(v=>v.lang===langCode);if(!voice)voice=voices.find(v=>v.lang.startsWith(langCode.substring(0,2)));return voice||null;}
    speak(texto,lang='en'){if(!texto||texto.trim()==='')return;this.stop();if(this.synth.getVoices().length===0){this.synth.onvoiceschanged=()=>{this._speak(texto,lang);};}else{this._speak(texto,lang);}}
    _speak(texto,lang){const langCode=this.getLanguageCode(lang);this.utterance=new SpeechSynthesisUtterance(texto);this.utterance.lang=langCode;this.utterance.rate=1.0;this.utterance.pitch=1.0;this.utterance.volume=1.0;const voice=this.findVoice(langCode);if(voice)this.utterance.voice=voice;this.utterance.onstart=()=>{this.isSpeaking=true;};this.utterance.onend=()=>{this.isSpeaking=false;};this.utterance.onerror=()=>{this.isSpeaking=false;};this.synth.speak(this.utterance);}
    stop(){if(this.synth.speaking||this.synth.pending)this.synth.cancel();this.isSpeaking=false;}
}
const audioProcessor=new AudioProcessor();
function speakIs(texto,lang){audioProcessor.speak(texto,lang);}

// ---- FUNCIONES PRINCIPALES ----
const token = localStorage.getItem('token');
if(!token && !window.location.pathname.includes('activar') && !window.location.pathname.includes('recuperar')){window.location.href='/';}
document.getElementById('usuario').textContent = localStorage.getItem('usuario') || '';

let palabras=[], modoActual='repaso', juegoActivo=false, juegoActual=null, entrenaIdx=0, mostrandoTraduccion=false;

function seleccionTipos(){
    const cat=document.getElementById('categoria').value;
    document.getElementById('divtipos').style.display = (cat==='Palabras')?'block':'none';
    document.getElementById('divsubtipos').style.display = (cat==='Palabras')?'none':'none';
    document.getElementById('divmenu').style.display='none';
}

async function cargarDatos(){
    const tipos=Array.from(document.getElementById('tipos').selectedOptions).map(o=>parseInt(o.value));
    const subtipos=Array.from(document.getElementById('subtipos').selectedOptions).map(o=>parseInt(o.value));
    const data={categoria:document.getElementById('categoria').value, nivel:parseInt(document.getElementById('nivel').value), tipos, subtipos, idioma_ori:document.getElementById('idiomaOri').value};
    try{
        const res=await fetch('/api/cargar-datos',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify(data)});
        const result=await res.json();
        if(result.success){palabras=result.palabras;mostrarFeedback('Cargadas '+result.total+' palabras','success');document.getElementById('divmenu').style.display='block';renderizarModo();}
        else mostrarFeedback('Seleccione un Tipo de Palabra','error');
    }catch(e){mostrarFeedback('Error al cargar','error');}
}

function cambiarMenu(menu){modoActual=menu;juegoActivo=false;document.querySelectorAll('.menu-btn').forEach((b,i)=>{const menus=['repaso','entrena','juego'];b.classList.toggle('active',menus[i]===menu);});renderizarModo();}

function renderizarModo(){
    if(palabras.length===0){document.getElementById('contenido').innerHTML='<div class="card"><p>No hay datos cargados.</p></div>';return;}
    if(modoActual==='repaso')renderizarRepaso();
    else if(modoActual==='entrena')renderizarEntrena();
    else renderizarJuegoConfig();
}

function renderizarRepaso(){
    let html='<div class="card"><h3>📋 Lista de Palabras</h3>';
    palabras.forEach(p=>{html+='<div class="word-card"><div class="word-text"><span class="word-origen">'+p.origen+'</span> <span>➔</span> <span class="word-destino">'+p.destino+'</span></div><button onclick="speakIs(\''+p.destino+'\',\'en\')">🔊 Escuchar</button></div>';});
    html+='</div>';document.getElementById('contenido').innerHTML=html;
}

function renderizarEntrena(){
    if(entrenaIdx>=palabras.length)entrenaIdx=0;
    const p=palabras[entrenaIdx];
    let html='<div class="card"><h3>🎧 Modo Entrenamiento</h3><div class="stats"><div class="stat">📊 Palabra '+(entrenaIdx+1)+'/'+palabras.length+'</div></div><div class="game-area"><div class="game-word">'+p.origen+'</div><div id="traduccion" class="hidden" style="font-size:24px;color:#667eea;margin:20px 0;"></div><button onclick="mostrarTraduccionEntrena()">🔍 Mostrar Traducción</button> <button onclick="speakIs(\''+p.destino+'\',\'en\')">🔊 Escuchar</button> <button onclick="siguienteEntrena()">➔ Siguiente</button></div></div>';
    document.getElementById('contenido').innerHTML=html;mostrandoTraduccion=false;
}
function mostrarTraduccionEntrena(){if(!mostrandoTraduccion){document.getElementById('traduccion').textContent=palabras[entrenaIdx].destino;document.getElementById('traduccion').classList.remove('hidden');mostrandoTraduccion=true;}}
function siguienteEntrena(){entrenaIdx=(entrenaIdx+1)%palabras.length;renderizarEntrena();}

function renderizarJuegoConfig(){
    let html='<div class="card"><h3>🎯 Configuración del Juego</h3><div class="form-group"><label>Modalidad:</label><select id="modalidad"><option value="escritura">Escritura</option><option value="voz">Voz</option><option value="pronunciacion">Pronunciación</option></select></div><div class="form-group"><label>Orden:</label><select id="orden"><option value="serial">Serial</option><option value="aleatorio">Aleatorio</option></select></div><div class="form-group"><label>Ayuda:</label><select id="ayuda"><option value="con">Con Ayuda</option><option value="sin">Sin Ayuda</option></select></div><button onclick="iniciarJuego()">🚀 Iniciar Juego</button></div>';
    document.getElementById('contenido').innerHTML=html;
}

function iniciarJuego(){
    const modalidad=document.getElementById('modalidad').value, orden=document.getElementById('orden').value, ayuda=document.getElementById('ayuda').value;
    let indices=Array.from({length:palabras.length},(_,i)=>i);
    if(orden==='aleatorio'){for(let i=indices.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[indices[i],indices[j]]=[indices[j],indices[i]];}}
    juegoActivo=true;juegoActual={indices,actual:0,aciertos:0,fallos:0,vistos:new Set(),fallidos:{},modalidad,ayuda,paso:1,respuestaTemp:'',ultimoResultado:''};
    renderizarJuego();
}
function renderizarJuego(){
    if(!juegoActivo)return;
    const pendientes=juegoActual.indices.filter(i=>!juegoActual.vistos.has(i));
    if(pendientes.length===0){renderizarResumen();return;}
    if(juegoActual.paso===1){juegoActual.actual=pendientes[0];juegoActual.respuestaTemp='';}
    const palabra=palabras[juegoActual.actual];
    let inputHTML='';
    if(juegoActual.paso===1){
        inputHTML='<div class="game-word">'+palabra.origen+'</div>'+(juegoActual.ayuda==='con'?'<button onclick="speakIs(\''+palabra.destino+'\',\'en\')">🔊 Escuchar pista</button>':'')+'<button onclick="siguientePasoJuego()">➔ Continuar</button>';
    }else if(juegoActual.paso===2){
        if(juegoActual.modalidad==='escritura'){
            inputHTML='<input type="text" id="respuesta" placeholder="Tu respuesta..." style="width:100%;margin:10px 0;"><button onclick="verificarRespuesta(\''+palabra.destino+'\')">✓ Comprobar</button>';
        }else if(juegoActual.modalidad==='voz'){
            inputHTML='<button onclick="grabarVoz()">🎤 Grabar Respuesta</button><div id="vozTexto" style="margin:10px 0;"></div><button onclick="verificarRespuestaVoz(\''+palabra.destino+'\')">✓ Comprobar</button>';
        }else{
            inputHTML='<button onclick="grabarPronunciacion(\''+palabra.destino+'\')">🎤 Pronunciar</button><div id="pronunciacionResultado"></div>';
        }
    }else{
        const ok=juegoActual.ultimoResultado==='ok';
        inputHTML='<div class="game-word">'+palabra.origen+'</div><div style="font-size:20px;color:'+(ok?'#2e7d32':'#d32f2f')+';margin:20px 0;">'+(ok?'✓ ¡Correcto!':'✗ La respuesta correcta es: '+palabra.destino)+'</div><button onclick="siguientePreguntaJuego()">➔ Siguiente</button> <button onclick="speakIs(\''+palabra.destino+'\',\'en\')">🔊 Escuchar</button>';
    }
    let html='<div class="card"><div class="stats"><div class="stat">📊 Progreso: '+(juegoActual.vistos.size+1)+'/'+juegoActual.indices.length+'</div><div class="stat">✅ Aciertos: '+juegoActual.aciertos+'</div><div class="stat">❌ Fallos: '+juegoActual.fallos+'</div></div><div class="game-area">'+inputHTML+'</div></div>';
    document.getElementById('contenido').innerHTML=html;
}
function siguientePasoJuego(){juegoActual.paso=2;renderizarJuego();}
async function verificarRespuesta(correcta){
    const respuesta=document.getElementById('respuesta')?.value.toLowerCase().trim();
    const sinonimos=correcta.toLowerCase().split('/');
    if(respuesta && sinonimos.some(s=>s===respuesta)){juegoActual.aciertos++;juegoActual.ultimoResultado='ok';}else{juegoActual.fallos++;juegoActual.ultimoResultado='error';juegoActual.fallidos[palabras[juegoActual.actual].origen]=correcta;}
    juegoActual.vistos.add(juegoActual.actual);juegoActual.paso=3;renderizarJuego();
}
async function verificarRespuestaVoz(correcta){
    const textoVoz=document.getElementById('vozTexto')?.textContent||'';
    const sinonimos=correcta.toLowerCase().split('/');
    if(textoVoz && sinonimos.some(s=>s===textoVoz.toLowerCase())){juegoActual.aciertos++;juegoActual.ultimoResultado='ok';}else{juegoActual.fallos++;juegoActual.ultimoResultado='error';juegoActual.fallidos[palabras[juegoActual.actual].origen]=correcta;}
    juegoActual.vistos.add(juegoActual.actual);juegoActual.paso=3;renderizarJuego();
}
function siguientePreguntaJuego(){juegoActual.paso=1;renderizarJuego();}
function renderizarResumen(){
    let fallosHTML='';
    for(const [origen,destino] of Object.entries(juegoActual.fallidos)){fallosHTML+='<div class="word-card">❌ '+origen+' ➔ '+destino+'</div>';}
    let html='<div class="card"><h3>📊 Resumen de la Partida</h3><div class="stats"><div class="stat">✅ Aciertos: '+juegoActual.aciertos+'</div><div class="stat">❌ Fallos: '+juegoActual.fallos+'</div><div class="stat">📊 Total: '+juegoActual.indices.length+'</div></div><h4>Palabras Falladas:</h4>'+(fallosHTML||'<p>🎉 ¡Excelente! No hubo fallas.</p>')+'<button onclick="reiniciarJuego()">🔄 Jugar de nuevo</button> <button onclick="juegoActivo=false;renderizarJuegoConfig()">🏠 Volver</button></div>';
    document.getElementById('contenido').innerHTML=html;
}
function reiniciarJuego(){
    const modalidad=juegoActual.modalidad, ayuda=juegoActual.ayuda;
    let indices=Array.from({length:palabras.length},(_,i)=>i);
    for(let i=indices.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[indices[i],indices[j]]=[indices[j],indices[i]];}
    juegoActual={indices,actual:0,aciertos:0,fallos:0,vistos:new Set(),fallidos:{},modalidad,ayuda,paso:1,respuestaTemp:'',ultimoResultado:''};
    renderizarJuego();
}
async function grabarVoz(){
    mostrarFeedback('🎤 Grabando... Habla ahora','success');
    try{
        const stream=await navigator.mediaDevices.getUserMedia({audio:true});
        const mediaRecorder=new MediaRecorder(stream);
        const chunks=[];
        mediaRecorder.ondataavailable=e=>chunks.push(e.data);
        mediaRecorder.onstop=async()=>{
            const blob=new Blob(chunks,{type:'audio/webm'});
            const formData=new FormData();
            formData.append('audio',blob);
            formData.append('lang','en-US');
            const res=await fetch('/api/procesar-voz',{method:'POST',headers:{'Authorization':'Bearer '+token},body:formData});
            const data=await res.json();
            const vt=document.getElementById('vozTexto');
            if(vt)vt.textContent=data.texto||'No se entendió';
        };
        mediaRecorder.start();
        setTimeout(()=>mediaRecorder.stop(),3000);
        setTimeout(()=>stream.getTracks().forEach(t=>t.stop()),4000);
    }catch(err){mostrarFeedback('Error al acceder al micrófono','error');}
}
function grabarPronunciacion(correcta){mostrarFeedback('🎤 Pronuncia la palabra...','success');}
function mostrarFeedback(msg,tipo){
    const d=document.createElement('div');
    d.className='feedback '+tipo;
    d.textContent=msg;
    const cont=document.getElementById('contenido');
    cont.insertBefore(d,cont.firstChild);
    setTimeout(()=>d.remove(),3000);
}
async function logout(){
    await fetch('/api/logout',{method:'POST',headers:{'Authorization':'Bearer '+token}});
    localStorage.clear();
    window.location.href='/';
}
</script>
</body>
</html>`

// ============================================================================
// HANDLERS DE PÁGINAS HTML
// ============================================================================

func serveLogin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprint(w, loginTemplate)
}

func serveDashboard(w http.ResponseWriter, r *http.Request) {
	// Verificar token en el frontend; aquí solo servimos la página
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprint(w, dashboardTemplate)
}

func serveActivate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprint(w, createPasswordTemplate)
}

func serveRecover(w http.ResponseWriter, r *http.Request) {
	// Misma plantilla que activar
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprint(w, createPasswordTemplate)
}

// ============================================================================
// MAIN
// ============================================================================

func main() {
	initDB()
	defer db.Close()

	// Rutas de páginas
	http.HandleFunc("/", corsMiddleware(serveLogin))
	http.HandleFunc("/dashboard", corsMiddleware(serveDashboard))
	http.HandleFunc("/activar/", corsMiddleware(serveActivate))  // /activar/{token}
	http.HandleFunc("/recuperar/", corsMiddleware(serveRecover)) // /recuperar/{token}

	// Rutas API (ya definidas)
	http.HandleFunc("/api/login", corsMiddleware(loginHandler))
	http.HandleFunc("/api/registro", corsMiddleware(registerHandler))
	http.HandleFunc("/api/crear-password", corsMiddleware(createPasswordHandler))
	http.HandleFunc("/api/recuperar", corsMiddleware(recoverHandler))
	http.HandleFunc("/api/cargar-datos", corsMiddleware(authMiddleware(cargarDatosHandler)))
	http.HandleFunc("/api/procesar-voz", corsMiddleware(authMiddleware(procesarVozHandler)))
	http.HandleFunc("/api/logout", corsMiddleware(authMiddleware(logoutHandler)))

	// Iniciar servidor
	port := ":8085"
	log.Printf("Servidor corriendo en http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
