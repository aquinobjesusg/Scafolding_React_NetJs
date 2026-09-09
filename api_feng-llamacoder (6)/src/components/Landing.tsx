import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Users, Building2, Globe, Award, TrendingUp, Quote, ShoppingCart, Star, ArrowRight, MessageCircle, X, Send, LayoutDashboard, LogIn, UserPlus, Home, Package, Info, Tag } from "lucide-react";

const planes = [
  {
    nombre: "Starter",
    precio: "9€",
    descripcion: "Para equipos pequeños que comienzan a organizar su trabajo.",
    color: "emerald",
    destacado: false,
    caracteristicas: [
      "Hasta 5 usuarios",
      "Gestión de tareas y proyectos",
      "1 GB de almacenamiento",
      "Soporte por correo electrónico",
      "Aplicaciones móviles",
    ],
  },
  {
    nombre: "Business",
    precio: "29€",
    descripcion: "Para empresas en crecimiento que necesitan más control.",
    color: "indigo",
    destacado: true,
    caracteristicas: [
      "Usuarios ilimitados",
      "Gestión de documentos y wiki",
      "10 GB de almacenamiento",
      "Roles y permisos avanzados",
      "Soporte prioritario 24/7",
      "Integraciones de terceros",
      "Informes y métricas",
    ],
  },
  {
    nombre: "Enterprise",
    precio: "Personalizado",
    descripcion: "Solución a medida para grandes organizaciones.",
    color: "amber",
    destacado: false,
    caracteristicas: [
      "Almacenamiento ilimitado",
      "SSO y autenticación SAML",
      "Servidor dedicado opcional",
      "Gestor de cuenta dedicado",
      "Acuerdo de nivel de servicio (SLA)",
      "Personalización avanzada",
    ],
  },
];

const caracteristicasGenerales = [
  { titulo: "Gestión de proyectos", desc: "Organice tareas, hitos y plazos en un solo lugar." },
  { titulo: "Documentos y wiki", desc: "Cree y comparta conocimiento con su equipo." },
  { titulo: "Calendario compartido", desc: "Mantenga a todos sincronizados con eventos clave." },
  { titulo: "Facturación y horas", desc: "Registre el tiempo invertido por cliente y proyecto." },
  { titulo: "Notificaciones en tiempo real", desc: "Reciba alertas instantáneas de cambios importantes." },
  { titulo: "Seguridad de nivel empresarial", desc: "Cifrado, copias de seguridad y control de acceso." },
];

const trayectoria = [
  { anio: "2008", titulo: "Fundación", desc: "Feng Office nace como una plataforma de colaboración web para equipos distribuidos." },
  { anio: "2012", titulo: "Expansión global", desc: "Superamos los 50.000 usuarios en más de 40 países con versiones en 20 idiomas." },
  { anio: "2016", titulo: "Versión 3.0", desc: "Rediseño completo con módulos de facturación, wiki y gestión documental avanzada." },
  { anio: "2020", titulo: "Cloud nativo", desc: "Migramos toda la infraestructura a la nube con despliegues en múltiples regiones." },
  { anio: "2024", titulo: "IA integrada", desc: "Incorporamos asistentes de IA para resúmenes, priorización de tareas y análisis predictivo." },
];

const productos = [
  {
    nombre: "Project Management",
    desc: "Planifique proyectos con diagramas de Gantt, tableros Kanban y seguimiento de hitos.",
    icon: TrendingUp,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    nombre: "Document Collaboration",
    desc: "Editor de documentos en tiempo real, control de versiones y wiki corporativa.",
    icon: Building2,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    nombre: "Time & Billing",
    desc: "Registre horas facturables, genere facturas y controle el presupuesto por cliente.",
    icon: Award,
    color: "bg-amber-50 text-amber-600",
  },
  {
    nombre: "Team Workspace",
    desc: "Espacios de trabajo personalizables con roles, permisos y notificaciones inteligentes.",
    icon: Users,
    color: "bg-rose-50 text-rose-600",
  },
];

