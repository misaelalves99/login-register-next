// app/types/user.ts

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: 'user' | 'admin' | 'moderator'; // Controle de acesso
  createdAt?: string;
  updatedAt?: string;
  avatarUrl?: string;
  phoneNumber?: string;           // Para contato
  isActive?: boolean;            // Controle de conta ativa/inativa
  lastLogin?: string;            // Último login para auditoria
  addressId?: string;            // Ligação com tabela de endereços (relacional)
  authProvider?: 'credentials' | 'google' | 'github'; // Tipo de autenticação
  emailVerified?: boolean;       // Confirmação de e-mail
}
