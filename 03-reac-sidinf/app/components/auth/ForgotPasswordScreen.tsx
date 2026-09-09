import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "./AuthLayout";
import { toast } from "sonner";
import { Mail, CheckCircle2 } from "lucide-react";
import type { AppView } from "@/app/page";

interface ForgotPasswordScreenProps {
  onNavigate: (view: AppView) => void;
}

export function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Enlace enviado", { description: "Revisa tu bandeja de entrada." });
    }, 800);
  };

  return (
    <AuthLayout
      title="Recuperar acceso"
      subtitle="Te enviaremos un enlace para restablecer tu contraseña."
      footer={<>¿Recordaste tu contraseña? <button onClick={() => onNavigate("login")} className="font-semibold text-emerald-700 hover:text-emerald-800">Volver a login</button></>}
    >
      {sent ? (
        <div className="text-center py-6 space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Revisa tu correo</h3>
            <p className="text-sm text-slate-500 mt-1">Hemos enviado un enlace de recuperación a tu correo electrónico. El enlace expira en 30 minutos.</p>
          </div>
          <Button onClick={() => onNavigate("login")} variant="outline" className="w-full border-slate-200">Volver a iniciar sesión</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input id="email" type="email" placeholder="tu@empresa.com" className="pl-10" required />
            </div>
            <p className="text-xs text-slate-400 mt-1">Ingresa el correo asociado a tu cuenta para recibir instrucciones.</p>
          </div>
          <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white" disabled={loading}>{loading ? "Enviando..." : "Enviar enlace de recuperación"}</Button>
        </form>
      )}
    </AuthLayout>
  );
}