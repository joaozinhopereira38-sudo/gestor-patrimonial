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

    const categories =
  [...new Set(
    assets.map(
      (asset) =>
        asset.category
    )
  )];

let score = 50;

/* Diversificação */

if (categories.length >= 4) {
  score += 20;
}
else if (
  categories.length >= 3
) {
  score += 10;
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
}

/* Patrimônio */

if (patrimonio >= 100000) {
  score += 10;
}
else if (
  patrimonio >= 50000
) {
  score += 5;
}

score =
  Math.min(score, 100);

  const diagnostics: string[] = [];

if (categories.length >= 3) {
  diagnostics.push(
    "✓ Boa diversificação"
  );
} else {
  diagnostics.push(
    "⚠ Carteira pouco diversificada"
  );
}

if (
  assets.some(
    (asset) =>
      asset.category ===
      "Internacional"
  )
) {
  diagnostics.push(
    "✓ Possui exposição internacional"
  );
} else {
  diagnostics.push(
    "⚠ Ausência de ativos internacionais"
  );
}

if (patrimonio >= 50000) {
  diagnostics.push(
    "✓ Patrimônio em crescimento"
  );
} else {
  diagnostics.push(
    "⚠ Patrimônio ainda em fase de acumulação"
  );
}

const actionPlan: string[] = [];

if (
  !assets.some(
    (asset) =>
      asset.category ===
      "Internacional"
  )
) {
  actionPlan.push(
    "Adicionar exposição internacional de 5% a 10%"
  );
}

if (categories.length < 4) {
  actionPlan.push(
    "Aumentar a diversificação da carteira"
  );
}

if (patrimonio < 50000) {
  actionPlan.push(
    "Priorizar crescimento patrimonial através de aportes"
  );
}

if (goals.length > 0) {
  actionPlan.push(
    `Focar na meta: ${goals[0].title}`
  );
}

const monthlyIncomeMap = {
  ate_3k: 3000,
  "3k_10k": 10000,
  "10k_30k": 30000,
  "30k_plus": 50000,
};

const monthlyIncome =
  monthlyIncomeMap[
    riskProfile as keyof typeof monthlyIncomeMap
  ] || 5000;

const goalAnalysis =
  goals.map((goal) => {
    const remaining =
      goal.target - patrimonio;

    const monthlyCapacity =
      monthlyIncome * 0.2;

    const estimatedMonths =
      remaining > 0
        ? remaining /
          monthlyCapacity
        : 0;

    let probability = 95;

    if (estimatedMonths > 240) {
      probability = 20;
    } else if (
      estimatedMonths > 120
    ) {
      probability = 40;
    } else if (
      estimatedMonths > 60
    ) {
      probability = 60;
    } else if (
      estimatedMonths > 24
    ) {
      probability = 80;
    }

    return {
      title: goal.title,
      probability,
      estimatedMonths,
    };
  });

  const categoryTotals =
  assets.reduce(
    (acc, asset) => {
      acc[asset.category] =
        (acc[asset.category] || 0) +
        asset.value;

      return acc;
    },
    {} as Record<string, number>
  );

