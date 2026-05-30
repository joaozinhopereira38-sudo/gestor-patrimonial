"use client";

import { useOnboardingStore } from "@/store/onboardingStore";
import { calculateProfile } from "@/lib/calculateProfile";
import { formatObjective, formatProfile } from "@/lib/formatters";
import { generatePortfolio } from "@/lib/portfolio";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function DashboardPage() {

    const {
        objective,
        riskProfile,
        timeHorizon,
        incomeRange,
        emergencyReserve,
        investmentExperience,
        netWorthRange,
        incomeStability,
      } = useOnboardingStore();
    
      const { profile } = calculateProfile({
        objective,
        riskProfile,
        timeHorizon,
        incomeRange,
        emergencyReserve,
        investmentExperience,
        netWorthRange,
        incomeStability,
      });

      const portfolio = generatePortfolio(profile);
      
      const COLORS = [
        "#ffffff",
        "#a1a1aa",
        "#71717a",
        "#3f3f46",
      ];

      const evolutionData = [
        { month: "Jan", value: 98000 },
        { month: "Fev", value: 102000 },
        { month: "Mar", value: 105000 },
        { month: "Abr", value: 111000 },
        { month: "Mai", value: 118000 },
        { month: "Jun", value: 128450 },
      ];

      console.log("OBJECTIVE:", objective);
    
      return (
      <main className="min-h-screen bg-zinc-950 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-zinc-400 mb-2">Visão Patrimonial</p>
  
            <h1 className="text-5xl font-bold">
  Perfil do Investidor
</h1>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <p className="text-zinc-400 mb-2">
                Patrimônio Total
              </p>
  
              <h2 className="text-3xl font-bold">
                R$ 128.450
              </h2>
  
              <p className="text-green-400 mt-4">
                +8,4% nos últimos 12 meses
              </p>
            </div>
  
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <p className="text-zinc-400 mb-2">
                Perfil Identificado
              </p>
  
              <h2 className="text-3xl font-bold">
              {formatProfile(profile)}
              </h2>
  
              <p className="text-zinc-400 mt-4">
                Boa relação entre risco e estabilidade
              </p>
            </div>
  
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <p className="text-zinc-400 mb-2">
                Objetivo Principal
              </p>
  
              <h2 className="text-2xl font-bold leading-snug">
                {formatObjective(objective)}
              </h2>
  
              <p className="text-zinc-400 mt-4">
                Estratégia focada em valorização de longo prazo
              </p>
            </div>
  
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <p className="text-zinc-400 mb-2">
                Score Financeiro
              </p>
  
              <h2 className="text-3xl font-bold">
                82/100
              </h2>
  
              <p className="text-green-400 mt-4">
                Perfil saudável e resiliente
              </p>
            </div>
          </div>
  
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            <div className="xl:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-zinc-400 mb-2">
                    Estratégia Recomendada
                  </p>
  
                  <h2 className="text-3xl font-bold">
                    Alocação Inteligente
                  </h2>
                </div>
  
                <div className="bg-zinc-800 px-4 py-2 rounded-2xl">
                  Longo Prazo
                </div>
              </div>
  
              <div className="space-y-6">
  {portfolio.map((item) => (
    <div key={item.name}>
      <div className="flex justify-between mb-2">
        <span>{item.name}</span>
        <span>{item.percentage}%</span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-4">
        <div
          className="bg-white h-4 rounded-full"
          style={{ width: `${item.percentage}%` }}
        />
      </div>
    </div>
  ))}
</div>

</div>

<div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
  <div className="mb-8">
    <p className="text-zinc-400 mb-2">
      Distribuição Patrimonial
    </p>

    <h2 className="text-3xl font-bold">
      Composição da Carteira
    </h2>
  </div>

  <div className="h-[320px] min-h-[320px] w-full">
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={portfolio}
          dataKey="percentage"
          nameKey="name"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
        >
          {portfolio.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>

  <div className="space-y-3 mt-6">
    {portfolio.map((item, index) => (
      <div
        key={item.name}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor:
                COLORS[index % COLORS.length],
            }}
          />

          <span>{item.name}</span>
        </div>

        <span className="text-zinc-400">
          {item.percentage}%
        </span>
      </div>
    ))}
  </div>
  </div>

</div>

<div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
  <div className="mb-8">
    <p className="text-zinc-400 mb-2">
      Evolução Patrimonial
    </p>

    <h2 className="text-3xl font-bold">
      Crescimento ao Longo do Tempo
    </h2>
  </div>

  <div className="h-[350px] min-h-[350px] w-full">
  <ResponsiveContainer width="100%" height={350}>
      <LineChart data={evolutionData}>
        <XAxis dataKey="month" stroke="#71717a" />
        <YAxis stroke="#71717a" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#ffffff"
          strokeWidth={3}
          dot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

      </div>
    </main>
  );
}