const catalogo = [
  { nombre: "Feng Project Pro", area: "Gestión de Proyectos", desc: "Planifica, ejecuta y monitoriza proyectos con metodologías ágiles y tradicionales.", rating: 4.8, precio: "29€", color: "from-indigo-500 to-indigo-700" },
  { nombre: "Feng Docs Cloud", area: "Documentación", desc: "Crea, versiona y comparte documentos corporativos con edición colaborativa en tiempo real.", rating: 4.7, precio: "19€", color: "from-emerald-500 to-emerald-700" },
  { nombre: "Feng CRM Suite", area: "Ventas y CRM", desc: "Gestiona clientes, embudos de venta y automatiza el seguimiento comercial end-to-end.", rating: 4.6, precio: "39€", color: "from-amber-500 to-amber-700" },
  { nombre: "Feng HR Hub", area: "Recursos Humanos", desc: "Centraliza el ciclo de vida del empleado, vacaciones, nóminas y evaluaciones de desempeño.", rating: 4.5, precio: "49€", color: "from-rose-500 to-rose-700" },
  { nombre: "Feng Finance Flow", area: "Finanzas y Facturación", desc: "Automatiza facturación, conciliación bancaria y genera reportes financieros en tiempo real.", rating: 4.9, precio: "59€", color: "from-cyan-500 to-cyan-700" },
  { nombre: "Feng Inventory Pro", area: "Inventario y Logística", desc: "Controla existencias, proveedores y rastrea envíos con códigos de barras y QR.", rating: 4.4, precio: "35€", color: "from-violet-500 to-violet-700" },
  { nombre: "Feng Help Desk", area: "Soporte y Tickets", desc: "Sistema de tickets omnicanal con base de conocimiento y SLAs automatizados.", rating: 4.7, precio: "25€", color: "from-teal-500 to-teal-700" },
  { nombre: "Feng Marketing Kit", area: "Marketing", desc: "Planifica campañas, gestiona redes sociales y mide el ROI de tus acciones digitales.", rating: 4.3, precio: "45€", color: "from-fuchsia-500 to-fuchsia-700" },
  { nombre: "Feng Analytics AI", area: "Analítica e IA", desc: "Tableros de BI con predicciones basadas en IA para tomar decisiones basadas en datos.", rating: 4.8, precio: "79€", color: "from-blue-500 to-blue-700" },
  { nombre: "Feng Secure Vault", area: "Ciberseguridad", desc: "Gestor de contraseñas corporativo, cifrado de extremo a extremo y auditoría de accesos.", rating: 4.9, precio: "19€", color: "from-slate-600 to-slate-800" },
];

const casosExito = [
  {
    empresa: "TechNova Solutions",
    sector: "Tecnología",
    desc: "Redució un 40% el tiempo de gestión de proyectos y centralizó la documentación de 5 departamentos.",
    metrica: "40%",
    metricaLabel: "menos tiempo en gestión",
    color: "from-indigo-500 to-indigo-700",
  },
  {
    empresa: "Grupo Médico Vida",
    sector: "Salud",
    desc: "Digitalizó historiales y coordinó a 200+ profesionales con calendarios compartidos y roles.",
    metrica: "200+",
    metricaLabel: "profesionales coordinados",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    empresa: "Constructora Andina",
    sector: "Construcción",
    desc: "Gestionó 30 obras simultáneas con control de horas, facturación y reportes en tiempo real.",
    metrica: "30",
    metricaLabel: "obras en paralelo",
    color: "from-amber-500 to-amber-700",
  },
];

const colorMap: Record<string, { ring: string; btn: string; chip: string; glow: string }> = {
  emerald: {
    ring: "ring-emerald-200",
    btn: "bg-emerald-600 hover:bg-emerald-700 text-white",
    chip: "bg-emerald-100 text-emerald-700",
    glow: "from-emerald-50",
  },
  indigo: {
    ring: "ring-indigo-300 ring-2",
    btn: "bg-indigo-600 hover:bg-indigo-700 text-white",
    chip: "bg-indigo-100 text-indigo-700",
    glow: "from-indigo-50",
  },
  amber: {
    ring: "ring-amber-200",
    btn: "bg-amber-500 hover:bg-amber-600 text-white",
    chip: "bg-amber-100 text-amber-700",
    glow: "from-amber-50",
  },
};

type Message = {
  role: "bot" | "user";
  text: string;
  action?: string;
};

