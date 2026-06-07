"use client";

import { useState } from "react";

import { usePortfolioStore } from "@/store/portfolioStore";

import {
  PieChart,
  Pie,
 Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CarteiraPage() {
  const {
    assets,
    addAsset,
    removeAsset,
    goal,
    setGoal,
    history,
    updateHistory,
  } = usePortfolioStore();

const [showModal, setShowModal] = useState(false);

const [name, setName] = useState("");

const [category, setCategory] = useState("Renda Fixa");

const [value, setValue] = useState("");

const handleAddAsset = () => {
  if (!name || !value) return;

  addAsset({
    id: Date.now(),
    name,
    category,
    value: Number(value),
  });

  const newTotal =
  total + Number(value);

updateHistory(newTotal);

  setName("");
  setCategory("Renda Fixa");
  setValue("");

  setShowModal(false);
};

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

  const categoryPercentages =
  Object.entries(categoryTotals).map(
    ([category, value]) => ({
      category,
      percentage:
        (value / total) * 100,
    })
  );

  const score =
  50 +
  (categoryPercentages.length * 10);

const finalScore =
  Math.min(score, 100);

  const COLORS = [
    "#ffffff",
    "#a1a1aa",
    "#71717a",
    "#52525b",
    "#3f3f46",
  ];

  const recommendations: string[] = [];

const progress =
  (total / goal) * 100;

  const evolutionData = history.map(
    (item) => ({
      month: item.date,
      value: item.total,
    })
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
  categoryTotals["Renda Fixa"] >
  total * 0.7
) {
  recommendations.push(
    "Reduzir concentração em renda fixa"
  );
}

if (
  categoryPercentages.length >= 4
) {
  recommendations.push(
    "Excelente diversificação"
  );
}

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-zinc-400">
              Gestão Patrimonial
            </p>

            <h1 className="text-5xl font-bold">
              Minha Carteira
            </h1>
          </div>

          <button
  onClick={() => setShowModal(true)}
  className="
    bg-white
    text-black
    px-6
    py-3
    rounded-2xl
    font-semibold
  "
>
  + Adicionar Ativo
</button>
        </div>

        <div className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
          mb-8
        ">
          <p className="text-zinc-400 mb-2">
            Patrimônio Investido
          </p>

          <h2 className="text-5xl font-bold">
            R$ {total.toLocaleString("pt-BR")}
          </h2>
        </div>

<div
  className="
    bg-zinc-900
    border
    border-zinc-800
    rounded-3xl
    p-8
    mb-8
  "
>
  <p className="text-zinc-400 mb-2">
    Meta Patrimonial
  </p>
 
  <h2 className="text-3xl font-bold mb-2">
    R$ {goal.toLocaleString("pt-BR")}
  </h2>

  <input
  type="number"
  value={goal}
  onChange={(e) =>
    setGoal(Number(e.target.value))
  }
  className="
    w-full
    p-3
    rounded-xl
    bg-zinc-800
    mb-6
    mt-4
  "
/>

  <p className="text-zinc-400 mb-6">
    Atual: R$ {total.toLocaleString("pt-BR")}
  </p>

  <div className="w-full bg-zinc-800 rounded-full h-4">
    <div
      className="bg-green-500 h-4 rounded-full"
      style={{
        width: `${Math.min(progress, 100)}%`,
      }}
    />
  </div>

  <p className="mt-4 text-green-400">
    {progress.toFixed(2)}% da meta alcançada
  </p>
</div>

<div
  className="
    bg-zinc-900
    border
    border-zinc-800
    rounded-3xl
    p-8
    mb-8
  "
>
  <p className="text-zinc-400 mb-2">
    Evolução Patrimonial
  </p>

  <h2 className="text-3xl font-bold mb-8">
    Crescimento da Carteira
  </h2>

  <div className="flex justify-center">
    <LineChart
      width={700}
      height={300}
      data={evolutionData}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="#3f3f46"
      />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="value"
        stroke="#22c55e"
        strokeWidth={4}
      />
    </LineChart>
  </div>
</div>

<div className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          overflow-hidden
        ">
          <table className="w-full">
          <thead>
  <tr className="border-b border-zinc-800">
    <th className="text-left p-5">
      Ativo
    </th>

    <th className="text-left p-5">
      Categoria
    </th>

    <th className="text-right p-5">
      Valor
    </th>

    <th className="text-center p-5">
      Ações
    </th>
  </tr>
</thead>

            <tbody>
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="
                    border-b
                    border-zinc-800
                  "
                >
                  <td className="p-5">
                    {asset.name}
                  </td>

                  <td className="p-5 text-zinc-400">
                    {asset.category}
                  </td>

                  <td className="p-5 text-right">
  R$ {asset.value.toLocaleString("pt-BR")}
</td>

<td className="p-5 text-center">
  <button
    onClick={() => removeAsset(asset.id)}
    className="
      text-red-400
      hover:text-red-300
      transition
    "
  >
    Excluir
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
  <p className="text-zinc-400 mb-2">
    Análise da Carteira
  </p>

  <h2 className="text-5xl font-bold mb-2">
  {finalScore}/100
</h2>

<p className="text-green-400 mb-8">
  Score da Carteira
</p>

<h2 className="text-3xl font-bold mb-6">
  Diversificação
</h2>

<div className="flex justify-center mb-10">
  <PieChart
    width={400}
    height={300}
  >
    <Pie
      data={categoryPercentages}
      dataKey="percentage"
      nameKey="category"
      cx="50%"
      cy="50%"
      innerRadius={70}
      outerRadius={110}
    >
      {categoryPercentages.map(
        (_, index) => (
          <Cell
            key={index}
            fill={
              COLORS[
                index %
                COLORS.length
              ]
            }
          />
        )
      )}
    </Pie>
  </PieChart>
</div>

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

        <div className="mt-8">
  <h3 className="text-xl font-semibold mb-4">
    Recomendações
  </h3>

  <div className="space-y-3">
    {recommendations.map((item, index) => (
      <div
        key={index}
        className="
          bg-zinc-800
          rounded-xl
          p-4
        "
      >
        {item}
      </div>
    ))}
  </div>
  </div>

</div>

</div>

{showModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
    <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md">

      <h2 className="text-2xl font-bold mb-6">
        Novo Ativo
      </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do ativo"
        className="w-full p-3 rounded-xl bg-zinc-800 mb-4"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 rounded-xl bg-zinc-800 mb-4"
      >
        <option>Renda Fixa</option>
        <option>FII</option>
        <option>Ações</option>
        <option>ETF</option>
        <option>Internacional</option>
      </select>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Valor investido"
        className="w-full p-3 rounded-xl bg-zinc-800 mb-6"
      />

      <div className="flex gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="flex-1 bg-zinc-700 py-3 rounded-xl"
        >
          Cancelar
        </button>

        <button
          onClick={handleAddAsset}
          className="flex-1 bg-white text-black py-3 rounded-xl font-semibold"
        >
          Salvar
        </button>
      </div>

    </div>
  </div>
)}

</main>
);
}