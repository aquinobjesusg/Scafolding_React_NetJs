'use client'
import React, { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  LayoutDashboard, Users, FileText, FileSpreadsheet, LogOut,
  Search, TrendingUp, TrendingDown, DollarSign, CreditCard, ChevronRight, Settings, Bell,
  Database, SlidersHorizontal, Boxes, ChevronDown, Shield, UserCog, MenuSquare, Save,
  UserCircle, Lock, Upload, Mail, Building2, Camera, Menu, X, BarChart3, PieChart, LineChart, PanelLeftClose, PanelLeftOpen, Pencil, Trash2, Plus, FileUp, Send, Sparkles, MessageSquare, Building, Home, CalendarDays, Wrench
} from "lucide-react";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Pie, Line, LineChart as RechartsLineChart, XAxis, YAxis, Cell } from "recharts";
import type { AppView } from "@/app/page";

interface AdminPanelProps {
  onNavigate: (view: AppView) => void;
}

interface Resident {
  id: string;
  name: string;
  category: string;
  balance: number;
  status: "Al día" | "Moroso";
}

const residents: Resident[] = [
  { id: "A-101", name: "Familia Pérez", category: "Propietario", balance: 1200, status: "Al día" },
  { id: "A-102", name: "Juan Rodríguez", category: "Inquilino", balance: 0, status: "Al día" },
  { id: "B-201", name: "María Gómez", category: "Propietario", balance: 450, status: "Moroso" },
  { id: "B-202", name: "Carlos Vargas", category: "Propietario", balance: 890, status: "Al día" },
  { id: "C-301", name: "Ana Torres", category: "Inquilino", balance: 0, status: "Al día" },
  { id: "C-302", name: "Pedro Lima", category: "Propietario", balance: 3200, status: "Moroso" },
  { id: "D-401", name: "Sofía Díaz", category: "Propietario", balance: 750, status: "Al día" },
  { id: "D-402", name: "Luis Gómez", category: "Inquilino", balance: 150, status: "Al día" },
];

const stats = [
  { label: "Fondo de Reserva", value: "$45,200", change: "+12.5%", icon: DollarSign, color: "bg-amber-100 text-amber-800" },
  { label: "Expensas Cobradas", value: "$28,900", change: "+8.2%", icon: CreditCard, color: "bg-emerald-100 text-emerald-800" },
  { label: "Pendientes", value: "$3,650", change: "-5.1%", icon: TrendingDown, color: "bg-rose-100 text-rose-800" },
  { label: "Residencias", value: "120", change: "+0.0%", icon: Home, color: "bg-stone-200 text-stone-800" },
];

const sidebarConfig = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "residents", label: "Residentes", icon: Users },
  { id: "facilities", label: "Áreas Comunes", icon: CalendarDays },
  { id: "maintenance", label: "Mantenimiento", icon: Wrench },
  { id: "reports", label: "Reportes", icon: FileText },
  { id: "statistics", label: "Estadísticas", icon: BarChart3 },
  { id: "charts", label: "Gráficos", icon: PieChart },
];

const configSubItems = [
  { id: "cfg-models", label: "Modelos de Datos", icon: Database, description: "Define entidades y atributos del sistema" },
  { id: "cfg-params", label: "Parámetros Generales", icon: SlidersHorizontal, description: "Configuración global de la aplicación" },
  { id: "cfg-modules", label: "Módulos", icon: Boxes, description: "Gestiona los módulos disponibles" },
];

const usersSubItems = [
  { id: "usr-roles", label: "Roles", icon: Shield, description: "Crear, editar y eliminar roles del sistema" },
  { id: "usr-assign", label: "Asignar Usuarios", icon: UserCog, description: "Asigna usuarios a roles específicos" },
  { id: "usr-functions", label: "Funciones del Menú", icon: MenuSquare, description: "Asigna permisos de menú a los roles" },
];

const chatCommands = [
  { id: "dashboard", label: "Ver Dashboard", icon: LayoutDashboard },
  { id: "residents", label: "Gestionar Residentes", icon: Users },
  { id: "facilities", label: "Ver Áreas Comunes", icon: CalendarDays },
  { id: "maintenance", label: "Ver Mantenimiento", icon: Wrench },
  { id: "reports", label: "Ver Reportes", icon: FileText },
  { id: "statistics", label: "Ver Estadísticas", icon: BarChart3 },
  { id: "charts", label: "Ver Gráficos", icon: PieChart },
  { id: "cfg-models", label: "Crear Modelo de Datos", icon: Database },
  { id: "cfg-params", label: "Configurar Parámetros", icon: SlidersHorizontal },
  { id: "cfg-modules", label: "Administrar Módulos", icon: Boxes },
  { id: "usr-roles", label: "Gestionar Roles", icon: Shield },
  { id: "usr-assign", label: "Asignar Usuarios", icon: UserCog },
  { id: "usr-functions", label: "Configurar Menú", icon: MenuSquare },
  { id: "profile", label: "Mi Perfil", icon: UserCircle },
  { id: "logout", label: "Cerrar Sesión", icon: LogOut },
];

const salesData = [
  { month: "Ene", ingresos: 4000, gastos: 2400 },
  { month: "Feb", ingresos: 3000, gastos: 1398 },
  { month: "Mar", ingresos: 5000, gastos: 3800 },
  { month: "Abr", ingresos: 4780, gastos: 3908 },
  { month: "May", ingresos: 6890, gastos: 4800 },
  { month: "Jun", ingresos: 7390, gastos: 3800 },
  { month: "Jul", ingresos: 8490, gastos: 4300 },
  { month: "Ago", ingresos: 9000, gastos: 5100 },
];

