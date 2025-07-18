import React, { useState } from 'react';
import useAuthStore from '../stores/authStore';

const ChangePassword = () => {
  const { changePassword, loading, error } = useAuthStore();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    if (newPassword !== confirmPassword) {
      return alert('New passwords do not match.');
    }
    const result = await changePassword(oldPassword, newPassword);
    if (result) {
      setSuccess('Password changed successfully.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Old Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={6}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm New Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={6}
          />
        </div>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword; 