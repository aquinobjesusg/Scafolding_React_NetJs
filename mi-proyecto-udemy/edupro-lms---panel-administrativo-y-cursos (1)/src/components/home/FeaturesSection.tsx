import React from 'react';
import { 
  PlaySquare, 
  HelpCircle, 
  LayoutDashboard, 
  FileSpreadsheet, 
  CreditCard, 
  BarChart3, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  CheckCircle2,
  Users
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: PlaySquare,
      title: 'Reproductor de Video Integrado',
      badge: 'Streaming HD',
      description: 'Reproductor HTML5 fluido con velocidad adaptable (0.75x a 2x), barra de tiempo precisa, control de volumen y pantalla completa.',
      color: 'bg-orange-50 text-orange-600 border-orange-200',
    },
    {
      icon: HelpCircle,
      title: 'Lecciones y Quizzes Interactivos',
      badge: 'Evaluación en Vivo',
      description: 'Cuestionarios de opción múltiple con calificación inmediata, justificación pedagógica en cada respuesta y registro de progreso.',
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      icon: LayoutDashboard,
      title: 'Panel Administrativo Completo',
      badge: 'Multi-Rol',
      description: 'Menú superior con ajustes y menú lateral para CRUDs de usuarios, roles, cursos y transacciones con control de permisos granular.',
      color: 'bg-orange-50 text-orange-600 border-orange-200',
    },
    {
      icon: FileSpreadsheet,
      title: 'Exportación Nativa a Excel',
      badge: '1 Clic (.xls / CSV)',
      description: 'Descarga reportes estructurados con formato nativo de hojas de cálculo de todos los módulos: alumnos, cursos, ventas y analítica.',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      icon: CreditCard,
      title: 'Pasarela de Pagos & Cupones',
      badge: 'Stripe & PayPal',
      description: 'Checkout seguro para tarjetas de crédito, saldo PayPal y Mercado Pago con cálculo de impuestos e ingreso de códigos promocionales.',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      icon: BarChart3,
      title: 'Reportes Dinámicos con Gráficas',
      badge: 'Recharts Interactivas',
      description: 'Visualiza la evolución de ingresos, matrículas por categoría y desgloses demográficos con filtros temporales configurables.',
      color: 'bg-orange-50 text-orange-600 border-orange-200',
    },
    {
      icon: Award,
      title: 'Certificación Oficial Descargable',
      badge: 'Diploma con ID',
      description: 'Al alcanzar el 100% de lecciones completadas, el estudiante desbloquea su diploma oficial imprimible con código verificable.',
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      icon: Users,
      title: 'Comunidad & Bloc de Notas',
      badge: 'Persistencia Local',
      description: 'Espacio personal de apuntes guardado automáticamente en el navegador para cada lección y seguimiento paso a paso.',
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
  ];

  return (
    <section id="features" className="py-14 sm:py-20 bg-gradient-to-b from-orange-50/40 via-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
            <span>Características Principales del Producto</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-950">
            Todo lo que necesitas para enseñar, aprender y escalar
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Diseñada con la mejor experiencia de aprendizaje estilo Udemy, respaldada por un potente motor administrativo con analítica y exportación contable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-orange-100/90 bg-white p-6 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${item.color} shadow-2xs group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-orange-700 border border-orange-200/60">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-orange-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Incluido en la plataforma</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
