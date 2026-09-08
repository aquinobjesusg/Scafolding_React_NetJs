'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Mail, Lock, User, ArrowLeft, Apple } from "lucide-react";
import type { View, AuthMode } from "@/App";

interface Props {
  initialMode: AuthMode;
  onNavigate: (view: View, mode?: AuthMode) => void;
}

export function AuthScreen({ initialMode, onNavigate }: Props) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-white">
      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold">Lingua</span>
          </div>
          <h2 className="font-serif text-4xl font-bold leading-tight mb-4">
            El mundo<br />a tu alcance.
          </h2>
          <p className="text-teal-100 max-w-sm leading-relaxed">
            Únete a millones de estudiantes que ya hablan un nuevo idioma con confianza.
          </p>
        </div>
        <div className="relative space-y-4">
          {["Conversaciones con IA", "30+ idiomas", "Progreso sincronizado"].map((t) => (
            <div key={t} className="flex items-center gap-3 text-teal-50">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-slate-50">
        <div className="w-full max-w-sm">
          <Button variant="ghost" size="sm" onClick={() => onNavigate("landing")} className="mb-6 text-slate-500 hover:text-slate-800 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
          <Card className="shadow-lg border-slate-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">
                {mode === "login" && "Bienvenido de nuevo"}
                {mode === "register" && "Crea tu cuenta"}
                {mode === "forgot" && "Recuperar acceso"}
              </CardTitle>
              <CardDescription>
                {mode === "login" && "Ingresa para continuar tu aprendizaje."}
                {mode === "register" && "Empieza a aprender hoy mismo, gratis."}
                {mode === "forgot" && "Te enviaremos un enlace para restablecer tu contraseña."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mode !== "forgot" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="border-slate-300 hover:bg-slate-100 bg-white">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      Google
                    </Button>
                    <Button variant="outline" className="border-slate-300 hover:bg-slate-100 bg-white">
                      <Apple className="w-4 h-4 mr-2" />
                      Apple
                    </Button>
                  </div>
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">o</span></div>
                  </div>
                </>
              )}

              {mode === "register" && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input id="name" placeholder="María García" className="pl-9" />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input id="email" type="email" placeholder="tu@email.com" className="pl-9" />
                </div>
              </div>

              {mode !== "forgot" && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    {mode === "login" && (
                      <button onClick={() => setMode("forgot")} className="text-xs text-teal-700 hover:underline">
                        ¿Olvidaste tu contraseña?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input id="password" type="password" placeholder="••••••••" className="pl-9" />
                  </div>
                </div>
              )}

              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-sm" onClick={() => onNavigate("admin")}>
                {mode === "login" && "Iniciar sesión"}
                {mode === "register" && "Crear cuenta"}
                {mode === "forgot" && "Enviar enlace"}
              </Button>

              <div className="text-center text-sm text-slate-600 pt-2">
                {mode === "login" && (
                  <>¿No tienes cuenta?{" "}
                    <button onClick={() => setMode("register")} className="text-teal-700 font-semibold hover:underline">Regístrate</button>
                  </>
                )}
                {mode === "register" && (
                  <>¿Ya tienes cuenta?{" "}
                    <button onClick={() => setMode("login")} className="text-teal-700 font-semibold hover:underline">Inicia sesión</button>
                  </>
                )}
                {mode === "forgot" && (
                  <button onClick={() => setMode("login")} className="text-teal-700 font-semibold hover:underline">Volver a iniciar sesión</button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}