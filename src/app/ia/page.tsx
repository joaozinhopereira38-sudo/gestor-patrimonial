"use client";

import { usePortfolioStore } from "@/store/portfolioStore";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function IAPage() {
  const { assets, goals } =
    usePortfolioStore();

  const { riskProfile } =
    useOnboardingStore();

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
            Inteligência Artificial
          </p>

          <h1 className="text-5xl font-bold">
            IA Patrimonial
          </h1>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">

          <p className="mb-4">
            Patrimônio:
            {" "}
            R$ {patrimonio.toLocaleString("pt-BR")}
          </p>

          <p className="mb-4">
            Perfil:
            {" "}
            {riskProfile}
          </p>

          <p>
            Metas cadastradas:
            {" "}
            {goals.length}
          </p>

        </div>

      </div>
    </main>
  );
}