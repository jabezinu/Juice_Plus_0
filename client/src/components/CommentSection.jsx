import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', comment: '', anonymous: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hasCommentedToday, setHasCommentedToday] = useState(false);

  useEffect(() => {
    const lastCommentDate = localStorage.getItem('lastCommentDate');
    const today = new Date().toISOString().slice(0, 10);
    if (lastCommentDate === today) {
      setHasCommentedToday(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:5001/api/comments', form);
      setSuccess('Comment submitted!');
      setForm({ name: '', phone: '', comment: '', anonymous: false });
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem('lastCommentDate', today);
      setHasCommentedToday(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Leave a Comment</h2>
      {hasCommentedToday ? (
        <div className="text-yellow-600 font-semibold bg-yellow-100 p-4 rounded shadow">
          You have already submitted a comment today. Please try again tomorrow.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded shadow">
          <div className="flex items-center space-x-2">
            <input type="checkbox" name="anonymous" checked={form.anonymous} onChange={handleChange} />
            <label>Submit as anonymous</label>
          </div>
          {!form.anonymous && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </>
          )}
          <textarea
            name="comment"
            placeholder="Your Comment"
            value={form.comment}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
        </form>
      )}
    </div>
  );
};

export default CommentSection;
