"use client";

import { usePortfolioStore } from "@/store/portfolioStore";

import { useState } from "react";

export default function MetasPage() {
  const {
  assets,
  goals,
  addGoal,
  removeGoal,
} = usePortfolioStore();

const [title, setTitle] =
  useState("");

const [target, setTarget] =
  useState("");

const [deadline, setDeadline] =
  useState("");

  const handleAddGoal = () => {
    if (
      !title ||
      !target ||
      !deadline
    )
      return;
  
    addGoal({
      id: Date.now(),
      title,
      target: Number(target),
      deadline,
    });
  
    setTitle("");
    setTarget("");
    setDeadline("");
  };

  const total = assets.reduce(
    (acc, asset) => acc + asset.value,
    0
  );

  return (
    <main className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <p className="text-zinc-400">
            Planejamento Financeiro
          </p>

          <h1 className="text-5xl font-bold">
            Metas Financeiras
          </h1>
        </div>

        <div
  className="
    bg-zinc-900
    p-8
    rounded-3xl
    mb-8
  "
>
  <h2 className="text-2xl font-bold mb-6">
    Nova Meta
  </h2>

  <input
    type="text"
    placeholder="Nome da meta"
    value={title}
    onChange={(e) =>
      setTitle(e.target.value)
    }
    className="
      w-full
      p-4
      rounded-xl
      bg-zinc-800
      mb-4
    "
  />

  <input
    type="number"
    placeholder="Valor alvo"
    value={target}
    onChange={(e) =>
      setTarget(e.target.value)
    }
    className="
      w-full
      p-4
      rounded-xl
      bg-zinc-800
      mb-4
    "
  />

<input
  type="date"
  value={deadline}
  onChange={(e) =>
    setDeadline(e.target.value)
  }
  className="
    w-full
    p-4
    rounded-xl
    bg-zinc-800
    mb-4
  "
/>

  <button
    onClick={handleAddGoal}
    className="
      bg-white
      text-black
      px-6
      py-3
      rounded-xl
      font-semibold
    "
  >
    Criar Meta
  </button>
</div>

        <div className="space-y-6">
          {goals.map((goal) => {
              const progress =
              (total / goal.target) * 100;

              const remaining =
              goal.target - total;

              const deadlineDate =
              new Date(goal.deadline);

              const today =
              new Date();

              const monthsRemaining =
              Math.max(
              0,
              (deadlineDate.getFullYear() -
               today.getFullYear()) *
              12 +
               (deadlineDate.getMonth() -
               today.getMonth())
  );

              const yearsRemaining =
              Math.floor(
              monthsRemaining / 12
             );

              const extraMonths =
              monthsRemaining % 12;

              const monthlyContribution =
  monthsRemaining > 0
    ? remaining /
      monthsRemaining
    : remaining;

            return (
              <div
                key={goal.id}
                className="
                  bg-zinc-900
                  p-6
                  rounded-3xl
                "
              >
                <div className="flex justify-between items-center mb-3">
  <h2 className="text-xl font-bold">
    {goal.title}
  </h2>

  <button
    onClick={() =>
      removeGoal(goal.id)
    }
    className="
      text-red-400
      hover:text-red-300
    "
  >
    Remover
  </button>
</div>

                <p className="text-zinc-400 mb-4">
                  Meta: R${" "}
                  {goal.target.toLocaleString(
                    "pt-BR"
                  )}
                </p>

                <p className="text-zinc-500 mb-4">
   Prazo: {goal.deadline}
</p>

<p className="text-zinc-400 mb-4">
  Faltam: R${" "}
  {remaining.toLocaleString(
    "pt-BR"
  )}
</p>

<p className="text-zinc-400 mb-4">
  Tempo restante:{" "}
  {yearsRemaining} anos e{" "}
  {extraMonths} meses
</p>

<p className="text-green-400 mb-4">
  Aporte necessário: R${" "}
  {monthlyContribution.toLocaleString(
    "pt-BR",
    {
      maximumFractionDigits: 0,
    }
  )}
  /mês
</p>

                <div className="w-full bg-zinc-800 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${Math.min(
                        progress,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-green-400">
                  {progress.toFixed(1)}%
                  concluído
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}