import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthLayout } from "./AuthLayout";
import { toast } from "sonner";
import { Building2, Lock, Mail, User } from "lucide-react";
import type { AppView } from "@/app/page";

interface RegisterScreenProps {
  onNavigate: (view: AppView) => void;
}

export function RegisterScreen({ onNavigate }: RegisterScreenProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Cuenta creada correctamente", { description: "Ahora puedes iniciar sesión." });
      onNavigate("login");
    }, 900);
  };

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Registra tu empresa para empezar a gestionar módulos."
      footer={<>¿Ya tienes cuenta? <button onClick={() => onNavigate("login")} className="font-semibold text-emerald-700 hover:text-emerald-800">Inicia sesión</button></>}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstname">Nombre</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input id="firstname" placeholder="Juan" className="pl-10" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Apellido</Label>
            <Input id="lastname" placeholder="Pérez" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Empresa</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="company" placeholder="Mi Empresa S.A." className="pl-10" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo corporativo</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="email" type="email" placeholder="tu@empresa.com" className="pl-10" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="password" type="password" placeholder="Mínimo 8 caracteres" className="pl-10" required />
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm font-normal text-slate-600 cursor-pointer leading-relaxed">
            Acepto los <span className="text-emerald-700 font-medium">Términos de servicio</span> y la <span className="text-emerald-700 font-medium">Política de privacidad</span>.
          </Label>
        </div>
        <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white" disabled={loading}>{loading ? "Creando cuenta..." : "Registrarme"}</Button>
      </form>
    </AuthLayout>
  );
}