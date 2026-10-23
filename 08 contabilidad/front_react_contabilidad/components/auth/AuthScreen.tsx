'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Calculator, User, Mail, Lock, ArrowLeft, Eye, EyeOff, ShieldCheck, Landmark } from "lucide-react";
import type { AppView } from "@/app/page";

interface AuthScreenProps {
  initialView: "login" | "register" | "forgot";
  onNavigate: (view: AppView) => void;
}

export function AuthScreen({ initialView, onNavigate }: AuthScreenProps) {
  const [view, setView] = useState<"login" | "register" | "forgot">(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (view === "login") {
        toast.success("Bienvenido al sistema", { description: "Acceso concedido correctamente." });
        onNavigate("panel");
      } else if (view === "register") {
        toast.success("Cuenta creada", { description: "Tu cuenta ha sido registrada exitosamente." });
        setView("login");
      } else {
        toast.info("Correo enviado", { description: "Revisa tu bandeja de entrada para restablecer tu contraseña." });
        setView("login");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(30deg, #475569 12%, transparent 12.5%, transparent 29%, #475569 29%, #475569 29.5%, transparent 29.5%, transparent 51%, #475569 51%, #475569 51.5%, transparent 51.5%, transparent 73%, #475569 73%, #475569 73.5%, transparent 73.5%)", backgroundSize: "60px 60px" }} />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-900 shadow-lg">
              <Calculator className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight">ContaFlow</h1>
              <p className="text-sm text-slate-400">Enterprise Accounting System</p>
            </div>
          </div>
          
          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl font-serif font-bold leading-tight">Gestión financiera y contable integral</h2>
            <p className="text-lg text-slate-300">Plataforma modular para administración empresarial, control de libros contables, facturación y reportes financieros en tiempo real.</p>
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-amber-500">+15M</p>
                <p className="text-sm text-slate-400">Transacciones</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-500">99.9%</p>
                <p className="text-sm text-slate-400">Confiabilidad</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <ShieldCheck className="h-5 w-5 text-amber-500" />
            <span>Cifrado de extremo a extremo. Cumplimiento NIIF garantizado.</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="h-11 w-11 rounded-xl bg-amber-500 flex items-center justify-center text-slate-900">
              <Landmark className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">ContaFlow</h1>
          </div>

          <Card className="border-slate-200 shadow-xl rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6 pt-8 px-8">
              {view === "login" && (
                <>
                  <CardTitle className="text-2xl font-serif text-slate-900">Bienvenido de nuevo</CardTitle>
                  <CardDescription className="text-slate-500">Ingresa tus credenciales para acceder al panel</CardDescription>
                </>
              )}
              {view === "register" && (
                <>
                  <CardTitle className="text-2xl font-serif text-slate-900">Crear una cuenta</CardTitle>
                  <CardDescription className="text-slate-500">Regístrate para acceder al sistema de contabilidad</CardDescription>
                </>
              )}
              {view === "forgot" && (
                <>
                  <CardTitle className="text-2xl font-serif text-slate-900">¿Olvidaste tu contraseña?</CardTitle>
                  <CardDescription className="text-slate-500">Ingresa tu correo y te enviaremos un enlace de recuperación</CardDescription>
                </>
              )}
            </CardHeader>

            <CardContent className="px-8 pb-8 pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {view === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700">Nombre completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input id="name" placeholder="Contador Juan Pérez" className="pl-10 bg-slate-50 border-slate-200 focus:border-amber-500 focus:ring-amber-500" required />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="email" type="email" placeholder="contador@contaflow.com" className="pl-10 bg-slate-50 border-slate-200 focus:border-amber-500 focus:ring-amber-500" required />
                  </div>
                </div>

                {view !== "forgot" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-700">Contraseña</Label>
                      {view === "login" && (
                        <button type="button" onClick={() => setView("forgot")} className="text-xs text-amber-600 hover:text-amber-700 hover:underline">
                          ¿Olvidaste tu contraseña?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="pl-10 pr-10 bg-slate-50 border-slate-200 focus:border-amber-500 focus:ring-amber-500" 
                        required 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {view === "login" && (
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
                    <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">Mantener sesión iniciada</Label>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-xl h-11 text-base shadow-sm transition-colors"
                  disabled={loading}
                >
                  {loading ? "Procesando..." : view === "login" ? "Iniciar sesión" : view === "register" ? "Registrarse" : "Enviar enlace"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                {view === "login" && (
                  <>
                    ¿No tienes una cuenta?{" "}
                    <button onClick={() => setView("register")} className="font-medium text-amber-600 hover:text-amber-700 hover:underline">
                      Regístrate aquí
                    </button>
                  </>
                )}
                {view === "register" && (
                  <>
                    ¿Ya tienes una cuenta?{" "}
                    <button onClick={() => setView("login")} className="font-medium text-amber-600 hover:text-amber-700 hover:underline">
                      Inicia sesión
                    </button>
                  </>
                )}
                {view === "forgot" && (
                  <button onClick={() => setView("login")} className="inline-flex items-center gap-1 font-medium text-amber-600 hover:text-amber-700 hover:underline">
                    <ArrowLeft className="h-4 w-4" /> Volver a inicio de sesión
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <p className="text-center text-xs text-slate-400 mt-6">
            © 2025 ContaFlow Enterprise. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}