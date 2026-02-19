const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getExpensesByGroup, createExpense, getExpenseSplits } = require('../controllers/expenseController');

router.get('/expenses/:groupId', authMiddleware, getExpensesByGroup);
router.post('/expenses', authMiddleware, createExpense);
router.get('/expenses/:expenseId/splits', authMiddleware, getExpenseSplits);

module.exports = router;
