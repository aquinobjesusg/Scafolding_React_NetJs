import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, LogIn, Apple, Globe, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (provider: string) => {
    toast.success(`Autenticando con ${provider}...`, {
      description: "Redirigiendo al panel de control",
    });
    setTimeout(onLogin, 800);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Por favor ingresa tu correo y contraseña");
      return;
    }
    handleLogin("Correo Electrónico");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-400 to-slate-600 shadow-xl shadow-slate-400/50 mb-4">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-slate-800 tracking-tight">
            Condominio
          </h1>
          <p className="text-slate-500 mt-1 text-sm tracking-wide uppercase">
            Sistema de Gestión Integral
          </p>
        </div>

        <Card className="border-slate-200/60 shadow-xl shadow-slate-300/40 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-2xl text-slate-800 font-serif">Bienvenido</CardTitle>
            <CardDescription className="text-slate-500">
              Inicia sesión para gestionar tu condominio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <form onSubmit={handleEmailLogin} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-700 text-sm">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@condominio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-slate-700 text-sm">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white shadow-md shadow-slate-400/50"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Iniciar Sesión
              </Button>
            </form>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-slate-500 uppercase tracking-wider">
                  o continúa con
                </span>
              </div>
            </div>

            <Button
              onClick={() => handleLogin("Google")}
              className="w-full h-12 bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
            >
              <Globe className="w-5 h-5 mr-3 text-slate-600" />
              Continuar con Google
            </Button>
            <Button
              onClick={() => handleLogin("Apple")}
              className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
            >
              <Apple className="w-5 h-5 mr-3" />
              Continuar con Apple
            </Button>

            <p className="text-xs text-center text-slate-500 pt-1">
              Al continuar, aceptas los Términos de Servicio y la Política de Privacidad.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}