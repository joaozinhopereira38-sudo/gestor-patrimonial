"use client";

export default function MetasPage() {
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

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-3">
              Independência Financeira
            </h2>

            <p className="text-zinc-400 mb-4">
              Meta: R$ 2.000.000
            </p>

            <div className="w-full bg-zinc-800 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: "1.4%" }}
              />
            </div>

            <p className="mt-3 text-green-400">
              1.4% concluído
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}