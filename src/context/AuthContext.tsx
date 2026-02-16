import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthContextType, User } from '@/types';
import { authService } from '@/services/auth.service';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const existingToken = authService.getToken();
    const existingUser = authService.getUser();

    if (existingToken && existingUser) {
      setToken(existingToken);
      setUser(existingUser);
    }
  }, []);

  const login = (email: string, password: string) => {
    const newToken = authService.login(email, password);
    const newUser = authService.getUser();

    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
