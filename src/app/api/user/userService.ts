// app/user/userService.ts

import { User } from '../../types/user';

type Role = 'user' | 'admin' | 'moderator';
type AuthProvider = 'credentials' | 'google' | 'github';

// Serviço mock para registrar um novo usuário
export const registerUserService = async (userData: {
  name: string;
  email: string;
  password: string;
  role?: Role;
  avatarUrl?: string;
  phoneNumber?: string;
  authProvider?: AuthProvider;
}): Promise<User> => {
  const newUser: User = {
    id: crypto.randomUUID(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role || 'user',
    createdAt: new Date().toISOString(),
    isActive: true,
    emailVerified: false,
    authProvider: userData.authProvider || 'credentials',
    avatarUrl: userData.avatarUrl || '',
    phoneNumber: userData.phoneNumber || '',
  };
  return newUser;
};

// Serviço mock para atualizar um usuário
export const updateUserService = async ( id: string, userData: Partial<User> ): Promise<User> => {
  const updatedUser: User = {
    id,
    name: userData.name ?? '',
    email: userData.email ?? '',
    password: userData.password ?? '',
    role: userData.role ?? 'user',
    avatarUrl: userData.avatarUrl ?? '',
    phoneNumber: userData.phoneNumber ?? '',
    authProvider: userData.authProvider ?? 'credentials',
    createdAt: userData.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: userData.lastLogin,
    isActive: userData.isActive ?? true,
    emailVerified: userData.emailVerified ?? false,
  };
  return updatedUser;
};

// Registra um novo usuário via API
export const registerUser = async (userData: User): Promise<User> => {
  const response = await fetch('/api/registerUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error('Error registering user');
  return response.json();
};

// Faz login via API
export const loginUser = async (credentials: { email: string; password: string; }): Promise<User> => {
  const response = await fetch('/api/loginUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error('Error logging in');
  const user = await response.json();

  user.lastLogin = new Date().toISOString();
  return user;
};

// Busca os dados de um usuário via API
export const getUser = async (userId: string): Promise<User> => {
  const response = await fetch(`/api/user/${userId}`);
  if (!response.ok) throw new Error('Error fetching user data');
  return response.json();
};

// Atualiza os dados do usuário via API
export const updateUser = async ( userId: string, userData: Partial<User> ): Promise<User> => {
  const response = await fetch(`/api/updateUser/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error('Error updating user');
  return response.json();
};

// Exclui um usuário via API
export const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`/api/deleteUser/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Error deleting user');
};
