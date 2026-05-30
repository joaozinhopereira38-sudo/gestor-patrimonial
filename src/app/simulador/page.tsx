"use client";

import { useState } from "react";

export default function SimuladorPage() {
  const [initialValue, setInitialValue] = useState("");
  const [monthlyValue, setMonthlyValue] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("");

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

        </div>

      </div>
    </main>
  );
}