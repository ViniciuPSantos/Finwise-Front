import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { register as registerUser } from "../services/authService";

const schema = z
  .object({
    name: z.string().min(1, "Informe seu nome"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Mínimo de 6 caracteres"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As senhas não conferem",
    path: ["confirm"],
  });

type FormValues = z.infer<typeof schema>;

const field = "w-full bg-background rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary";

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    try {
      // confirm fica só no front, não vai pro backend
      const { confirm, ...payload } = values;
      await registerUser(payload);
      toast.success("Conta criada! Faça login para entrar.");
      navigate("/login");
    } catch (err: any) {
      if (err?.response?.status === 409) {
        toast.error("Esse e-mail já está cadastrado");
      } else {
        toast.error("Erro ao criar a conta");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-modal p-8 w-full max-w-sm space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Criar conta</h1>
          <p className="text-text-secondary text-sm">É rápido, leva um minuto.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Nome</label>
            <input {...register("name")} className={field} />
            {errors.name && <p className="text-expense text-xs">{errors.name.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">E-mail</label>
            <input type="email" {...register("email")} className={field} />
            {errors.email && <p className="text-expense text-xs">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Senha</label>
            <input type="password" {...register("password")} className={field} />
            {errors.password && <p className="text-expense text-xs">{errors.password.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Confirmar senha</label>
            <input type="password" {...register("confirm")} className={field} />
            {errors.confirm && <p className="text-expense text-xs">{errors.confirm.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white hover:bg-primary-hover rounded-md py-2 font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p className="text-text-secondary text-sm text-center">
          Já tem conta?{" "}
          <Link to="/login" className="text-primary">Entrar</Link>
        </p>
      </div>
    </div>
  );
}