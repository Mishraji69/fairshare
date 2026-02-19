const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllGroups, createGroup, getGroupMembers, getGroupBalances, addMemberToGroup } = require('../controllers/groupController');

router.get('/groups', authMiddleware, getAllGroups);
router.post('/groups', authMiddleware, createGroup);
router.get('/groups/:groupId/members', authMiddleware, getGroupMembers);
router.get('/groups/:groupId/balances', authMiddleware, getGroupBalances);
router.post('/groups/:groupId/members', authMiddleware, addMemberToGroup);

module.exports = router;
