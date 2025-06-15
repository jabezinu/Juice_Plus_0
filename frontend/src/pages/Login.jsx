import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Login failed');
      }
      const data = await res.json();
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      // Optionally store user info
      localStorage.setItem('user', JSON.stringify({ _id: data._id, name: data.name, phone: data.phone }));
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" type="tel" className="p-2 border rounded" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="p-2 border rounded" required />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Login</button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
