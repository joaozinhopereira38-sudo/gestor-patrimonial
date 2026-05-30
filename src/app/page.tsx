import DashboardCard from "@/components/DashboardCard";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Patrimônio Total"
          value="R$ 12.073,47"
        />

        <DashboardCard
          title="Reserva de Emergência"
          value="R$ 4.827,82"
        />

        <DashboardCard
          title="Carteira de Investimentos"
          value="R$ 7.245,65"
        />

        <DashboardCard
          title="Renda Passiva Mensal"
          value="R$ 48,20"
        />
      </div>
    </div>
  );
}
