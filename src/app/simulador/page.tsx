"use client";

import { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SimuladorPage() {
  const [initialValue, setInitialValue] = useState("");
  const [monthlyValue, setMonthlyValue] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("");
  const initial = Number(initialValue);
const monthly = Number(monthlyValue);
const annualRate = Number(rate) / 100;

const months =
  Number(years) * 12;

const monthlyRate =
  annualRate / 12;

let futureValue = initial;

for (
  let i = 0;
  i < months;
  i++
) {
  futureValue =
    futureValue *
      (1 + monthlyRate) +
    monthly;
}

const target = 1000000;

let projectedValue = initial;

let targetMonths = 0;

while (
  projectedValue < target &&
  targetMonths < 1200
) {
  projectedValue =
    projectedValue *
      (1 + monthlyRate) +
    monthly;

  targetMonths++;
}

const targetYears =
  Math.floor(targetMonths / 12);

const remainingMonths =
  targetMonths % 12;

  const chartData = [];

let chartValue = initial;

for (
  let year = 0;
  year <= Number(years);
  year++
) {
  chartData.push({
    year: `Ano ${year}`,
    value: Math.round(chartValue),
  });

  for (
    let month = 0;
    month < 12;
    month++
  ) {
    chartValue =
      chartValue *
        (1 + monthlyRate) +
      monthly;
  }
}

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10">
          <p className="text-zinc-400">
            Planejamento Financeiro
          </p>

          <h1 className="text-5xl font-bold">
            Simulador de Investimentos
          </h1>

          <div className="mt-8 pt-8 border-t border-zinc-800">
  <p className="text-zinc-400 mb-2">
    Patrimônio Projetado
  </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-5">

          <input
            type="number"
            placeholder="Valor Inicial"
            value={initialValue}
            onChange={(e) =>
              setInitialValue(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800"
          />

          <input
            type="number"
            placeholder="Aporte Mensal"
            value={monthlyValue}
            onChange={(e) =>
              setMonthlyValue(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800"
          />

          <input
            type="number"
            placeholder="Prazo (anos)"
            value={years}
            onChange={(e) =>
              setYears(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800"
          />

          <input
            type="number"
            placeholder="Rentabilidade anual (%)"
            value={rate}
            onChange={(e) =>
              setRate(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800"
          />

<input
  type="number"
  placeholder="Rentabilidade anual (%)"
  value={rate}
  onChange={(e) =>
    setRate(e.target.value)
  }
  className="w-full p-4 rounded-xl bg-zinc-800"
/>

<div className="mt-8 pt-8 border-t border-zinc-800">
  <p className="text-zinc-400 mb-2">
    Patrimônio Projetado
  </p>

  <h2 className="text-5xl font-bold text-green-400">
    R$ {futureValue.toLocaleString("pt-BR", {
      maximumFractionDigits: 0,
    })}
  </h2>

  <div className="mt-8 bg-zinc-800 rounded-2xl p-6">
    <p className="text-zinc-400 mb-2">
      Meta de R$ 1.000.000
    </p>

    <h3 className="text-2xl font-bold">
      {targetYears} anos e {remainingMonths} meses
    </h3>

    <p className="text-green-400 mt-2">
      Tempo estimado para atingir a independência financeira
    </p>
  </div>

  <div className="mt-8">
  <h3 className="text-2xl font-bold mb-6">
    Evolução Projetada
  </h3>

  <div className="flex justify-center">
    <LineChart
      width={700}
      height={300}
      data={chartData}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="#3f3f46"
      />

      <XAxis dataKey="year" />

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

</div>

</div>
        </div>

      </div>
    </main>
  );
}