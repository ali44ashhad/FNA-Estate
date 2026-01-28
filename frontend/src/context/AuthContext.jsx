import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token by getting current user
      authService
        .getCurrentUser()
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    setUser(user);
    return res.data;
  };

  const register = async (data) => {
    const res = await authService.register(data);
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    setUser(user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
