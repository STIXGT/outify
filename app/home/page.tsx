// app/page.js
"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-black via-[#1e1e2f] to-[#6c47ff] text-white">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-[#6c47ff] bg-clip-text text-transparent">
          Bienvenido a Outify
        </h1>
        <p className="text-gray-300 max-w-xl mb-8">
          Descubre una experiencia moderna, rápida y segura. Inicia sesión o
          crea tu cuenta para comenzar.
        </p>
        <div className="flex gap-4">
          <SignInButton mode="modal">
            <button className="bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-gray-200 transition cursor-pointer">
              Iniciar Sesión
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-[#6c47ff] hover:bg-[#5a3dd4] text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition cursor-pointer">
              Registrarse
            </button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} Outify. Todos los derechos reservados.
      </footer>
    </main>
  );
}
