// app/api/auth/register.ts

import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "../../lib/api/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    const user = await registerUser(name, email, password);

    return NextResponse.json(
      { user, message: "Conta criada com sucesso!" },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Erro ao registrar usuário:", err.message);
      return NextResponse.json(
        { message: err.message },
        { status: 400 }
      );
    }

    console.error("Erro desconhecido ao registrar usuário:", err);
    return NextResponse.json(
      { message: "Erro ao criar conta. Tente novamente." },
      { status: 400 }
    );
  }
}
