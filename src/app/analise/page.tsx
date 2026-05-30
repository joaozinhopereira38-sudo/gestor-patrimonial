"use client";

import { usePortfolioStore } from "@/store/portfolioStore";

export default function AnalisePage() {
  const { assets } = usePortfolioStore();

  const total = assets.reduce(
    (acc, asset) => acc + asset.value,
    0
  );

  const categoryTotals = assets.reduce(
  (acc, asset) => {
    acc[asset.category] =
      (acc[asset.category] || 0) +
      asset.value;

    return acc;
  },
  {} as Record<string, number>
);

const categoryCount =
  Object.keys(categoryTotals).length;

const score = Math.min(
  50 + categoryCount * 10,
  100
);

const recommendations: string[] = [];

const diagnostics: string[] = [];

const categoryPercentages =
  Object.entries(categoryTotals).map(
    ([category, value]) => ({
      category,
      percentage:
        (value / total) * 100,
    })
  );

  const idealPortfolio = [
  {
    category: "Renda Fixa",
    ideal: 40,
  },
  {
    category: "FII",
    ideal: 20,
  },
  {
    category: "ETF",
    ideal: 30,
  },
  {
    category: "Internacional",
    ideal: 10,
  },
];

if (
  !assets.some(
    (asset) =>
      asset.category ===
      "Internacional"
  )
) {
  recommendations.push(
    "Adicionar exposição internacional"
  );
}

if (
  !assets.some(
    (asset) =>
      asset.category ===
      "Internacional"
  )
) {
  diagnostics.push(
    "⚠ Ausência de exposição internacional"
  );
}

if (
  categoryTotals["Renda Fixa"] >
  total * 0.7
) {
  recommendations.push(
    "Reduzir concentração em renda fixa"
  );
}

if (
  categoryTotals["Renda Fixa"] >
  total * 0.7
) {
  diagnostics.push(
    "⚠ Concentração elevada em renda fixa"
  );
}

if (categoryCount >= 4) {
  recommendations.push(
    "Excelente diversificação"
  );
}

if (categoryCount >= 4) {
  diagnostics.push(
    "✓ Excelente diversificação"
  );
}

if (
  diagnostics.length === 0
) {
  diagnostics.push(
    "✓ Carteira equilibrada"
  );
}

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
          <div
  className="
    bg-zinc-900
    border
    border-zinc-800
    rounded-3xl
    p-8
  "
>
  <h2 className="text-2xl font-bold mb-6">
    Score da Carteira
  </h2>

  <h3 className="text-5xl font-bold mb-2">
    {score}/100
  </h3>

  <p className="text-green-400 mb-8">
    Qualidade da diversificação
  </p>

<h2 className="text-2xl font-bold mb-6">
  Distribuição da Carteira
</h2>

<div className="space-y-4 mb-10">
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

<h2 className="text-2xl font-bold mb-6">
  Carteira Atual x Ideal
</h2>

<div className="space-y-4 mb-10">
  {idealPortfolio.map((item) => {
    const current =
      categoryPercentages.find(
        (c) =>
          c.category ===
          item.category
      )?.percentage || 0;

    return (
      <div
        key={item.category}
        className="
          bg-zinc-800
          p-4
          rounded-2xl
        "
      >
        <div className="flex justify-between">
          <span>
            {item.category}
          </span>

          <span>
            Atual:
            {" "}
            {current.toFixed(1)}%
            {" | "}
            Ideal:
            {" "}
            {item.ideal}%
          </span>
        </div>
      </div>
    );
  })}
</div>

<h2 className="text-2xl font-bold mb-6">
  Diagnóstico de Risco
</h2>

<div className="space-y-4 mb-10">
  {diagnostics.map(
    (item, index) => (
      <div
        key={index}
        className="
          bg-zinc-800
          p-4
          rounded-2xl
        "
      >
        {item}
      </div>
    )
  )}
</div>

  <h2 className="text-2xl font-bold mb-6">
    Recomendações
  </h2>

  <div className="space-y-4">
    {recommendations.map(
      (item, index) => (
        <div
          key={index}
          className="
            bg-zinc-800
            p-4
            rounded-2xl
          "
        >
          {item}
        </div>
      )
    )}
    </div>
</div>

      </div>
    </div>
    </main>
  );
}