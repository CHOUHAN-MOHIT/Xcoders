import api from "./apis";

export const login = async (email, password) => {
  try {
    const response = await api.post('/apis/auth/login/', { email, password });
    const { access } = response.data;
    localStorage.setItem('token', access);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async ({ name, email, password }) => {
  const response = await api.post('/apis/auth/register/', { name, email, password });
  return response.data;
};


export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};
