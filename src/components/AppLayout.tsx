import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Receipt, Wallet, FolderTree, Upload, LogOut, Landmark, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { logout } from "../services/authService";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Extrato", icon: Receipt },
  { to: "/budgets", label: "Orçamentos", icon: Wallet },
  { to: "/accounts", label: "Contas", icon: Landmark },
  { to: "/categories", label: "Categorias", icon: FolderTree },
  { to: "/import", label: "Importar", icon: Upload },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const { refreshToken, clearTokens } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      if (refreshToken) await logout(refreshToken);
    } finally {
      clearTokens();
      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* overlay (só mobile, quando aberto) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* sidebar: drawer no mobile, fixa no desktop */}
      <aside
        className={`fixed inset-y-0 left-0 w-60 bg-surface flex flex-col z-40 transition-transform
          md:static md:translate-x-0
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex items-center justify-between">
          <span className="text-xl font-bold">FinWise</span>
          {/* botão fechar, só no mobile */}
          <button className="md:hidden text-text-secondary" onClick={() => setMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)} // fecha a gaveta ao navegar (mobile)
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                  isActive ? "bg-primary text-text-primary" : "text-text-secondary hover:bg-surface-elevated"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-4 text-sm text-text-secondary hover:text-text-primary"
        >
          <LogOut size={18} />
          Sair
        </button>
      </aside>

      {/* área principal */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface flex items-center gap-3 px-4 md:px-6 shrink-0">
          {/* hambúrguer, só no mobile */}
          <button className="md:hidden text-text-secondary" onClick={() => setMenuOpen(true)}>
            <Menu size={22} />
          </button>
          <span className="text-text-secondary text-sm">Maio / 2026</span>
        </header>
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}