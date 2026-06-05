import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Asset = {
  id: number;
  name: string;
  category: string;
  value: number;
};

export type HistoryPoint = {
  date: string;
  total: number;
};

export type Aporte = {
  id: number;
  value: number;
  description: string;
  date: string;
};

export type Goal = {
  id: number;
  title: string;
  target: number;
};

type PortfolioStore = {
  assets: Asset[];

  history: HistoryPoint[];

  aportes: Aporte[];

  goals: Goal[];

  goal: number;

  addAsset: (asset: Asset) => void;

  addAporte: (
    aporte: Aporte
  ) => void;

  addGoal: (
  goal: Goal
) => void;

removeGoal: (
  id: number
) => void;

  updateHistory: (total: number) => void;

  removeAsset: (id: number) => void;

  setGoal: (value: number) => void;
  
};

export const usePortfolioStore =
  create<PortfolioStore>()(
    persist(
      (set) => ({
        assets: [
          {
            id: 1,
            name: "Tesouro Selic",
            category: "Renda Fixa",
            value: 15000,
          },
          {
            id: 2,
            name: "MXRF11",
            category: "FII",
            value: 5000,
          },
          {
            id: 3,
            name: "IVVB11",
            category: "ETF",
            value: 8000,
          },
        ],

        history: [
          {
            date: "Jan",
            total: 12000,
          },
          {
            date: "Fev",
            total: 18000,
          },
          {
            date: "Mar",
            total: 22000,
          },
          {
            date: "Abr",
            total: 28000,
          },
        ],

        aportes: [],

        goals: [
  {
    id: 1,
    title: "Independência Financeira",
    target: 2000000,
  },
],

        goal: 1000000,

        addAsset: (asset) =>

          set((state) => ({
            assets: [
              ...state.assets,
              asset,
            ],
          })),

        addAporte: (aporte) =>
          set((state) => ({
            aportes: [
              ...state.aportes,
              aporte,
            ],
          })),

          addGoal: (goal) =>
  set((state) => ({
    goals: [
      ...state.goals,
      goal,
    ],
  })),

  removeGoal: (id) =>
  set((state) => ({
    goals: state.goals.filter(
      (goal) =>
        goal.id !== id
    ),
  })),

        removeAsset: (id) =>
          set((state) => ({
            assets: state.assets.filter(
              (asset) =>
                asset.id !== id
            ),
          })),

        setGoal: (value) =>
          set(() => ({
            goal: value,
          })),

          updateHistory: (total) =>
            set((state) => ({
              history: [
                ...state.history,
                {
                  date: new Date().toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                    }
                  ),
                  total,
                },
              ],
            })),
            
      }),
      {
        name: "portfolio-storage",
      }
    )
  );