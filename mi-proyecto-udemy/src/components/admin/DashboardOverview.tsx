import React from 'react';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { ActiveView } from '../../types';
import { 
  DollarSign, 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  ArrowUpRight, 
  FileSpreadsheet, 
  ShieldCheck, 
  Plus, 
  Tv, 
  Sparkles,
  Receipt,
  CheckCircle2
} from 'lucide-react';
import { exportToExcel } from '../../utils/excelExport';

interface DashboardOverviewProps {
  onNavigate: (view: ActiveView) => void;
  onOpenCourseModal: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
}) => {
  const { courses, transactions } = useCourse();
  const { users } = useAuth();

  const totalRevenue = transactions
    .filter((t) => t.status === 'Completado')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalStudents = users.filter((u) => u.role === 'STUDENT').length;
  const publishedCourses = courses.filter((c) => c.status === 'Publicado').length;

  const handleExportQuickStats = () => {
    exportToExcel(
      transactions.map((t) => ({
        Código: t.transactionCode,
        Estudiante: t.userName,
        Curso: t.courseTitle,
        Monto: t.amount,
        Método: t.paymentMethod,
        Estado: t.status,
        Fecha: t.date,
      })),
      [
        { header: 'Código', key: 'Código' },
        { header: 'Estudiante', key: 'Estudiante' },
        { header: 'Curso Adquirido', key: 'Curso' },
        { header: 'Monto ($ USD)', key: 'Monto' },
        { header: 'Método de Pago', key: 'Método' },
        { header: 'Estado', key: 'Estado' },
        { header: 'Fecha', key: 'Fecha' },
      ],
      'dashboard_resumen_ejecutivo',
      'Resumen General'
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 p-6 text-white shadow-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Panel Administrativo v2.4 • Academia Activa</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">
            Control Operativo de Cursos, Usuarios y Finanzas
          </h1>
          <p className="text-xs text-indigo-200/80 max-w-xl">
            Gestiona el catálogo de video clases, revisa pagos en tiempo real, administra roles y exporta informes dinámicos a Excel.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportQuickStats}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Descargar Balance Excel</span>
          </button>
          <button
            onClick={() => onNavigate('udemy-explore')}
            className="flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-2 text-xs font-bold text-white transition-all"
          >
            <Tv className="h-4 w-4 text-indigo-300" />
            <span>Ir al Catálogo Estudiante</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold">Ingresos Totales</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">
            ${totalRevenue.toFixed(2)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+28.4% este mes</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold">Estudiantes Registrados</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">
            {totalStudents || 34}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-600 font-semibold">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+14 nuevas matrículas</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold">Cursos en Catálogo</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">
            {courses.length}
          </div>
          <div className="mt-2 text-xs text-gray-400 font-medium">
            {publishedCourses} publicados y activos
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold">Tasa de Culminación</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">
            78.6%
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <span>Certificados emitidos con éxito</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Transactions & Quick Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Transactions */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Últimas Transacciones Registradas</h3>
              <p className="text-xs text-gray-500">Cobros procesados a través de pasarelas de pago</p>
            </div>
            <button
              onClick={() => onNavigate('admin-transactions')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Ver Todas ({transactions.length})
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-700">
                    <Receipt className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{tx.courseTitle}</h4>
                    <p className="text-[11px] text-gray-400">
                      {tx.userName} • {tx.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-gray-900">
                    +${tx.amount.toFixed(2)} {tx.currency}
                  </div>
                  <span
                    className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tx.status === 'Completado'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Quick Navigation Shortcuts & Health */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Accesos Directos del Sistema
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('admin-courses')}
                className="w-full flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-left hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  <span className="text-xs font-bold text-gray-800">Gestionar Cursos</span>
                </div>
                <span className="text-xs text-gray-400">→</span>
              </button>

              <button
                onClick={() => onNavigate('admin-users')}
                className="w-full flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-left hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-xs font-bold text-gray-800">Padrón de Usuarios</span>
                </div>
                <span className="text-xs text-gray-400">→</span>
              </button>

              <button
                onClick={() => onNavigate('admin-reports')}
                className="w-full flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-left hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-bold text-gray-800">Gráficas y Analítica</span>
                </div>
                <span className="text-xs text-gray-400">→</span>
              </button>

              <button
                onClick={() => onNavigate('admin-settings')}
                className="w-full flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-left hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                  <span className="text-xs font-bold text-gray-800">Pasarelas de Pago & Config</span>
                </div>
                <span className="text-xs text-gray-400">→</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
            <h4 className="text-xs font-bold text-indigo-900 mb-1">
              Exportación Completa a Excel
            </h4>
            <p className="text-[11px] text-indigo-700/80 mb-3">
              Todos los CRUDs (Usuarios, Cursos, Transacciones y Reportes) cuentan con descarga directa en formato nativo de hoja de cálculo.
            </p>
            <button
              onClick={handleExportQuickStats}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white border border-indigo-200 px-3 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Exportar Reporte General (.xls)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
