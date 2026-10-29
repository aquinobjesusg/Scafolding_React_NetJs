package main

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var pool *pgxpool.Pool

func initDB() error {
	user := getEnv("DB_USER", "oxdiccionario")
	host := getEnv("DB_HOST", "localhost")
	name := getEnv("DB_NAME", "oxdiccionario")
	pass := getEnv("DB_PASSWORD", "oxdiccionario")
	port := getEnv("DB_PORT", "5432")

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		user, pass, host, port, name)

	ctx := context.Background()
	p, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return fmt.Errorf("no se pudo crear el pool: %w", err)
	}
	if err := p.Ping(ctx); err != nil {
		return fmt.Errorf("no se pudo conectar a la BD: %w", err)
	}
	pool = p
	fmt.Println("✅ Conectado a PostgreSQL")
	return nil
}

func getEnv(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}