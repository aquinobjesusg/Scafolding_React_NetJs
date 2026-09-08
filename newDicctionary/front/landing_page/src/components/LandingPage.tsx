'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MessageSquare, Brain, Sparkles, ArrowRight, Check } from "lucide-react";
import type { View, AuthMode } from "@/App";

const API_URL = "http://localhost:8080";

interface Props {
  onNavigate: (view: View, mode?: AuthMode) => void;
}

export function LandingPage({ onNavigate }: Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const handleLogin1 = async (e: React.FormEvent) => {
    e.preventDefault();


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

        if (data?.error != "ok") {
          alert(data?.error);
        } else {
          // onLogin(); // Cambia a la vista principal
        }

      } else {
        alert(data?.error);
        //console.log("Fetch NO Correcto");
        //toast.error(data.message || "Credenciales inválidas. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      // toast.error("Error de conexión. Intenta más tarde.");
    } finally {

      alert('Finalizar');
    }

  };

  const handleLogin2 = async (e: React.FormEvent) => {
    e.preventDefault();


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

        if (data?.error != "ok") {
          alert(data?.error);
        } else {
          // onLogin(); // Cambia a la vista principal
        }

      } else {
        alert(data?.error);
        //console.log("Fetch NO Correcto");
        //toast.error(data.message || "Credenciales inválidas. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      // toast.error("Error de conexión. Intenta más tarde.");
    } finally {

      alert('Finalizar');
    }

  };

  const handleLogin3 = async (e: React.FormEvent) => {
    e.preventDefault();


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

        if (data?.error != "ok") {
          alert(data?.error);
        } else {
          // onLogin(); // Cambia a la vista principal
        }

      } else {
        alert(data?.error);
        //console.log("Fetch NO Correcto");
        //toast.error(data.message || "Credenciales inválidas. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      // toast.error("Error de conexión. Intenta más tarde.");
    } finally {

      alert('Finalizar');
    }

  };

  return (
    <div className="bg-gradient-to-b from-teal-50 via-white to-white">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 border-b border-teal-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm">
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold text-slate-800">Lingua</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-teal-700 transition-colors">Características</a>
            <a href="#pricing" className="hover:text-teal-700 transition-colors">Precios</a>
            {/* <a href="#testimonials" className="hover:text-teal-700 transition-colors">Testimonios</a> */}
          </nav>
          <div className="flex items-center gap-3">
            {/* <Button variant="ghost" onClick={() => onNavigate("auth", "login")} className="text-slate-700 hover:text-teal-700">
              Iniciar sesión
            </Button> */}

            {/* <Button onClick={() => onNavigate("auth", "register")} className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm">
              Registrarse
            </Button> */}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 via-transparent to-amber-50/40 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Nuevo: IA conversacional 24/7
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-slate-900 mb-5">
              Aprende cualquier idioma como si vivieras en el país
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Cursos interactivos, conversaciones reales con IA y un método científico que te hace hablar desde el primer día.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-3"> */}
            {/* <a href="http://localhost:3001/" target="_blank" className="bg-teal-600 hover:bg-teal-700 text-white shadow-md"> Empezar </a> */}
            {/* <Button size="lg" onClick={() => onNavigate("auth", "register")} className="bg-teal-600 hover:bg-teal-700 text-white shadow-md">
                Empezar gratis <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate("auth", "login")} className="border-slate-300 text-slate-700 hover:bg-slate-50">
                Ver demo
              </Button> */}
            {/* </div> */}
            {/* <div className="mt-6 flex items-center gap-5 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-teal-600" /> Sin tarjeta</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-teal-600" /> 14 días gratis</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-teal-600" /> Cancela cuando quieras</span>
            </div> */}
          </div>
          {/* <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-teal-200 to-amber-200 rounded-3xl blur-2xl opacity-40" />
            <Card className="relative shadow-xl border-teal-100 overflow-hidden">
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-6 text-white">
                <p className="text-sm opacity-80">Lección 3 · Conversación</p>
                <p className="font-serif text-2xl font-bold mt-1">"¿Dónde está la estación?"</p>
              </div>
              <CardContent className="p-6 space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-teal-700" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-2 text-sm">
                    La estación está a dos cuadras, a la derecha.
                  </div>
                </div>
                <div className="flex gap-3 items-start justify-end">
                  <div className="bg-teal-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 text-sm">
                    ¡Gracias! ¿Y el horario de trenes?
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Brain className="w-4 h-4 text-amber-700" />
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Progreso de lección</span>
                  <span className="font-semibold text-teal-700">75%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full" />
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-3">Por qué funciona</h2>
          <p className="text-slate-600">Un método basado en ciencia cognitiva y miles de horas de práctica real.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "IA conversacional", desc: "Practica con un tutor IA que se adapta a tu nivel y corrige tu pronunciación en tiempo real.", color: "teal" },
            { icon: MessageSquare, title: "Conversaciones reales", desc: "Simulaciones de la vida real: restaurante, trabajo, viaje. Aprende lo que usarás.", color: "amber" },
            { icon: Globe, title: "30+ idiomas", desc: "Desde español hasta japonés. Cambia entre idiomas sin perder tu progreso.", color: "rose" },
          ].map((f, i) => (
            <Card key={i} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-${f.color}-100 flex items-center justify-center mb-3`}>
                  <f.icon className={`w-6 h-6 text-${f.color}-700`} />
                </div>
                <CardTitle className="font-serif text-xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-3">Planes simples</h2>
            <p className="text-slate-600">Empieza gratis. Mejora cuando estés listo.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="rounded-2xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Básico</CardTitle>
                <p className="text-3xl font-bold text-slate-900 mt-2">100<span className="text-base font-normal text-slate-500"></span></p>

              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> 3 lecciones diarias</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> 1 idioma</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Comunidad</div>
                <form onSubmit={handleLogin1}>
                  <Button type="submit" className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white" >Comenzar</Button>
                </form>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-teal-200 shadow-md relative bg-gradient-to-b from-teal-50/50 to-white">

              <CardHeader>

                <CardTitle className="font-serif text-2xl">Intermedio</CardTitle>
                <p className="text-3xl font-bold text-slate-900 mt-2">200<span className="text-base font-normal text-slate-500"></span></p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Lecciones ilimitadas</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> 30+ idiomas</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Tutor IA 24/7</div>
                <form onSubmit={handleLogin2}>
                  <Button type="submit" className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white" >Comenzar</Button>
                </form>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-teal-200 shadow-md relative bg-gradient-to-b from-teal-50/50 to-white">

              <CardHeader>

                <CardTitle className="font-serif text-2xl">Avanzado</CardTitle>
                <p className="text-3xl font-bold text-slate-900 mt-2">300<span className="text-base font-normal text-slate-500"></span></p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Lecciones ilimitadas</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> 30+ idiomas</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Tutor IA 24/7</div>
                <form onSubmit={handleLogin3}>
                  <Button type="submit" className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white" >Comenzar</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <Globe className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-slate-800">Lingua</span>
          </div>
          <p className="text-sm text-slate-500">© 2025 Lingua. Aprende sin límites.</p>
          <Button variant="link" onClick={() => onNavigate("auth", "register")} className="text-slate-500 hover:text-teal-700">
            Acceso administradores
          </Button>
        </div>
      </footer>
    </div>
  );
}