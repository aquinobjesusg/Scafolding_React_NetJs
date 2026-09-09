import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { Course, Transaction } from '../../types';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Tag, 
  X, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

interface PaymentModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (course: Course) => void;
  onRequireLogin: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  course,
  isOpen,
  onClose,
  onSuccess,
  onRequireLogin,
}) => {
  const { systemConfig, processPayment } = useCourse();
  const { currentUser } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<
    'Tarjeta de Crédito' | 'PayPal' | 'Mercado Pago' | 'Transferencia'
  >('Tarjeta de Crédito');

  // Card fields
  const [cardNumber, setCardNumber] = useState('4532 8920 1194 5821');
  const [cardHolder, setCardHolder] = useState(currentUser?.name || 'Cliente EduPro');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('892');

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTransaction, setCompletedTransaction] = useState<Transaction | null>(null);

  if (!isOpen || !course) return null;

  const basePrice = course.price;
  const discountAmount = (basePrice * appliedDiscountPercent) / 100;
  const subtotal = Math.max(0, basePrice - discountAmount);
  const tax = (subtotal * systemConfig.taxPercent) / 100;
  const finalTotal = subtotal + tax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'UDEMY50' || code === 'PROMO50') {
      setAppliedDiscountPercent(50);
      setCouponMessage('¡Cupón del 50% de descuento aplicado!');
    } else if (code === 'GRATIS' || code === 'BECA100') {
      setAppliedDiscountPercent(100);
      setCouponMessage('¡Beca del 100% de descuento aplicada con éxito!');
    } else {
      setAppliedDiscountPercent(0);
      setCouponMessage('Cupón no válido o expirado. Prueba con UDEMY50');
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      onRequireLogin();
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const result = processPayment(course, paymentMethod, Number(finalTotal.toFixed(2)));
      setIsProcessing(false);
      if (result.success) {
        setCompletedTransaction(result.transaction);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-6 py-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-bold text-gray-900">
              Checkout Seguro de Compra
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        {completedTransaction ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-lg font-black text-gray-900">
              ¡Pago Aprobado y Matrícula Activada!
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Se ha procesado exitosamente la transacción con código{' '}
              <strong className="font-mono text-indigo-600">{completedTransaction.transactionCode}</strong>. Ya tienes acceso vitalicio a todas las lecciones.
            </p>

            <div className="rounded-xl bg-gray-50 p-4 text-left border border-gray-200 text-xs space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-gray-500">Curso:</span>
                <span className="font-bold text-gray-900 truncate max-w-[200px]">{course.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monto Cobrado:</span>
                <span className="font-bold text-emerald-600">${completedTransaction.amount.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Método de Pago:</span>
                <span className="font-medium text-gray-700">{completedTransaction.paymentMethod}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onSuccess(course);
                onClose();
              }}
              className="w-full max-w-sm rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition-all"
            >
              Comenzar a Aprender Ahora
            </button>
          </div>
        ) : (
          /* Payment Form */
          <div className="p-6 space-y-5">
            {/* Course mini recap */}
            <div className="flex items-center gap-3 rounded-xl bg-indigo-50/50 p-3 border border-indigo-100/70">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-12 w-20 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-gray-900 truncate">{course.title}</h4>
                <p className="text-[11px] text-gray-500">
                  Por {course.instructorName} • {course.level}
                </p>
                <div className="text-xs font-bold text-indigo-700 mt-0.5">
                  ${course.price.toFixed(2)} {systemConfig.currency}
                </div>
              </div>
            </div>

            {/* Select payment method */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Selecciona Método de Pago
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Tarjeta de Crédito')}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                    paymentMethod === 'Tarjeta de Crédito'
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 shadow-2xs'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Tarjeta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('PayPal')}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                    paymentMethod === 'PayPal'
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 shadow-2xs'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-extrabold text-blue-700">PayPal</span>
                  <span>Saldo / Tarjeta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Mercado Pago')}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                    paymentMethod === 'Mercado Pago'
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 shadow-2xs'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-extrabold text-cyan-600">MercadoPago</span>
                  <span>Latam</span>
                </button>
              </div>
            </div>

            {/* Card Form */}
            {paymentMethod === 'Tarjeta de Crédito' && (
              <div className="space-y-3 rounded-xl border border-gray-200 p-3.5 bg-gray-50/40">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full font-mono text-xs rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Titular de la Tarjeta
                    </label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full text-xs rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 outline-hidden"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Vence
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full text-center font-mono text-xs rounded-lg border border-gray-300 bg-white px-2 py-2 text-gray-900 outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full text-center font-mono text-xs rounded-lg border border-gray-300 bg-white px-2 py-2 text-gray-900 outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Coupon Code section */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Código de descuento (ej. UDEMY50)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs uppercase font-mono rounded-xl border border-gray-300 outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black"
                >
                  Aplicar
                </button>
              </form>
              {couponMessage && (
                <p className="text-[11px] text-indigo-600 font-semibold mt-1">
                  {couponMessage}
                </p>
              )}
            </div>

            {/* Price breakdown */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-xs space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Precio del curso:</span>
                <span>${basePrice.toFixed(2)} USD</span>
              </div>
              {appliedDiscountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Descuento aplicado ({appliedDiscountPercent}%):</span>
                  <span>-${discountAmount.toFixed(2)} USD</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>Impuestos estimados ({systemConfig.taxPercent}%):</span>
                <span>${tax.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between font-extrabold text-gray-900 text-sm border-t border-gray-200 pt-1.5 mt-1.5">
                <span>Total a Pagar:</span>
                <span className="text-indigo-600">${finalTotal.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Payment submit */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              id="confirm-payment-btn"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-[0.99]"
            >
              {isProcessing ? (
                <span>Procesando pago seguro...</span>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Pagar ${finalTotal.toFixed(2)} USD y Desbloquear Curso</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Garantía de reembolso de 30 días • Encriptación TLS de 256 bits</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
