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

const categoryPercentages =
  Object.entries(categoryTotals).map(
    ([category, value]) => ({
      category,
      percentage:
        (value / total) * 100,
    })
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

          <div className="mt-8 bg-zinc-900 p-8 rounded-3xl">
  <p className="text-zinc-400 mb-2">
    Progresso da Meta
  </p>

  <h2 className="text-3xl font-bold mb-6">
    {progress.toFixed(2)}%
  </h2>

  <div className="w-full bg-zinc-800 rounded-full h-4">
    <div
      className="bg-green-500 h-4 rounded-full"
      style={{
        width: `${Math.min(progress, 100)}%`,
      }}
    />
  </div>
</div>

<div className="mt-8 bg-zinc-900 p-8 rounded-3xl">
  <h2 className="text-3xl font-bold mb-6">
    Diversificação
  </h2>

  <div className="space-y-4">
    {categoryPercentages.map((item) => (
      <div key={item.category}>
        <div className="flex justify-between mb-2">
          <span>{item.category}</span>

          <span>
            {item.percentage.toFixed(1)}%
          </span>
        </div>

        <div className="w-full bg-zinc-800 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full"
            style={{
              width: `${item.percentage}%`,
            }}
          />
        </div>
      </div>
    ))}
  </div>
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