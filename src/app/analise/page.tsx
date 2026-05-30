"use client";

import { usePortfolioStore } from "@/store/portfolioStore";

export default function AnalisePage() {
  const { assets } = usePortfolioStore();

  const total = assets.reduce(
    (acc, asset) => acc + asset.value,
    0
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <p className="text-zinc-400">
            Inteligência Patrimonial
          </p>

          <h1 className="text-5xl font-bold">
            Análise da Carteira
          </h1>
        </div>

        <div className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
          mb-6
        ">
          <p className="text-zinc-400 mb-2">
            Patrimônio Analisado
          </p>

          <h2 className="text-5xl font-bold">
            R$ {total.toLocaleString("pt-BR")}
          </h2>
        </div>

        <div className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
        ">
          <h2 className="text-2xl font-bold mb-6">
            Diagnóstico Inicial
          </h2>

          <div className="space-y-4">

            <div className="bg-zinc-800 p-4 rounded-2xl">
              ✓ Carteira carregada com sucesso
            </div>

            <div className="bg-zinc-800 p-4 rounded-2xl">
              ✓ Dados prontos para análise
            </div>

            <div className="bg-zinc-800 p-4 rounded-2xl">
              ✓ Sistema de diagnóstico ativo
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}