// app/types/user.ts

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: 'user' | 'admin' | 'moderator';
  createdAt?: string;
  updatedAt?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  isActive?: boolean;
  lastLogin?: string;
  addressId?: string;
  authProvider?: 'credentials' | 'google' | 'github';
  emailVerified?: boolean;
}
