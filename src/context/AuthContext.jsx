/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile on startup if token exists
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await api.auth.me();
        setUser(data.user);
      } catch (err) {
        console.error('Failed to load user info', err);
        // Clear invalid token
        localStorage.removeItem('token');
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, [token]);

  const login = useCallback(async (loginValue, password) => {
    setIsLoading(true);
    try {
      const data = await api.auth.login({ login: loginValue, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, phone, password) => {
    setIsLoading(true);
    try {
      const data = await api.auth.register({ name, email, phone, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  }), [user, token, isLoading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
