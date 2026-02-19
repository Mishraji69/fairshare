const { Client } = require('pg');
require('dotenv').config();

const createDatabase = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres'
  });

  try {
    await client.connect();
    console.log('✓ Connected to PostgreSQL');

    const checkDb = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME]
    );

    if (checkDb.rows.length === 0) {
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`✅ Database '${process.env.DB_NAME}' created successfully!`);
    } else {
      console.log(`✓ Database '${process.env.DB_NAME}' already exists`);
    }

    await client.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createDatabase();
