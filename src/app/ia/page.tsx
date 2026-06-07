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

</div>

</div>

        </div>

      </div>
    </main>
  );
}