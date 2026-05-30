function App() {
  return (
    <div className="min-h-screen p-8 space-y-6">
      <h1 className="text-2xl font-semibold">FinWise — Design System</h1>

      <div className="bg-surface rounded-md shadow-card p-6 space-y-2">
        <p className="text-text-secondary text-sm">Saldo total</p>
        <p className="font-mono text-5xl font-bold">R$ 12.450,00</p>
        <div className="flex gap-4 pt-2">
          <span className="text-income">+R$ 8.200,00 receitas</span>
          <span className="text-expense">-R$ 4.890,00 despesas</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="bg-primary rounded-md px-4 py-2 font-medium">
          Ação primária
        </button>
        <span className="bg-warning text-background rounded-sm px-3 py-1 text-sm self-center">
          Orçamento em 80%
        </span>
      </div>
    </div>
  );
}

export default App;