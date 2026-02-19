const pool = require('./config/db');

const createTables = async () => {
  try {
    console.log('Creating database tables...');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Users table created');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS groups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Groups table created');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS group_members (
        id SERIAL PRIMARY KEY,
        group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(group_id, user_id)
      );
    `);
    console.log('✓ Group_members table created');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY,
        group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
        paid_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Expenses table created');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS expense_splits (
        id SERIAL PRIMARY KEY,
        expense_id INTEGER REFERENCES expenses(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        amount_owed DECIMAL(10, 2) NOT NULL,
        UNIQUE(expense_id, user_id)
      );
    `);
    console.log('✓ Expense_splits table created');

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_group_members_group ON group_members(group_id);
      CREATE INDEX IF NOT EXISTS idx_group_members_user ON group_members(user_id);
      CREATE INDEX IF NOT EXISTS idx_expenses_group ON expenses(group_id);
      CREATE INDEX IF NOT EXISTS idx_expenses_paid_by ON expenses(paid_by);
      CREATE INDEX IF NOT EXISTS idx_expense_splits_expense ON expense_splits(expense_id);
      CREATE INDEX IF NOT EXISTS idx_expense_splits_user ON expense_splits(user_id);
    `);
    console.log('✓ Indexes created');

    console.log('\n✅ Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
};

createTables();
