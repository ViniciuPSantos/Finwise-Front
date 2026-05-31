import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { login } from "../services/authService";
import { useAuthStore } from "../store/authStore";


const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Informe a senha"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginForm) {
    try {
      const { accessToken, refreshToken } = await login(values.email, values.password);
      setTokens(accessToken, refreshToken);
      navigate("/dashboard");
    } catch {
      toast.error("E-mail ou senha incorretos");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-modal p-8 w-full max-w-sm space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">FinWise</h1>
          <p className="text-text-secondary text-sm">Entre na sua conta</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">E-mail</label>
            <input
              type="email"
              {...register("email")}
              className="w-full bg-background rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-expense text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Senha</label>
            <input
              type="password"
              {...register("password")}
              className="w-full bg-background rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && (
              <p className="text-expense text-xs">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white hover:bg-primary-hover rounded-md py-2 font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
          <p className="text-text-secondary text-sm text-center">
            Não tem conta?{" "}
          <Link to="/register" className="text-primary">Criar conta</Link>
        </p>
        </form>
      </div>
    </div>
  );
}