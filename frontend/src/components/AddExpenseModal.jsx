import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { expenseAPI } from '../services/api';

const AddExpenseModal = ({ groupId, onClose, onExpenseAdded }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    description: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.description.trim() || !formData.amount) {
      setError('Please fill in all fields');
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    try {
      setLoading(true);
      await expenseAPI.create(
        parseInt(groupId),
        parseFloat(formData.amount),
        formData.description,
        user.id
      );
      onExpenseAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Expense</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
              placeholder="e.g., Dinner, Gas, Hotel"
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input"
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900 text-red-200 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? 'Adding...' : 'Add Expense'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
