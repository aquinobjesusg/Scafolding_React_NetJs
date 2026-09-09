import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Clock, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Soporte Técnico');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 800);
  };

  return (
    <section id="contacto" className="py-14 sm:py-20 bg-gradient-to-b from-white via-orange-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
            <span>Estamos para Ayudarte</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-950">
            Ponte en Contacto con Nuestro Equipo
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            ¿Tienes dudas sobre los cursos, problemas con algún pago o te interesa convertirte en instructor? Escríbenos y te responderemos en menos de 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Cards (Left Column) */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-2xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">Correo Electrónico</h3>
              <p className="text-xs text-gray-500">
                Escríbenos para consultas de soporte, facturas o alianzas:
              </p>
              <div className="text-xs font-bold text-orange-600">
                soporte@eduproacademy.com
              </div>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-2xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">Atención Telefónica</h3>
              <p className="text-xs text-gray-500">
                Línea directa para estudiantes y planes corporativos:
              </p>
              <div className="text-xs font-bold text-amber-700">
                +1 (800) 456-7890 (Toll Free)
              </div>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-2xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">Horarios y Cobertura</h3>
              <p className="text-xs text-gray-500">
                Lunes a Viernes de 08:00 a 20:00 (GMT-5). Sábados de 09:00 a 14:00.
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Respuesta en menos de 24 horas</span>
              </div>
            </div>
          </div>

          {/* Contact Form (Right 2 Columns) */}
          <div className="lg:col-span-2 rounded-3xl border border-orange-100/90 bg-white p-6 sm:p-10 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Envíanos un Mensaje</h3>
                <p className="text-xs text-gray-500">Completa los campos a continuación</p>
              </div>
              <MessageSquare className="h-5 w-5 text-orange-500" />
            </div>

            {isSubmitted && (
              <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-xs text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold">¡Mensaje enviado con éxito!</div>
                  <div className="text-[11px]">Un asesor de soporte te responderá por correo a la brevedad.</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. María González"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-hidden transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ej. maria@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-hidden transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tipo de Consulta
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-hidden shadow-2xs cursor-pointer"
                  >
                    <option value="Soporte Técnico">Soporte Técnico / Reproductor</option>
                    <option value="Facturación y Pagos">Facturación y Pagos / Cupones</option>
                    <option value="Quiero ser Instructor">Quiero ser Instructor</option>
                    <option value="Planes Corporativos">Capacitación para Empresas</option>
                    <option value="Sugerencias">Sugerencias Generales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Asunto
                  </label>
                  <input
                    type="text"
                    placeholder="ej. Consulta sobre certificado de Angular"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-hidden transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tu Mensaje *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detalla tu consulta o duda para que podamos asistirte rápidamente..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-hidden transition-all shadow-2xs"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Tus datos están protegidos y nunca serán compartidos.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-7 py-3 text-xs font-bold text-white shadow-md hover:shadow-orange-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Enviando mensaje...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
