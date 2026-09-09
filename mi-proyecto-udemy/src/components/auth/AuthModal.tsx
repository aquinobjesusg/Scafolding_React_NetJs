import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { 
  LogIn, 
  UserPlus, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase 
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { login, register, forgotPassword, resetPassword, switchDemoAccount } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'reset'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [rememberMe, setRememberMe] = useState(true);

  // Recovery token state
  const [recoveryToken, setRecoveryToken] = useState('');
  const [enteredToken, setEnteredToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Notifications
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const result = login(email, password, rememberMe);
    if (result.success) {
      setFeedback({ type: 'success', message: result.message });
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setFeedback({ type: 'error', message: result.message });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (password !== confirmPassword) {
      setFeedback({ type: 'error', message: 'Las contraseñas no coinciden.' });
      return;
    }

    if (password.length < 6) {
      setFeedback({ type: 'error', message: 'La contraseña debe tener al menos 6 caracteres.' });
      return;
    }

    const result = register(name, email, password, role);
    if (result.success) {
      setFeedback({ type: 'success', message: result.message });
      setTimeout(() => {
        onClose();
      }, 800);
    } else {
      setFeedback({ type: 'error', message: result.message });
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const result = forgotPassword(email);
    if (result.success && result.recoveryToken) {
      setRecoveryToken(result.recoveryToken);
      setFeedback({
        type: 'success',
        message: `${result.message} Código generado para prueba: ${result.recoveryToken}`,
      });
      setMode('reset');
    } else {
      setFeedback({ type: 'error', message: result.message });
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (enteredToken.trim().toUpperCase() !== recoveryToken.toUpperCase()) {
      setFeedback({ type: 'error', message: 'El código de recuperación ingresado es incorrecto.' });
      return;
    }

    if (newPassword.length < 6) {
      setFeedback({ type: 'error', message: 'La nueva contraseña debe tener al menos 6 caracteres.' });
      return;
    }

    const result = resetPassword(email, newPassword);
    if (result.success) {
      setFeedback({ type: 'success', message: result.message });
      setTimeout(() => {
        setMode('login');
        setPassword(newPassword);
        setFeedback(null);
      }, 1200);
    }
  };

  const selectDemo = (demoRole: UserRole) => {
    switchDemoAccount(demoRole);
    setFeedback({ type: 'success', message: `Sesión iniciada con rol ${demoRole}` });
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div 
        id="auth-modal-card"
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100"
      >
        {/* Header tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/70 p-1">
          <button
            id="tab-login-btn"
            type="button"
            onClick={() => { setMode('login'); setFeedback(null); }}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            id="tab-register-btn"
            type="button"
            onClick={() => { setMode('register'); setFeedback(null); }}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Feedback alert */}
          {feedback && (
            <div
              className={`mb-4 flex items-start gap-2.5 rounded-xl p-3 text-sm font-medium ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
              )}
              <div className="flex-1 leading-snug">{feedback.message}</div>
            </div>
          )}

          {/* Quick Demo Access Pills */}
          <div className="mb-5 rounded-xl bg-indigo-50/60 p-3 border border-indigo-100/70">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-2">
              Acceso rápido para demostración:
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                id="demo-admin-btn"
                onClick={() => selectDemo('ADMIN')}
                className="flex items-center justify-center gap-1 rounded-lg bg-white px-2 py-1.5 text-xs font-semibold text-indigo-700 shadow-2xs hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin
              </button>
              <button
                type="button"
                id="demo-instructor-btn"
                onClick={() => selectDemo('INSTRUCTOR')}
                className="flex items-center justify-center gap-1 rounded-lg bg-white px-2 py-1.5 text-xs font-semibold text-indigo-700 shadow-2xs hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <Briefcase className="h-3.5 w-3.5" />
                Instructor
              </button>
              <button
                type="button"
                id="demo-student-btn"
                onClick={() => selectDemo('STUDENT')}
                className="flex items-center justify-center gap-1 rounded-lg bg-white px-2 py-1.5 text-xs font-semibold text-indigo-700 shadow-2xs hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <GraduationCap className="h-3.5 w-3.5" />
                Estudiante
              </button>
            </div>
          </div>

          {/* MODE: LOGIN */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="ej. admin@edupro.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium uppercase text-gray-700">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setFeedback(null); }}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Recordar contraseña</span>
                </label>
              </div>

              <button
                type="submit"
                id="submit-login-btn"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 active:scale-[0.99] transition-all"
              >
                <LogIn className="h-4 w-4" />
                Iniciar Sesión
              </button>
            </form>
          )}

          {/* MODE: REGISTER */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium uppercase text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Daniel Arismendi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase text-gray-700 mb-1">
                  Tipo de Cuenta
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('STUDENT')}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                      role === 'STUDENT'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                    Estudiante
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('INSTRUCTOR')}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                      role === 'INSTRUCTOR'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                    Instructor
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium uppercase text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase text-gray-700 mb-1">
                    Confirmar
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Repite contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="submit-register-btn"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 active:scale-[0.99] transition-all mt-2"
              >
                <UserPlus className="h-4 w-4" />
                Crear Cuenta Gratuita
              </button>
            </form>
          )}

          {/* MODE: FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-4">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <KeyRound className="h-6 w-6" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-gray-900">
                  Recuperar Contraseña
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Ingresa tu correo y te enviaremos un código para restablecer tu contraseña.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="ej. maria@edupro.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden"
                />
              </div>

              <button
                type="submit"
                id="submit-forgot-btn"
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition-all"
              >
                Enviar Código de Recuperación
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setFeedback(null); }}
                  className="text-xs font-medium text-gray-600 hover:text-gray-900"
                >
                  Volver al inicio de sesión
                </button>
              </div>
            </form>
          )}

          {/* MODE: RESET PASSWORD */}
          {mode === 'reset' && (
            <form onSubmit={handleReset} className="space-y-3.5">
              <div className="text-center">
                <h3 className="text-base font-semibold text-gray-900">
                  Ingresa tu Código y Nueva Contraseña
                </h3>
                <p className="text-xs text-gray-500">
                  Código de verificación enviado para {email}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase text-gray-700 mb-1">
                  Código de 6 caracteres
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder={recoveryToken || 'CÓDIGO'}
                  value={enteredToken}
                  onChange={(e) => setEnteredToken(e.target.value)}
                  className="w-full text-center tracking-widest font-mono font-bold uppercase rounded-xl border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase text-gray-700 mb-1">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden"
                />
              </div>

              <button
                type="submit"
                id="submit-reset-btn"
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition-all"
              >
                Actualizar Contraseña
              </button>
            </form>
          )}
        </div>

        {/* Modal footer close */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 text-right">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-gray-500 hover:text-gray-800"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
};
