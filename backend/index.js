const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all product types
app.get('/api/product-types', (req, res) => {
  const sql = 'SELECT * FROM product_types ORDER BY name ASC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  const sql = `
    SELECT p.*, pt.name AS product_type_name 
    FROM products p 
    LEFT JOIN product_types pt ON p.product_type_id = pt.id 
    ORDER BY p.id DESC
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get a single product
app.get('/api/products/:id', (req, res) => {
  const sql = `
    SELECT p.*, pt.name AS product_type_name 
    FROM products p 
    LEFT JOIN product_types pt ON p.product_type_id = pt.id 
    WHERE p.id = ?
  `;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(row);
  });
});

// Create a new product
app.post('/api/products', (req, res) => {
  const { name, description, price, quantity, product_type_id } = req.body;
  if (!name || price === undefined || quantity === undefined) {
    return res.status(400).json({ error: 'Name, price and quantity are required.' });
  }

  const sql = 'INSERT INTO products (name, description, price, quantity, product_type_id) VALUES (?, ?, ?, ?, ?)';
  const params = [name, description, price, quantity, product_type_id || null];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      name,
      description,
      price,
      quantity,
      product_type_id: product_type_id || null
    });
  });
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const { name, description, price, quantity, product_type_id } = req.body;
  if (!name || price === undefined || quantity === undefined) {
    return res.status(400).json({ error: 'Name, price and quantity are required.' });
  }

  const sql = 'UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, product_type_id = ? WHERE id = ?';
  const params = [name, description, price, quantity, product_type_id || null, req.params.id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({
      id: parseInt(req.params.id),
      name,
      description,
      price,
      quantity,
      product_type_id: product_type_id || null
    });
  });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const sql = 'DELETE FROM products WHERE id = ?';
  db.run(sql, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', id: parseInt(req.params.id) });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
