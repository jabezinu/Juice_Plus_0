import { create } from 'zustand';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getInitialToken = () => localStorage.getItem('token') || '';
const getInitialUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const useAuthStore = create((set) => ({
  token: getInitialToken(),
  user: getInitialUser(),
  loading: false,
  error: '',

  login: async (phone, password) => {
    set({ loading: true, error: '' });
    try {
      const res = await axios.post(`${BACKEND_URL}/users/login`, { phone, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, user, loading: false, error: '' });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Login failed', loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: '', user: null });
  },
}));

export default useAuthStore; 