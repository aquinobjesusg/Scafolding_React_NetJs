import React from 'react';
import { ActiveView } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useCourse } from '../../context/CourseContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ShieldAlert, 
  Key, 
  BarChart3, 
  ReceiptText, 
  Settings, 
  FileSpreadsheet, 
  Sparkles, 
  Tv, 
  FolderKanban,
  CheckSquare
} from 'lucide-react';
import { exportToExcel } from '../../utils/excelExport';

interface AdminSidebarProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  isCollapsed?: boolean;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentView,
  onNavigate,
}) => {
  const { currentUser, hasPermission, users, roles } = useAuth();
  const { courses, transactions } = useCourse();

  const handleExportAllToExcel = () => {
    exportToExcel(
      courses.map(c => ({
        ID: c.id,
        Título: c.title,
        Categoría: c.category,
        Nivel: c.level,
        Instructor: c.instructorName,
        PrecioUSD: c.price,
        Estudiantes: c.studentsCount,
        Valoración: c.rating,
        Estado: c.status,
        Actualizado: c.updatedAt,
      })),
      [
        { header: 'ID', key: 'ID' },
        { header: 'Título del Curso', key: 'Título' },
        { header: 'Categoría', key: 'Categoría' },
        { header: 'Nivel', key: 'Nivel' },
        { header: 'Instructor Titular', key: 'Instructor' },
        { header: 'Precio (USD)', key: 'PrecioUSD' },
        { header: 'Estudiantes Inscritos', key: 'Estudiantes' },
        { header: 'Valoración (Estrellas)', key: 'Valoración' },
        { header: 'Estado', key: 'Estado' },
        { header: 'Última Actualización', key: 'Actualizado' },
      ],
      'catalogo_completo_cursos',
      'Cursos'
    );
  };

  const menuSections = [
    {
      title: 'Principal',
      items: [
        {
          id: 'admin-dashboard',
          label: 'Dashboard General',
          icon: LayoutDashboard,
          badge: 'KPIs',
          badgeColor: 'bg-indigo-100 text-indigo-700',
        },
      ],
    },
    {
      title: 'CRUD de Tablas',
      items: [
        {
          id: 'admin-courses',
          label: 'Cursos y Lecciones',
          icon: BookOpen,
          badge: courses.length.toString(),
          badgeColor: 'bg-blue-100 text-blue-700',
          permission: 'courses.read',
        },
        {
          id: 'admin-transactions',
          label: 'Inscripciones y Pagos',
          icon: ReceiptText,
          badge: transactions.length.toString(),
          badgeColor: 'bg-emerald-100 text-emerald-700',
          permission: 'finance.read',
        },
      ],
    },
    {
      title: 'Gestión y Accesos',
      items: [
        {
          id: 'admin-users',
          label: 'Usuarios Registrados',
          icon: Users,
          badge: users.length.toString(),
          badgeColor: 'bg-purple-100 text-purple-700',
          permission: 'users.read',
        },
        {
          id: 'admin-roles',
          label: 'Roles y Permisos',
          icon: ShieldAlert,
          badge: roles.length.toString(),
          badgeColor: 'bg-amber-100 text-amber-800',
          permission: 'roles.manage',
        },
      ],
    },
    {
      title: 'Analítica y Métricas',
      items: [
        {
          id: 'admin-reports',
          label: 'Reportes Dinámicos',
          icon: BarChart3,
          badge: 'Gráficas',
          badgeColor: 'bg-emerald-100 text-emerald-700',
          permission: 'reports.read',
        },
      ],
    },
    {
      title: 'Configuración',
      items: [
        {
          id: 'admin-settings',
          label: 'Configuración del Sistema',
          icon: Settings,
          badge: 'General',
          badgeColor: 'bg-gray-100 text-gray-700',
          permission: 'settings.manage',
        },
      ],
    },
  ];

  return (
    <aside 
      id="admin-sidebar"
      className="w-64 shrink-0 border-r border-gray-200/90 bg-white flex flex-col justify-between min-h-[calc(100vh-4rem)] p-4 shadow-2xs"
    >
      <div className="space-y-6">
        {/* User Card inside Sidebar */}
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 border border-gray-200/60">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Avatar"
            className="h-10 w-10 rounded-xl object-cover ring-1 ring-orange-200"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-gray-900 truncate">
              {currentUser?.name || 'Invitado'}
            </h4>
            <p className="text-[11px] font-bold text-orange-600 truncate">
              Rol: {currentUser?.role || 'Visitante'}
            </p>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-5">
          {menuSections.map((section, idx) => (
            <div key={idx}>
              <h5 className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                {section.title}
              </h5>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  if (item.permission && !hasPermission(item.permission)) {
                    return null;
                  }
                  const isActive = currentView === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      id={`sidebar-${item.id}`}
                      onClick={() => onNavigate(item.id as ActiveView)}
                      className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-orange-500 text-white shadow-xs font-bold'
                          : 'text-gray-600 hover:bg-orange-50/60 hover:text-orange-950'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`h-4 w-4 shrink-0 transition-transform ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-orange-600'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badgeColor
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Actions: Excel Quick Export and LMS Mode */}
      <div className="pt-4 border-t border-gray-100 space-y-2 mt-6">
        <button
          id="sidebar-quick-excel-btn"
          onClick={handleExportAllToExcel}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300 transition-colors shadow-2xs"
          title="Descargar base de datos a Excel"
        >
          <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
          <span>Exportar Cursos a Excel</span>
        </button>

        <button
          id="sidebar-goto-udemy-btn"
          onClick={() => onNavigate('udemy-explore')}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 transition-colors"
        >
          <Tv className="h-4 w-4 text-orange-500" />
          <span>Ver Plataforma Alumno</span>
        </button>
      </div>
    </aside>
  );
};
