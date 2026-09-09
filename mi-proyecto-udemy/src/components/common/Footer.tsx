import React, { useState } from 'react';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Heart, 
  Send, 
  Check, 
  CreditCard,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  onNavigateView?: (view: any) => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateView, onScrollToSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'es' | 'en' | 'pt'>('es');
  const [currentCurrency, setCurrentCurrency] = useState<'USD' | 'EUR' | 'MXN'>('USD');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3500);
  };

  return (
    <footer className="border-t border-orange-100 bg-gradient-to-b from-white via-orange-50/20 to-orange-50/60 text-gray-700">
      {/* Top Banner: Newsletter & Trust Pillars */}
      <div className="border-b border-orange-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 uppercase tracking-widest bg-orange-100/70 px-2.5 py-0.5 rounded-full">
              Comunidad Global
            </span>
            <h3 className="text-lg font-black text-gray-900">
              Aprende a tu ritmo con lecciones interactivas
            </h3>
            <p className="text-xs text-gray-500">
              Suscríbete para recibir lanzamientos de cursos, becas y promociones exclusivas.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-lg lg:ml-auto">
              <input
                type="email"
                required
                placeholder="Ingresa tu correo electrónico..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-hidden transition-all shadow-2xs"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all active:scale-[0.98]"
              >
                {subscribed ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>¡Suscrito!</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Suscribirme</span>
                  </>
                )}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 lg:text-right">
                Te enviamos un cupón de bienvenida con 20% de descuento a tu bandeja.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 text-xs">
        {/* Column 1: Brand & Bio */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-gray-950">
                EduPro <span className="text-orange-500">LMS</span>
              </span>
              <p className="text-[11px] font-medium text-orange-600">
                Academia & Plataforma de Capacitación Online
              </p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-sm text-xs">
            Plataforma integral de cursos en línea con soporte para video clases en HD, cuestionarios interactivos, seguimiento en tiempo real, panel de administración con exportación a Excel y pasarela de pagos segura.
          </p>

          {/* Contact Details */}
          <div className="space-y-2 pt-2 text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-orange-500 shrink-0" />
              <span>soporte@eduproacademy.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-orange-500 shrink-0" />
              <span>+1 (800) 456-7890 • Lun a Vie 08:00 - 20:00</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-500 shrink-0" />
              <span>Av. de las Tecnologías 450, Piso 8, Ciudad del Conocimiento</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Síguenos en Redes Sociales
            </span>
            <div className="flex items-center gap-2">
              {[
                { name: 'Twitter / X', symbol: '𝕏', href: 'https://twitter.com' },
                { name: 'LinkedIn', symbol: 'in', href: 'https://linkedin.com' },
                { name: 'YouTube', symbol: '▶', href: 'https://youtube.com' },
                { name: 'GitHub', symbol: 'git', href: 'https://github.com' },
                { name: 'Instagram', symbol: 'ig', href: 'https://instagram.com' },
                { name: 'Facebook', symbol: 'fb', href: 'https://facebook.com' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-orange-200 bg-white font-bold text-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-2xs"
                >
                  <span className="text-[11px]">{s.symbol}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Explorar Cursos */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-orange-100 pb-2">
            Catálogo y Especialidades
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#catalogo" onClick={() => onScrollToSection?.('catalogo')} className="hover:text-orange-600 transition-colors">Desarrollo Web & Frontend</a></li>
            <li><a href="#catalogo" onClick={() => onScrollToSection?.('catalogo')} className="hover:text-orange-600 transition-colors">Angular 18 & React</a></li>
            <li><a href="#catalogo" onClick={() => onScrollToSection?.('catalogo')} className="hover:text-orange-600 transition-colors">Inteligencia Artificial y ML</a></li>
            <li><a href="#catalogo" onClick={() => onScrollToSection?.('catalogo')} className="hover:text-orange-600 transition-colors">Diseño UI/UX en Figma</a></li>
            <li><a href="#catalogo" onClick={() => onScrollToSection?.('catalogo')} className="hover:text-orange-600 transition-colors">Bases de Datos & SQL</a></li>
            <li><a href="#catalogo" onClick={() => onScrollToSection?.('catalogo')} className="hover:text-orange-600 transition-colors">Cloud, DevOps & Docker</a></li>
          </ul>
        </div>

        {/* Column 3: Plataforma & Funcionalidades */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-orange-100 pb-2">
            Plataforma & Herramientas
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#features" onClick={() => onScrollToSection?.('features')} className="hover:text-orange-600 transition-colors">Reproductor de Video Integrado</a></li>
            <li><a href="#features" onClick={() => onScrollToSection?.('features')} className="hover:text-orange-600 transition-colors">Quizzes y Evaluaciones</a></li>
            <li><a href="#features" onClick={() => onScrollToSection?.('features')} className="hover:text-orange-600 transition-colors">Certificados Oficiales con ID</a></li>
            <li><a href="#features" onClick={() => onScrollToSection?.('features')} className="hover:text-orange-600 transition-colors">Exportación a Excel de CRUDs</a></li>
            <li><a href="#features" onClick={() => onScrollToSection?.('features')} className="hover:text-orange-600 transition-colors">Pasarelas de Pago (Stripe/PayPal)</a></li>
            <li>
              <button 
                onClick={() => onNavigateView?.('admin-dashboard')} 
                className="text-orange-600 font-bold hover:underline"
              >
                Acceso a Panel Administrativo →
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Institucional, Equipo y Legal */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-orange-100 pb-2">
            Empresa & Legal
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#equipo" onClick={() => onScrollToSection?.('equipo')} className="hover:text-orange-600 transition-colors">Equipo de Colaboración</a></li>
            <li><a href="#contacto" onClick={() => onScrollToSection?.('contacto')} className="hover:text-orange-600 transition-colors">Formulario de Contacto</a></li>
            <li><a href="#privacidad" onClick={(e) => { e.preventDefault(); alert('Política de Privacidad: Tus datos están protegidos conforme al RGPD y normativas internacionales de protección de datos.'); }} className="hover:text-orange-600 transition-colors">Política de Privacidad</a></li>
            <li><a href="#terminos" onClick={(e) => { e.preventDefault(); alert('Términos de Servicio: Acceso vitalicio, garantía de reembolso de 30 días en todos los cursos.'); }} className="hover:text-orange-600 transition-colors">Términos de Servicio</a></li>
            <li><a href="#garantia" onClick={(e) => { e.preventDefault(); alert('Garantía de Satisfacción: 30 días de garantía sin preguntas.'); }} className="hover:text-orange-600 transition-colors">Garantía de Reembolso</a></li>
            <li><a href="#faq" onClick={() => alert('Preguntas Frecuentes: Consulta a nuestro EduBot flotante en la esquina inferior derecha para un tour paso a paso.')} className="hover:text-orange-600 transition-colors">Preguntas Frecuentes (FAQ)</a></li>
          </ul>
        </div>
      </div>

      {/* Language, Currency & Copyright Bar */}
      <div className="border-t border-orange-100 bg-white/70 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            {/* Language Picker */}
            <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-gray-700">
              <Globe className="h-3.5 w-3.5 text-orange-500" />
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as any)}
                className="bg-transparent text-xs font-semibold outline-hidden cursor-pointer"
              >
                <option value="es">Español (ES / Latam)</option>
                <option value="en">English (US)</option>
                <option value="pt">Português (BR)</option>
              </select>
            </div>

            {/* Currency Picker */}
            <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-gray-700">
              <CreditCard className="h-3.5 w-3.5 text-orange-500" />
              <select
                value={currentCurrency}
                onChange={(e) => setCurrentCurrency(e.target.value as any)}
                className="bg-transparent text-xs font-semibold outline-hidden cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="MXN">MXN ($)</option>
              </select>
            </div>
          </div>

          {/* Copyright notice */}
          <div className="flex items-center gap-1 text-[11px] text-gray-500 text-center sm:text-right">
            <span>© {new Date().getFullYear()} EduPro LMS Academy, Inc. Todos los derechos reservados.</span>
            <span className="hidden md:inline">• Hecho con dedicación para la educación digital</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
