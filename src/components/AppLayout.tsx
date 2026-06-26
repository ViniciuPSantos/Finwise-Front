import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Receipt, Wallet, FolderTree, Upload, LogOut, Landmark, Menu, X, Sprout } from "lucide-react";
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

  const navItemClass = (isActive: boolean) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm w-full text-left transition-colors ${
      isActive
        ? "bg-pine-600 text-white font-semibold"
        : "text-cream-500 hover:bg-vault-elev hover:text-cream-100"
    }`;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* overlay (só mobile, quando aberto) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* sidebar: drawer no mobile, fixa no desktop */}
      <aside
        className={`fixed inset-y-0 left-0 w-60 bg-vault-bg flex flex-col z-40 transition-transform
          md:static md:translate-x-0
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center gap-3 px-[22px] pt-[22px] pb-[18px]">
          {/* troque /logo.svg pelo seu arquivo em public/ — sem ele, cai no Sprout */}
          <span className="flex items-center justify-center w-[30px] h-[30px] rounded-md bg-mint-500/15 overflow-hidden shrink-0">
            <img
              src="/logo.svg"
              alt="Finwise"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <Sprout size={19} className="text-mint-300 hidden" />
          </span>
          <span className="font-display font-extrabold text-[22px] tracking-tight text-mint-300">
            Finwise
          </span>
          <button className="md:hidden text-cream-500 ml-auto" onClick={() => setMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 flex flex-col gap-[3px]">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => navItemClass(isActive)}
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-vault-line">
          <button onClick={handleLogout} className={navItemClass(false)}>
            <LogOut size={19} />
            Sair
          </button>
        </div>
      </aside>

      {/* área principal */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-[62px] shrink-0 flex items-center gap-3 px-4 md:px-[26px] border-b border-line sticky top-0 z-10 bg-paper/80 backdrop-blur">
          {/* hambúrguer, só no mobile */}
          <button className="md:hidden text-ink-500" onClick={() => setMenuOpen(true)}>
            <Menu size={22} />
          </button>
          <span className="ml-auto flex items-center gap-[10px]">
            <span className="text-ink-500 text-sm capitalize">
              {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).replace(' de ', ' / ')}
            </span>
          </span>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-[26px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}