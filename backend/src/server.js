const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/db');

const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', healthRoutes);
app.use('/auth', authRoutes);
app.use('/', groupRoutes);
app.use('/', expenseRoutes);
app.use(cors({
  origin: '*'
}));


// ---- START SERVER ONLY AFTER DB CONNECTS ----
const startServer = async () => {
  try {
    // Test PostgreSQL connection
    await pool.query('SELECT 1');
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 ShareFare API running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
