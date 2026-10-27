import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Lock, User as UserIcon, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export default function LoginView() {
  const { login } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(username, password);
    if (!res.ok) setError(res.error ?? "Error al iniciar sesión");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-sky-50">
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-sky-700 via-sky-600 to-cyan-500 text-white p-12 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute bottom-0 -left-16 h-64 w-64 rounded-full bg-white/10" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/40">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold">Núcleo Facturación</div>
            <div className="text-xs text-sky-100/90">Sistema empresarial</div>
          </div>
        </div>

        <div className="relative space-y-6 max-w-md">
          <h2 className="font-serif text-4xl font-bold leading-tight">
            Gestiona clientes, productos y facturas en un solo lugar.
          </h2>
          <p className="text-sky-100/90">
            Emite facturas, genera comprobantes de retención y administra usuarios
            con roles diferenciados para tu equipo.
          </p>
          <div className="flex items-center gap-3 text-sm text-sky-100/90">
            <ShieldCheck className="h-5 w-5" />
            Acceso seguro con roles: Administrador, Facturador y Contador.
          </div>
        </div>

        <div className="relative text-xs text-sky-100/70">
          © {new Date().getFullYear()} Núcleo Facturación S.A. · RUC 1792345678001
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-slate-900">Núcleo Facturación</div>
              <div className="text-xs text-slate-500">Sistema empresarial</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-sky-100 p-8">
            <div className="mb-6">
              <h1 className="font-serif text-2xl font-bold text-slate-900">Iniciar sesión</h1>
              <p className="text-sm text-slate-500 mt-1">
                Ingresa tus credenciales para acceder al sistema.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    placeholder="admin"
                    className="pl-9"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="••••••••"
                    className="pl-9"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
                Ingresar
              </Button>
            </form>

            <div className="mt-6 rounded-lg bg-sky-50 border border-sky-100 p-3 text-xs text-slate-600">
              <span className="font-semibold text-sky-800">Demo:</span> usuario{" "}
              <span className="font-mono">admin</span> · contraseña{" "}
              <span className="font-mono">admin123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}