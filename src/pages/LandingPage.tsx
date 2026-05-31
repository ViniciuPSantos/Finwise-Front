import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-2 mb-10">
        <h1 className="text-4xl font-bold">FinWise</h1>
        <p className="text-text-secondary">Inteligência financeira pessoal</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md">
        <Link
          to="/login"
          className="flex-1 text-white hover:bg-primary-hover bg-primary rounded-md py-3 font-medium"
        >
          Entrar
        </Link>
        <Link
          to="/register"
          className="flex-1 bg-surface-elevated rounded-md py-3 font-medium"
        >
          Criar conta
        </Link>
      </div>
    </div>
  );
}