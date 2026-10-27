'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Landmark, User, Mail, Lock, ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";
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
    <div className="min-h-screen flex bg-indigo-50/30">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-violet-700">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(30deg, #4338ca 12%, transparent 12.5%, transparent 29%, #4338ca 29%, #4338ca 29.5%, transparent 29.5%, transparent 51%, #4338ca 51%, #4338ca 51.5%, transparent 51.5%, transparent 73%, #4338ca 73%, #4338ca 73.5%, transparent 73.5%)", backgroundSize: "60px 60px" }} />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-violet-200 shadow-lg border border-white/20">
              <Landmark className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight">CajaSegura</h1>
              <p className="text-sm text-indigo-200">Savings & Credit System</p>
            </div>
          </div>
          
          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl font-serif font-bold leading-tight">Banca digital confiable para tu futuro</h2>
            <p className="text-lg text-indigo-100">Plataforma integral para gestión de ahorros, préstamos, socios y transacciones financieras con total seguridad y transparencia.</p>
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-violet-300">+50K</p>
                <p className="text-sm text-indigo-200">Socios activos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-violet-300">99.9%</p>
                <p className="text-sm text-indigo-200">Disponibilidad</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-indigo-200">
            <ShieldCheck className="h-5 w-5 text-violet-300" />
            <span>Seguridad bancaria. Cumplimiento de normativas financieras internacionales.</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="h-11 w-11 rounded-xl bg-blue-900 flex items-center justify-center text-violet-200">
              <Landmark className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">CajaSegura</h1>
          </div>

          <Card className="border-indigo-100 shadow-xl rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6 pt-8 px-8">
              {view === "login" && (
                <>
                  <CardTitle className="text-2xl font-serif text-blue-900">Acceso a la plataforma</CardTitle>
                  <CardDescription className="text-slate-500">Ingresa tus credenciales para gestionar la caja de ahorros</CardDescription>
                </>
              )}
              {view === "register" && (
                <>
                  <CardTitle className="text-2xl font-serif text-blue-900">Registro de nuevo socio</CardTitle>
                  <CardDescription className="text-slate-500">Crea tu cuenta para acceder a los servicios financieros</CardDescription>
                </>
              )}
              {view === "forgot" && (
                <>
                  <CardTitle className="text-2xl font-serif text-blue-900">Recuperar acceso</CardTitle>
                  <CardDescription className="text-slate-500">Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña</CardDescription>
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
                      <Input id="name" placeholder="Juan Pérez" className="pl-10 bg-indigo-50/30 border-indigo-100 focus:border-violet-500 focus:ring-violet-500" required />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="email" type="email" placeholder="admin@cajasegura.com" className="pl-10 bg-indigo-50/30 border-indigo-100 focus:border-violet-500 focus:ring-violet-500" required />
                  </div>
                </div>

                {view !== "forgot" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-700">Contraseña</Label>
                      {view === "login" && (
                        <button type="button" onClick={() => setView("forgot")} className="text-xs text-violet-700 hover:text-violet-800 hover:underline">
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
                        className="pl-10 pr-10 bg-indigo-50/30 border-indigo-100 focus:border-violet-500 focus:ring-violet-500" 
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
                    <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                    <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">Recordar mi sesión</Label>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-900 to-violet-700 hover:from-blue-800 hover:to-violet-600 text-white font-medium rounded-xl h-11 text-base shadow-md transition-all"
                  disabled={loading}
                >
                  {loading ? "Procesando..." : view === "login" ? "Iniciar sesión" : view === "register" ? "Registrarme" : "Enviar instrucciones"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                {view === "login" && (
                  <>
                    ¿No tienes una cuenta?{" "}
                    <button onClick={() => setView("register")} className="font-medium text-violet-700 hover:text-violet-800 hover:underline">
                      Regístrate aquí
                    </button>
                  </>
                )}
                {view === "register" && (
                  <>
                    ¿Ya tienes una cuenta?{" "}
                    <button onClick={() => setView("login")} className="font-medium text-violet-700 hover:text-violet-800 hover:underline">
                      Inicia sesión
                    </button>
                  </>
                )}
                {view === "forgot" && (
                  <button onClick={() => setView("login")} className="inline-flex items-center gap-1 font-medium text-violet-700 hover:text-violet-800 hover:underline">
                    <ArrowLeft className="h-4 w-4" /> Volver a inicio de sesión
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <p className="text-center text-xs text-slate-400 mt-6">
            © 2025 CajaSegura. Institución financiera de ahorro y crédito.
          </p>
        </div>
      </div>
    </div>
  );
}