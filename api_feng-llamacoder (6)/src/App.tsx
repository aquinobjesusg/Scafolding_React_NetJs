import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Check, ChevronRight, Globe, Lock, Mail, User, Loader2, AlertCircle } from "lucide-react";
import { AdminPanel } from "@/components/AdminPanel";
import { api } from "@/lib/api";

type AuthMode = "login" | "register" | "forgot";

export default function App() {
  const [view, setView] = useState<"landing" | "admin">("landing");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<any>(null);
  
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      if (authMode === "login") {
        const res = await api.auth.login(loginData.email, loginData.password);
        setAuthToken(res.token);
        setAuthUser(res.user);
        setIsAuthModalOpen(false);
        setView("admin");
      } else if (authMode === "register") {
        const res = await api.auth.register(registerData.name, registerData.email, registerData.password);
        setAuthToken(res.token);
        setAuthUser(res.user);
        setIsAuthModalOpen(false);
        setView("admin");
      } else if (authMode === "forgot") {
        await api.auth.forgotPassword(forgotEmail);
        setError(null);
        alert("Se han enviado instrucciones a tu correo.");
        setAuthMode("login");
      }
    } catch (err: any) {
      setError(err.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  const handleExitAdmin = () => {
    setView("landing");
    setAuthToken(null);
    setAuthUser(null);
  };

  if (view === "admin" && authToken) {
    return <AdminPanel onExit={handleExitAdmin} token={authToken} user={authUser} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-md">F</div>
            <span className="text-xl font-bold tracking-tight">Feng Office</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Características</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Precios</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Nosotros</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => { setAuthMode("login"); setIsAuthModalOpen(true); }} className="text-slate-700">Iniciar Sesión</Button>
            <Button onClick={() => { setAuthMode("register"); setIsAuthModalOpen(true); }} className="bg-indigo-600 text-white hover:bg-indigo-700">Registrarse</Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm">
              <Globe className="h-4 w-4" /> Plataforma Todo en Uno
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Gestiona tu negocio <span className="text-indigo-600">de forma inteligente</span>
            </h1>
            <p className="mb-8 text-lg text-slate-600 sm:text-xl">
              Feng Office es la solución integral para la gestión de proyectos, facturación, cursos y estadísticas de tu empresa. Todo en un solo lugar.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" onClick={() => { setAuthMode("register"); setIsAuthModalOpen(true); }} className="bg-indigo-600 text-white hover:bg-indigo-700 w-full sm:w-auto">
                Prueba Gratis 30 días <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => { setAuthMode("login"); setIsAuthModalOpen(true); }} className="border-slate-300 w-full sm:w-auto">
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Planes y Precios</h2>
            <p className="mt-4 text-lg text-slate-600">Elige el plan que mejor se adapte a las necesidades de tu equipo.</p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="border-slate-200 shadow-sm flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Starter</CardTitle>
                <CardDescription>Ideal para freelancers y pequeños proyectos</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">€9</span>
                  <span className="text-slate-500">/mes</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> 5 Usuarios</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> 10 Proyectos</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> 1GB Almacenamiento</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> Soporte por Email</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50" onClick={() => { setAuthMode("register"); setIsAuthModalOpen(true); }}>Comenzar</Button>
              </CardFooter>
            </Card>

            <Card className="border-indigo-600 shadow-lg ring-2 ring-indigo-600 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow">MÁS POPULAR</div>
              <CardHeader>
                <CardTitle className="text-xl text-indigo-700">Professional</CardTitle>
                <CardDescription>Para equipos en crecimiento</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">€29</span>
                  <span className="text-slate-500">/mes</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> 25 Usuarios</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> Proyectos Ilimitados</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> 50GB Almacenamiento</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> Soporte Prioritario</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> Facturación Avanzada</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => { setAuthMode("register"); setIsAuthModalOpen(true); }}>Comenzar Prueba</Button>
              </CardFooter>
            </Card>

            <Card className="border-slate-200 shadow-sm flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Enterprise</CardTitle>
                <CardDescription>Para grandes corporaciones</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">€99</span>
                  <span className="text-slate-500">/mes</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> Usuarios Ilimitados</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> Almacenamiento Ilimitado</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> Soporte 24/7</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600" /> API Access</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50" onClick={() => { setAuthMode("register"); setIsAuthModalOpen(true); }}>Contactar</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">F</div>
              <span className="font-semibold text-slate-900">Feng Office</span>
            </div>
            <p className="text-sm text-slate-500">© 2023 Feng Office. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {authMode === "login" ? "Iniciar Sesión" : authMode === "register" ? "Crear Cuenta" : "Recuperar Contraseña"}
            </DialogTitle>
            <DialogDescription>
              {authMode === "login" ? "Ingresa a tu panel de administración" : authMode === "register" ? "Regístrate para empezar a gestionar tu negocio" : "Te enviaremos un correo con instrucciones"}
            </DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="flex items-center gap-2 rounded-md bg-rose-50 p-3 text-sm text-rose-700 border border-rose-200">
              <AlertCircle className="h-4 w-4" /> {error}
            </div>
          )}

          <div className="space-y-4 py-4">
            {authMode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input id="name" placeholder="Juan Pérez" className="pl-9" value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="email" type="email" placeholder="tu@correo.com" className="pl-9" value={authMode === "forgot" ? forgotEmail : (authMode === "login" ? loginData.email : registerData.email)} onChange={(e) => {
                  if (authMode === "login") setLoginData({ ...loginData, email: e.target.value });
                  else if (authMode === "register") setRegisterData({ ...registerData, email: e.target.value });
                  else setForgotEmail(e.target.value);
                }} />
              </div>
            </div>

            {authMode !== "forgot" && (
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-9" value={authMode === "login" ? loginData.password : registerData.password} onChange={(e) => {
                    if (authMode === "login") setLoginData({ ...loginData, password: e.target.value });
                    else setRegisterData({ ...registerData, password: e.target.value });
                  }} />
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="flex flex-col gap-1 text-sm text-slate-500">
              {authMode === "login" && (
                <>
                  <button onClick={() => { setAuthMode("forgot"); setError(null); }} className="text-left text-indigo-600 hover:underline">¿Olvidaste tu contraseña?</button>
                  <button onClick={() => { setAuthMode("register"); setError(null); }} className="text-left hover:underline">¿No tienes cuenta? Regístrate</button>
                </>
              )}
              {authMode === "register" && (
                <button onClick={() => { setAuthMode("login"); setError(null); }} className="text-left text-indigo-600 hover:underline">¿Ya tienes cuenta? Inicia sesión</button>
              )}
              {authMode === "forgot" && (
                <button onClick={() => { setAuthMode("login"); setError(null); }} className="text-left text-indigo-600 hover:underline">Volver a iniciar sesión</button>
              )}
            </div>
            <Button onClick={handleAuth} disabled={loading} className="bg-indigo-600 text-white hover:bg-indigo-700">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {authMode === "login" ? "Ingresar" : authMode === "register" ? "Registrarme" : "Enviar Enlace"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}