const botResponses: { keywords: string[]; response: string; action?: string }[] = [
  { keywords: ["hola", "buenos", "ayuda"], response: "¡Hola! Soy el asistente de Feng Office. Puedo ayudarte a encontrar información sobre nuestros productos, precios, casos de éxito o registrarte. ¿Qué necesitas?" },
  { keywords: ["precio", "plan", "costo", "planes"], response: "Tenemos 3 planes: Starter (9€), Business (29€) y Enterprise (Personalizado). ¿Quieres ver los detalles?", action: "planes" },
  { keywords: ["producto", "catalogo", "software", "areas"], response: "Contamos con un catálogo de 10 productos de software para diferentes áreas como Finanzas, RRHH, Marketing y más. ¿Te llevo al catálogo?", action: "catalogo" },
  { keywords: ["nosotros", "empresa", "trayectoria", "historia"], response: "Feng Office tiene más de 15 años de experiencia ayudando a empresas en 40+ países. ¿Quieres saber más sobre nosotros?", action: "nosotros" },
  { keywords: ["caso", "exito", "clientes"], response: "Tenemos casos de éxito en sectores como Tecnología, Salud y Construcción. ¿Te muestro algunos ejemplos?", action: "nosotros" },
  { keywords: ["registro", "registrar", "prueba", "cuenta"], response: "¡Genial! Puedes registrarte para obtener una prueba gratuita de 14 días. Te llevo al formulario.", action: "register" },
  { keywords: ["admin", "panel", "demo"], response: "Puedes explorar nuestro panel de administración tipo Udemy para ver cómo se ve la interfaz. ¿Te llevo ahí?", action: "admin" },
];

