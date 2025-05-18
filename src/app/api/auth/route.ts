// app/api/auth/route.ts

import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "../../lib/api/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = await loginUser(email, password);

    return NextResponse.json(
      { user, message: "Login realizado com sucesso!" },
      { status: 200 }
    );
  } catch (err: unknown) {
    // Tratamento seguro do erro
    if (err instanceof Error) {
      console.error("Erro ao fazer login:", err.message);
      return NextResponse.json(
        { message: err.message },
        { status: 400 }
      );
    }

    console.error("Erro desconhecido ao fazer login:", err);
    return NextResponse.json(
      { message: "Erro ao fazer login. Verifique suas credenciais." },
      { status: 400 }
    );
  }
}
