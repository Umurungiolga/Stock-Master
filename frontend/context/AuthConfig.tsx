'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';

// Create axios instance with interceptor
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      // Clear local storage on auth errors
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

interface User {
  user_id: string;
  email: string;
  name?: string;  
  role?: string;  
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // First check if we have a user stored in localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
      
      // Verify with backend
      const response = await axiosInstance.get('/users/me');
      
      // Handle different response formats - adjust as needed based on your API
      const userData = response.data?.data?.data || response.data?.data || response.data;
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Authentication check failed:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
    };
    initAuth();
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/users/login', { email, password });
      
      // Handle different response formats
      const data = response.data?.data?.data || response.data?.data || response.data;
      const { access_token } = data;
      
      localStorage.setItem('access_token', access_token);
      
      // Fetch complete user data after login
      const userResponse = await axiosInstance.get('/users/me');
      const userData = userResponse.data?.data?.data || userResponse.data?.data || userResponse.data;
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store user data for persistence
      localStorage.setItem('user', JSON.stringify(userData));
      
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(
        error.response?.data?.error || 
        error.message || 
        'Login failed'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    setIsLoading(true);
    try {
      await axiosInstance.post('/users/register', { 
        email, 
        password, 
        name 
      });
      router.push('/auth/login');
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new Error(
        error.response?.data?.error || 
        error.message || 
        'Registration failed'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/auth/login');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};