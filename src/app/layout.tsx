// app/layout.tsx

import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

// 07-Metadata
export const metadata: Metadata = {
  title: "Minha Loja",
  description: "Loja online com Next.js, TypeScript e Tailwind CSS",
};

// 07-Props e Router
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow container mx-auto p-6">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
