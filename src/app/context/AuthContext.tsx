// app/context/AuthContext.tsx

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// 04-Objetos - Interface tipada para usuário
interface User {
  name: string;
  email: string;
  token?: string;
}

// Tipagem do contexto de autenticação
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Criação do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider com ReactNode como children
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // 01-Estruturas e Tratamento - Carregamento inicial do usuário
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 02-Funções e Métodos - Login
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data: { user: User; message: string } = await res.json();
      if (!res.ok) throw new Error(data.message || 'Falha no login.');

      const user: User = data.user;
      setUser(user);
      localStorage.setItem('authUser', JSON.stringify(user));
      router.push('/dashboard'); // Redireciona após login
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // 02-Funções e Métodos - Registro
  const register = async (name: string, email: string, password: string) => {
    try {
      if (password.length < 6) {
        alert('A senha precisa ter pelo menos 6 caracteres!');
        return;
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data: { user: User; message: string } = await res.json();
      if (!res.ok) throw new Error(data.message || 'Falha no registro.');

      const user: User = data.user;
      setUser(user);
      localStorage.setItem('authUser', JSON.stringify(user));
      router.push('/login'); // Redireciona após registro
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // 02-Funções e Métodos - Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    router.push('/login'); // Redireciona após logout
  };

  // Provider com todos os valores
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado com verificação de uso correto
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// 01-Estruturas e Tratamento -
// 02-Funções e Métodos -
// 03-Arrays -
// 04-Objetos -
// 06-Hooks -
// 07-Props e Router -
// 08-Api -
