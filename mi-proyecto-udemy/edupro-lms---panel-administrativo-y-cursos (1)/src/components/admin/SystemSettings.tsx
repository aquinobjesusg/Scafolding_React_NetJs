import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { 
  Settings, 
  CreditCard, 
  Globe, 
  ShieldCheck, 
  Check, 
  Save, 
  Key, 
  Mail, 
  Percent, 
  Award,
  AlertCircle
} from 'lucide-react';

export const SystemSettings: React.FC = () => {
  const { systemConfig, updateSystemConfig } = useCourse();

  const [platformName, setPlatformName] = useState(systemConfig.platformName);
  const [platformEmail, setPlatformEmail] = useState(systemConfig.platformEmail);
  const [currency, setCurrency] = useState(systemConfig.currency);
  const [taxPercent, setTaxPercent] = useState(systemConfig.taxPercent);
  const [allowRegistration, setAllowRegistration] = useState(systemConfig.allowRegistration);
  const [requireEmailVerification, setRequireEmailVerification] = useState(systemConfig.requireEmailVerification);
  
  // Gateways
  const [stripeEnabled, setStripeEnabled] = useState(systemConfig.stripeEnabled);
  const [paypalEnabled, setPaypalEnabled] = useState(systemConfig.paypalEnabled);
  const [mercadoPagoEnabled, setMercadoPagoEnabled] = useState(systemConfig.mercadoPagoEnabled);
  const [allowCertificates, setAllowCertificates] = useState(systemConfig.allowCertificates);

  // Mock API keys
  const [stripeKey, setStripeKey] = useState('pk_live_51MvEduProOfficialKeysXYZ987');
  const [paypalClientId, setPaypalClientId] = useState('AU_PAYPAL_CLIENT_ID_EDUPRO_ACADEMY');

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSystemConfig({
      platformName,
      platformEmail,
      currency,
      taxPercent: Number(taxPercent),
      allowRegistration,
      requireEmailVerification,
      stripeEnabled,
      paypalEnabled,
      mercadoPagoEnabled,
      allowCertificates,
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-base font-bold text-gray-900 tracking-tight">
          Configuración General de la Plataforma
        </h2>
        <p className="text-xs text-gray-500">
          Ajusta parámetros globales, integración de pasarelas de pago y políticas de acceso.
        </p>
      </div>

      {isSaved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800 border border-emerald-200 animate-in fade-in">
          <Check className="h-4 w-4 text-emerald-600" />
          <span>¡Configuración guardada exitosamente en el sistema!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Section */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Globe className="h-4 w-4 text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Información de la Academia
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nombre de la Plataforma
              </label>
              <input
                type="text"
                required
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Correo Electrónico de Contacto
              </label>
              <input
                type="email"
                required
                value={platformEmail}
                onChange={(e) => setPlatformEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Moneda Predeterminada
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs text-gray-900 focus:border-indigo-500 outline-hidden bg-white"
              >
                <option value="USD">Dólares Estadounidenses (USD $)</option>
                <option value="EUR">Euros (EUR €)</option>
                <option value="MXN">Pesos Mexicanos (MXN $)</option>
                <option value="COP">Pesos Colombianos (COP $)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Impuesto / IVA aplicable (%)
              </label>
              <input
                type="number"
                min={0}
                max={50}
                value={taxPercent}
                onChange={(e) => setTaxPercent(parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs text-gray-900 focus:border-indigo-500 outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateways Section */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <CreditCard className="h-4 w-4 text-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Pasarelas de Pago Integradas
            </h3>
          </div>

          <div className="space-y-4">
            {/* Stripe */}
            <div className="rounded-xl border border-gray-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Stripe Payments (Tarjetas)</h4>
                  <p className="text-[11px] text-gray-500">
                    Acepta tarjetas de crédito y débito Visa, Mastercard, American Express en todo el mundo.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stripeEnabled}
                    onChange={(e) => setStripeEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {stripeEnabled && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Stripe Publishable Key
                  </label>
                  <input
                    type="text"
                    value={stripeKey}
                    onChange={(e) => setStripeKey(e.target.value)}
                    className="w-full font-mono text-xs rounded-lg border border-gray-300 px-3 py-1.5 text-gray-800 bg-gray-50"
                  />
                </div>
              )}
            </div>

            {/* PayPal */}
            <div className="rounded-xl border border-gray-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">PayPal Express Checkout</h4>
                  <p className="text-[11px] text-gray-500">
                    Permite a los estudiantes pagar con saldo PayPal o en cuotas.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paypalEnabled}
                    onChange={(e) => setPaypalEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {paypalEnabled && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    PayPal Client ID
                  </label>
                  <input
                    type="text"
                    value={paypalClientId}
                    onChange={(e) => setPaypalClientId(e.target.value)}
                    className="w-full font-mono text-xs rounded-lg border border-gray-300 px-3 py-1.5 text-gray-800 bg-gray-50"
                  />
                </div>
              )}
            </div>

            {/* Mercado Pago */}
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Mercado Pago (Latinoamérica)</h4>
                  <p className="text-[11px] text-gray-500">
                    Cobros locales en pesos, PSE, OXXO y transferencias bancarias.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mercadoPagoEnabled}
                    onChange={(e) => setMercadoPagoEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Access and Certificates */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Award className="h-4 w-4 text-purple-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Políticas y Certificaciones
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer p-1">
              <div>
                <span className="text-xs font-bold text-gray-900">Permitir Registro Público</span>
                <p className="text-[11px] text-gray-500">
                  Cualquier visitante puede crearse una cuenta de estudiante o profesor.
                </p>
              </div>
              <input
                type="checkbox"
                checked={allowRegistration}
                onChange={(e) => setAllowRegistration(e.target.checked)}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-1">
              <div>
                <span className="text-xs font-bold text-gray-900">
                  Certificados Digitales Automáticos
                </span>
                <p className="text-[11px] text-gray-500">
                  Generar y permitir descarga de diploma oficial al alcanzar el 100% del curso.
                </p>
              </div>
              <input
                type="checkbox"
                checked={allowCertificates}
                onChange={(e) => setAllowCertificates(e.target.checked)}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            id="save-system-settings-btn"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 active:scale-[0.99] transition-all"
          >
            <Save className="h-4 w-4" />
            <span>Guardar Configuración</span>
          </button>
        </div>
      </form>
    </div>
  );
};
