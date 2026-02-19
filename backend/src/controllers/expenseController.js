const Expense = require('../models/Expense');
const Group = require('../models/Group');

const getExpensesByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const expenses = await Expense.getByGroupId(groupId);
    res.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

const createExpense = async (req, res) => {
  try {
    const { group_id, amount, description, paid_by } = req.body;

    if (!group_id || !amount || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const paidBy = paid_by || req.user.id;
    const expense = await Expense.create(group_id, paidBy, amount, description);

    const members = await Group.getMembers(group_id);
    const splitAmount = parseFloat(amount) / members.length;

    for (const member of members) {
      await Expense.addSplit(expense.id, member.id, splitAmount);
    }

    res.status(201).json(expense);
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ message: 'Failed to create expense' });
  }
};

const getExpenseSplits = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const splits = await Expense.getSplits(expenseId);
    res.json(splits);
  } catch (error) {
    console.error('Get splits error:', error);
    res.status(500).json({ message: 'Failed to fetch splits' });
  }
};

module.exports = { getExpensesByGroup, createExpense, getExpenseSplits };
