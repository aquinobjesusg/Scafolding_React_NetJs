import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  FileSpreadsheet, 
  Calendar, 
  TrendingUp, 
  Award, 
  Users, 
  BookOpen, 
  DollarSign, 
  Download 
} from 'lucide-react';
import { exportToExcel } from '../../utils/excelExport';

export const DynamicReports: React.FC = () => {
  const { courses, transactions } = useCourse();
  const { users } = useAuth();

  const [dateRange, setDateRange] = useState<'30d' | '90d' | 'year'>('30d');

  // Revenue trend data
  const revenueTrendData = [
    { period: 'Ene', ingresos: 4200, comisiones: 840, estudiantes: 120 },
    { period: 'Feb', ingresos: 5800, comisiones: 1160, estudiantes: 165 },
    { period: 'Mar', ingresos: 7100, comisiones: 1420, estudiantes: 210 },
    { period: 'Abr', ingresos: 6400, comisiones: 1280, estudiantes: 185 },
    { period: 'May', ingresos: 8900, comisiones: 1780, estudiantes: 260 },
    { period: 'Jun', ingresos: 10400, comisiones: 2080, estudiantes: 310 },
    { period: 'Jul', ingresos: 12800, comisiones: 2560, estudiantes: 390 },
    { period: 'Ago', ingresos: 14200, comisiones: 2840, estudiantes: 430 },
    { period: 'Sep (Actual)', ingresos: 16800, comisiones: 3360, estudiantes: 510 },
  ];

  // Category enrollment distribution with warm orange & complementary hues
  const categoryStats = [
    { name: 'Desarrollo Web', estudiantes: 16040, cursos: 2, color: '#F97316' },
    { name: 'Inteligencia Artificial', estudiantes: 6200, cursos: 1, color: '#EA580C' },
    { name: 'Diseño UI/UX', estudiantes: 4300, cursos: 1, color: '#F59E0B' },
    { name: 'Cloud & DevOps', estudiantes: 3100, cursos: 1, color: '#10B981' },
    { name: 'Bases de Datos', estudiantes: 2200, cursos: 1, color: '#3B82F6' },
  ];

  // User role breakdown
  const roleDistribution = [
    { name: 'Estudiantes', value: users.filter((u) => u.role === 'STUDENT').length || 28, color: '#F97316' },
    { name: 'Instructores', value: users.filter((u) => u.role === 'INSTRUCTOR').length || 4, color: '#F59E0B' },
    { name: 'Editores', value: users.filter((u) => u.role === 'EDITOR').length || 2, color: '#10B981' },
    { name: 'Administradores', value: users.filter((u) => u.role === 'ADMIN').length || 1, color: '#6366F1' },
  ];

  // Course performance metrics
  const coursePerformance = courses.map((c) => ({
    nombre: c.title.substring(0, 22) + '...',
    nombreCompleto: c.title,
    alumnos: c.studentsCount,
    calificacion: c.rating,
    precio: c.price,
    ingresosEstimados: Math.round(c.studentsCount * c.price * 0.7),
  }));

  const handleExportFullReport = () => {
    // Export multi-section statistical data to Excel
    const excelData = revenueTrendData.map((row) => ({
      Periodo: row.period,
      'Ingresos Brutos ($)': row.ingresos,
      'Comisiones Plataforma ($)': row.comisiones,
      'Nuevos Estudiantes': row.estudiantes,
    }));

    exportToExcel(
      excelData,
      [
        { header: 'Periodo', key: 'Periodo' },
        { header: 'Ingresos Brutos ($)', key: 'Ingresos Brutos ($)' },
        { header: 'Comisiones Plataforma ($)', key: 'Comisiones Plataforma ($)' },
        { header: 'Nuevos Estudiantes', key: 'Nuevos Estudiantes' },
      ],
      'reporte_analitica_dinamica',
      'Tendencias Financieras'
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-2xs">
        <div>
          <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <span>Reportes Dinámicos & Métricas de Negocio</span>
          </h2>
          <p className="text-xs text-gray-500">
            Visualiza el crecimiento de ventas, retención de estudiantes y rendimiento por cursos con gráficos interactivos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time range selector */}
          <div className="flex items-center rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => setDateRange('30d')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                dateRange === '30d' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Últimos 30 días
            </button>
            <button
              onClick={() => setDateRange('90d')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                dateRange === '90d' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Trimestre
            </button>
            <button
              onClick={() => setDateRange('year')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                dateRange === 'year' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Año Actual
            </button>
          </div>

          <button
            id="btn-export-full-report-excel"
            onClick={handleExportFullReport}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            <span>Exportar Informe a Excel</span>
          </button>
        </div>
      </div>

      {/* Primary Chart: Revenue and Inscriptions Trend */}
      <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Evolución de Ingresos y Matrículas
            </h3>
            <p className="text-xs text-gray-500">
              Crecimiento mensual de facturación neta vs nuevos estudiantes
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-orange-600">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500" /> Ingresos ($ USD)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Nuevos Estudiantes
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorComisiones" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="period" stroke="#9CA3AF" fontSize={11} tickLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #FED7AA',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                }}
                formatter={(value: any, name: any) => [
                  name === 'estudiantes' ? `${value} alumnos` : `$${value} USD`,
                  name === 'ingresos' ? 'Ingresos Totales' : name === 'comisiones' ? 'Comisiones Plataforma' : 'Nuevos Estudiantes',
                ]}
              />
              <Area type="monotone" dataKey="ingresos" stroke="#F97316" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIngresos)" />
              <Area type="monotone" dataKey="comisiones" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorComisiones)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Grid: Bar Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart: Enrollments by Category */}
        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-2xs">
          <div className="border-b border-gray-100 pb-3 mb-4">
            <h3 className="text-sm font-bold text-gray-900">
              Estudiantes por Categoría de Curso
            </h3>
            <p className="text-xs text-gray-500">
              Volumen de inscripciones activas por área temática
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #FED7AA',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`${val.toLocaleString()} alumnos`, 'Inscritos']}
                />
                <Bar dataKey="estudiantes" radius={[6, 6, 0, 0]}>
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: User roles distribution */}
        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-2xs">
          <div className="border-b border-gray-100 pb-3 mb-4">
            <h3 className="text-sm font-bold text-gray-900">
              Distribución de Usuarios por Rol
            </h3>
            <p className="text-xs text-gray-500">
              Composición de la comunidad en la plataforma
            </p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`role-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #FED7AA',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`${val} cuentas`, 'Total']}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-xs text-gray-700 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performing Courses Table inside Reports */}
      <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Rendimiento de los Cursos Top Sellers
            </h3>
            <p className="text-xs text-gray-500">
              Comparativa de impacto, volumen de estudiantes e ingresos acumulados
            </p>
          </div>
          <button
            onClick={handleExportFullReport}
            className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Descargar datos brutos</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <tr>
                <th className="pb-3">Curso</th>
                <th className="pb-3">Estudiantes</th>
                <th className="pb-3">Calificación</th>
                <th className="pb-3">Precio Unitario</th>
                <th className="pb-3 text-right">Facturación Estimada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coursePerformance.map((item, idx) => (
                <tr key={idx} className="hover:bg-orange-50/30">
                  <td className="py-3 font-semibold text-gray-900">{item.nombreCompleto}</td>
                  <td className="py-3 text-gray-600">{item.alumnos.toLocaleString()} alumnos</td>
                  <td className="py-3 text-amber-600 font-bold">★ {item.calificacion}</td>
                  <td className="py-3 font-medium text-gray-700">${item.precio.toFixed(2)}</td>
                  <td className="py-3 text-right font-bold text-emerald-600">
                    ${item.ingresosEstimados.toLocaleString()} USD
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
