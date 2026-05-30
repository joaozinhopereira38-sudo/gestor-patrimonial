import type { Metadata } from "next";
import "./globals.css";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export const metadata: Metadata = {
  title: "Gestor Patrimonial",
  description: "Sistema inteligente de gestão patrimonial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-950 text-white">
        <main className="min-h-screen flex">
          <Sidebar />

          <div className="flex-1 flex flex-col">
            <Topbar />

            <section className="flex-1 p-10">{children}</section>
          </div>
        </main>
      </body>
    </html>
  );
}
