import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Mail, ShieldCheck, Zap, Users, FileText } from "lucide-react";

interface Props {
  onLogin: (user: { name: string; email: string; role: string }) => void;
}

export function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState("admin@expo.dev");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || password.length < 4) {
      setError("Credenciales inválidas. Verifica tu correo y contraseña.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onLogin({
        name: email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()),
        email,
        role: "Administrador",
      });
    }, 600);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Expo Admin</span>
        </div>
        <div className="relative space-y-6">
          <h1 className="font-serif text-5xl font-bold text-white leading-tight">
            Gestiona tu plataforma con confianza
          </h1>
          <p className="text-slate-300 text-lg max-w-md">
            Panel de administración completo para clientes, facturación y perfiles de usuario en un solo lugar.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { icon: Users, label: "Clientes", value: "1.2k" },
              { icon: FileText, label: "Facturas", value: "348" },
              { icon: ShieldCheck, label: "Uptime", value: "99.9%" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <s.icon className="h-5 w-5 text-indigo-300 mb-2" />
                <div className="text-white font-bold text-xl">{s.value}</div>
                <div className="text-slate-400 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-slate-500 text-sm">© 2025 Expo Admin · Todos los derechos reservados</p>
      </div>

      <div className="flex items-center justify-center p-6 bg-slate-50">
        <Card className="w-full max-w-md border-slate-200 shadow-xl shadow-slate-200/60 rounded-2xl">
          <CardContent className="p-8">
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">Expo Admin</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Iniciar sesión</h2>
            <p className="text-sm text-muted-foreground mt-1 mb-6">
              Accede al panel de administración
            </p>
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    placeholder="tu@correo.com"
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
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {error && (
                <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-sm text-rose-700">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 rounded-xl shadow-lg shadow-indigo-600/30"
              >
                {loading ? "Verificando..." : "Entrar al panel"}
              </Button>
            </form>
            <div className="mt-6 rounded-xl bg-slate-100 border border-slate-200 p-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Demo:</span> admin@expo.dev / admin123
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}