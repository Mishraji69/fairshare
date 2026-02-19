const pool = require('../config/db');

const User = {
  async create(name, email, password) {
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const result = await pool.query(query, [name, email, password]);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async getAll() {
    const query = 'SELECT id, name, email, created_at FROM users';
    const result = await pool.query(query);
    return result.rows;
  }
};

module.exports = User;
