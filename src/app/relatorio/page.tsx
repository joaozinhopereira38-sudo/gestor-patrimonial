"use client";

import { usePortfolioStore } from "@/store/portfolioStore";
import { useOnboardingStore } from "@/store/onboardingStore";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
  } from "recharts";
import jsPDF from "jspdf";

export default function RelatorioPage() {
    const {
        assets,
        goals,
        history,
      } = usePortfolioStore();

  const {
    riskProfile,
  } = useOnboardingStore();

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

const score =
  Math.min(
    40 +
      categories.length * 10,
    100
  );

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

  const idealPortfolio =
  riskProfile === "conservador"
    ? [
        { category: "Renda Fixa", ideal: 70 },
        { category: "FII", ideal: 15 },
        { category: "ETF", ideal: 10 },
        { category: "Internacional", ideal: 5 },
      ]
    : riskProfile === "arrojado"
    ? [
        { category: "Renda Fixa", ideal: 20 },
        { category: "FII", ideal: 20 },
        { category: "ETF", ideal: 40 },
        { category: "Internacional", ideal: 20 },
      ]
    : [
        { category: "Renda Fixa", ideal: 40 },
        { category: "FII", ideal: 20 },
        { category: "ETF", ideal: 30 },
        { category: "Internacional", ideal: 10 },
      ];

const categoryPercentages =
  Object.entries(categoryTotals).map(
    ([category, value]) => ({
      category,
      percentage:
        (value / patrimonio) * 100,
    })
  );

const adherence =
  idealPortfolio.reduce(
    (acc, item) => {
      const current =
        categoryPercentages.find(
          (c) =>
            c.category === item.category
        )?.percentage || 0;

      return (
        acc +
        Math.abs(
          item.ideal - current
        )
      );
    },
    0
  );

const profileCompatibility =
  Math.max(
    0,
    100 - adherence
  );

  const generatePDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text(
    "Relatório Patrimonial",
    20,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Patrimônio: R$ ${patrimonio.toLocaleString("pt-BR")}`,
    20,
    40
  );

  doc.text(
    `Perfil: ${riskProfile}`,
    20,
    50
  );

  doc.text(
    `Score: ${score}/100`,
    20,
    60
  );

 doc.text(
  `Compatibilidade: ${profileCompatibility.toFixed(
    0
  )}%`,
  20,
  70
);

doc.text(
  "Distribuição da Carteira",
  20,
  90
);

let yPosition = 100;

Object.entries(
  categoryTotals
).forEach(
  ([category, value]) => {
    doc.text(
      `${category}: ${(
        (value /
          patrimonio) *
        100
      ).toFixed(1)}%`,
      20,
      yPosition
    );

    yPosition += 10;
  }
);

doc.text(
  "Recomendações",
  20,
  yPosition + 10
);

doc.text(
  "- Adicionar ativos internacionais",
  20,
  yPosition + 20
);

let goalY =
  yPosition + 40;

doc.text(
  "Metas",
  20,
  goalY
);

goalY += 10;

goals.forEach(
  (goal) => {
    const progress =
      (
        (patrimonio /
          goal.target) *
        100
      ).toFixed(1);

    doc.text(
      `${goal.title} - ${progress}%`,
      20,
      goalY
    );

    goalY += 10;
  }
);

  doc.save(
    "relatorio-patrimonial.pdf"
  );
};

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

          <div className="mt-6">
  <button
  onClick={generatePDF}
  className="
    bg-white
    text-black
    px-6
    py-3
    rounded-xl
    font-semibold
  "
>
  Gerar Relatório PDF
</button>
</div>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Resumo
          </h2>
       
          <div className="space-y-3">
  <p>
    <span className="text-zinc-400">
      Patrimônio:
    </span>{" "}
    R$ {patrimonio.toLocaleString("pt-BR")}
  </p>

  <p>
    <span className="text-zinc-400">
      Ativos:
    </span>{" "}
    {assets.length}
  </p>

  <p>
    <span className="text-zinc-400">
      Perfil:
    </span>{" "}
    {riskProfile}
  </p>

  <p>
    <span className="text-zinc-400">
      Score:
    </span>{" "}
    {score}/100
  </p>

  <p>
  Compatibilidade:
  {" "}
  {profileCompatibility.toFixed(0)}%
</p>

</div>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl mb-6">
  <h2 className="text-2xl font-bold mb-4">
    Distribuição da Carteira
  </h2>

  {Object.entries(
    categoryTotals
  ).map(
    ([category, value]) => (
      <p key={category}>
        {category}:{" "}
        {(
          (value /
            patrimonio) *
          100
        ).toFixed(1)}
        %
      </p>
    )
  )}
</div>

        <div className="bg-zinc-900 p-8 rounded-3xl mb-6">
  <h2 className="text-2xl font-bold mb-4">
    Recomendações
  </h2>

  {!assets.some(
    (asset) =>
      asset.category ===
      "Internacional"
  ) && (
    <p className="text-yellow-400">
      ⚠ Considere adicionar
      ativos internacionais.
    </p>
  )}

  {categories.length >= 4 && (
    <p className="text-green-400">
      ✓ Boa diversificação.
    </p>
  )}
</div>

<div className="bg-zinc-900 p-8 rounded-3xl mb-6">
  <h2 className="text-2xl font-bold mb-4">
    Diagnóstico
  </h2>

  <div className="space-y-3">

    <p>
      Diversificação:
      razoável
    </p>

    <p>
      Exposição internacional:
      insuficiente
    </p>

    <p>
  Compatibilidade com perfil:
  {" "}
  {profileCompatibility.toFixed(0)}%
</p>

  </div>
</div>

<div className="bg-zinc-900 p-8 rounded-3xl mb-6">
  <h2 className="text-2xl font-bold mb-6">
    Evolução Patrimonial
  </h2>

  <div className="flex justify-center">
    <LineChart
      width={700}
      height={300}
      data={history}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="#3f3f46"
      />

      <XAxis dataKey="date" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="total"
        stroke="#22c55e"
        strokeWidth={4}
      />
    </LineChart>
  </div>
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

<p>
  Progresso:{" "}
  {(
    (patrimonio / goal.target) *
    100
  ).toFixed(1)}
  %
</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}