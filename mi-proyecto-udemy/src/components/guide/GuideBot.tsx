import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { 
  Bot, 
  X, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  PlayCircle, 
  CreditCard, 
  LayoutDashboard, 
  FileSpreadsheet, 
  Award, 
  Users, 
  HelpCircle, 
  ArrowRight,
  CheckCircle2,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface GuideBotProps {
  onNavigate: (view: ActiveView) => void;
  onOpenAuth: () => void;
  onOpenCourseModal?: () => void;
}

export const GuideBot: React.FC<GuideBotProps> = ({
  onNavigate,
  onOpenAuth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'student' | 'admin' | 'faq'>('student');
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const studentSteps = [
    {
      step: 1,
      title: 'Explorar Catálogo de Cursos',
      description: 'Navega por las categorías (Web, IA, UI/UX), busca temas y filtra por nivel de dificultad.',
      actionLabel: 'Ver Catálogo',
      onAction: () => {
        onNavigate('udemy-explore');
        setIsOpen(false);
      },
    },
    {
      step: 2,
      title: 'Ver Ficha y Video Trailer',
      description: 'Haz clic en cualquier tarjeta de curso para ver los objetivos, temario completo y trailer en video.',
      actionLabel: 'Explorar Cursos',
      onAction: () => {
        onNavigate('udemy-explore');
        setIsOpen(false);
      },
    },
    {
      step: 3,
      title: 'Comprar o Probar Cupones',
      description: 'Abre el checkout de pago para probar tarjetas o ingresa el cupón "UDEMY50" o "GRATIS" para desbloquearlo al instante.',
      actionLabel: 'Ver Cursos',
      onAction: () => {
        onNavigate('udemy-explore');
        setIsOpen(false);
      },
    },
    {
      step: 4,
      title: 'Reproductor de Video Integrado',
      description: 'Disfruta de lecciones con control de velocidad (0.75x a 2x), barra scrubber, volumen y pantalla completa.',
      actionLabel: 'Abrir Reproductor',
      onAction: () => {
        onNavigate('udemy-player');
        setIsOpen(false);
      },
    },
    {
      step: 5,
      title: 'Rendir Quizzes Interactivos',
      description: 'En el reproductor, selecciona una lección tipo "Quiz" para responder preguntas con calificación y explicación inmediata.',
      actionLabel: 'Ir al Quiz',
      onAction: () => {
        onNavigate('udemy-player');
        setIsOpen(false);
      },
    },
    {
      step: 6,
      title: 'Descargar Certificado Oficial',
      description: 'Al completar el 100% de las lecciones, haz clic en el botón "Certificado" para ver e imprimir tu diploma con código de verificación.',
      actionLabel: 'Ver Certificado',
      onAction: () => {
        onNavigate('udemy-player');
        setIsOpen(false);
      },
    },
  ];

  const adminSteps = [
    {
      step: 1,
      title: 'Ingresar al Dashboard General',
      description: 'Revisa métricas clave: ingresos netos, nuevos estudiantes registrados, catálogo activo y tasa de culminación.',
      actionLabel: 'Ir al Dashboard',
      onAction: () => {
        onNavigate('admin-dashboard');
        setIsOpen(false);
      },
    },
    {
      step: 2,
      title: 'CRUD de Cursos y Módulos',
      description: 'Crea nuevos cursos, define precios, añade secciones y lecciones interactivas (video, quiz o lectura).',
      actionLabel: 'Abrir CRUD Cursos',
      onAction: () => {
        onNavigate('admin-courses');
        setIsOpen(false);
      },
    },
    {
      step: 3,
      title: 'Gestión de Usuarios y Roles',
      description: 'Administra cuentas, cambia estados de usuarios y ajusta permisos granulares en la matriz de roles.',
      actionLabel: 'Padrón Usuarios',
      onAction: () => {
        onNavigate('admin-users');
        setIsOpen(false);
      },
    },
    {
      step: 4,
      title: 'Exportar Cualquier CRUD a Excel',
      description: 'Haz clic en el botón verde "Exportar a Excel (.xls)" presente en todas las tablas para descargar el informe contable formateado.',
      actionLabel: 'Ver Transacciones',
      onAction: () => {
        onNavigate('admin-transactions');
        setIsOpen(false);
      },
    },
    {
      step: 5,
      title: 'Reportes Dinámicos con Gráficas',
      description: 'Visualiza gráficos interactivos de ventas, categorías y roles con filtros temporales configurables.',
      actionLabel: 'Ver Gráficas',
      onAction: () => {
        onNavigate('admin-reports');
        setIsOpen(false);
      },
    },
    {
      step: 6,
      title: 'Configurar Pasarelas y Parámetros',
      description: 'Activa o desactiva Stripe, PayPal, Mercado Pago, ajusta impuestos y políticas de certificados.',
      actionLabel: 'Configuración',
      onAction: () => {
        onNavigate('admin-settings');
        setIsOpen(false);
      },
    },
  ];

  const faqs = [
    {
      q: '¿Cómo cambio de rol para probar como Administrador o Estudiante?',
      a: 'En la barra superior (Navbar) hay un selector con las fotos y nombres de los perfiles de demostración (Admin, Instructor, Editor y Estudiante). Haz clic en cualquiera para cambiar tus permisos en un clic.',
    },
    {
      q: '¿Cómo exporto las tablas a Excel?',
      a: 'En la parte superior de cada tabla CRUD (Cursos, Usuarios, Transacciones y Reportes) hay un botón "Exportar a Excel". Al presionarlo se descargará automáticamente un archivo .xls con formato nativo.',
    },
    {
      q: '¿Qué cupones de descuento puedo usar en la compra?',
      a: 'En el modal de compra puedes ingresar "UDEMY50" para un 50% de descuento o "GRATIS" para aplicar una beca del 100% y acceder de inmediato.',
    },
    {
      q: '¿Dónde encuentro los Quizzes interactivos?',
      a: 'Entra al reproductor de video de un curso (ej. "Angular 18 Enterprise") y en la lista lateral selecciona una lección con el icono de pregunta (?) como "Quiz de Evaluación".',
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="btn-open-guide-bot"
          className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-xs font-bold text-white shadow-xl hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-orange-600 shadow-xs">
            <Bot className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-[11px] font-extrabold tracking-wide uppercase text-orange-100">
              Guía Paso a Paso
            </div>
            <div className="text-xs font-bold">EduBot Asistente</div>
          </div>
        </button>
      )}

      {/* Expanded Interactive Guide Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] max-h-[85vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-orange-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 p-4 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold">EduBot • Guía Interactiva</h3>
                <p className="text-[10px] text-orange-100">
                  Menú de opciones a seguir en cada paso
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-100 bg-orange-50/40 p-1.5 text-xs font-bold">
            <button
              onClick={() => {
                setActiveTab('student');
                setSelectedStep(null);
              }}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                activeTab === 'student'
                  ? 'bg-white text-orange-600 shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Ruta Alumno
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                setSelectedStep(null);
              }}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                activeTab === 'admin'
                  ? 'bg-white text-orange-600 shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Ruta Admin
            </button>
            <button
              onClick={() => {
                setActiveTab('faq');
                setSelectedStep(null);
              }}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                activeTab === 'faq'
                  ? 'bg-white text-orange-600 shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Preguntas
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeTab === 'student' && (
              <div className="space-y-2.5">
                <div className="text-[11px] font-semibold text-gray-500 px-1">
                  Sigue estos pasos para experimentar la plataforma como estudiante:
                </div>
                {studentSteps.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-orange-100/80 bg-white p-3.5 shadow-2xs hover:border-orange-300 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-black text-orange-700">
                          {item.step}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                      </div>
                      <button
                        onClick={item.onAction}
                        className="flex items-center gap-1 rounded-lg bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-orange-600 hover:bg-orange-500 hover:text-white transition-all"
                      >
                        <span>{item.actionLabel}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed pl-7">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="space-y-2.5">
                <div className="text-[11px] font-semibold text-gray-500 px-1">
                  Sigue estos pasos para auditar el panel administrativo:
                </div>
                {adminSteps.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-orange-100/80 bg-white p-3.5 shadow-2xs hover:border-orange-300 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] font-black text-amber-700">
                          {item.step}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                      </div>
                      <button
                        onClick={item.onAction}
                        className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 hover:bg-amber-500 hover:text-white transition-all"
                      >
                        <span>{item.actionLabel}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed pl-7">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-2.5">
                <div className="text-[11px] font-semibold text-gray-500 px-1">
                  Respuestas rápidas a las consultas más frecuentes:
                </div>
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-100 bg-orange-50/20 p-3.5 space-y-1.5"
                  >
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <h4 className="text-xs font-bold text-gray-900">{faq.q}</h4>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Quick Action */}
          <div className="border-t border-gray-100 bg-orange-50/40 p-3 flex items-center justify-between text-xs">
            <span className="text-[11px] text-gray-500">¿Listo para comenzar?</span>
            <button
              onClick={() => {
                onNavigate('udemy-explore');
                setIsOpen(false);
              }}
              className="rounded-xl bg-orange-500 hover:bg-orange-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs transition-colors"
            >
              Comenzar Tour
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
