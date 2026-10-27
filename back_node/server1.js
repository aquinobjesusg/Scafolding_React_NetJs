const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
// ===== Swagger =====
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 8080;

// ---------- Configuración de la base de datos ----------
const pool = new Pool({
  user: process.env.DB_USER || 'oxdiccionario',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'oxdiccionario',
  password: process.env.DB_PASSWORD || 'oxdiccionario',
  port: process.env.DB_PORT || 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// ---------- Función para crear la tabla si no existe ----------
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      correo VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('✅ Tabla "usuarios" asegurada.');
  } catch (err) {
    console.error('❌ Error al crear la tabla:', err.message);
    process.exit(1);
  }
};
// createTable();

// ============================================================
// CONFIGURACIÓN DE SWAGGER
// ============================================================
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Diccionario Ox',
      version: '1.0.0',
      description: 'Documentación de la API del Diccionario Ox (diccionario, images, lenguajes, nivel, roles, users, etc.)',
      contact: { name: 'Equipo Ox' },
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    tags: [
      { name: 'Diccionario', description: 'Operaciones sobre el diccionario' },
      { name: 'Images', description: 'Operaciones sobre imágenes' },
      { name: 'Lenguajes', description: 'Operaciones sobre lenguajes' },
      { name: 'Nivel', description: 'Operaciones sobre niveles' },
      { name: 'OxDiscussionComments', description: 'Comentarios de discusión' },
      { name: 'Roles', description: 'Operaciones sobre roles' },
      { name: 'TipoDiccionario', description: 'Tipos de diccionario' },
      { name: 'TipoPalabra', description: 'Tipos de palabra' },
      { name: 'Users', description: 'Operaciones sobre usuarios' },
      { name: 'UsersRoles', description: 'Relación usuarios-roles' },
      { name: 'Auth', description: 'Login y registro de usuarios' },
    ],
    components: {
      schemas: {
        Diccionario: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            grupo: { type: 'string' },
            texto: { type: 'string' },
            lenguajes_id: { type: 'integer' },
            nivel_id: { type: 'integer' },
            tipodiccionario_id: { type: 'integer' },
            tipopalabra_id: { type: 'integer' },
          },
        },
        Image: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            gallery: { type: 'string' },
            image: { type: 'string' },
          },
        },
        Lenguaje: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            lenguaje: { type: 'string' },
            siglas: { type: 'string' },
          },
        },
        Nivel: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nivel: { type: 'string' },
          },
        },
        OxDiscussionComment: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            comment: { type: 'string' },
            discussionid: { type: 'integer' },
            time: { type: 'string' },
            username: { type: 'string' },
          },
        },
        Rol: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            roles: { type: 'string' },
            siglas: { type: 'string' },
          },
        },
        TipoDiccionario: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            tipodiccionario: { type: 'string' },
          },
        },
        TipoPalabra: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            palabra: { type: 'string' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            apellido: { type: 'string' },
            avatar: { type: 'string' },
            edad: { type: 'integer' },
            email: { type: 'string' },
            emailverified: { type: 'boolean' },
            fechadenacimiento: { type: 'string', format: 'date' },
            incambioclave: { type: 'boolean' },
            nombre: { type: 'string' },
            password: { type: 'string' },
            remembertoken: { type: 'string' },
            userrole_id: { type: 'integer' },
            usuario: { type: 'string' },
            lenguajesnativo_id: { type: 'integer' },
          },
        },
        UserRole: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            role_id: { type: 'integer' },
            user_id: { type: 'integer' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            detalle: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// *******************
// Rutas diccionario
// *******************

/**
 * @swagger
 * /diccionario:
 *   get:
 *     tags: [Diccionario]
 *     summary: Obtiene todos los registros del diccionario
 *     responses:
 *       200:
 *         description: Lista de registros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Diccionario' }
 *       404:
 *         description: No existen registros
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       500:
 *         description: Error del servidor
 */
app.get('/diccionario', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM diccionario ORDER BY id');
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No Existen Registros' });
    } else {
      return res.json(result.rows);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registros', detalle: err.message });
  }
});

