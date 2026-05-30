import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6">
      <h1 className="text-2xl font-bold mb-10">Gestor Patrimonial</h1>

      <nav className="space-y-4">
        <Link
          href="/"
          className="block text-zinc-300 hover:text-white transition"
        >
          Dashboard
        </Link>

        <Link
          href="/carteira"
          className="block text-zinc-300 hover:text-white transition"
        >
          Carteira
        </Link>

        <Link
          href="/aportes"
          className="block text-zinc-300 hover:text-white transition"
        >
          Aportes
        </Link>

        <Link
          href="/projecao"
          className="block text-zinc-300 hover:text-white transition"
        >
          Projeção
        </Link>

        <Link
          href="/metas"
          className="block text-zinc-300 hover:text-white transition"
        >
          Metas
        </Link>

        <Link
          href="/configuracoes"
          className="block text-zinc-300 hover:text-white transition"
        >
          Configurações
        </Link>
      </nav>
    </aside>
  );
}
