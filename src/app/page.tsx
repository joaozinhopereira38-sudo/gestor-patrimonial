"use client";

import { usePortfolioStore } from "@/store/portfolioStore";

export default function HomePage() {
  const {
    assets,
    goal,
  } = usePortfolioStore();

  const total = assets.reduce(
    (acc, asset) =>
      acc + asset.value,
    0
  );

  const progress =
    (total / goal) * 100;

  const categoryTotals = assets.reduce(
    (acc, asset) => {
      acc[asset.category] =
        (acc[asset.category] || 0) +
        asset.value;

      return acc;
    },
    {} as Record<string, number>
  );

  const score =
    Math.min(
      50 +
      Object.keys(
        categoryTotals
      ).length *
      10,
      100
    );

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <p className="text-zinc-400">
            Gestão Patrimonial
          </p>

          <h1 className="text-5xl font-bold">
            Dashboard
          </h1>
        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-zinc-900 p-6 rounded-3xl">
            <p className="text-zinc-400 mb-2">
              Patrimônio
            </p>

            <h2 className="text-3xl font-bold">
              R$ {total.toLocaleString("pt-BR")}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">
            <p className="text-zinc-400 mb-2">
              Meta
            </p>

            <h2 className="text-3xl font-bold">
              R$ {goal.toLocaleString("pt-BR")}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">
            <p className="text-zinc-400 mb-2">
              Score
            </p>

            <h2 className="text-3xl font-bold">
              {score}/100
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">
            <p className="text-zinc-400 mb-2">
              Ativos
            </p>

            <h2 className="text-3xl font-bold">
              {assets.length}
            </h2>
          </div>

        </div>

      </div>
    </main>
  );
}