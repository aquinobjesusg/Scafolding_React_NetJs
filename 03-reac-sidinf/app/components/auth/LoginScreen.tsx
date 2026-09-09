import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthLayout } from "./AuthLayout";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import type { AppView } from "@/app/page";

interface LoginScreenProps {
  onNavigate: (view: AppView) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@openxava.com");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate("panel");
    }, 700);
  };

  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Bienvenido de vuelta. Ingresa para acceder al panel."
      footer={<>¿No tienes cuenta? <button onClick={() => onNavigate("register")} className="font-semibold text-emerald-700 hover:text-emerald-800">Regístrate</button></>}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" className="pl-10" required />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <button type="button" onClick={() => onNavigate("forgot")} className="text-xs font-medium text-emerald-700 hover:text-emerald-800">¿Olvidaste tu contraseña?</button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 pr-10" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" defaultChecked />
          <Label htmlFor="remember" className="text-sm font-normal text-slate-600 cursor-pointer">Mantener sesión iniciada</Label>
        </div>
        <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white" disabled={loading}>{loading ? "Ingresando..." : "Ingresar al panel"}</Button>
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">o continúa con</span></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" className="border-slate-200">Google</Button>
          <Button type="button" variant="outline" className="border-slate-200">Microsoft</Button>
        </div>
      </form>
    </AuthLayout>
  );
}