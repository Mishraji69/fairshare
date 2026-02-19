import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => API.post('/auth/login', { email, password }),
  register: (name, email, password) => API.post('/auth/register', { name, email, password })
};

export const groupAPI = {
  getAll: () => API.get('/groups'),
  create: (name) => API.post('/groups', { name }),
  getBalances: (groupId) => API.get(`/groups/${groupId}/balances`),
  getMembers: (groupId) => API.get(`/groups/${groupId}/members`),
  addMember: (groupId, email) => API.post(`/groups/${groupId}/members`, { email })
};

export const expenseAPI = {
  getByGroup: (groupId) => API.get(`/expenses/${groupId}`),
  create: (group_id, amount, description, paid_by) => 
    API.post('/expenses', { group_id, amount, description, paid_by })
};

export const healthAPI = {
  check: () => API.get('/health')
};

export default API;
