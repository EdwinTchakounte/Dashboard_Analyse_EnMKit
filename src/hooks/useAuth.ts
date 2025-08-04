import { useState, useEffect } from 'react';
import { AuthUser, User } from '../types';
import { users } from '../data/users';

const AUTH_STORAGE_KEY = 'task_tracker_auth';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setUser(authData);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'authentification:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (loginId: string, password: string): boolean => {
    const foundUser = users.find(u => u.login === loginId && u.password === password);
    
    if (foundUser) {
      const authUser: AuthUser = {
        nom: foundUser.nom,
        role: foundUser.role,
        code: foundUser.code
      };
      
      setUser(authUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    isProjectManager: user?.role === 'chef_projet'
  };
};