/**
 * @swagger
 * /diccionario/{id}:
 *   get:
 *     tags: [Diccionario]
 *     summary: Obtiene un registro del diccionario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Registro encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Diccionario' }
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Registro no encontrado
 */
app.get('/diccionario/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query('SELECT * FROM diccionario WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /diccionario:
 *   post:
 *     tags: [Diccionario]
 *     summary: Crea un nuevo registro en el diccionario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Diccionario' }
 *     responses:
 *       201:
 *         description: Registro creado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Diccionario' }
 *       409:
 *         description: Registro duplicado
 *       500:
 *         description: Error del servidor
 */
app.post('/diccionario', async (req, res) => {
  const { grupo, texto, lenguajes_id, nivel_id, tipodiccionario_id, tipopalabra_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO diccionario (grupo,texto,lenguajes_id,nivel_id,tipodiccionario_id,tipopalabra_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [grupo, texto, lenguajes_id, nivel_id, tipodiccionario_id, tipopalabra_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'El Registro se Encuentra Duplicado' });
    res.status(500).json({ error: 'Error al crear registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /diccionario/{id}:
 *   put:
 *     tags: [Diccionario]
 *     summary: Actualiza un registro del diccionario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Diccionario' }
 *     responses:
 *       200:
 *         description: Registro actualizado
 *       404:
 *         description: Registro no encontrado
 *       409:
 *         description: Registro duplicado
 */
app.put('/diccionario/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  const { grupo, texto, lenguajes_id, nivel_id, tipodiccionario_id, tipopalabra_id } = req.body;
  const fields = [];
  const values = [];
  let idx = 1;
  if (grupo) { fields.push(`grupo = $${idx++}`); values.push(grupo); }
  if (texto) { fields.push(`texto = $${idx++}`); values.push(texto); }
  if (lenguajes_id) { fields.push(`lenguajes_id = $${idx++}`); values.push(lenguajes_id); }
  if (nivel_id) { fields.push(`nivel_id = $${idx++}`); values.push(nivel_id); }
  if (tipodiccionario_id) { fields.push(`tipodiccionario_id = $${idx++}`); values.push(tipodiccionario_id); }
  if (tipopalabra_id) { fields.push(`tipopalabra_id = $${idx++}`); values.push(tipopalabra_id); }
  values.push(id);
  const query = `UPDATE diccionario SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Error al Actualizar, El Registro esta Duplicado' });
    res.status(500).json({ error: 'Error al actualizar registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /diccionario/{id}:
 *   delete:
 *     tags: [Diccionario]
 *     summary: Elimina un registro del diccionario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Registro eliminado
 *       404:
 *         description: Registro no encontrado
 */
app.delete('/diccionario/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query('DELETE FROM diccionario WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar registro', detalle: err.message });
  }
});

// *******************
// Rutas images
// *******************

/**
 * @swagger
 * /images:
 *   get:
 *     tags: [Images]
 *     summary: Obtiene todas las imágenes
 *     responses:
 *       200:
 *         description: Lista de imágenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Image' }
 *       404:
 *         description: No existen registros
 */
app.get('/images', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM images ORDER BY id');
    if (result.rows.length === 0) return res.status(404).json({ error: 'No Existen Registros' });
    return res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registros', detalle: err.message });
  }
});

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     tags: [Images]
 *     summary: Obtiene una imagen por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Imagen encontrada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Image' }
 *       404:
 *         description: No encontrada
 */
app.get('/images/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query('SELECT * FROM images WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /images:
 *   post:
 *     tags: [Images]
 *     summary: Crea una nueva imagen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Image' }
 *     responses:
 *       201:
 *         description: Imagen creada
 *       409:
 *         description: Registro duplicado
 */
app.post('/images', async (req, res) => {
  const { gallery, image } = req.body;
  try {
    const result = await pool.query('INSERT INTO images (gallery,image) VALUES ($1,$2) RETURNING *', [gallery, image]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'El Registro se Encuentra Duplicado' });
    res.status(500).json({ error: 'Error al crear registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /images/{id}:
 *   put:
 *     tags: [Images]
 *     summary: Actualiza una imagen
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Image' }
 *     responses:
 *       200:
 *         description: Imagen actualizada
 *       404:
 *         description: No encontrada
 */
app.put('/images/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  const { gallery, image } = req.body;
  const fields = [];
  const values = [];
  let idx = 1;
  if (gallery) { fields.push(`gallery = $${idx++}`); values.push(gallery); }
  if (image) { fields.push(`image = $${idx++}`); values.push(image); }
  values.push(id);
  const query = `UPDATE images SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Error al Actualizar, El Registro esta Duplicado' });
    res.status(500).json({ error: 'Error al actualizar registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /images/{id}:
 *   delete:
 *     tags: [Images]
 *     summary: Elimina una imagen
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Imagen eliminada
 *       404:
 *         description: No encontrada
 */
app.delete('/images/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query('DELETE FROM images WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar registro', detalle: err.message });
  }
});

// *******************
// Rutas lenguajes
// *******************

/**
 * @swagger
 * /lenguajes:
 *   get:
 *     tags: [Lenguajes]
 *     summary: Obtiene todos los lenguajes
 *     responses:
 *       200:
 *         description: Lista de lenguajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Lenguaje' }
 *       404:
 *         description: No existen registros
 */
app.get('/lenguajes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM lenguajes ORDER BY id');
    if (result.rows.length === 0) return res.status(404).json({ error: 'No Existen Registros' });
    return res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registros', detalle: err.message });
  }
});

/**
 * @swagger
 * /lenguajes/{id}:
 *   get:
 *     tags: [Lenguajes]
 *     summary: Obtiene un lenguaje por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lenguaje encontrado
 *       404:
 *         description: No encontrado
 */
app.get('/lenguajes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query('SELECT * FROM lenguajes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /lenguajes:
 *   post:
 *     tags: [Lenguajes]
 *     summary: Crea un nuevo lenguaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Lenguaje' }
 *     responses:
 *       201:
 *         description: Lenguaje creado
 *       409:
 *         description: Duplicado
 */
app.post('/lenguajes', async (req, res) => {
  const { lenguaje, siglas } = req.body;
  try {
    const result = await pool.query('INSERT INTO lenguajes (lenguaje,siglas) VALUES ($1,$2) RETURNING *', [lenguaje, siglas]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'El Registro se Encuentra Duplicado' });
    res.status(500).json({ error: 'Error al crear registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /lenguajes/{id}:
 *   put:
 *     tags: [Lenguajes]
 *     summary: Actualiza un lenguaje
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Lenguaje' }
 *     responses:
 *       200:
 *         description: Lenguaje actualizado
 *       404:
 *         description: No encontrado
 */
app.put('/lenguajes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  const { lenguaje, siglas } = req.body;
  const fields = [];
  const values = [];
  let idx = 1;
  if (lenguaje) { fields.push(`lenguaje = $${idx++}`); values.push(lenguaje); }
  if (siglas) { fields.push(`siglas = $${idx++}`); values.push(siglas); }
  values.push(id);
  const query = `UPDATE lenguajes SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Error al Actualizar, El Registro esta Duplicado' });
    res.status(500).json({ error: 'Error al actualizar registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /lenguajes/{id}:
 *   delete:
 *     tags: [Lenguajes]
 *     summary: Elimina un lenguaje
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Eliminado
 *       404:
 *         description: No encontrado
 */
app.delete('/lenguajes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query('DELETE FROM lenguajes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar registro', detalle: err.message });
  }
});

// *******************
// Rutas nivel
// *******************

/**
 * @swagger
 * /nivel:
 *   get:
 *     tags: [Nivel]
 *     summary: Obtiene todos los niveles
 *     responses:
 *       200:
 *         description: Lista de niveles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Nivel' }
 *       404:
 *         description: No existen registros
 */
app.get('/nivel', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM nivel ORDER BY id');
    if (result.rows.length === 0) return res.status(404).json({ error: 'No Existen Registros' });
    return res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registros', detalle: err.message });
  }
});

/**
 * @swagger
 * /nivel/{id}:
 *   get:
 *     tags: [Nivel]
 *     summary: Obtiene un nivel por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Nivel encontrado
 *       404:
 *         description: No encontrado
 */
app.get('/nivel/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query('SELECT * FROM nivel WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /nivel:
 *   post:
 *     tags: [Nivel]
 *     summary: Crea un nuevo nivel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Nivel' }
 *     responses:
 *       201:
 *         description: Nivel creado
 *       409:
 *         description: Duplicado
 */
app.post('/nivel', async (req, res) => {
  const { nivel } = req.body;
  try {
    const result = await pool.query('INSERT INTO nivel (nivel) VALUES ($1) RETURNING *', [nivel]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'El Registro se Encuentra Duplicado' });
    res.status(500).json({ error: 'Error al crear registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /nivel/{id}:
 *   put:
 *     tags: [Nivel]
 *     summary: Actualiza un nivel
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Nivel' }
 *     responses:
 *       200:
 *         description: Nivel actualizado
 *       404:
 *         description: No encontrado
 */
app.put('/nivel/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  const { nivel } = req.body;
  const fields = [];
  const values = [];
  let idx = 1;
  if (nivel) { fields.push(`nivel = $${idx++}`); values.push(nivel); }
  values.push(id);
  const query = `UPDATE nivel SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Error al Actualizar, El Registro esta Duplicado' });
    res.status(500).json({ error: 'Error al actualizar registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /nivel/{id}:
 *   delete:
 *     tags: [Nivel]
 *     summary: Elimina un nivel
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Eliminado
 *       404:
 *         description: No encontrado
 */
app.delete('/nivel/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query('DELETE FROM nivel WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar registro', detalle: err.message });
  }
});

// *******************
// Rutas oxdiscussioncomments
// *******************

/**
 * @swagger
 * /oxdiscussioncomments:
 *   get:
 *     tags: [OxDiscussionComments]
 *     summary: Obtiene todos los comentarios de discusión
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/OxDiscussionComment' }
 *       404:
 *         description: No existen registros
 */
app.get('/oxdiscussioncomments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM oxdiscussioncomments ORDER BY id');
    if (result.rows.length === 0) return res.status(404).json({ error: 'No Existen Registros' });
    return res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registros', detalle: err.message });
  }
});

/**
 * @swagger
 * /oxdiscussioncomments/{id}:
 *   get:
 *     tags: [OxDiscussionComments]
 *     summary: Obtiene un comentario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *       404:
 *         description: No encontrado
 */
app.get('/oxdiscussioncomments/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query('SELECT * FROM oxdiscussioncomments WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registro', detalle: err.message });
  }
});

/**
 * @swagger
 * /oxdiscussioncomments:
 *   post:
 *     tags: [OxDiscussionComments]
 *     summary: Crea un nuevo comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/OxDiscussionComment' }
 *     responses:
 *       201:
 *         description: Comentario creado
 *       409:
 *         description: Duplicado
 */
app.post('/oxdiscussioncomments', async (req, res) => {
  const { comment, discussionid, time, username } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO oxdiscussioncomments (comment,discussionid,time,username) VALUES ($1,$2,$3,$4) RETURNING *',
      [comment, discussionid, time, username]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'El Registro se Encuentra Duplicado' });
    res.status(500).json({ error: 'Error al crear registro', detalle: err.message });
  }
});

/**
 * @swagger