import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Stethoscope, User, Mail, Lock, ArrowLeft, Eye, EyeOff, ShieldCheck, HeartPulse } from "lucide-react";
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
    <div className="min-h-screen flex bg-sky-50">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-sky-600 to-cyan-500">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <Stethoscope className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight">MediCore</h1>
              <p className="text-sm text-sky-100">Enterprise Health System</p>
            </div>
          </div>
          
          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl font-serif font-bold leading-tight">Gestión clínica integral para el siglo XXI</h2>
            <p className="text-lg text-sky-100">Plataforma modular para administración hospitalaria, gestión de pacientes y análisis de datos en tiempo real.</p>
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold">+12k</p>
                <p className="text-sm text-sky-200">Pacientes activos</p>
              </div>
              <div>
                <p className="text-3xl font-bold">99.9%</p>
                <p className="text-sm text-sky-200">Disponibilidad</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-sky-100">
            <ShieldCheck className="h-5 w-5" />
            <span>Certificado y seguro. Cumplimiento HIPAA garantizado.</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="h-11 w-11 rounded-xl bg-sky-600 flex items-center justify-center text-white">
              <HeartPulse className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">MediCore</h1>
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
                  <CardDescription className="text-slate-500">Regístrate para acceder al sistema de gestión</CardDescription>
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
                      <Input id="name" placeholder="Dr. Juan Pérez" className="pl-10 bg-slate-50 border-slate-200 focus:border-sky-500 focus:ring-sky-500" required />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="email" type="email" placeholder="doctor@medicore.com" className="pl-10 bg-slate-50 border-slate-200 focus:border-sky-500 focus:ring-sky-500" required />
                  </div>
                </div>

                {view !== "forgot" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-700">Contraseña</Label>
                      {view === "login" && (
                        <button type="button" onClick={() => setView("forgot")} className="text-xs text-sky-600 hover:text-sky-700 hover:underline">
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
                        className="pl-10 pr-10 bg-slate-50 border-slate-200 focus:border-sky-500 focus:ring-sky-500" 
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
                    <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                    <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">Mantener sesión iniciada</Label>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl h-11 text-base shadow-sm transition-colors"
                  disabled={loading}
                >
                  {loading ? "Procesando..." : view === "login" ? "Iniciar sesión" : view === "register" ? "Registrarse" : "Enviar enlace"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                {view === "login" && (
                  <>
                    ¿No tienes una cuenta?{" "}
                    <button onClick={() => setView("register")} className="font-medium text-sky-600 hover:text-sky-700 hover:underline">
                      Regístrate aquí
                    </button>
                  </>
                )}
                {view === "register" && (
                  <>
                    ¿Ya tienes una cuenta?{" "}
                    <button onClick={() => setView("login")} className="font-medium text-sky-600 hover:text-sky-700 hover:underline">
                      Inicia sesión
                    </button>
                  </>
                )}
                {view === "forgot" && (
                  <button onClick={() => setView("login")} className="inline-flex items-center gap-1 font-medium text-sky-600 hover:text-sky-700 hover:underline">
                    <ArrowLeft className="h-4 w-4" /> Volver a inicio de sesión
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <p className="text-center text-xs text-slate-400 mt-6">
            © 2025 MediCore Health Systems. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}