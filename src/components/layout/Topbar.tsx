export default function Topbar() {
  return (
    <header className="w-full h-20 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>

        <p className="text-zinc-400 text-sm">Gestão patrimonial inteligente</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          <p className="text-sm text-zinc-400">Patrimônio</p>

          <p className="font-bold text-white">R$ 12.073,47</p>
        </div>

        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold">
          JS
        </div>
      </div>
    </header>
  );
}