const categoryData = [
  { name: "Mantenimiento", value: 400, fill: "#b45309" },
  { name: "Seguridad", value: 300, fill: "#d97706" },
  { name: "Limpieza", value: 200, fill: "#a8a29e" },
  { name: "Áreas Comunes", value: 150, fill: "#f59e0b" },
  { name: "Administración", value: 100, fill: "#78716c" },
];

const trafficData = [
  { day: "Lun", visitas: 240 },
  { day: "Mar", visitas: 310 },
  { day: "Mié", visitas: 280 },
  { day: "Jue", visitas: 450 },
  { day: "Vie", visitas: 520 },
  { day: "Sáb", visitas: 380 },
  { day: "Dom", visitas: 210 },
];

const chartConfig = {
  ingresos: { label: "Ingresos", color: "#b45309" },
  gastos: { label: "Gastos", color: "#a8a29e" },
  visitas: { label: "Visitas", color: "#d97706" },
} as const;

export function AdminPanel({ onNavigate }: AdminPanelProps) {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [configOpen, setConfigOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "¡Hola! Soy tu asistente de CondoManager. Escribe un comando o selecciona una opción para empezar." }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState({
    name: "Admin Condominio",
    email: "admin@condomanager.com",
    company: "Residencial Las Palmas",
    avatar: "",
  });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [roles, setRoles] = useState([
    { id: 1, name: "Súper Admin", description: "Acceso total al sistema" },
    { id: 2, name: "Conserje", description: "Control de accesos y visitas" },
    { id: 3, name: "Residente", description: "Solo consulta y pagos" },
  ]);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");

  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@condomanager.com", assignedRole: 1 },
    { id: 2, name: "Ana Torres", email: "ana@condomanager.com", assignedRole: 2 },
    { id: 3, name: "Carlos Ruiz", email: "carlos@condomanager.com", assignedRole: 3 },
    { id: 4, name: "María Luz", email: "maria@condomanager.com", assignedRole: null },
  ]);

  const [roleFunctions, setRoleFunctions] = useState<Record<number, Record<string, boolean>>>({
    1: { dashboard: true, residents: true, facilities: true, maintenance: true, reports: true, statistics: true, charts: true, "cfg-models": true, "cfg-params": true, "cfg-modules": true, "usr-roles": true, "usr-assign": true, "usr-functions": true },
    2: { dashboard: true, residents: false, facilities: true, maintenance: false, reports: false, statistics: false, charts: false, "cfg-models": false, "cfg-params": false, "cfg-modules": false, "usr-roles": false, "usr-assign": false, "usr-functions": false },
    3: { dashboard: true, residents: false, facilities: true, maintenance: false, reports: false, statistics: false, charts: false, "cfg-models": false, "cfg-params": false, "cfg-modules": false, "usr-roles": false, "usr-assign": false, "usr-functions": false },
  });
  const [selectedRoleForFunc, setSelectedRoleForFunc] = useState<number | null>(1);

  const [models, setModels] = useState([
    { id: "M-01", name: "Residente", attributes: 12, type: "Maestro" },
    { id: "M-02", name: "Pago de Expensas", attributes: 25, type: "Transaccional" },
    { id: "M-03", name: "Reserva de Área", attributes: 18, type: "Transaccional" },
  ]);
  const [params, setParams] = useState([
    { id: "P-01", name: "Moneda Base", value: "USD", type: "Texto" },
    { id: "P-02", name: "Tasa de Interés Moratorio", value: "5%", type: "Porcentaje" },
  ]);
  const [modules, setModules] = useState([
    { id: "MOD-01", name: "Control de Accesos", active: true, icon: "KeyRound" },
    { id: "MOD-02", name: "Reservas", active: true, icon: "CalendarDays" },
    { id: "MOD-03", name: "Correspondencia", active: false, icon: "Mail" },
  ]);

  const filteredResidents = useMemo(() => {
    return residents.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatOpen]);

  const exportToExcel = (data: any[], filename: string) => {
    if (!data.length) {
      toast.error("No hay datos para exportar");
      return;
    }
    const headers = Object.keys(data[0]);
    const rows = data.map((obj) => headers.map((h) => obj[h]));
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exportado a Excel", { description: `${data.length} registros descargados.` });
  };

  const exportToPDF = (data: any[], title: string) => {
    if (!data.length) {
      toast.error("No hay datos para exportar");
      return;
    }
    const headers = Object.keys(data[0]);
    const html = `
      <html><head><title>Reporte CondoManager - ${title}</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #1c1917; }
        h1 { color: #b45309; border-bottom: 3px solid #d97706; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
        th { background: #fef3c7; color: #78350f; text-align: left; padding: 10px; border-bottom: 2px solid #b45309; }
        td { padding: 8px 10px; border-bottom: 1px solid #e7e5e4; }
        .header { display: flex; justify-content: space-between; align-items: center; }
      </style></head><body>
      <div class="header">
        <div><h1>${title}</h1><p style="color:#78716c">CondoManager Residential System</p></div>
        <div style="text-align:right;color:#78716c;font-size:12px"><p>Fecha: ${new Date().toLocaleDateString("es-ES")}</p><p>Generado por: ${profile.name}</p></div>
      </div>
      <table><thead><tr>${headers.map(h => `<th>${h.toUpperCase()}</th>`).join("")}</tr></thead>
      <tbody>${data.map((row) => `<tr>${headers.map(h => `<td>${row[h]}</td>`).join("")}</tr>`).join("")}</tbody></table>
      <p style="margin-top:30px;color:#a8a29e;font-size:11px">© 2025 CondoManager — Documento generado automáticamente.</p>
      </body></html>`;
    
    const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s/g, "_")}.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("PDF exportado", { description: "Se ha descargado el documento HTML listo para imprimir como PDF." });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any[]>>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split("\n").filter(line => line.trim() !== "");
        if (lines.length < 2) {
          toast.error("El archivo no tiene registros válidos");
          return;
        }
        const headers = lines[0].split(",").map(h => h.trim());
        const importedData = lines.slice(1).map((line, index) => {
          const values = line.split(",");
          const obj: any = {};
          headers.forEach((h, i) => obj[h] = values[i]?.trim() || "");
          if (!obj.id) obj.id = `IMP-${Date.now()}-${index}`;
          return obj;
        });
        setter(prev => [...prev, ...importedData]);
        toast.success("Importación exitosa", { description: `${importedData.length} registros añadidos.` });
      } catch (err) {
        toast.error("Error al importar", { description: "Verifica el formato del archivo CSV." });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleLogout = () => {
    onNavigate("login");
    toast.info("Sesión cerrada", { description: "Has salido del panel." });
  };

  const handleSelectModule = (id: string) => {
    if (id === "logout") {
      handleLogout();
      return;
    }
    setActiveModule(id);
    setSidebarOpen(false);
    if (!id.startsWith("cfg-") && !id.startsWith("usr-") && id !== "profile") {
      setConfigOpen(false);
      setUsersOpen(false);
    }
  };

  const handleChatCommand = (cmdId: string, label: string) => {
    setChatMessages(prev => [...prev, { role: "user", content: label }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: "ai", content: `Abriendo "${label}"...` }]);
      handleSelectModule(cmdId);
    }, 500);
    setChatInput("");
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim().toLowerCase();
    setChatMessages(prev => [...prev, { role: "user", content: chatInput }]);
    setChatInput("");

    const foundCmd = chatCommands.find(cmd => userMsg.includes(cmd.label.toLowerCase()) || userMsg.includes(cmd.id.toLowerCase()));
    
    setTimeout(() => {
      if (foundCmd) {
        setChatMessages(prev => [...prev, { role: "ai", content: `Ejecutando comando: ${foundCmd.label}` }]);
        //handleSelectModule(foundCmd.id, foundCmd.label);
        // MOD
        handleSelectModule(foundCmd.id);
      } else if (userMsg.includes("hola") || userMsg.includes("ayuda")) {
        setChatMessages(prev => [...prev, { role: "ai", content: "¡Hola! Puedo ayudarte a navegar. Prueba con comandos como 'Ver Dashboard', 'Crear Modelo de Datos' o 'Cerrar Sesión'." }]);
      } else {
        setChatMessages(prev => [...prev, { role: "ai", content: "No reconocí ese comando. Puedes usar el menú de abajo para navegar rápidamente." }]);
      }
    }, 600);
  };

  const handleAddRole = () => {
    if (!newRoleName.trim()) {
      toast.error("El nombre del rol es obligatorio");
      return;
    }
    const newId = Math.max(...roles.map((r) => r.id), 0) + 1;
    setRoles([...roles, { id: newId, name: newRoleName, description: newRoleDesc }]);
    setRoleFunctions({ ...roleFunctions, [newId]: {} });
    setNewRoleName("");
    setNewRoleDesc("");
    toast.success("Rol creado correctamente");
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter((r) => r.id !== id));
    const updatedFuncs = { ...roleFunctions };
    delete updatedFuncs[id];
    setRoleFunctions(updatedFuncs);
    setUsers(users.map((u) => (u.assignedRole === id ? { ...u, assignedRole: null } : u)));
    toast.info("Rol eliminado");
  };

  const handleAssignRole = (userId: number, roleId: string) => {
    const parsedRoleId = roleId === "none" ? null : parseInt(roleId);
    setUsers(users.map((u) => (u.id === userId ? { ...u, assignedRole: parsedRoleId } : u)));
    toast.success("Usuario asignado", { description: "El rol del usuario ha sido actualizado." });
  };

  const handleToggleFunction = (roleId: number, funcId: string) => {
    setRoleFunctions((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [funcId]: !prev[roleId]?.[funcId],
      },
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile({ ...profile, avatar: ev.target?.result as string });
        toast.success("Imagen actualizada", { description: "Tu foto de perfil ha sido subida." });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    toast.success("Perfil actualizado", { description: "Tus datos personales han sido guardados." });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (passwords.new.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }
    setPasswords({ current: "", new: "", confirm: "" });
    toast.success("Contraseña actualizada", { description: "Tu contraseña ha sido cambiada exitosamente." });
  };

  const renderContent = () => {
    if (activeModule === "dashboard") {
      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="border-amber-200/50 shadow-sm hover:shadow-md transition-shadow bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-stone-500 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-bold text-stone-900 mt-1">{stat.value}</p>
                        <p className={`text-xs font-medium mt-1 flex items-center gap-1 ${stat.change.startsWith("+") ? "text-emerald-700" : "text-rose-700"}`}>
                          {stat.change.startsWith("+") ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {stat.change}
                        </p>
                      </div>
                      <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${stat.color}`}><Icon className="h-5 w-5" /></div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <ResidentsTable />
        </>
      );
    }
    if (activeModule === "statistics") {
      return (
        <div className="space-y-6">
          <Card className="border-amber-200/50 shadow-sm bg-white">
            <CardHeader className="border-b border-amber-100">
              <CardTitle className="text-lg font-serif flex items-center gap-2 text-amber-900"><BarChart3 className="h-5 w-5" />Estadísticas de Condominio</CardTitle>
              <CardDescription>Resumen general de métricas del sistema</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-xs text-amber-800 font-medium uppercase">Ocupación</p>
                  <p className="text-3xl font-bold text-amber-900 mt-2">95%</p>
                  <p className="text-xs text-amber-700 mt-1">+2% vs mes anterior</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <p className="text-xs text-stone-700 font-medium uppercase">Mantenimientos</p>
                  <p className="text-3xl font-bold text-stone-900 mt-2">12</p>
                  <p className="text-xs text-stone-600 mt-1">+3 pendientes</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <p className="text-xs text-emerald-700 font-medium uppercase">Satisfacción</p>
                  <p className="text-3xl font-bold text-emerald-900 mt-2">88%</p>
                  <p className="text-xs text-emerald-600 mt-1">+1.2% vs trimestre anterior</p>
                </div>
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-100">
                  <p className="text-xs text-rose-700 font-medium uppercase">Deudas</p>
                  <p className="text-3xl font-bold text-rose-900 mt-2">$3,650</p>
                  <p className="text-xs text-rose-600 mt-1">-15% vs mes anterior</p>
                </div>
              </div>
              <div className="mt-6 overflow-x-auto rounded-xl border border-amber-100">
                <table className="w-full">
                  <thead className="bg-amber-50/50">
                    <tr className="border-b border-amber-100">
                      <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Métrica</th>
                      <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Valor Actual</th>
                      <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Valor Anterior</th>
                      <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Variación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100 bg-white">
                    <tr className="hover:bg-amber-50/50"><td className="px-6 py-3 text-sm font-medium text-stone-900">Ingresos Totales</td><td className="px-6 py-3 text-sm text-stone-700">$28,900</td><td className="px-6 py-3 text-sm text-stone-500">$26,500</td><td className="px-6 py-3 text-sm text-emerald-700 font-medium">+9.0%</td></tr>
                    <tr className="hover:bg-amber-50/50"><td className="px-6 py-3 text-sm font-medium text-stone-900">Gastos Comunes</td><td className="px-6 py-3 text-sm text-stone-700">$12,300</td><td className="px-6 py-3 text-sm text-stone-500">$11,100</td><td className="px-6 py-3 text-sm text-rose-700 font-medium">+10.8%</td></tr>
                    <tr className="hover:bg-amber-50/50"><td className="px-6 py-3 text-sm font-medium text-stone-900">Reservas Áreas</td><td className="px-6 py-3 text-sm text-stone-700">45</td><td className="px-6 py-3 text-sm text-stone-500">38</td><td className="px-6 py-3 text-sm text-emerald-700 font-medium">+18.4%</td></tr>
                    <tr className="hover:bg-amber-50/50"><td className="px-6 py-3 text-sm font-medium text-stone-900">Incidencias</td><td className="px-6 py-3 text-sm text-stone-700">5</td><td className="px-6 py-3 text-sm text-stone-500">12</td><td className="px-6 py-3 text-sm text-emerald-700 font-medium">-58.3%</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    if (activeModule === "charts") {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-amber-200/50 shadow-sm bg-white">
              <CardHeader className="border-b border-amber-100">
                <CardTitle className="text-lg font-serif flex items-center gap-2 text-amber-900"><BarChart3 className="h-5 w-5" />Ingresos vs Gastos</CardTitle>
                <CardDescription>Comparativo mensual (Últimos 8 meses)</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <BarChart data={salesData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e7e5e4" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="ingresos" fill="var(--color-ingresos)" radius={4} />
                    <Bar dataKey="gastos" fill="var(--color-gastos)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-amber-200/50 shadow-sm bg-white">
              <CardHeader className="border-b border-amber-100">
                <CardTitle className="text-lg font-serif flex items-center gap-2 text-amber-900"><PieChart className="h-5 w-5" />Distribución de Gastos</CardTitle>
                <CardDescription>Proporción de gastos por categoría</CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex items-center justify-center">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                    <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-amber-200/50 shadow-sm bg-white">
            <CardHeader className="border-b border-amber-100">
              <CardTitle className="text-lg font-serif flex items-center gap-2 text-amber-900"><LineChart className="h-5 w-5" />Tráfico de Visitas</CardTitle>
              <CardDescription>Ingreso de visitas al condominio (Últimos 7 días)</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <RechartsLineChart data={trafficData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="visitas" stroke="var(--color-visitas)" strokeWidth={2} dot={{ fill: "var(--color-visitas)", r: 4 }} activeDot={{ r: 6 }} />
                </RechartsLineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      );
    }
    if (activeModule === "profile") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-amber-200/50 shadow-sm lg:col-span-2 bg-white">
            <CardHeader className="border-b border-amber-100">
              <CardTitle className="text-lg font-serif flex items-center gap-2 text-amber-900"><UserCircle className="h-5 w-5" />Datos del Perfil</CardTitle>
              <CardDescription>Actualiza tu información personal y profesional</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-6 pb-6 border-b border-amber-100">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-amber-100">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-amber-800 text-white text-3xl font-bold">{profile.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback>
                  </Avatar>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-amber-800 text-white flex items-center justify-center shadow-md hover:bg-amber-900 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">{profile.name}</h3>
                  <p className="text-sm text-stone-500">{profile.email}</p>
                  <Button variant="outline" size="sm" className="mt-3 border-amber-300 text-amber-800 hover:bg-amber-50" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" /> Cambiar imagen
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="p-name">Nombre completo</Label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <Input id="p-name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <Input id="p-email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="p-company">Condominio</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <Input id="p-company" value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} className="pl-10" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-amber-800 hover:bg-amber-900 text-white" onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" /> Guardar cambios
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200/50 shadow-sm bg-white">
            <CardHeader className="border-b border-amber-100">
              <CardTitle className="text-lg font-serif flex items-center gap-2 text-amber-900"><Lock className="h-5 w-5" />Cambiar Contraseña</CardTitle>
              <CardDescription>Asegura tu cuenta con una contraseña robusta</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cur-pwd">Contraseña actual</Label>
                  <Input id="cur-pwd" type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pwd">Nueva contraseña</Label>
                  <Input id="new-pwd" type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conf-pwd">Confirmar contraseña</Label>
                  <Input id="conf-pwd" type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} required />
                </div>
                <Button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white">Actualizar contraseña</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    }
    if (activeModule === "cfg-models") {
      return <CrudModule 
        title="Modelos de Datos" 
        description="Define entidades y atributos del sistema" 
        icon={Database} 
        data={models} 
        setData={setModels}
        columns={[
          { key: "id", label: "ID", type: "text" },
          { key: "name", label: "Nombre", type: "text" },
          { key: "attributes", label: "Atributos", type: "number" },
          { key: "type", label: "Tipo", type: "text" },
        ]}
        onExportExcel={() => exportToExcel(models, "modelos_datos")}
        onExportPDF={() => exportToPDF(models, "Modelos de Datos")}
        onImport={(e) => handleImport(e, setModels)}
      />;
    }
    if (activeModule === "cfg-params") {
      return <CrudModule 
        title="Parámetros Generales" 
        description="Configuración global de la aplicación" 
        icon={SlidersHorizontal} 
        data={params} 
        setData={setParams}
        columns={[
          { key: "id", label: "ID", type: "text" },
          { key: "name", label: "Nombre", type: "text" },
          { key: "value", label: "Valor", type: "text" },
          { key: "type", label: "Tipo", type: "text" },
        ]}
        onExportExcel={() => exportToExcel(params, "parametros_generales")}
        onExportPDF={() => exportToPDF(params, "Parámetros Generales")}
        onImport={(e) => handleImport(e, setParams)}
      />;
    }
    if (activeModule === "cfg-modules") {
      return <CrudModule 
        title="Módulos" 
        description="Gestiona los módulos disponibles" 
        icon={Boxes} 
        data={modules} 
        setData={setModules}
        columns={[
          { key: "id", label: "ID", type: "text" },
          { key: "name", label: "Nombre", type: "text" },
          { key: "icon", label: "Icono", type: "text" },
          { key: "active", label: "Activo", type: "checkbox" },
        ]}
        onExportExcel={() => exportToExcel(modules, "modulos_sistema")}
        onExportPDF={() => exportToPDF(modules, "Módulos del Sistema")}
        onImport={(e) => handleImport(e, setModules)}
      />;
    }
    if (activeModule === "usr-roles") {
      return (
        <Card className="border-amber-200/50 shadow-sm bg-white">
          <CardHeader className="border-b border-amber-100">
            <CardTitle className="text-lg font-serif flex items-center gap-2 text-amber-900"><Shield className="h-5 w-5" />Gestión de Roles</CardTitle>
            <CardDescription>Crear, editar y eliminar roles del sistema</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
              <div className="space-y-2">
                <Label htmlFor="role-name">Nombre del Rol</Label>
                <Input id="role-name" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} placeholder="Ej: Seguridad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-desc">Descripción</Label>
                <Input id="role-desc" value={newRoleDesc} onChange={(e) => setNewRoleDesc(e.target.value)} placeholder="Ej: Control de accesos" />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-amber-800 hover:bg-amber-900 text-white" onClick={handleAddRole}>+ Agregar Rol</Button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-amber-100">
              <table className="w-full">
                <thead className="bg-amber-50/50">
                  <tr className="border-b border-amber-100">
                    <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">ID</th>
                    <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Nombre</th>
                    <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Descripción</th>
                    <th className="text-right text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 bg-white">
                  {roles.map((role) => (
                    <tr key={role.id} className="hover:bg-amber-50/50 transition-colors">
                      <td className="px-6 py-3 text-sm font-mono text-stone-500">#{role.id}</td>
                      <td className="px-6 py-3 text-sm font-medium text-stone-900">{role.name}</td>
                      <td className="px-6 py-3 text-sm text-stone-600">{role.description || "N/A"}</td>
                      <td className="px-6 py-3 text-right">
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteRole(role.id)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      );
    }
    if (activeModule === "usr-assign") {
      return (
        <Card className="border-amber-200/50 shadow-sm bg-white">
          <CardHeader className="border-b border-amber-100">
            <CardTitle className="text-lg font-serif flex items-center gap-2 text-amber-900"><UserCog className="h-5 w-5" />Asignar Usuarios a Roles</CardTitle>
            <CardDescription>Gestiona qué usuario pertenece a qué rol</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto rounded-xl border border-amber-100">
              <table className="w-full">
                <thead className="bg-amber-50/50">
                  <tr className="border-b border-amber-100">
                    <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Usuario</th>
                    <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Correo</th>
                    <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Rol Asignado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 bg-white">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-amber-50/50 transition-colors">
                      <td className="px-6 py-3 text-sm font-medium text-stone-900 flex items-center gap-2">
                        <Avatar className="h-8 w-8"><AvatarFallback className="bg-amber-100 text-amber-800 text-xs">{user.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback></Avatar>
                        {user.name}
                      </td>
                      <td className="px-6 py-3 text-sm text-stone-600">{user.email}</td>
                      <td className="px-6 py-3">
                        <select 
                          className="w-full max-w-[200px] rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                          value={user.assignedRole ?? "none"}
                          onChange={(e) => handleAssignRole(user.id, e.target.value)}
                        >
                          <option value="none">Sin rol</option>
                          {roles.map((r) => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      );
    }
    if (activeModule === "usr-functions") {
      const allMenuItems = [...sidebarConfig, ...configSubItems, ...usersSubItems];
      return (
        <Card className="border-amber-200/50 shadow-sm bg-white">
          <CardHeader className="border-b border-amber-100">
            <CardTitle className="text-lg font-serif flex items-center gap-2 text-amber-900"><MenuSquare className="h-5 w-5" />Funciones del Menú por Rol</CardTitle>
            <CardDescription>Selecciona un rol y marca las funciones del menú a las que tendrá acceso</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-end p-4 bg-amber-50/50 rounded-xl border border-amber-100">
              <div className="space-y-2 w-full md:w-1/3">
                <Label htmlFor="select-role">Seleccionar Rol</Label>
                <select 
                  id="select-role"
                  className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={selectedRoleForFunc ?? ""}
                  onChange={(e) => setSelectedRoleForFunc(parseInt(e.target.value))}
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {selectedRoleForFunc && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {allMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isChecked = roleFunctions[selectedRoleForFunc]?.[item.id] || false;
                  return (
                    <div key={item.id} className={`flex items-center gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${isChecked ? "bg-amber-50 border-amber-300" : "bg-white border-stone-200 hover:bg-amber-50/50"}`} onClick={() => handleToggleFunction(selectedRoleForFunc, item.id)}>
                      <Checkbox id={`func-${item.id}`} checked={isChecked} className="data-[state=checked]:bg-amber-800 data-[state=checked]:border-amber-800" />
                      <Icon className="h-4 w-4 text-stone-600" />
                      <span className="text-sm font-medium text-stone-800">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex justify-end">
              <Button className="bg-amber-800 hover:bg-amber-900 text-white" onClick={() => toast.success("Permisos guardados", { description: "Las funciones del menú han sido actualizadas para el rol seleccionado." })}>
                <Save className="h-4 w-4 mr-2" /> Guardar Permisos
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }
    return <ResidentsTable />;
  };

  const ResidentsTable = () => (
    <Card className="border-amber-200/50 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-amber-100">
        <div>
          <CardTitle className="text-lg font-serif text-amber-900">Residentes y Propietarios</CardTitle>
          <CardDescription className="text-sm">Listado de residentes registrados en el condominio</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => exportToExcel(filteredResidents, "residentes_condomanager")} variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-50"><FileSpreadsheet className="h-4 w-4 mr-2" />Exportar Excel</Button>
          <Button onClick={() => exportToPDF(filteredResidents, "Reporte de Residentes")} className="bg-amber-800 hover:bg-amber-900 text-white"><FileText className="h-4 w-4 mr-2" />Ver PDF</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-amber-100 bg-amber-50/50">
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">N° Casa/Apto</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Nombre</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Tipo</th>
                <th className="text-right text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Saldo</th>
                <th className="text-center text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {filteredResidents.map((resident) => (
                <tr key={resident.id} className="hover:bg-amber-50/50 transition-colors">
                  <td className="px-6 py-3 text-sm font-mono text-stone-500">{resident.id}</td>
                  <td className="px-6 py-3 text-sm font-medium text-stone-900">{resident.name}</td>
                  <td className="px-6 py-3 text-sm text-stone-600">{resident.category}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-stone-900 text-right">${resident.balance.toLocaleString()}</td>
                  <td className="px-6 py-3 text-center"><Badge variant={resident.status === "Al día" ? "default" : "secondary"} className={resident.status === "Al día" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : "bg-rose-100 text-rose-800 hover:bg-rose-100"}>{resident.status}</Badge></td>
                </tr>
              ))}
              {filteredResidents.length === 0 && (<tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-stone-400">No se encontraron residentes con ese criterio.</td></tr>)}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const SidebarNavItem = ({ item, isSubItem = false }: { item: any, isSubItem?: boolean }) => {
    const Icon = item.icon;
    const active = activeModule === item.id;
    return (
      <button 
        onClick={() => handleSelectModule(item.id)} 
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-amber-800 text-white" : "text-stone-300 hover:bg-stone-800 hover:text-white"} ${sidebarCollapsed ? "justify-center" : ""} ${isSubItem && !sidebarCollapsed ? "ml-4" : ""}`}
        title={sidebarCollapsed ? item.label : undefined}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {!sidebarCollapsed && <span>{item.label}</span>}
        {active && !sidebarCollapsed && !isSubItem && <ChevronRight className="h-4 w-4 ml-auto" />}
      </button>
    );
  };

  return (
    <div className="min-h-screen flex bg-amber-50/30 relative">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-40 bg-stone-900 text-stone-300 flex flex-col shrink-0 transform transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} ${sidebarCollapsed ? "md:w-20 w-20" : "w-64"}`}>
        <div className={`p-4 border-b border-stone-800 flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-800 flex items-center justify-center text-white font-bold text-lg shrink-0"><Building className="h-6 w-6" /></div>
            {!sidebarCollapsed && <div><p className="text-white font-bold text-sm">CondoManager</p><p className="text-xs text-stone-500">Residential System</p></div>}
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-stone-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
          {!sidebarCollapsed && <p className="text-xs uppercase tracking-wider text-stone-600 px-3 mb-2">Módulos</p>}
          {sidebarConfig.map((item) => <SidebarNavItem key={item.id} item={item} />)}

          {!sidebarCollapsed && <p className="text-xs uppercase tracking-wider text-stone-600 px-3 mb-2 mt-6">Administración</p>}
          
          <button 
            onClick={() => { setConfigOpen(!configOpen); setUsersOpen(false); }} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeModule.startsWith("cfg-") ? "bg-amber-800 text-white" : "text-stone-300 hover:bg-stone-800 hover:text-white"} ${sidebarCollapsed ? "justify-center" : ""}`}
            title={sidebarCollapsed ? "Configuración Inicial" : undefined}
          >
            <Settings className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Configuración Inicial</span>}
            {!sidebarCollapsed && <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${configOpen ? "rotate-180" : ""}`} />}
          </button>
          {configOpen && !sidebarCollapsed && (
            <div className="mt-1 space-y-1 border-l border-stone-700 pl-3">
              {configSubItems.map((sub) => <SidebarNavItem key={sub.id} item={sub} isSubItem />)}
            </div>
          )}

          <button 
            onClick={() => { setUsersOpen(!usersOpen); setConfigOpen(false); }} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeModule.startsWith("usr-") ? "bg-amber-800 text-white" : "text-stone-300 hover:bg-stone-800 hover:text-white"} ${sidebarCollapsed ? "justify-center" : ""}`}
            title={sidebarCollapsed ? "Usuarios" : undefined}
          >
            <Users className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Usuarios</span>}
            {!sidebarCollapsed && <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${usersOpen ? "rotate-180" : ""}`} />}
          </button>
          {usersOpen && !sidebarCollapsed && (
            <div className="mt-1 space-y-1 border-l border-stone-700 pl-3">
              {usersSubItems.map((sub) => <SidebarNavItem key={sub.id} item={sub} isSubItem />)}
            </div>
          )}
        </nav>

        <div className="p-3 border-t border-stone-800">
          <button 
            onClick={() => handleSelectModule("profile")} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeModule === "profile" ? "bg-amber-800 text-white" : "text-stone-300 hover:bg-stone-800 hover:text-white"} ${sidebarCollapsed ? "justify-center" : ""}`}
            title={sidebarCollapsed ? "Mi Perfil" : undefined}
          >
            <UserCircle className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Mi Perfil</span>}
          </button>
          
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3 px-2 mt-2">
              <Avatar className="h-9 w-9 ring-2 ring-amber-800 shrink-0">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-amber-800 text-white text-xs">AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-white truncate">{profile.name}</p><p className="text-xs text-stone-500 truncate">{profile.email}</p></div>
              <button onClick={handleLogout} className="text-stone-500 hover:text-red-400 transition-colors" title="Cerrar sesión"><LogOut className="h-4 w-4" /></button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 mt-2">
              <Avatar className="h-9 w-9 ring-2 ring-amber-800">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-amber-800 text-white text-xs">AD</AvatarFallback>
              </Avatar>
              <button onClick={handleLogout} className="text-stone-500 hover:text-red-400 transition-colors" title="Cerrar sesión"><LogOut className="h-4 w-4" /></button>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="bg-white border-b border-amber-200/50 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="md:hidden">
              <Menu className="h-6 w-6 text-stone-700" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden md:flex">
              {sidebarCollapsed ? <PanelLeftOpen className="h-5 w-5 text-stone-700" /> : <PanelLeftClose className="h-5 w-5 text-stone-700" />}
            </Button>
            <div>
              <h1 className="text-lg md:text-xl font-serif font-bold text-amber-900 capitalize">
                {activeModule.startsWith("cfg-") ? configSubItems.find((c) => c.id === activeModule)?.label : 
                 activeModule.startsWith("usr-") ? usersSubItems.find((c) => c.id === activeModule)?.label : 
                 activeModule === "profile" ? "Mi Perfil" :
                 sidebarConfig.find((i) => i.id === activeModule)?.label}
              </h1>
              <p className="text-xs text-stone-500 hidden sm:block">Gestión de Condominios / CondoManager Framework</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar residentes..." className="pl-10 w-64 bg-amber-50/50 border-amber-200/50" />
            </div>
            <Button variant="ghost" size="icon" className="relative"><Bell className="h-5 w-5 text-stone-600" /><span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-500" /></Button>
            <Avatar className="h-9 w-9 cursor-pointer" onClick={() => handleSelectModule("profile")}>
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-amber-100 text-amber-800 text-xs font-semibold">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          {renderContent()}
        </main>
      </div>

      <button 
        onClick={() => setChatOpen(!chatOpen)} 
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-amber-800 text-white shadow-lg flex items-center justify-center hover:bg-amber-900 transition-colors"
        title="Abrir Asistente IA"
      >
        {chatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!chatOpen && <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-amber-400 ring-2 ring-white"></span>}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100%-3rem)] max-w-sm bg-white rounded-2xl shadow-2xl border border-amber-200/50 flex flex-col overflow-hidden" style={{ height: "600px" }}>
          <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-800 text-white flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Asistente CondoManager</p>
                <p className="text-xs text-stone-400">En línea</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)} className="text-white hover:bg-stone-800">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-amber-50/30">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.role === "user" ? "bg-amber-800 text-white rounded-br-none" : "bg-white border border-amber-200/50 text-stone-800 rounded-bl-none shadow-sm"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-amber-100">
            <div className="flex gap-2 mb-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
              {chatCommands.map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <button 
                    key={cmd.id} 
                    onClick={() => handleChatCommand(cmd.id, cmd.label)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-medium hover:bg-amber-100 transition-colors whitespace-nowrap shrink-0 border border-amber-200/50"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cmd.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <Input 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Escribe un comando..." 
                className="flex-1 bg-amber-50/50 border-amber-200/50"
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-amber-800 hover:bg-amber-900 text-white shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface CrudModuleProps {
  title: string;
  description: string;
  icon: React.ElementType;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  columns: { key: string; label: string; type: string }[];
  onExportExcel: () => void;
  onExportPDF: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CrudModule: React.FC<CrudModuleProps> = ({ title, description, icon: Icon, data, setData, columns, onExportExcel, onExportPDF, onImport }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const importRef = useRef<HTMLInputElement>(null);

const handleInputChange = (key: string, value: any) => {
  setFormData((prev: any) => ({ ...prev, [key]: value }));
};

  const resetForm = () => {
    setFormData({}); 
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setData((prev) => prev.map((item) => (item.id === editingId ? { ...formData } : item)));
      toast.success("Registro actualizado");
    } else {
      const newId = formData.id || `${title.slice(0, 2).toUpperCase()}-${Date.now()}`;
      setData((prev) => [...prev, { ...formData, id: newId }]);
      toast.success("Registro creado");
    }
    resetForm();
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    toast.info("Registro eliminado");
  };



  return (
    <Card className="border-amber-200/50 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-amber-100">
        <div>
          <CardTitle className="text-lg font-serif flex items-center gap-2 text-amber-900"><Icon className="h-5 w-5" />{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          <input ref={importRef} type="file" accept=".csv" onChange={onImport} className="hidden" />
          <Button onClick={() => importRef.current?.click()} variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50"><FileUp className="h-4 w-4 mr-2" />Importar</Button>
          <Button onClick={onExportExcel} variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-50"><FileSpreadsheet className="h-4 w-4 mr-2" />Excel</Button>
          <Button onClick={onExportPDF} className="bg-amber-800 hover:bg-amber-900 text-white"><FileText className="h-4 w-4 mr-2" />PDF</Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {showForm && (
          <form onSubmit={handleSubmit} className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {columns.map((col) => (
              <div key={col.key} className="space-y-2">
                <Label htmlFor={col.key}>{col.label}</Label>
                {col.type === "checkbox" ? (
                  <div className="flex items-center gap-2 h-10">
                    <Checkbox 
                      id={col.key} 
                      checked={formData[col.key] || false} 
                      onCheckedChange={(v) => handleInputChange(col.key, v)} 
                      className="data-[state=checked]:bg-amber-800 data-[state=checked]:border-amber-800"
                    />
                    <Label htmlFor={col.key} className="text-sm font-normal text-stone-600 cursor-pointer">Sí</Label>
                  </div>
                ) : (
                  <Input 
                    id={col.key} 
                    type={col.type} 
                    value={formData[col.key] || ""} 
                    onChange={(e) => handleInputChange(col.key, e.target.value)} 
                    required 
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2 col-span-1 md:col-span-2 lg:col-span-1">
              <Button type="submit" className="bg-amber-800 hover:bg-amber-900 text-white flex-1">
                {editingId ? <><Pencil className="h-4 w-4 mr-2" />Actualizar</> : <><Plus className="h-4 w-4 mr-2" />Crear</>}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
            </div>
          </form>
        )}

        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-amber-800 hover:bg-amber-900 text-white">
            <Plus className="h-4 w-4 mr-2" /> Nuevo Registro
          </Button>
        )}

        <div className="overflow-x-auto rounded-xl border border-amber-100">
          <table className="w-full">
            <thead className="bg-amber-50/50">
              <tr className="border-b border-amber-100">
                {columns.map((col) => (
                  <th key={col.key} className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">{col.label}</th>
                ))}
                <th className="text-right text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 bg-white">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-amber-50/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-3 text-sm text-stone-700">
                      {col.type === "checkbox" ? (
                        <Badge variant={item[col.key] ? "default" : "secondary"} className={item[col.key] ? "bg-amber-100 text-amber-800" : "bg-stone-200 text-stone-600"}>{item[col.key] ? "Sí" : "No"}</Badge>
                      ) : (
                        item[col.key]
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-3 text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="h-8 w-8 text-stone-500 hover:text-amber-800 hover:bg-amber-50"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-stone-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (<tr><td colSpan={columns.length + 1} className="px-6 py-12 text-center text-sm text-stone-400">No hay registros disponibles.</td></tr>)}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};