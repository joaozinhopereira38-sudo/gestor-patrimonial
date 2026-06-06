"use client";

import { usePortfolioStore } from "@/store/portfolioStore";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function RelatorioPage() {
  const { assets, goals } =
    usePortfolioStore();

  const {
    riskProfile,
  } = useOnboardingStore();

  const patrimonio =
    assets.reduce(
      (acc, asset) =>
        acc + asset.value,
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
            Relatório Patrimonial
          </h1>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Resumo
          </h2>

          <p>
            Patrimônio:
            R$ {patrimonio.toLocaleString("pt-BR")}
          </p>

          <p>
            Ativos:
            {assets.length}
          </p>

          <p>
            Perfil:
            {riskProfile || "Não definido"}
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4">
            Metas
          </h2>

          {goals.map((goal) => (
            <div
              key={goal.id}
              className="mb-4"
            >
              <p className="font-bold">
                {goal.title}
              </p>

              <p>
                Meta:
                R$ {goal.target.toLocaleString("pt-BR")}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}