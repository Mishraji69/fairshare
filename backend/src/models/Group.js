const pool = require('../config/db');

const Group = {
  async create(name, createdBy) {
    const query = 'INSERT INTO groups (name, created_by) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [name, createdBy]);
    return result.rows[0];
  },

  async findById(id) {
    const query = 'SELECT * FROM groups WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async getByUserId(userId) {
    const query = `
      SELECT g.* FROM groups g
      INNER JOIN group_members gm ON g.id = gm.group_id
      WHERE gm.user_id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  async addMember(groupId, userId) {
    const query = 'INSERT INTO group_members (group_id, user_id) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [groupId, userId]);
    return result.rows[0];
  },

  async getMembers(groupId) {
    const query = `
      SELECT u.id, u.name, u.email, gm.joined_at
      FROM users u
      INNER JOIN group_members gm ON u.id = gm.user_id
      WHERE gm.group_id = $1
    `;
    const result = await pool.query(query, [groupId]);
    return result.rows;
  },

  async getMemberBalances(groupId) {
    const query = `
      WITH member_payments AS (
        SELECT 
          u.id as user_id,
          u.name,
          COALESCE(SUM(e.amount), 0) as total_paid
        FROM users u
        INNER JOIN group_members gm ON u.id = gm.user_id
        LEFT JOIN expenses e ON e.paid_by = u.id AND e.group_id = $1
        WHERE gm.group_id = $1
        GROUP BY u.id, u.name
      ),
      member_expenses AS (
        SELECT 
          u.id as user_id,
          COALESCE(SUM(es.amount_owed), 0) as total_owed
        FROM users u
        INNER JOIN group_members gm ON u.id = gm.user_id
        LEFT JOIN expense_splits es ON es.user_id = u.id
        LEFT JOIN expenses e ON e.id = es.expense_id AND e.group_id = $1
        WHERE gm.group_id = $1
        GROUP BY u.id
      )
      SELECT 
        mp.user_id,
        mp.name,
        mp.total_paid,
        COALESCE(me.total_owed, 0) as total_owed,
        (mp.total_paid - COALESCE(me.total_owed, 0)) as balance
      FROM member_payments mp
      LEFT JOIN member_expenses me ON mp.user_id = me.user_id
      ORDER BY mp.name
    `;
    const result = await pool.query(query, [groupId]);
    return result.rows;
  }
};

module.exports = Group;
