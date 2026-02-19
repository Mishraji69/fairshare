const Group = require('../models/Group');

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.getByUserId(req.user.id);
    res.json(groups);
  } catch (error) {
    console.error('Get groups error:', error);
    res.status(500).json({ message: 'Failed to fetch groups' });
  }
};

const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Group name is required' });
    }

    const group = await Group.create(name, req.user.id);
    await Group.addMember(group.id, req.user.id);

    res.status(201).json(group);
  } catch (error) {
    console.error('Create group error:', error);
    res.status(500).json({ message: 'Failed to create group' });
  }
};

const getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;
    const members = await Group.getMembers(groupId);
    res.json(members);
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({ message: 'Failed to fetch members' });
  }
};

const getGroupBalances = async (req, res) => {
  try {
    const { groupId } = req.params;
    const balances = await Group.getMemberBalances(groupId);
    res.json(balances);
  } catch (error) {
    console.error('Get balances error:', error);
    res.status(500).json({ message: 'Failed to fetch balances' });
  }
};

const addMemberToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId, email } = req.body;

    if (!userId && !email) {
      return res.status(400).json({ message: 'User ID or email is required' });
    }

    const User = require('../models/User');
    let targetUserId = userId;

    if (email && !userId) {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found with this email' });
      }
      targetUserId = user.id;
    }

    const members = await Group.getMembers(groupId);
    const alreadyMember = members.find(m => m.id === targetUserId);
    
    if (alreadyMember) {
      return res.status(400).json({ message: 'User is already a member of this group' });
    }

    await Group.addMember(groupId, targetUserId);
    const updatedMembers = await Group.getMembers(groupId);
    
    res.status(201).json({ 
      message: 'Member added successfully',
      members: updatedMembers 
    });
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ message: 'Failed to add member' });
  }
};

module.exports = { getAllGroups, createGroup, getGroupMembers, getGroupBalances, addMemberToGroup };
