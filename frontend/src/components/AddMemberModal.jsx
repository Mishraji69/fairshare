import { useState } from 'react';
import { groupAPI } from '../services/api';

const AddMemberModal = ({ groupId, onClose, onMemberAdded }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await groupAPI.addMember(groupId, email);
      setSuccess('Member added successfully!');
      setTimeout(() => {
        onMemberAdded();
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add member');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Add Member to Group</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Member Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
                setSuccess('');
              }}
              className="input"
              placeholder="Enter member's email address"
              required
              autoFocus
            />
            <p className="text-gray-400 text-sm mt-2">
              Enter the email address of the user you want to add to this group.
            </p>
          </div>

          {error && (
            <div className="bg-red-900 text-red-200 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900 text-green-200 p-3 rounded-lg text-sm mb-4">
              {success}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || success}
              className="btn-primary flex-1"
            >
              {loading ? 'Adding...' : success ? 'Added!' : 'Add Member'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
