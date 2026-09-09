import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, LayoutDashboard, FileText, CreditCard, Users, LogOut, Bell, Search } from "lucide-react";
import { toast } from "sonner";

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("resumen");

  const navItems = [
    { id: "resumen", label: "Resumen", icon: LayoutDashboard },
    { id: "recibos", label: "Recibos", icon: FileText },
    { id: "pagos", label: "Pasarela de Pago", icon: CreditCard },
    { id: "residentes", label: "Residentes", icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-slate-800 text-lg leading-none">Condominio</h2>
              <p className="text-xs text-slate-500 mt-1">Panel Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-serif font-bold text-slate-800 capitalize">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:border-slate-300 focus:bg-white outline-none text-sm text-slate-700 w-64"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-slate-100">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-auto">
          {activeTab === "resumen" && <ResumenTab />}
          {activeTab === "recibos" && <RecibosTab />}
          {activeTab === "pagos" && <PagosTab />}
          {activeTab === "residentes" && <ResidentesTab />}
        </div>
      </main>
    </div>
  );
}

function ResumenTab() {
  const stats = [
    { label: "Unidades Totales", value: "48", icon: Building2, color: "from-slate-500 to-slate-700" },
    { label: "Pagos del Mes", value: "32/48", icon: CreditCard, color: "from-emerald-400 to-emerald-600" },
    { label: "Recibos Emitidos", value: "48", icon: FileText, color: "from-blue-400 to-blue-600" },
    { label: "Residentes", value: "126", icon: Users, color: "from-amber-400 to-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800 font-serif">Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { text: "Pago recibido de Depto 402 - $150.00", time: "Hace 2 horas", type: "pago" },
              { text: "Recibo emitido para Depto 105", time: "Hace 5 horas", type: "recibo" },
              { text: "Nuevo residente registrado en Depto 301", time: "Ayer", type: "residente" },
              { text: "Pago recibido de Depto 203 - $150.00", time: "Hace 2 días", type: "pago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.type === "pago" ? "bg-emerald-500" : item.type === "recibo" ? "bg-blue-500" : "bg-amber-500"}`}></div>
                  <p className="text-slate-700 text-sm">{item.text}</p>
                </div>
                <span className="text-xs text-slate-400">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RecibosTab() {
  const recibos = [
    { id: "R-001", depto: "101", mes: "Enero 2024", monto: 150.0, estado: "Pagado" },
    { id: "R-002", depto: "102", mes: "Enero 2024", monto: 150.0, estado: "Pendiente" },
    { id: "R-003", depto: "201", mes: "Enero 2024", monto: 180.0, estado: "Pagado" },
    { id: "R-004", depto: "202", mes: "Enero 2024", monto: 150.0, estado: "Vencido" },
  ];

  const handleEmitir = () => {
    toast.success("Recibos emitidos correctamente", {
      description: "Se han emitido 48 recibos para el mes actual",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-slate-500">Gestiona y emite recibos de mantenimiento</p>
        <Button onClick={handleEmitir} className="bg-slate-800 hover:bg-slate-900 text-white">
          <FileText className="w-4 h-4 mr-2" />
          Emitir Recibos
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left p-4 text-sm font-semibold text-slate-600">Folio</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">Departamento</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">Periodo</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">Monto</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recibos.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm font-mono text-slate-700">{r.id}</td>
                  <td className="p-4 text-sm text-slate-700">Depto {r.depto}</td>
                  <td className="p-4 text-sm text-slate-700">{r.mes}</td>
                  <td className="p-4 text-sm font-semibold text-slate-800">${r.monto.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      r.estado === "Pagado" ? "bg-emerald-100 text-emerald-700" :
                      r.estado === "Pendiente" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {r.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function PagosTab() {
  const handlePagar = () => {
    toast.success("Procesando pago...", {
      description: "Redirigiendo a la pasarela de pago segura",
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <p className="text-slate-500">Realiza pagos de mantenimiento de forma segura</p>
      
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800 font-serif">Detalles del Pago</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">Monto a pagar</p>
              <p className="text-3xl font-bold text-slate-800">$150.00 USD</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Concepto</p>
              <p className="text-sm font-medium text-slate-700">Mantenimiento Enero 2024</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">Número de Tarjeta</label>
            <input 
              placeholder="4242 4242 4242 4242" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-500 focus:ring-slate-500 outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Vencimiento</label>
                <input placeholder="MM/YY" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-500 focus:ring-slate-500 outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">CVV</label>
                <input placeholder="123" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-500 focus:ring-slate-500 outline-none" />
              </div>
            </div>
          </div>

          <Button onClick={handlePagar} className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white text-base">
            <CreditCard className="w-5 h-5 mr-2" />
            Pagar $150.00
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ResidentesTab() {
  const residentes = [
    { nombre: "Juan Pérez", depto: "101", telefono: "+52 555 123 4567", email: "juan@email.com" },
    { nombre: "María García", depto: "102", telefono: "+52 555 234 5678", email: "maria@email.com" },
    { nombre: "Carlos López", depto: "201", telefono: "+52 555 345 6789", email: "carlos@email.com" },
    { nombre: "Ana Martínez", depto: "202", telefono: "+52 555 456 7890", email: "ana@email.com" },
  ];

  return (
    <div className="space-y-6">
      <p className="text-slate-500">Directorio de residentes del condominio</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {residentes.map((r) => (
          <Card key={r.depto} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white font-bold shadow-md">
                  {r.nombre.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{r.nombre}</h3>
                  <p className="text-sm text-slate-500">Depto {r.depto}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-slate-600">
                <p>📞 {r.telefono}</p>
                <p>✉️ {r.email}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}