export function Landing({
  onAuth,
  onEnterAdmin,
}: {
  onAuth: (mode: "login" | "register" | "forgot") => void;
  onEnterAdmin: () => void;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "¡Hola! Soy FengBot. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre precios, productos, nuestra historia o cómo registrarte." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    
    const found = botResponses.find(b => b.keywords.some(k => input.toLowerCase().includes(k)));
    
    setTimeout(() => {
      if (found) {
        setMessages((prev) => [...prev, { role: "bot", text: found.response, action: found.action }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: "Lo siento, no tengo información sobre eso. Prueba preguntando por 'precios', 'productos', 'nosotros' o 'registro'." }]);
      }
    }, 500);

    setInput("");
  };

  const handleBotAction = (action?: string) => {
    if (!action) return;
    if (action === "register") onAuth("register");
    if (action === "admin") onEnterAdmin();
    if (action === "planes" || action === "catalogo" || action === "nosotros") {
      document.getElementById(action)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsChatOpen(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const mobileNavItems = [
    { icon: Home, label: "Inicio", action: () => scrollToSection("features") },
    { icon: Info, label: "Nosotros", action: () => scrollToSection("nosotros") },
    { icon: Package, label: "Catálogo", action: () => scrollToSection("catalogo") },
    { icon: Tag, label: "Precios", action: () => scrollToSection("planes") },
    { icon: LayoutDashboard, label: "Panel", action: onEnterAdmin },
    { icon: LogIn, label: "Ingresar", action: () => onAuth("login") },
    { icon: UserPlus, label: "Registro", action: () => onAuth("register") },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-200">
              F
            </div>
            <span className="text-xl font-bold tracking-tight">Feng Office</span>
          </div>
          <nav className="hidden items-center gap-8 lg:flex">
            <button onClick={() => scrollToSection("features")} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              Características
            </button>
            <button onClick={() => scrollToSection("nosotros")} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              Nosotros
            </button>
            <button onClick={() => scrollToSection("catalogo")} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              Catálogo
            </button>
            <button onClick={() => scrollToSection("planes")} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              Precios
            </button>
            <button onClick={() => scrollToSection("faq")} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              FAQ
            </button>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="ghost" onClick={() => onAuth("login")} className="text-slate-700 hover:text-indigo-600">
              Iniciar sesión
            </Button>
            <Button onClick={() => onAuth("register")} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              Registrarse
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-emerald-50" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm ring-1 ring-indigo-100">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              Plataforma todo-en-uno para equipos
            </span>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Gestione proyectos, documentos y equipos en un solo lugar
            </h1>
            <p className="mt-6 text-lg text-slate-600 md:text-xl">
              Feng Office reúne gestión de proyectos, wiki corporativa, calendario compartido y facturación
              en una plataforma colaborativa diseñada para empresas modernas.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => onAuth("register")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
              >
                Prueba gratis 14 días
              </Button>
              <Button size="lg" variant="outline" onClick={onEnterAdmin} className="border-slate-300 bg-white">
                Ver panel de administración
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-500">Sin tarjeta de crédito · Cancela cuando quieras</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">
            Todo lo que tu equipo necesita
          </h2>
          <p className="mt-3 text-lg text-slate-600">Una suite completa para la colaboración empresarial</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caracteristicasGenerales.map((f, i) => (
            <Card
              key={i}
              className="group border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{f.titulo}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Intro */}
          <div className="mb-16 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
              <Globe className="h-4 w-4" /> Sobre Feng Office
            </span>
            <h2 className="mt-6 font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Más de 15 años impulsando la colaboración empresarial
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Desde 2008, Feng Office ha ayudado a miles de organizaciones a organizar su trabajo,
              conectar a sus equipos y crecer de manera sostenible. Nacimos como una solución simple
              para la gestión de proyectos y hoy somos una plataforma integral usada en más de 40 países.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { valor: "15+", label: "Años de experiencia", icon: Award },
              { valor: "40+", label: "Países atendidos", icon: Globe },
              { valor: "50K+", label: "Usuarios activos", icon: Users },
              { valor: "99.9%", label: "Disponibilidad", icon: TrendingUp },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.label} className="border-slate-200 bg-slate-50 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{s.valor}</p>
                    <p className="mt-1 text-sm text-slate-500">{s.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Trayectoria timeline */}
          <div className="mb-20">
            <h3 className="mb-10 text-center font-serif text-2xl font-bold text-slate-900 md:text-3xl">
              Nuestra trayectoria
            </h3>
            <div className="relative">
              <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-indigo-200 via-indigo-300 to-emerald-200 lg:block" />
              <div className="space-y-8">
                {trayectoria.map((t, i) => (
                  <div
                    key={t.anio}
                    className={`flex flex-col gap-4 lg:flex-row lg:items-center ${
                      i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    <div className="lg:w-1/2">
                      <Card
                        className={`border-slate-200 bg-white shadow-sm transition-all hover:shadow-md ${
                          i % 2 === 0 ? "lg:mr-8" : "lg:ml-8"
                        }`}
                      >
                        <CardContent className="p-6">
                          <span className="inline-block rounded-full bg-indigo-600 px-3 py-1 text-sm font-bold text-white">
                            {t.anio}
                          </span>
                          <h4 className="mt-3 text-lg font-semibold text-slate-900">{t.titulo}</h4>
                          <p className="mt-2 text-sm text-slate-600">{t.desc}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden lg:flex lg:w-1/2 lg:justify-center">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 ring-4 ring-indigo-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Productos digitales */}
          <div className="mb-20">
            <h3 className="mb-3 text-center font-serif text-2xl font-bold text-slate-900 md:text-3xl">
              Nuestros productos digitales
            </h3>
            <p className="mb-10 text-center text-lg text-slate-600">
              Una suite modular que se adapta a las necesidades de tu organización
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {productos.map((p) => {
                const Icon = p.icon;
                return (
                  <Card
                    key={p.nombre}
                    className="group flex flex-row items-start gap-4 border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${p.color} transition-transform group-hover:scale-110`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{p.nombre}</h4>
                      <p className="mt-1 text-sm text-slate-600">{p.desc}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Casos de éxito */}
          <div>
            <h3 className="mb-3 text-center font-serif text-2xl font-bold text-slate-900 md:text-3xl">
              Casos de éxito
            </h3>
            <p className="mb-10 text-center text-lg text-slate-600">
              Empresas que transformaron su forma de trabajar con Feng Office
            </p>
            <div className="grid gap-6 lg:grid-cols-3">
              {casosExito.map((c) => (
                <Card key={c.empresa} className="overflow-hidden border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className={`bg-gradient-to-br ${c.color} p-6 text-white`}>
                    <Quote className="h-8 w-8 text-white/70" />
                    <p className="mt-4 text-4xl font-bold">{c.metrica}</p>
                    <p className="text-sm text-white/80">{c.metricaLabel}</p>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">{c.empresa}</h4>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {c.sector}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{c.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <section id="catalogo" className="bg-slate-100/70 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm ring-1 ring-indigo-100">
              <ShoppingCart className="h-4 w-4" /> Catálogo de Software
            </span>
            <h2 className="mt-6 font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Soluciones para cada área de tu empresa
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Descubre nuestra suite completa de 10 productos digitales diseñados para optimizar cada departamento
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {catalogo.map((p) => (
              <Card
                key={p.nombre}
                className="group flex flex-col overflow-hidden border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`relative h-28 bg-gradient-to-br ${p.color} p-5`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {p.rating}
                  </div>
                </div>
                <CardContent className="flex flex-1 flex-col p-5">
                  <Badge variant="secondary" className="w-fit bg-slate-100 text-slate-600 text-xs font-medium">
                    {p.area}
                  </Badge>
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{p.nombre}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">{p.desc}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <span className="text-2xl font-bold text-slate-900">{p.precio}</span>
                      <span className="text-xs text-slate-500">/mes</span>
                    </div>
                    <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
                      Probar <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planes" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Planes y precios
            </h2>
            <p className="mt-3 text-lg text-slate-600">Elige el plan que se adapte a tu organización</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {planes.map((plan) => {
              const c = colorMap[plan.color];
              return (
                <Card
                  key={plan.nombre}
                  className={`relative overflow-hidden bg-white shadow-sm ring-1 ${c.ring} ${
                    plan.destacado ? "lg:-translate-y-4 shadow-xl" : ""
                  }`}
                >
                  {plan.destacado && (
                    <div className="absolute right-0 top-0 rounded-bl-xl bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white">
                      Más popular
                    </div>
                  )}
                  <CardHeader className={`bg-gradient-to-b ${c.glow} to-white pb-4`}>
                    <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${c.chip}`}>
                      {plan.nombre}
                    </span>
                    <CardTitle className="mt-3 text-3xl font-bold">
                      {plan.precio}
                      {plan.precio.includes("€") && (
                        <span className="text-base font-normal text-slate-500">/usuario/mes</span>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-2">{plan.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {plan.caracteristicas.map((car, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate-700">
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${
                            plan.color === "emerald" ? "text-emerald-600" :
                            plan.color === "indigo" ? "text-indigo-600" : "text-amber-600"
                          }`} />
                          {car}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className={`w-full ${c.btn}`}
                      onClick={() => onAuth("register")}
                    >
                      {plan.precio === "Personalizado" ? "Contactar ventas" : "Comenzar ahora"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-10 text-center font-serif text-3xl font-bold text-slate-900 md:text-4xl">
          Preguntas frecuentes
        </h2>
        <div className="space-y-4">
          {[
            { q: "¿Puedo cambiar de plan en cualquier momento?", a: "Sí, puedes actualizar o reducir tu plan cuando quieras. Los cambios se aplican inmediatamente." },
            { q: "¿Ofrecen prueba gratuita?", a: "Sí, todos los planes de pago incluyen 14 días de prueba sin necesidad de tarjeta de crédito." },
            { q: "¿Mis datos están seguros?", a: "Utilizamos cifrado de nivel bancario y realizamos copias de seguridad diarias automáticas." },
            { q: "¿Puedo cancelar mi suscripción?", a: "Puedes cancelar en cualquier momento desde el panel de administración sin penalizaciones." },
          ].map((item, i) => (
            <Card key={i} className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            Empieza a organizar tu equipo hoy
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Únete a miles de empresas que ya gestionan su trabajo con Feng Office
          </p>
          <Button
            size="lg"
            onClick={() => onAuth("register")}
            className="mt-8 bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg"
          >
            Crear cuenta gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-400">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                F
              </div>
              <span className="text-lg font-semibold text-white">Feng Office</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Contacto</a>
            </div>
            <p className="text-sm">© 2024 Feng Office. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Chat Bot */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] md:bottom-24 md:right-6">
          <Card className="flex h-96 flex-col overflow-hidden border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between bg-indigo-600 p-4 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">FengBot</p>
                  <p className="text-xs text-indigo-100">En línea</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-indigo-500" onClick={() => setIsChatOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "user" ? "bg-indigo-600 text-white rounded-br-sm" : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-sm"
                  }`}>
                    {msg.text}
                    {msg.action && (
                      <Button 
                        size="sm" 
                        className="mt-2 w-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                        onClick={() => handleBotAction(msg.action)}
                      >
                        Ir ahora
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escribe un mensaje..."
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
              <Button size="icon" className="h-9 w-9 shrink-0 rounded-full bg-indigo-600 hover:bg-indigo-700" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Floating Chat Button (Desktop) */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-300 transition-all hover:scale-110 hover:bg-indigo-700 lg:flex"
      >
        {isChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-slate-200 bg-white/90 backdrop-blur-md py-2 shadow-lg lg:hidden">
        {mobileNavItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              onClick={item.action}
              className="flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1 text-slate-600 transition-colors hover:text-indigo-600"
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Floating Chat Button (Mobile) */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-300 transition-all hover:scale-110 hover:bg-indigo-700 lg:hidden"
      >
        {isChatOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}