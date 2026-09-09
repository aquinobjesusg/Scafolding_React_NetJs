'use client'
import { useState } from "react";
import { BookA, LogIn, UserPlus, KeyRound, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { toast } from "sonner";

type AuthView = "login" | "register" | "forgot";

const API_URL = "http://localhost:8080";

export function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [view, setView] = useState<AuthView>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

try {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  // Leemos el cuerpo de la respuesta (tanto para éxito como para error)
  const data = await res.json().catch(() => ({}));

/*const contentType = res.headers.get("content-type");
if (contentType && contentType.includes("application/json")) {
  const data = await res.json();
} else {
  const data = await res.text();
}*/

  if (res.ok) {
    //console.log("Fetch Correcto");
    //console.log("Datos recibidos:", data); // 👈 Aquí ves todo lo que devuelve la API

    // Puedes mostrar un mensaje con algún campo específico, ej: data.message
    //toast.success(data.message || "¡Bienvenido! Inicio de sesión exitoso.");

    // Si la API devuelve un token, lo guardas
    // localStorage.setItem('token', data.token);

    // 2️⃣ Mostrar SOLO el valor del campo 'error' en la consola
    //console.log("Valor del campo 'error':", data?.error);

    if( data?.error != "ok" ) {
      alert(data?.error);
    } else {
      onLogin(); // Cambia a la vista principal
    }

  } else {
    alert(data?.error);
    //console.log("Fetch NO Correcto");
    //toast.error(data.message || "Credenciales inválidas. Intenta de nuevo.");
  }
} catch (error) {
  console.error("Error de red:", error);
  toast.error("Error de conexión. Intenta más tarde.");
} finally {
      setIsLoading(false);
    }

  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

try {
  const res = await fetch(`${API_URL}/registrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, apellido, email, password, usuario }),
  });

  // Leemos el cuerpo de la respuesta (tanto para éxito como para error)
  const data = await res.json().catch(() => ({}));

  if (res.ok) {

    if( data?.error != "ok" ) {
      alert(data?.error);
    } else {
        setNombre("");
        setEmail("");
        setPassword("");
        setApellido("");
        setUsuario("");
        setView("login");
      //onLogin(); // Cambia a la vista principal
    }

  } else {
    alert(data?.error);
    //console.log("Fetch NO Correcto");
    //toast.error(data.message || "Credenciales inválidas. Intenta de nuevo.");
  }
} catch (error) {
  console.error("Error de red:", error);
  toast.error("Error de conexión. Intenta más tarde.");
} finally {
      setIsLoading(false);
    }

    /*try {
      var url = `${API_URL}/registrar`;
      alert(url);
      const res = await fetch(`${API_URL}/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: name, email, password }),
      });
      //const { nombre, apellido, email, password, usuario } = req.body;

      if (res.ok) {
        toast.success("Cuenta creada exitosamente. Ahora inicia sesión.");
        setView("login");
        // Limpiar campos
        setName("");
        setEmail("");
        setPassword("");
        setSecondName("");
        setUsuario("");
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Error al registrar el usuario.");
      }
    } catch (error) {
      toast.error("Error de conexión. Verifica tu red.");
    } finally {
      setIsLoading(false);
    }
    */
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulación de envío de recuperación (puedes adaptar a tu API)
      // Ejemplo: await fetch(`${API_URL}/recuperar`, { method: "POST", body: JSON.stringify({ email }) });
      toast.success("Se han enviado las instrucciones a tu correo.");
      setView("login");
    } catch (error) {
      toast.error("Error al enviar las instrucciones.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (view === "login") {
      handleLogin(e);
    } else if (view === "register") {
      handleRegister(e);
    } else if (view === "forgot") {
      handleForgot(e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-sky-900 to-cyan-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-600 shadow-lg">
            <BookA className="h-8 w-8 text-white" strokeWidth={1.8} />
          </div>
          <h1 className="font-serif text-2xl font-bold text-sky-100">
            DicccSystemsYa
          </h1>
          <p className="mt-1 text-sm text-sky-200/80">
            Aprende inglés de forma práctica y espontánea
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-sky-800/60 bg-slate-900/80 p-8 shadow-xl backdrop-blur">
          {view === "login" && (
            <>
              <h2 className="mb-1 font-serif text-xl font-bold text-sky-100">
                Iniciar Sesión
              </h2>
              <p className="mb-6 text-sm text-sky-200/70">
                Ingresa a tu cuenta para continuar aprendiendo
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sky-100">
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300/70" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@correo.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-sky-700 bg-slate-800/60 pl-10 text-sky-50 placeholder:text-sky-300/40 focus:border-sky-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sky-100">
                      Contraseña
                    </Label>
                    {/*<button
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-xs text-sky-300 transition-colors hover:text-sky-100"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>*/}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300/70" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-sky-700 bg-slate-800/60 pl-10 pr-10 text-sky-50 placeholder:text-sky-300/40 focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-300/70 hover:text-sky-100"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-sky-600 to-emerald-700 text-white shadow-lg hover:from-sky-500 hover:to-emerald-600 disabled:opacity-70"
                >
                  {isLoading ? "Validando..." : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Entrar
                    </>
                  )}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-sky-200/70">
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => setView("register")}
                  className="font-medium text-sky-300 transition-colors hover:text-sky-100"
                >
                  Regístrate aquí
                </button>
              </p>
            </>
          )}

          {view === "register" && (
            <>
              <h2 className="mb-1 font-serif text-xl font-bold text-sky-100">
                Crear Cuenta
              </h2>
              <p className="mb-6 text-sm text-sky-200/70">
                Comienza tu camino hacia el dominio del inglés
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sky-100">
                    Nombre 
                  </Label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300/70" />
                    <Input
                      id="nombre"
                      type="text"
                      placeholder="Jesús"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="border-sky-700 bg-slate-800/60 pl-10 text-sky-50 placeholder:text-sky-300/40 focus:border-sky-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sky-100">
                    Apellido
                  </Label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300/70" />
                    <Input
                      id="apellido"
                      type="text"
                      placeholder="Pérez"
                      required
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      className="border-sky-700 bg-slate-800/60 pl-10 text-sky-50 placeholder:text-sky-300/40 focus:border-sky-500"
                    />
                  </div>
                </div>
                  <div className="space-y-2">
                  <Label htmlFor="usuario" className="text-sky-100">
                    Usuario
                  </Label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300/70" />
                    <Input
                      id="usuario"
                      type="text"
                      placeholder="jperez"
                      required
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      className="border-sky-700 bg-slate-800/60 pl-10 text-sky-50 placeholder:text-sky-300/40 focus:border-sky-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="text-sky-100">
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300/70" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="tu@correo.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-sky-700 bg-slate-800/60 pl-10 text-sky-50 placeholder:text-sky-300/40 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="text-sky-100">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300/70" />
                    <Input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-sky-700 bg-slate-800/60 pl-10 pr-10 text-sky-50 placeholder:text-sky-300/40 focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-300/70 hover:text-sky-100"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg hover:from-emerald-500 hover:to-teal-600 disabled:opacity-70"
                >
                  {isLoading ? "Creando cuenta..." : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Registrarme
                    </>
                  )}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-sky-200/70">
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => setView("login")}
                  className="font-medium text-sky-300 transition-colors hover:text-sky-100"
                >
                  Inicia sesión
                </button>
              </p>
            </>
          )}

          {view === "forgot" && (
            <>
              <button
                onClick={() => setView("login")}
                className="mb-4 flex items-center gap-1 text-sm text-sky-300 transition-colors hover:text-sky-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </button>
              <h2 className="mb-1 font-serif text-xl font-bold text-sky-100">
                Recuperar Contraseña
              </h2>
              <p className="mb-6 text-sm text-sky-200/70">
                Te enviaremos un enlace para restablecer tu contraseña
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-sky-100">
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300/70" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="tu@correo.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-sky-700 bg-slate-800/60 pl-10 text-sky-50 placeholder:text-sky-300/40 focus:border-sky-500"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-sky-600 to-emerald-700 text-white shadow-lg hover:from-sky-500 hover:to-emerald-600 disabled:opacity-70"
                >
                  {isLoading ? "Enviando..." : (
                    <>
                      <KeyRound className="mr-2 h-4 w-4" />
                      Enviar instrucciones
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}