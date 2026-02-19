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

app.use(cors());
app.use(express.json());

app.use('/', healthRoutes);
app.use('/auth', authRoutes);
app.use('/', groupRoutes);
app.use('/', expenseRoutes);

app.listen(PORT, () => {
  console.log(`ShareFare API running on port ${PORT}`);
});

module.exports = app;
