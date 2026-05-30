import { create } from "zustand";
import { persist } from "zustand/middleware";

type RiskProfile =
  | ""
  | "conservador"
  | "moderado"
  | "arrojado";

type TimeHorizon =
  | ""
  | "curto"
  | "medio"
  | "longo";

type IncomeRange =
  | ""
  | "ate_3k"
  | "3k_10k"
  | "10k_30k"
  | "30k_plus";

type EmergencyReserve =
  | ""
  | "nenhuma"
  | "ate_3_meses"
  | "3_a_6_meses"
  | "mais_6_meses";

type InvestmentExperience =
  | ""
  | "iniciante"
  | "intermediario"
  | "avancado";

type NetWorthRange =
  | ""
  | "ate_10k"
  | "10k_100k"
  | "100k_500k"
  | "500k_plus";

type IncomeStability =
  | ""
  | "instavel"
  | "moderada"
  | "estavel";

type OnboardingStore = {
  step: number;

  objective: string;

  riskProfile: RiskProfile;

  timeHorizon: TimeHorizon;

  incomeRange: IncomeRange;

  emergencyReserve: EmergencyReserve;

  investmentExperience: InvestmentExperience;

  netWorthRange: NetWorthRange;

  incomeStability: IncomeStability;

  setStep: (value: number) => void;

  setObjective: (value: string) => void;

  setRiskProfile: (value: RiskProfile) => void;

  setTimeHorizon: (value: TimeHorizon) => void;

  setIncomeRange: (value: IncomeRange) => void;

  setEmergencyReserve: (value: EmergencyReserve) => void;

  setInvestmentExperience: (
    value: InvestmentExperience
  ) => void;

  setNetWorthRange: (
    value: NetWorthRange
  ) => void;

  setIncomeStability: (
    value: IncomeStability
  ) => void;
};

export const useOnboardingStore =
create<OnboardingStore>()(
  persist(
    (set) => ({
    step: 1,

    objective: "",

    riskProfile: "",

    timeHorizon: "",

    incomeRange: "",

    emergencyReserve: "",

    investmentExperience: "",

    netWorthRange: "",

    incomeStability: "",

    setStep: (value) =>
      set({
        step: value,
      }),

    setObjective: (value) =>
      set({
        objective: value,
      }),

    setRiskProfile: (value) =>
      set({
        riskProfile: value,
      }),

    setTimeHorizon: (value) =>
      set({
        timeHorizon: value,
      }),

    setIncomeRange: (value) =>
      set({
        incomeRange: value,
      }),

    setEmergencyReserve: (value) =>
      set({
        emergencyReserve: value,
      }),

    setInvestmentExperience: (value) =>
      set({
        investmentExperience: value,
      }),

    setNetWorthRange: (value) =>
      set({
        netWorthRange: value,
      }),

    setIncomeStability: (value) =>
      set({
        incomeStability: value,
      }),
    }),
    {
      name: "onboarding-storage",
    }
  )
);