'use client'
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";

type Mode = "login" | "register" | "forgot";

export function AuthModal({
  open,
  mode,
  onModeChange,
  onClose,
  onSuccess,
}: {
  open: boolean;
  mode: Mode;
  onModeChange: (m: Mode) => void;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") {
      setSent(true);
      return;
    }
    onSuccess();
  };

  const resetState = () => {
    setSent(false);
    setEmail("");
    setPassword("");
    setName("");
  };

  const titles: Record<Mode, { title: string; desc: string }> = {
    login: { title: "Iniciar sesión", desc: "Accede a tu panel de administración" },
    register: { title: "Crear cuenta", desc: "Regístrate y empieza tu prueba gratis" },
    forgot: { title: "Recuperar contraseña", desc: "Te enviaremos un enlace de restablecimiento" },
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          resetState();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <div className="absolute inset-x-0 top-0 h-24 rounded-t-lg bg-gradient-to-br from-indigo-600 to-indigo-500" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md ring-1 ring-slate-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
            F
          </div>
        </div>
        <DialogHeader className="pt-2">
          <DialogTitle className="text-2xl font-bold text-slate-900">{titles[mode].title}</DialogTitle>
          <DialogDescription className="text-slate-600">{titles[mode].desc}</DialogDescription>
        </DialogHeader>

        {mode === "forgot" && sent ? (
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800 ring-1 ring-emerald-200">
              Si existe una cuenta con <span className="font-semibold">{email}</span>, recibirás un correo con
              instrucciones para restablecer tu contraseña.
            </div>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => {
                resetState();
                onModeChange("login");
              }}
            >
              Volver a iniciar sesión
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Juan Pérez"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@empresa.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            {mode !== "forgot" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => onModeChange("forgot")}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              {mode === "login" && "Entrar al panel"}
              {mode === "register" && "Crear cuenta"}
              {mode === "forgot" && "Enviar enlace"}
            </Button>

            <div className="pt-2 text-center text-sm text-slate-600">
              {mode === "login" && (
                <>
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => onModeChange("register")}
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Regístrate
                  </button>
                </>
              )}
              {mode === "register" && (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => onModeChange("login")}
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Inicia sesión
                  </button>
                </>
              )}
              {mode === "forgot" && (
                <button
                  type="button"
                  onClick={() => onModeChange("login")}
                  className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  <ArrowLeft className="h-3 w-3" /> Volver
                </button>
              )}
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}