const pool = require('../config/db');

const Expense = {
  async create(groupId, paidBy, amount, description) {
    const query = 'INSERT INTO expenses (group_id, paid_by, amount, description) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await pool.query(query, [groupId, paidBy, amount, description]);
    return result.rows[0];
  },

  async findById(id) {
    const query = 'SELECT * FROM expenses WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async getByGroupId(groupId) {
    const query = `
      SELECT e.*, u.name as paid_by_name
      FROM expenses e
      INNER JOIN users u ON e.paid_by = u.id
      WHERE e.group_id = $1
      ORDER BY e.created_at DESC
    `;
    const result = await pool.query(query, [groupId]);
    return result.rows;
  },

  async addSplit(expenseId, userId, amountOwed) {
    const query = 'INSERT INTO expense_splits (expense_id, user_id, amount_owed) VALUES ($1, $2, $3) RETURNING *';
    const result = await pool.query(query, [expenseId, userId, amountOwed]);
    return result.rows[0];
  },

  async getSplits(expenseId) {
    const query = `
      SELECT es.*, u.name as user_name
      FROM expense_splits es
      INNER JOIN users u ON es.user_id = u.id
      WHERE es.expense_id = $1
    `;
    const result = await pool.query(query, [expenseId]);
    return result.rows;
  }
};

module.exports = Expense;
