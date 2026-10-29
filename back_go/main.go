package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load() // opcional: carga .env si existe

	if err := initDB(); err != nil {
		log.Fatalf("❌ %v", err)
	}
	defer pool.Close()

	mux := http.NewServeMux()

	// CRUD manuales
	mux.HandleFunc("GET /diccionario", getDiccionario)
	mux.HandleFunc("GET /diccionario/{id}", getDiccionarioByID)
	mux.HandleFunc("POST /diccionario", postDiccionario)
	mux.HandleFunc("PUT /diccionario/{id}", putDiccionario)
	mux.HandleFunc("DELETE /diccionario/{id}", deleteDiccionario)

	// CRUD simples vía helper
	registerLenguajes(mux)              // ver ejemplo
	registerImages(mux)                 // crear equivalente con registerSimpleCRUD
	registerNivel(mux)
	registerOxDiscussionComments(mux)
	registerRoles(mux)
	registerTipoDeDiccionario(mux)
	registerTipoDePalabra(mux)
	registerUsers(mux)
	registerUsersRoles(mux)

	// Auth
	mux.HandleFunc("POST /login", handleLogin)
	mux.HandleFunc("GET /login", handleLogin) // mismo handler: ambos aceptan body
	mux.HandleFunc("POST /registrar", handleRegistrar)
	mux.HandleFunc("POST /contrasenia", handleContrasenia)

	// 404 personalizado (opcional: net/http ya responde 404)
	log.Println("🚀 Servidor corriendo en http://localhost:8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}