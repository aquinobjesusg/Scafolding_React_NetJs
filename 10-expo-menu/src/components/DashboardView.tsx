import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ArrowUpRight, DollarSign, FileText, TrendingUp, Users } from "lucide-react";

const STATS = [
  { label: "Clientes activos", value: "1,248", change: "+12%", icon: Users, color: "bg-indigo-100 text-indigo-700" },
  { label: "Facturas emitidas", value: "348", change: "+8%", icon: FileText, color: "bg-teal-100 text-teal-700" },
  { label: "Ingresos mensuales", value: "€42.5k", change: "+23%", icon: DollarSign, color: "bg-emerald-100 text-emerald-700" },
  { label: "Tasa de conversión", value: "68%", change: "+4%", icon: TrendingUp, color: "bg-amber-100 text-amber-700" },
];

const ACTIVITY = [
  { user: "María González", action: "Nueva factura FAC-2025-004", time: "hace 5 min", status: "Pagada" },
  { user: "Carlos Ruiz", action: "Actualizó su perfil", time: "hace 1 h", status: "Activo" },
  { user: "Ana Torres", action: "Factura vencida FAC-2025-003", time: "hace 3 h", status: "Vencida" },
  { user: "Javier López", action: "Cliente registrado", time: "hace 1 día", status: "Activo" },
];

export function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-teal-600 p-6 lg:p-8 text-white shadow-lg shadow-indigo-600/20">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold">Bienvenido de vuelta 👋</h1>
        <p className="text-indigo-100 mt-2 max-w-xl">
          Aquí tienes un resumen de la actividad de tu plataforma en las últimas 24 horas.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <Card key={s.label} className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> {s.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-4">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Actividad reciente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition">
                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-sm">
                  {a.user.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{a.user}</p>
                  <p className="text-xs text-muted-foreground truncate">{a.action}</p>
                </div>
                <span className="text-xs text-slate-400 hidden sm:block">{a.time}</span>
                <Badge
                  className={
                    a.status === "Pagada"
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                      : a.status === "Vencida"
                      ? "bg-rose-100 text-rose-700 hover:bg-rose-100"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                  }
                >
                  {a.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm bg-slate-950 text-white">
          <CardHeader>
            <CardTitle className="text-lg text-white">Objetivo mensual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Progreso</span>
                <span className="font-semibold">78%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400" />
              </div>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs text-slate-400">Ingresos objetivo</p>
              <p className="text-2xl font-bold">€55.000</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs text-slate-400">Restante</p>
              <p className="text-2xl font-bold text-teal-400">€12.500</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}