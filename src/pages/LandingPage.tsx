import { Link } from "react-router-dom";
import { Sprout, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2"
        style={{
          background:
            "radial-gradient(circle at 80% 40%, rgba(63,174,115,0.18), transparent 60%)",
        }}
      />


      <header className="relative z-10 flex items-center gap-2 p-6">
        <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent/15">
          <Sprout size={20} className="text-accent" />
        </span>
        <span className="text-xl font-bold text-accent">Finwise</span>
      </header>


      <main className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary mb-5">
          Inteligência financeira pessoal
        </p>

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-text-primary">
          Guarde mais do
          <br />
          que você ganha.
        </h1>

        <p className="mt-6 max-w-md text-text-secondary leading-relaxed">
          Acompanhe receitas e despesas, defina orçamentos e veja para onde o
          seu dinheiro vai — tudo em um só lugar.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-3">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-hover rounded-md px-7 py-3 font-medium shadow-card transition-colors"
          >
            Entrar
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/register"
            className="flex items-center justify-center bg-surface text-text-primary border border-black/10 hover:bg-surface-elevated rounded-md px-7 py-3 font-medium transition-colors"
          >
            Criar conta
          </Link>
        </div>
      </main>
    </div>
  );
}