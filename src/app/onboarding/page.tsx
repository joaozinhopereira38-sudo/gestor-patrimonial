"use client";

import ProgressBar from "@/components/ProgressBar";
import { calculateProfile } from "@/lib/calculateProfile";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function OnboardingPage() {
  const {
    step,
    setStep,
    objective,
    setObjective,
    riskProfile,
    setRiskProfile,
    timeHorizon,
    setTimeHorizon,
    incomeRange,
    setIncomeRange,
    emergencyReserve,
    setEmergencyReserve,
    investmentExperience,
    setInvestmentExperience,
    netWorthRange,
    setNetWorthRange,
    incomeStability,
    setIncomeStability,
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

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-10">
        <ProgressBar step={step} total={9} />

        {step === 1 && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Qual é o principal objetivo?
              </h1>

              <p className="text-zinc-400 leading-relaxed">
                Isso ajudará o sistema a montar uma estratégia personalizada.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setObjective("organizar_patrimonio")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  objective === "organizar_patrimonio"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Quero organizar o patrimônio
              </button>

              <button
                onClick={() => setObjective("renda_passiva")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  objective === "renda_passiva"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Quero aumentar renda passiva
              </button>

              <button
                onClick={() => {
                  console.log("clicou crescimento");
                  setObjective("crescimento");
                }}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  objective === "crescimento"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Quero focar em crescimento patrimonial
              </button>

              <button
                onClick={() => setObjective("independencia")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  objective === "independencia"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Quero independência financeira
              </button>
            </div>

            <button
              disabled={!objective}
              onClick={() => setStep(2)}
              className="mt-8 w-full bg-white text-black font-bold py-4 rounded-2xl disabled:opacity-40"
            >
              Continuar
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Como reage ao risco?
              </h1>

              <p className="text-zinc-400 leading-relaxed">
                Isso ajudará a definir volatilidade e estratégia ideal.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setRiskProfile("conservador")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  riskProfile === "conservador"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Prefiro segurança e estabilidade
              </button>

              <button
                onClick={() => setRiskProfile("moderado")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  riskProfile === "moderado"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Aceito algum risco para buscar retorno maior
              </button>

              <button
                onClick={() => setRiskProfile("arrojado")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  riskProfile === "arrojado"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Aceito volatilidade para maximizar crescimento
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-zinc-800 py-4 rounded-2xl"
              >
                Voltar
              </button>

              <button
                disabled={!riskProfile}
                onClick={() => setStep(3)}
                className="flex-1 bg-white text-black font-bold py-4 rounded-2xl disabled:opacity-40"
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Qual é o seu horizonte de investimento?
              </h1>

              <p className="text-zinc-400 leading-relaxed">
                Isso ajuda a calibrar liquidez, volatilidade aceitável e o tipo
                de estratégia mais adequada.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setTimeHorizon("curto")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  timeHorizon === "curto"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Curto prazo (menos de 3 anos)
              </button>

              <button
                onClick={() => setTimeHorizon("medio")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  timeHorizon === "medio"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Médio prazo (3 a 7 anos)
              </button>

              <button
                onClick={() => setTimeHorizon("longo")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  timeHorizon === "longo"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Longo prazo (mais de 7 anos)
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-zinc-800 py-4 rounded-2xl"
              >
                Voltar
              </button>

              <button
                disabled={!timeHorizon}
                onClick={() => setStep(4)}
                className="flex-1 bg-white text-black font-bold py-4 rounded-2xl disabled:opacity-40"
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Qual é a sua faixa de renda mensal?
              </h1>

              <p className="text-zinc-400 leading-relaxed">
                Use valores líquidos (após impostos). Os dados ajudam a definir
                ritmo de aportes e adequação da estratégia.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setIncomeRange("ate_3k")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  incomeRange === "ate_3k"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Até R$ 3.000
              </button>

              <button
                onClick={() => setIncomeRange("3k_10k")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  incomeRange === "3k_10k"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                De R$ 3.000 a R$ 10.000
              </button>

              <button
                onClick={() => setIncomeRange("10k_30k")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  incomeRange === "10k_30k"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                De R$ 10.000 a R$ 30.000
              </button>

              <button
                onClick={() => setIncomeRange("30k_plus")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  incomeRange === "30k_plus"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Acima de R$ 30.000
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-zinc-800 py-4 rounded-2xl"
              >
                Voltar
              </button>

              <button
                disabled={!incomeRange}
                onClick={() => setStep(5)}
                className="flex-1 bg-white text-black font-bold py-4 rounded-2xl disabled:opacity-40"
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Como está sua reserva de emergência?
              </h1>

              <p className="text-zinc-400 leading-relaxed">
                Considere quantos meses de despesas essenciais você conseguiria
                cobrir sem usar crédito nem vender investimentos de longo prazo.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setEmergencyReserve("nenhuma")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  emergencyReserve === "nenhuma"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Ainda não tenho reserva dedicada
              </button>

              <button
                onClick={() => setEmergencyReserve("ate_3_meses")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  emergencyReserve === "ate_3_meses"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Cobre até cerca de 3 meses de despesas
              </button>

              <button
                onClick={() => setEmergencyReserve("3_a_6_meses")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  emergencyReserve === "3_a_6_meses"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Entre 3 e 6 meses de despesas
              </button>

              <button
                onClick={() => setEmergencyReserve("mais_6_meses")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  emergencyReserve === "mais_6_meses"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Mais de 6 meses de despesas
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-zinc-800 py-4 rounded-2xl"
              >
                Voltar
              </button>

              <button
                disabled={!emergencyReserve}
                onClick={() => setStep(6)}
                className="flex-1 bg-white text-black font-bold py-4 rounded-2xl disabled:opacity-40"
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Qual é a sua experiência com investimentos?
              </h1>

              <p className="text-zinc-400 leading-relaxed">
                Isso ajuda a calibrar linguagem, produtos sugeridos e ritmo na
                parte educativa do sistema.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setInvestmentExperience("iniciante")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  investmentExperience === "iniciante"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Estou começando agora ou tenho pouca prática
              </button>

              <button
                onClick={() => setInvestmentExperience("intermediario")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  investmentExperience === "intermediario"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Já invisto há algum tempo e conheço o básico bem
              </button>

              <button
                onClick={() => setInvestmentExperience("avancado")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  investmentExperience === "avancado"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Tenho bastante experiência e acompanho mercados com frequência
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(5)}
                className="flex-1 bg-zinc-800 py-4 rounded-2xl"
              >
                Voltar
              </button>

              <button
                disabled={!investmentExperience}
                onClick={() => setStep(7)}
                className="flex-1 bg-white text-black font-bold py-4 rounded-2xl disabled:opacity-40"
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 7 && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Em qual faixa está seu patrimônio líquido hoje?
              </h1>

              <p className="text-zinc-400 leading-relaxed">
                Some investimentos, reserva e dívidas (valor estimado é
                suficiente). Isso ajuda a dimensionar estratégia e metas.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setNetWorthRange("ate_10k")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  netWorthRange === "ate_10k"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Até R$ 10.000
              </button>

              <button
                onClick={() => setNetWorthRange("10k_100k")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  netWorthRange === "10k_100k"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                De R$ 10.000 a R$ 100.000
              </button>

              <button
                onClick={() => setNetWorthRange("100k_500k")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  netWorthRange === "100k_500k"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                De R$ 100.000 a R$ 500.000
              </button>

              <button
                onClick={() => setNetWorthRange("500k_plus")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  netWorthRange === "500k_plus"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Acima de R$ 500.000
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(6)}
                className="flex-1 bg-zinc-800 py-4 rounded-2xl"
              >
                Voltar
              </button>

              <button
                disabled={!netWorthRange}
                onClick={() => setStep(8)}
                className="flex-1 bg-white text-black font-bold py-4 rounded-2xl disabled:opacity-40"
              >
                Continuar
              </button>
            </div>
          </>
        )}

{step === 8 && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Como você considera a estabilidade da sua renda?
              </h1>

              <p className="text-zinc-400 leading-relaxed">
                Isso ajuda o sistema a calibrar liquidez, risco e resiliência
                financeira da estratégia.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setIncomeStability("instavel")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  incomeStability === "instavel"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Minha renda oscila bastante
              </button>

              <button
                onClick={() => setIncomeStability("moderada")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  incomeStability === "moderada"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Minha renda possui alguma estabilidade
              </button>

              <button
                onClick={() => setIncomeStability("estavel")}
                className={`w-full rounded-2xl p-5 text-left transition border ${
                  incomeStability === "estavel"
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
              >
                Minha renda é muito estável e previsível
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(7)}
                className="flex-1 bg-zinc-800 py-4 rounded-2xl"
              >
                Voltar
              </button>

              <button
                disabled={!incomeStability}
                onClick={() => setStep(9)}
                className="flex-1 bg-white text-black font-bold py-4 rounded-2xl disabled:opacity-40"
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 9 && (
          <>
            <div className="text-center">
              <p className="text-zinc-400 mb-4">Perfil identificado</p>

              <h1 className="text-5xl font-bold mb-6">{profile}</h1>

              <p className="text-zinc-400 leading-relaxed mb-10">
                O sistema analisou objetivos, tolerância ao risco, horizonte de
                investimento, faixa de renda, reserva de emergência, experiência
                com investimentos e patrimônio líquido para gerar um perfil
                inicial personalizado.
              </p>

              <button
                onClick={() => setStep(8)}
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold"
              >
                Voltar
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
