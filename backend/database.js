const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'products.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // 1. Create product_types table and products table in sequence
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS product_types (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
        )
      `, (err) => {
        if (err) {
          console.error('Error creating product_types table:', err.message);
        } else {
          console.log('Product types table verified/created.');
          // Seed initial types if empty
          db.get("SELECT COUNT(*) AS count FROM product_types", (err, row) => {
            if (!err && row && row.count === 0) {
              const stmt = db.prepare("INSERT INTO product_types (name) VALUES (?)");
              const defaultTypes = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Otros'];
              defaultTypes.forEach(type => stmt.run(type));
              stmt.finalize();
              console.log('Default product types seeded.');
            }
          });
        }
      });

      db.run(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          price REAL NOT NULL,
          quantity INTEGER NOT NULL,
          product_type_id INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (product_type_id) REFERENCES product_types(id)
        )
      `, (err) => {
        if (err) {
          console.error('Error creating products table:', err.message);
        } else {
          console.log('Products table verified/created.');
          
          // Make sure product_type_id column exists if the table was created beforehand
          db.run("ALTER TABLE products ADD COLUMN product_type_id INTEGER", (err) => {
            // Ignore if column already exists
          });
        }
      });
    });
  }
});

module.exports = db;
