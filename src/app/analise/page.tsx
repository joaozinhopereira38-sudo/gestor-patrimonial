"use client";

import { usePortfolioStore } from "@/store/portfolioStore";

import { useOnboardingStore } from "@/store/onboardingStore";

export default function AnalisePage() {
  const { assets } = usePortfolioStore();

  const { riskProfile } =
  useOnboardingStore();

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

let score = 50;

const scoreReasons: string[] = [];

/* Diversificação */

if (categoryCount >= 4) {
  score += 20;

  scoreReasons.push(
    "Boa diversificação"
  );
} else if (categoryCount >= 3) {
  score += 10;

  scoreReasons.push(
    "Diversificação razoável"
  );
}

/* Internacional */

if (
  assets.some(
    (asset) =>
      asset.category ===
      "Internacional"
  )
) {
  score += 10;

  scoreReasons.push(
    "Possui exposição internacional"
  );
} else {
  scoreReasons.push(
    "Ausência de ativos internacionais"
  );
}

/* Concentração */

const maxCategory =
  Math.max(
    ...Object.values(
      categoryTotals
    )
  );

if (
  maxCategory <
  total * 0.6
) {
  score += 10;

  scoreReasons.push(
    "Boa distribuição patrimonial"
  );
} else {
  scoreReasons.push(
    "Alta concentração em uma categoria"
  );
}

score = Math.min(score, 100);

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

  let idealPortfolio = [
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
  
  if (riskProfile === "conservador") {
    idealPortfolio = [
      {
        category: "Renda Fixa",
        ideal: 70,
      },
      {
        category: "FII",
        ideal: 15,
      },
      {
        category: "ETF",
        ideal: 10,
      },
      {
        category: "Internacional",
        ideal: 5,
      },
    ];
  }
  
  if (riskProfile === "arrojado") {
    idealPortfolio = [
      {
        category: "Renda Fixa",
        ideal: 20,
      },
      {
        category: "FII",
        ideal: 20,
      },
      {
        category: "ETF",
        ideal: 40,
      },
      {
        category: "Internacional",
        ideal: 20,
      },
    ];
  }

const rebalanceSuggestions =
  idealPortfolio.map((item) => {
    const current =
      categoryPercentages.find(
        (c) =>
          c.category ===
          item.category
      )?.percentage || 0;

    return {
      category: item.category,
      difference:
        item.ideal - current,
    };
  });

  const adherence =
  rebalanceSuggestions.reduce(
    (acc, item) =>
      acc + Math.abs(item.difference),
    0
  );

const profileCompatibility =
  Math.max(
    0,
    100 - adherence
  );

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

        <p className="text-green-400 mt-4">
  Perfil identificado:{" "}
  {riskProfile || "Moderado"}
</p>

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

  <div className="mt-6 mb-6">
  <p className="text-zinc-400 mb-2">
    Compatibilidade com Perfil
  </p>

  <h3 className="text-3xl font-bold">
    {profileCompatibility.toFixed(0)}%
  </h3>
</div>

  <p className="text-green-400 mb-8">
    Qualidade da diversificação
  </p>

  <div className="space-y-3 mb-8">
  {scoreReasons.map(
    (reason, index) => (
      <div
        key={index}
        className="
          bg-zinc-800
          p-3
          rounded-xl
        "
      >
        {reason}
      </div>
    )
  )}
</div>

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
  Plano de Rebalanceamento
</h2>

<div className="space-y-4 mb-10">
  {rebalanceSuggestions.map(
    (item) => (
      <div
        key={item.category}
        className="
          bg-zinc-800
          p-4
          rounded-2xl
        "
      >
        {item.difference > 0
          ? `Aumentar ${item.category} em ${item.difference.toFixed(1)}%`
          : item.difference < 0
          ? `Reduzir ${item.category} em ${Math.abs(
              item.difference
            ).toFixed(1)}%`
          : `${item.category} está ideal`}
      </div>
    )
  )}
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