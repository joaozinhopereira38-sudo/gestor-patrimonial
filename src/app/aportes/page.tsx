"use client";

import { useState } from "react";

import { usePortfolioStore } from "@/store/portfolioStore";

export default function AportesPage() {

  const {
    aportes,
    addAporte,
  } = usePortfolioStore();

  const totalAportado = aportes.reduce(
    (acc, aporte) => acc + aporte.value,
    0
  );
  
  const quantidadeAportes =
    aportes.length;
  
  const ultimoAporte =
    aportes.length > 0
      ? aportes[aportes.length - 1].value
      : 0;
  
  const ticketMedio =
    quantidadeAportes > 0
      ? totalAportado /
        quantidadeAportes
      : 0;

  const [value, setValue] = useState("");
  const [description, setDescription] =
    useState("");

    const handleAddAporte = () => {
      if (!value) return;
    
      addAporte({
        id: Date.now(),
        value: Number(value),
        description,
        date: new Date().toLocaleDateString(
          "pt-BR"
        ),
      });
    
      setValue("");
      setDescription("");
    };

  return (
    <main className="min-h-screen text-white">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <p className="text-zinc-400">
            Gestão Patrimonial
          </p>

          <h1 className="text-5xl font-bold">
            Controle de Aportes
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">

<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
  <p className="text-zinc-400 text-sm">
    Total Aportado
  </p>

  <h3 className="text-2xl font-bold mt-2">
    R$ {totalAportado.toLocaleString("pt-BR")}
  </h3>
</div>

<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
  <p className="text-zinc-400 text-sm">
    Quantidade
  </p>

  <h3 className="text-2xl font-bold mt-2">
    {quantidadeAportes}
  </h3>
</div>

<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
  <p className="text-zinc-400 text-sm">
    Último Aporte
  </p>

  <h3 className="text-2xl font-bold mt-2">
    R$ {ultimoAporte.toLocaleString("pt-BR")}
  </h3>
</div>

<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
  <p className="text-zinc-400 text-sm">
    Ticket Médio
  </p>

  <h3 className="text-2xl font-bold mt-2">
    R$ {ticketMedio.toLocaleString(
      "pt-BR",
      {
        maximumFractionDigits: 0,
      }
    )}
  </h3>
</div>

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
          <h2 className="text-2xl font-bold mb-6">
            Novo Aporte
          </h2>

          <input
            type="number"
            placeholder="Valor do aporte"
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
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
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
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
  onClick={handleAddAporte}
  className="
    bg-white
              text-black
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >
            Registrar Aporte
          </button>
        </div>

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
            Histórico
          </h2>

          <div className="space-y-4">
  {aportes.length === 0 ? (
    <div className="space-y-4">
    {aportes.length === 0 ? (
      <p className="text-zinc-400">
        Nenhum aporte registrado
      </p>
    ) : (
      aportes
        .slice()
        .reverse()
        .map((aporte) => (
          <div
            key={aporte.id}
            className="
              bg-zinc-800
              rounded-xl
              p-4
              flex
              justify-between
              items-center
            "
          >
            <div>
              <p className="font-semibold">
                {aporte.description || "Aporte"}
              </p>
  
              <p className="text-zinc-400 text-sm">
                {aporte.date}
              </p>
            </div>
  
            <p className="font-bold text-green-400">
              R$ {aporte.value.toLocaleString("pt-BR")}
            </p>
          </div>
        ))
    )}
  </div>
  ) : (
    aportes
      .slice()
      .reverse()
      .map((aporte) => (
        <div
          key={aporte.id}
          className="
            bg-zinc-800
            rounded-xl
            p-4
            flex
            justify-between
            items-center
          "
        >
          <div>
            <p className="font-semibold">
              {aporte.description || "Aporte"}
            </p>

            <p className="text-zinc-400 text-sm">
              {aporte.date}
            </p>
          </div>

          <p className="font-bold text-green-400">
            R$ {aporte.value.toLocaleString("pt-BR")}
          </p>
        </div>
      ))
  )}
</div>

        </div>

      </div>
    </main>
  );
}