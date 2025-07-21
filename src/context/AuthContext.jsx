import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuthState, saveAuthState, clearAuthState } from '../utils/indexedDB';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAuthState() {
      try {
        const authData = await getAuthState();
        if (authData && authData.email) {
          setUser({ email: authData.email, name: authData.name });
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAuthState();
  }, []);

  const login = async (email, password) => {
    // Simple mock authentication - in real app, you'd validate against a backend
    const userData = { email, name: email.split('@')[0] };
    setUser(userData);
    try {
      await saveAuthState(userData);
      return { success: true };
    } catch (error) {
      console.error('Error saving auth state:', error);
      return { success: false, error: 'Failed to save login state' };
    }
  };

  const signup = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }
    // Simple mock signup
    const userData = { email, name: email.split('@')[0] };
    setUser(userData);
    try {
      await saveAuthState(userData);
      return { success: true };
    } catch (error) {
      console.error('Error saving auth state:', error);
      return { success: false, error: 'Failed to create account' };
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await clearAuthState();
    } catch (error) {
      console.error('Error clearing auth state:', error);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}