const categoryPercentages =
  Object.entries(categoryTotals).map(
    ([category, value]) => ({
      category,
      percentage:
        patrimonio > 0
          ? (value / patrimonio) * 100
          : 0,
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

  const alerts: string[] = [];

if (
  !assets.some(
    (asset) =>
      asset.category ===
      "Internacional"
  )
) {
  alerts.push(
    "Risco de concentração no Brasil"
  );
}

const rendaFixaPercentage =
  categoryPercentages.find(
    (item) =>
      item.category ===
      "Renda Fixa"
  )?.percentage || 0;

if (rendaFixaPercentage > 70) {
  alerts.push(
    "Excesso de concentração em renda fixa"
  );
}

if (patrimonio < 50000) {
  alerts.push(
    "Patrimônio ainda em fase inicial de acumulação"
  );
}

if (goals.length === 0) {
  alerts.push(
    "Nenhuma meta financeira cadastrada"
  );
}
const opportunities: string[] = [];

if (
  !assets.some(
    (asset) =>
      asset.category ===
      "Internacional"
  )
) {
  opportunities.push(
    "Considere incluir ETFs globais para diversificação internacional."
  );
}

if (
  !assets.some(
    (asset) =>
      asset.category ===
      "FII"
  )
) {
  opportunities.push(
    "Adicionar FIIs pode aumentar a geração de renda passiva."
  );
}

if (
  patrimonio < 100000
) {
  opportunities.push(
    "Aumentar aportes mensais pode acelerar significativamente o crescimento patrimonial."
  );
}

if (
  riskProfile ===
  "conservador"
) {
  opportunities.push(
    "Títulos públicos indexados à inflação podem fortalecer a proteção da carteira."
  );
}

if (
  riskProfile ===
  "arrojado"
) {
  opportunities.push(
    "Maior exposição internacional pode melhorar a relação risco-retorno."
  );
}

let executiveSummary = "";

if (score >= 80) {
  executiveSummary =
    "Sua carteira apresenta excelente qualidade de diversificação e aderência ao perfil de risco.";
}
else if (score >= 60) {
  executiveSummary =
    "Sua carteira está bem estruturada, mas ainda existem oportunidades de melhoria para aumentar a eficiência patrimonial.";
}
else {
  executiveSummary =
    "Sua carteira ainda apresenta fragilidades importantes e requer ajustes de diversificação.";
}

if (
  !assets.some(
    (asset) =>
      asset.category ===
      "Internacional"
  )
) {
  executiveSummary +=
    " O principal ponto de atenção é a ausência de exposição internacional.";
}

if (goals.length > 0) {
  executiveSummary +=
    ` Atualmente você possui ${goals.length} meta(s) financeira(s) cadastrada(s).`;
}

if (patrimonio < 100000) {
  executiveSummary +=
    " O foco atual deve ser acelerar a fase de acumulação de patrimônio.";
}

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

          <div
  className="
    mt-8
    bg-gradient-to-r
    from-zinc-900
    to-zinc-800
    border
    border-zinc-700
    rounded-3xl
    p-8
  "
>
  <p className="text-zinc-400 mb-3">
    Resumo Executivo
  </p>

  <p className="text-lg leading-relaxed">
    {executiveSummary}
  </p>
</div>
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

          <div className="mt-8 pt-8 border-t border-zinc-800">

  <p className="text-zinc-400 mb-2">
    Score IA
  </p>

  <h2 className="text-5xl font-bold text-green-400">
    {score}/100
  </h2>

  <div className="mt-8">

  <h3 className="text-2xl font-bold mb-4">
    Diagnóstico
  </h3>

 </div>

  <div className="space-y-3">
    {diagnostics.map(
      (item, index) => (
        <div
          key={index}
          className="
            bg-zinc-800
            p-4
            rounded-xl
          "
        >
          {item}
        </div>
      )
    )}
  </div>

  <div className="mt-8">

  <h3 className="text-2xl font-bold mb-4">
    Plano de Ação
  </h3>

  <div className="space-y-3">
    {actionPlan.map(
      (item, index) => (
        <div
          key={index}
          className="
            bg-zinc-800
            p-4
            rounded-xl
          "
        >
          {index + 1}. {item}
        </div>
      )
    )}
  </div>

  <div className="mt-8">

  <h3 className="text-2xl font-bold mb-4">
    Probabilidade de Sucesso
  </h3>

  <div className="space-y-4">
    {goalAnalysis.map((goal) => (
      <div
        key={goal.title}
        className="
          bg-zinc-800
          p-4
          rounded-xl
        "
      >
        <p className="font-bold">
          {goal.title}
        </p>

        <p className="text-green-400">
          Chance de sucesso:
          {" "}
          {goal.probability}%
        </p>

        <p className="text-zinc-400">
          Tempo estimado:
          {" "}
          {Math.ceil(
            goal.estimatedMonths / 12
          )}
          {" "}
          anos
        </p>
      </div>
    ))}
  </div>

  <div className="mt-8">

  <h3 className="text-2xl font-bold mb-4">
    Rebalanceamento Inteligente
  </h3>

  <div className="space-y-3">
    {rebalanceSuggestions.map(
      (item) => (
        <div
          key={item.category}
          className="
            bg-zinc-800
            p-4
            rounded-xl
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

  <div className="mt-8">

  <h3 className="text-2xl font-bold mb-4">
    Alertas Automáticos
  </h3>

  <div className="space-y-3">
    {alerts.length === 0 ? (
      <div
        className="
          bg-green-900
          p-4
          rounded-xl
        "
      >
        Nenhum alerta encontrado.
      </div>
    ) : (
      alerts.map(
        (alert, index) => (
          <div
            key={index}
            className="
              bg-yellow-900
              p-4
              rounded-xl
            "
          >
            ⚠ {alert}
          </div>
        )
      )
    )}
  </div>

  <div className="mt-8">

  <h3 className="text-2xl font-bold mb-4">
    Radar de Oportunidades
  </h3>

  <div className="space-y-3">
    {opportunities.map(
      (item, index) => (
        <div
          key={index}
          className="
            bg-green-900
            p-4
            rounded-xl
          "
        >
          💡 {item}
        </div>
      )
    )}
  </div>

</div>

</div>

</div>

</div>

</div>

</div>

        </div>

      </div>
    </main>
  );
}