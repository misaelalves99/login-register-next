// app/api/user/route.ts

import { NextResponse } from "next/server";
import { registerUserService, updateUserService, getUser, deleteUser } from "./userService";

type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin' | 'moderator';
  avatarUrl?: string;
  phoneNumber?: string;
  authProvider?: 'credentials' | 'google' | 'github';
};

// POST: Registra um novo usuário
export async function POST(req: Request) {
  try {
    const userData: RegisterUserInput = await req.json();
    const newUser = await registerUserService(userData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao registrar usuário:", error);
      return NextResponse.json(
        { message: "Erro ao registrar usuário", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Erro desconhecido ao registrar usuário:", error);
      return NextResponse.json(
        { message: "Erro desconhecido ao registrar usuário" },
        { status: 500 }
      );
    }
  }
}

// GET: Retorna os dados de um usuário específico via query param ?id=
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) throw new Error("ID do usuário não fornecido");

    const user = await getUser(userId);
    return NextResponse.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar dados do usuário:", error);
      return NextResponse.json(
        { message: "Erro ao buscar dados do usuário", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Erro desconhecido ao buscar usuário:", error);
      return NextResponse.json(
        { message: "Erro desconhecido ao buscar usuário" },
        { status: 500 }
      );
    }
  }
}

// PUT: Atualiza os dados de um usuário
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...userData } = body;

    if (!id) throw new Error("ID do usuário não fornecido");

    const updatedUser = await updateUserService(id, userData);
    return NextResponse.json(updatedUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao atualizar usuário:", error);
      return NextResponse.json(
        { message: "Erro ao atualizar usuário", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Erro desconhecido ao atualizar usuário:", error);
      return NextResponse.json(
        { message: "Erro desconhecido ao atualizar usuário" },
        { status: 500 }
      );
    }
  }
}

// DELETE: Exclui um usuário pelo ID via query param ?id=
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) throw new Error("ID do usuário não fornecido");

    await deleteUser(userId);
    return NextResponse.json({ message: "Usuário excluído com sucesso" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao excluir usuário:", error);
      return NextResponse.json(
        { message: "Erro ao excluir usuário", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Erro desconhecido ao excluir usuário:", error);
      return NextResponse.json(
        { message: "Erro desconhecido ao excluir usuário" },
        { status: 500 }
      );
    }
  }
}
