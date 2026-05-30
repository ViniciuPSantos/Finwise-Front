import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Receipt, Wallet, FolderTree, Upload, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { logout } from "../services/authService";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Extrato", icon: Receipt },
  { to: "/budgets", label: "Orçamentos", icon: Wallet },
  { to: "/categories", label: "Categorias", icon: FolderTree },
  { to: "/import", label: "Importar", icon: Upload },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const { refreshToken, clearTokens } = useAuthStore();

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
      <aside className="w-60 bg-surface flex flex-col shrink-0">
        <div className="p-6">
          <span className="text-xl font-bold">FinWise</span>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
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

      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-surface flex items-center px-6 shrink-0">
          <span className="text-text-secondary text-sm">Maio / 2026</span>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}