import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ExpenseList from '../components/ExpenseList';
import AddExpenseModal from '../components/AddExpenseModal';
import AddMemberModal from '../components/AddMemberModal';
import MemberBalances from '../components/MemberBalances';
import { expenseAPI, groupAPI } from '../services/api';

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  
  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);

  useEffect(() => {
    fetchGroupData();
  }, [groupId]);

  const fetchGroupData = async () => {
    try {
      setLoading(true);
      const [expensesRes, groupsRes, balancesRes] = await Promise.all([
        expenseAPI.getByGroup(groupId),
        groupAPI.getAll(),
        groupAPI.getBalances(groupId)
      ]);
      
      setExpenses(expensesRes.data);
      setBalances(balancesRes.data);
      const currentGroup = groupsRes.data.find(g => g.id === parseInt(groupId));
      setGroup(currentGroup);
    } catch (err) {
      setError('Failed to load group data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = () => {
    setShowModal(false);
    fetchGroupData();
  };

  const handleMemberAdded = () => {
    setShowMemberModal(false);
    fetchGroupData();
  };

  const calculateTotal = () => {
    return expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12 text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Group not found</p>
            <button onClick={() => navigate('/dashboard')} className="btn-primary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-white mb-4 flex items-center"
          >
            ← Back to Dashboard
          </button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{group.name}</h1>
              <p className="text-gray-400">
                Created {new Date(group.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowMemberModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                + Add Member
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary"
              >
                + Add Expense
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="card mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Total Expenses</h2>
          <p className="text-4xl font-bold text-blue-500">
            ${calculateTotal().toFixed(2)}
          </p>
        </div>

        <div className="mb-6">
          <MemberBalances balances={balances} />
        </div>

        <ExpenseList expenses={expenses} />
      </div>

      {showModal && (
        <AddExpenseModal
          groupId={groupId}
          onClose={() => setShowModal(false)}
          onExpenseAdded={handleExpenseAdded}
        />
      )}

      {showMemberModal && (
        <AddMemberModal
          groupId={groupId}
          onClose={() => setShowMemberModal(false)}
          onMemberAdded={handleMemberAdded}
        />
      )}
    </div>
  );
};

export default GroupDetail;
