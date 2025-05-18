// app/lib/auth.ts

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
}

export const loginUser = async (email: string, password: string) => {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao fazer login.");
  }

  return res.json(); // Retorna os dados do usuário logado
};

export const registerUser = async (name: string, email: string, password: string) => {
  const res = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao cadastrar usuário.");
  }

  return res.json(); // Retorna os dados do usuário criado
};
