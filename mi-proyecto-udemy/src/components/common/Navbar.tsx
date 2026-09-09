import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ActiveView } from '../../types';
import { 
  BookOpen, 
  LayoutDashboard, 
  Settings, 
  Bell, 
  Search, 
  LogOut, 
  User as UserIcon, 
  ShieldCheck, 
  ChevronDown, 
  GraduationCap,
  Sparkles,
  ExternalLink,
  Check
} from 'lucide-react';

interface NavbarProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onOpenAuthModal: (mode?: 'login' | 'register') => void;
  onOpenQuickSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAuthModal,
  onOpenQuickSettings,
}) => {
  const { currentUser, logout, switchDemoAccount } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notificationsList = [
    { id: 1, title: 'Nueva inscripción', desc: 'María Fernández se unió al curso Angular 18', time: 'Hace 10 min' },
    { id: 2, title: 'Pago recibido', desc: 'Pago procesado exitosamente por $34.99 USD', time: 'Hace 35 min' },
    { id: 3, title: 'Respaldo de BD', desc: 'Sincronización y exportación completada', time: 'Hace 2 horas' },
  ];

  const isAdminView = currentView.startsWith('admin-');

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'ADMIN':
        return <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">ADMIN</span>;
      case 'INSTRUCTOR':
        return <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">INSTRUCTOR</span>;
      case 'EDITOR':
        return <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">EDITOR</span>;
      default:
        return <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">ESTUDIANTE</span>;
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200/90 bg-white/95 px-4 md:px-7 backdrop-blur-md shadow-2xs">
      {/* Left: Brand & Mode Toggle */}
      <div className="flex items-center gap-4 lg:gap-8">
        <button
          id="nav-brand-logo"
          onClick={() => onNavigate('udemy-explore')}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-sm transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-gray-900">EduPro</span>
              <span className="rounded-md bg-indigo-100 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-indigo-700">
                LMS
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium -mt-0.5">Academy & Admin Suite</p>
          </div>
        </button>

        {/* View Switcher Pill */}
        <div className="hidden sm:flex items-center rounded-xl bg-gray-100/90 p-1 border border-gray-200/70">
          <button
            id="nav-switch-udemy"
            onClick={() => onNavigate('udemy-explore')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              !isAdminView
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Cursos Udemy</span>
          </button>
          <button
            id="nav-switch-admin"
            onClick={() => onNavigate('admin-dashboard')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              isAdminView
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Panel Administrativo</span>
          </button>
        </div>
      </div>

      {/* Center Search (Udemy style) */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar cursos, lecciones, instructores, reportes..."
            className="w-full rounded-full border border-gray-200 bg-gray-50/70 pl-10 pr-4 py-2 text-xs font-medium text-gray-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Top Navbar Configuration Quick Option */}
        <button
          id="nav-quick-settings-btn"
          onClick={onOpenQuickSettings}
          title="Configuración general del sistema"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <Settings className="h-4 w-4" />
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            id="nav-notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notificaciones"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div 
              id="notifications-popover"
              className="absolute right-0 mt-2 w-80 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                <span className="text-xs font-bold text-gray-900">Notificaciones Recientes</span>
                <button
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] font-medium text-indigo-600 hover:underline"
                >
                  Marcar leídas
                </button>
              </div>
              <div className="space-y-2">
                {notificationsList.map((n) => (
                  <div key={n.id} className="rounded-xl p-2 text-xs hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between font-semibold text-gray-800">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                    </div>
                    <p className="text-gray-500 mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown or Login button */}
        {currentUser ? (
          <div className="relative">
            <button
              id="nav-profile-menu-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 rounded-xl border border-gray-200/80 p-1.5 hover:bg-gray-50 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-7 w-7 rounded-lg object-cover ring-1 ring-indigo-200"
              />
              <div className="hidden lg:block text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-gray-900 max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                  {getRoleBadge(currentUser.role)}
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileMenu && (
              <div 
                id="profile-dropdown-card"
                className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl z-50"
              >
                <div className="border-b border-gray-100 px-3 py-2.5">
                  <p className="text-xs font-bold text-gray-900">{currentUser.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-600">Rol activo:</span>
                    {getRoleBadge(currentUser.role)}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      onNavigate('admin-dashboard');
                      setShowProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Panel Administrativo
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('udemy-explore');
                      setShowProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    Mis Cursos y Catálogo
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('admin-settings');
                      setShowProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Configuración del Sistema
                  </button>
                </div>

                {/* Quick Role Switch for testing */}
                <div className="border-t border-gray-100 px-3 py-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Cambiar Perfil de Prueba
                  </span>
                  <div className="mt-1.5 grid grid-cols-3 gap-1">
                    <button
                      onClick={() => { switchDemoAccount('ADMIN'); setShowProfileMenu(false); }}
                      className={`rounded px-1.5 py-1 text-[10px] font-semibold text-center ${currentUser.role === 'ADMIN' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => { switchDemoAccount('INSTRUCTOR'); setShowProfileMenu(false); }}
                      className={`rounded px-1.5 py-1 text-[10px] font-semibold text-center ${currentUser.role === 'INSTRUCTOR' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      Profesor
                    </button>
                    <button
                      onClick={() => { switchDemoAccount('STUDENT'); setShowProfileMenu(false); }}
                      className={`rounded px-1.5 py-1 text-[10px] font-semibold text-center ${currentUser.role === 'STUDENT' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      Alumno
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-1">
                  <button
                    id="logout-btn"
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              id="nav-login-btn"
              onClick={() => onOpenAuthModal('login')}
              className="rounded-xl px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Iniciar Sesión
            </button>
            <button
              id="nav-register-btn"
              onClick={() => onOpenAuthModal('register')}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-all"
            >
              Registrarse
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
