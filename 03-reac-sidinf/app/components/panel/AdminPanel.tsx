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
  LayoutDashboard, Users, Package, FileText, FileSpreadsheet, LogOut,
  Search, TrendingUp, DollarSign, ShoppingCart, ChevronRight, Settings, Bell,
  Database, SlidersHorizontal, Boxes, ChevronDown, Shield, UserCog, MenuSquare, Save,
  UserCircle, Lock, Upload, Mail, Building2, Camera, Menu, X, BarChart3, PieChartIcon, LineChart, PanelLeftClose, PanelLeftOpen, Pencil, Trash2, Plus, FileUp, Bot, Send, Sparkles, MessageSquare, HeartPulse, Activity, Stethoscope, CalendarDays, BedDouble, Droplet
} from "lucide-react";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, Line, LineChart as RechartsLineChart, XAxis, YAxis, Cell } from "recharts";
import type { AppView } from "@/app/page";

interface AdminPanelProps {
  onNavigate: (view: AppView) => void;
}

interface Patient {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Activo" | "Inactivo";
}

const patients: Patient[] = [
  { id: "P-001", name: "Juan Pérez", category: "Cardiología", price: 1299, stock: 45, status: "Activo" },
  { id: "P-002", name: "Ana Torres", category: "Pediatría", price: 449, stock: 12, status: "Activo" },
  { id: "P-003", name: "Carlos Ruiz", category: "Traumatología", price: 89, stock: 0, status: "Inactivo" },
  { id: "P-004", name: "María Luz", category: "Neurología", price: 329, stock: 23, status: "Activo" },
  { id: "P-005", name: "Pedro Lima", category: "Dermatología", price: 119, stock: 87, status: "Activo" },
  { id: "P-006", name: "Sofía Díaz", category: "Ginecología", price: 59, stock: 5, status: "Activo" },
  { id: "P-007", name: "Luis Gómez", category: "Oftalmología", price: 149, stock: 34, status: "Activo" },
  { id: "P-008", name: "Elena Vargas", category: "Psiquiatría", price: 199, stock: 0, status: "Inactivo" },
];

const stats = [
  { label: "Ingresos totales", value: "$84,290", change: "+12.5%", icon: DollarSign, color: "bg-sky-50 text-sky-700" },
  { label: "Citas hoy", value: "1,429", change: "+8.2%", icon: CalendarDays, color: "bg-cyan-50 text-cyan-700" },
  { label: "Pacientes", value: "312", change: "+5.1%", icon: Users, color: "bg-teal-50 text-teal-700" },
  { label: "Camas libres", value: "86", change: "+2.4%", icon: BedDouble, color: "bg-emerald-50 text-emerald-700" },
];

const sidebarConfig = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "patients", label: "Pacientes", icon: Users },
  { id: "appointments", label: "Citas Médicas", icon: CalendarDays },
  { id: "reports", label: "Reportes", icon: FileText },
  { id: "statistics", label: "Estadísticas", icon: BarChart3 },
  { id: "charts", label: "Gráficos", icon: PieChartIcon },
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
  { id: "patients", label: "Gestionar Pacientes", icon: Users },
  { id: "appointments", label: "Ver Citas Médicas", icon: CalendarDays },
  { id: "reports", label: "Ver Reportes", icon: FileText },
  { id: "statistics", label: "Ver Estadísticas", icon: BarChart3 },
  { id: "charts", label: "Ver Gráficos", icon: PieChartIcon },
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
  { month: "Ene", ventas: 4000, compras: 2400 },
  { month: "Feb", ventas: 3000, compras: 1398 },
  { month: "Mar", ventas: 5000, compras: 3800 },
  { month: "Abr", ventas: 4780, compras: 3908 },
  { month: "May", ventas: 6890, compras: 4800 },
  { month: "Jun", ventas: 7390, compras: 3800 },
  { month: "Jul", ventas: 8490, compras: 4300 },
  { month: "Ago", ventas: 9000, compras: 5100 },
];

const categoryData = [
  { name: "Cardiología", value: 400, fill: "#0284c7" },
  { name: "Pediatría", value: 300, fill: "#06b6d4" },
  { name: "Neurología", value: 200, fill: "#14b8a6" },
  { name: "Traumatología", value: 150, fill: "#3b82f6" },
  { name: "Dermatología", value: 100, fill: "#22d3ee" },
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
  ventas: { label: "Ingresos", color: "#0284c7" },
  compras: { label: "Egresos", color: "#94a3b8" },
  visitas: { label: "Pacientes", color: "#0d9488" },
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
    { role: "ai", content: "¡Hola! Soy tu asistente de MediCore. Escribe un comando o selecciona una opción para empezar." }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState({
    name: "Dr. Admin Demo",
    email: "admin@medicore.com",
    company: "MediCore Health System",
    avatar: "",
  });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [roles, setRoles] = useState([
    { id: 1, name: "Súper Admin", description: "Acceso total al sistema" },
    { id: 2, name: "Médico", description: "Gestión de pacientes y citas" },
    { id: 3, name: "Enfermería", description: "Solo lectura y cuidado básico" },
  ]);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");

  const [users, setUsers] = useState([
    { id: 1, name: "Dr. Juan Pérez", email: "juan@medicore.com", assignedRole: 1 },
    { id: 2, name: "Dra. Ana Torres", email: "ana@medicore.com", assignedRole: 2 },
    { id: 3, name: "Carlos Ruiz", email: "carlos@medicore.com", assignedRole: 3 },
    { id: 4, name: "María Luz", email: "maria@medicore.com", assignedRole: null },
  ]);

  const [roleFunctions, setRoleFunctions] = useState<Record<number, Record<string, boolean>>>({
    1: { dashboard: true, patients: true, appointments: true, reports: true, statistics: true, charts: true, "cfg-models": true, "cfg-params": true, "cfg-modules": true, "usr-roles": true, "usr-assign": true, "usr-functions": true },
    2: { dashboard: true, patients: true, appointments: true, reports: true, statistics: true, charts: true, "cfg-models": false, "cfg-params": false, "cfg-modules": false, "usr-roles": false, "usr-assign": false, "usr-functions": false },
    3: { dashboard: true, patients: false, appointments: false, reports: false, statistics: false, charts: false, "cfg-models": false, "cfg-params": false, "cfg-modules": false, "usr-roles": false, "usr-assign": false, "usr-functions": false },
  });
  const [selectedRoleForFunc, setSelectedRoleForFunc] = useState<number | null>(1);

  const [models, setModels] = useState([
    { id: "M-01", name: "Paciente", attributes: 12, type: "Maestro" },
    { id: "M-02", name: "Historia Clínica", attributes: 25, type: "Transaccional" },
    { id: "M-03", name: "Cita Médica", attributes: 18, type: "Transaccional" },
  ]);
  const [params, setParams] = useState([
    { id: "P-01", name: "Moneda Base", value: "USD", type: "Texto" },
    { id: "P-02", name: "Tasa de Impuesto", value: "16%", type: "Porcentaje" },
  ]);
  const [modules, setModules] = useState([
    { id: "MOD-01", name: "Emergencias", active: true, icon: "Activity" },
    { id: "MOD-02", name: "Laboratorio", active: true, icon: "Droplet" },
    { id: "MOD-03", name: "Farmacia", active: false, icon: "Package" },
  ]);

  const filteredPatients = useMemo(() => {
    return patients.filter(
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
      <html><head><title>Reporte MediCore - ${title}</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #1e293b; }
        h1 { color: #0284c7; border-bottom: 3px solid #06b6d4; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
        th { background: #f0f9ff; color: #0284c7; text-align: left; padding: 10px; border-bottom: 2px solid #06b6d4; }
        td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
        .header { display: flex; justify-content: space-between; align-items: center; }
      </style></head><body>
      <div class="header">
        <div><h1>${title}</h1><p style="color:#64748b">MediCore Enterprise Health System</p></div>
        <div style="text-align:right;color:#64748b;font-size:12px"><p>Fecha: ${new Date().toLocaleDateString("es-ES")}</p><p>Generado por: ${profile.name}</p></div>
      </div>
      <table><thead><tr>${headers.map(h => `<th>${h.toUpperCase()}</th>`).join("")}</tr></thead>
      <tbody>${data.map((row) => `<tr>${headers.map(h => `<td>${row[h]}</td>`).join("")}</tr>`).join("")}</tbody></table>
      <p style="margin-top:30px;color:#94a3b8;font-size:11px">© 2025 MediCore — Documento generado automáticamente.</p>
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
        handleSelectModule(foundCmd.id);
        // jaq
        //handleSelectModule(foundCmd.id, foundCmd.label);
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
                <Card key={stat.label} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                        <p className="text-xs text-sky-600 font-medium mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {stat.change}</p>
                      </div>
                      <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${stat.color}`}><Icon className="h-5 w-5" /></div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <PatientsTable />
        </>
      );
    }
    if (activeModule === "statistics") {
      return (
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-serif flex items-center gap-2"><BarChart3 className="h-5 w-5 text-sky-700" />Estadísticas Hospitalarias</CardTitle>
              <CardDescription>Resumen general de métricas del sistema</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-100">
                  <p className="text-xs text-sky-700 font-medium uppercase">Ocupación</p>
                  <p className="text-3xl font-bold text-sky-900 mt-2">85%</p>
                  <p className="text-xs text-sky-600 mt-1">+5% vs mes anterior</p>
                </div>
                <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-100">
                  <p className="text-xs text-cyan-700 font-medium uppercase">Altas hoy</p>
                  <p className="text-3xl font-bold text-cyan-900 mt-2">24</p>
                  <p className="text-xs text-cyan-600 mt-1">+8 altas</p>
                </div>
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-100">
                  <p className="text-xs text-teal-700 font-medium uppercase">Satisfacción</p>
                  <p className="text-3xl font-bold text-teal-900 mt-2">96%</p>
                  <p className="text-xs text-teal-600 mt-1">+1.2% vs semana anterior</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <p className="text-xs text-emerald-700 font-medium uppercase">Tasa de Mortalidad</p>
                  <p className="text-3xl font-bold text-emerald-900 mt-2">1.1%</p>
                  <p className="text-xs text-emerald-600 mt-1">-0.3% vs mes anterior</p>
                </div>
              </div>
              <div className="mt-6 overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full">
                  <thead className="bg-slate-50/50">
                    <tr className="border-b border-slate-100">
                      <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Métrica</th>
                      <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Valor Actual</th>
                      <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Valor Anterior</th>
                      <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Variación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr className="hover:bg-slate-50"><td className="px-6 py-3 text-sm font-medium text-slate-900">Ingresos Totales</td><td className="px-6 py-3 text-sm text-slate-700">$84,290</td><td className="px-6 py-3 text-sm text-slate-500">$74,920</td><td className="px-6 py-3 text-sm text-sky-600 font-medium">+12.5%</td></tr>
                    <tr className="hover:bg-slate-50"><td className="px-6 py-3 text-sm font-medium text-slate-900">Citas Completadas</td><td className="px-6 py-3 text-sm text-slate-700">1,429</td><td className="px-6 py-3 text-sm text-slate-500">1,320</td><td className="px-6 py-3 text-sm text-sky-600 font-medium">+8.2%</td></tr>
                    <tr className="hover:bg-slate-50"><td className="px-6 py-3 text-sm font-medium text-slate-900">Cancelaciones</td><td className="px-6 py-3 text-sm text-slate-700">45</td><td className="px-6 py-3 text-sm text-slate-500">52</td><td className="px-6 py-3 text-sm text-sky-600 font-medium">-13.4%</td></tr>
                    <tr className="hover:bg-slate-50"><td className="px-6 py-3 text-sm font-medium text-slate-900">Tiempo de Espera</td><td className="px-6 py-3 text-sm text-slate-700">2.3h</td><td className="px-6 py-3 text-sm text-slate-500">3.1h</td><td className="px-6 py-3 text-sm text-sky-600 font-medium">-25.8%</td></tr>
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
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg font-serif flex items-center gap-2"><BarChart3 className="h-5 w-5 text-sky-700" />Ingresos vs Egresos</CardTitle>
                <CardDescription>Comparativo mensual (Últimos 8 meses)</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <BarChart data={salesData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="ventas" fill="var(--color-ventas)" radius={4} />
                    <Bar dataKey="compras" fill="var(--color-compras)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg font-serif flex items-center gap-2"><PieChart className="h-5 w-5 text-sky-700" />Pacientes por Especialidad</CardTitle>
                <CardDescription>Proporción de pacientes atendidos</CardDescription>
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

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-serif flex items-center gap-2"><LineChart className="h-5 w-5 text-sky-700" />Tráfico Semanal</CardTitle>
              <CardDescription>Visitas de pacientes a la plataforma (Últimos 7 días)</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <RechartsLineChart data={trafficData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
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
          <Card className="border-slate-200 shadow-sm lg:col-span-2">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-serif flex items-center gap-2"><UserCircle className="h-5 w-5 text-sky-700" />Datos del Perfil</CardTitle>
              <CardDescription>Actualiza tu información personal y profesional</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-sky-50">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-sky-700 text-white text-3xl font-bold">{profile.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback>
                  </Avatar>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-md hover:bg-sky-700 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{profile.name}</h3>
                  <p className="text-sm text-slate-500">{profile.email}</p>
                  <Button variant="outline" size="sm" className="mt-3 border-sky-200 text-sky-700 hover:bg-sky-50" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" /> Cambiar imagen
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="p-name">Nombre completo</Label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="p-name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="p-email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="p-company">Institución</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="p-company" value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} className="pl-10" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white" onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" /> Guardar cambios
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-serif flex items-center gap-2"><Lock className="h-5 w-5 text-sky-700" />Cambiar Contraseña</CardTitle>
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
                <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">Actualizar contraseña</Button>
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
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg font-serif flex items-center gap-2"><Shield className="h-5 w-5 text-sky-700" />Gestión de Roles</CardTitle>
            <CardDescription>Crear, editar y eliminar roles del sistema</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="space-y-2">
                <Label htmlFor="role-name">Nombre del Rol</Label>
                <Input id="role-name" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} placeholder="Ej: Recepcionista" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-desc">Descripción</Label>
                <Input id="role-desc" value={newRoleDesc} onChange={(e) => setNewRoleDesc(e.target.value)} placeholder="Ej: Acceso limitado a citas" />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white" onClick={handleAddRole}>+ Agregar Rol</Button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full">
                <thead className="bg-slate-50/50">
                  <tr className="border-b border-slate-100">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">ID</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Nombre</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Descripción</th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {roles.map((role) => (
                    <tr key={role.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 text-sm font-mono text-slate-500">#{role.id}</td>
                      <td className="px-6 py-3 text-sm font-medium text-slate-900">{role.name}</td>
                      <td className="px-6 py-3 text-sm text-slate-600">{role.description || "N/A"}</td>
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
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg font-serif flex items-center gap-2"><UserCog className="h-5 w-5 text-sky-700" />Asignar Usuarios a Roles</CardTitle>
            <CardDescription>Gestiona qué usuario pertenece a qué rol</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full">
                <thead className="bg-slate-50/50">
                  <tr className="border-b border-slate-100">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Usuario</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Correo</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Rol Asignado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 text-sm font-medium text-slate-900 flex items-center gap-2">
                        <Avatar className="h-8 w-8"><AvatarFallback className="bg-sky-100 text-sky-700 text-xs">{user.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback></Avatar>
                        {user.name}
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-600">{user.email}</td>
                      <td className="px-6 py-3">
                        <select 
                          className="w-full max-w-[200px] rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
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
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg font-serif flex items-center gap-2"><MenuSquare className="h-5 w-5 text-sky-700" />Funciones del Menú por Rol</CardTitle>
            <CardDescription>Selecciona un rol y marca las funciones del menú a las que tendrá acceso</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-end p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="space-y-2 w-full md:w-1/3">
                <Label htmlFor="select-role">Seleccionar Rol</Label>
                <select 
                  id="select-role"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                    <div key={item.id} className={`flex items-center gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${isChecked ? "bg-sky-50 border-sky-200" : "bg-white border-slate-200 hover:bg-slate-50"}`} onClick={() => handleToggleFunction(selectedRoleForFunc, item.id)}>
                      <Checkbox id={`func-${item.id}`} checked={isChecked} className="data-[state=checked]:bg-sky-600 data-[state=checked]:border-sky-600" />
                      <Icon className="h-4 w-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-800">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex justify-end">
              <Button className="bg-sky-600 hover:bg-sky-700 text-white" onClick={() => toast.success("Permisos guardados", { description: "Las funciones del menú han sido actualizadas para el rol seleccionado." })}>
                <Save className="h-4 w-4 mr-2" /> Guardar Permisos
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }
    return <PatientsTable />;
  };

  const PatientsTable = () => (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-slate-100">
        <div>
          <CardTitle className="text-lg font-serif">Módulo de Pacientes</CardTitle>
          <CardDescription className="text-sm">Listado de pacientes registrados en el sistema</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => exportToExcel(filteredPatients, "pacientes_medicore")} variant="outline" className="border-sky-200 text-sky-700 hover:bg-sky-50"><FileSpreadsheet className="h-4 w-4 mr-2" />Exportar Excel</Button>
          <Button onClick={() => exportToPDF(filteredPatients, "Reporte de Pacientes")} className="bg-sky-600 hover:bg-sky-700 text-white"><FileText className="h-4 w-4 mr-2" />Ver PDF</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">ID</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Paciente</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Especialidad</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Saldo</th>
                <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Edad</th>
                <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-sm font-mono text-slate-500">{patient.id}</td>
                  <td className="px-6 py-3 text-sm font-medium text-slate-900">{patient.name}</td>
                  <td className="px-6 py-3 text-sm text-slate-600">{patient.category}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-slate-900 text-right">${patient.price}</td>
                  <td className="px-6 py-3 text-sm text-center"><span className={patient.stock === 0 ? "text-red-600 font-medium" : "text-slate-700"}>{patient.stock}</span></td>
                  <td className="px-6 py-3 text-center"><Badge variant={patient.status === "Activo" ? "default" : "secondary"} className={patient.status === "Activo" ? "bg-sky-100 text-sky-700 hover:bg-sky-100" : "bg-slate-200 text-slate-600 hover:bg-slate-200"}>{patient.status}</Badge></td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (<tr><td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-400">No se encontraron pacientes con ese criterio.</td></tr>)}
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
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-sky-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"} ${sidebarCollapsed ? "justify-center" : ""} ${isSubItem && !sidebarCollapsed ? "ml-4" : ""}`}
        title={sidebarCollapsed ? item.label : undefined}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {!sidebarCollapsed && <span>{item.label}</span>}
        {active && !sidebarCollapsed && !isSubItem && <ChevronRight className="h-4 w-4 ml-auto" />}
      </button>
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-100 relative">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-40 bg-slate-900 text-slate-300 flex flex-col shrink-0 transform transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} ${sidebarCollapsed ? "md:w-20 w-20" : "w-64"}`}>
        <div className={`p-4 border-b border-slate-800 flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500 flex items-center justify-center text-white font-bold text-lg shrink-0"><HeartPulse className="h-6 w-6" /></div>
            {!sidebarCollapsed && <div><p className="text-white font-bold text-sm">MediCore</p><p className="text-xs text-slate-500">Health System</p></div>}
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
          {!sidebarCollapsed && <p className="text-xs uppercase tracking-wider text-slate-600 px-3 mb-2">Módulos</p>}
          {sidebarConfig.map((item) => <SidebarNavItem key={item.id} item={item} />)}

          {!sidebarCollapsed && <p className="text-xs uppercase tracking-wider text-slate-600 px-3 mb-2 mt-6">Administración</p>}
          
          <button 
            onClick={() => { setConfigOpen(!configOpen); setUsersOpen(false); }} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeModule.startsWith("cfg-") ? "bg-sky-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"} ${sidebarCollapsed ? "justify-center" : ""}`}
            title={sidebarCollapsed ? "Configuración Inicial" : undefined}
          >
            <Settings className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Configuración Inicial</span>}
            {!sidebarCollapsed && <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${configOpen ? "rotate-180" : ""}`} />}
          </button>
          {configOpen && !sidebarCollapsed && (
            <div className="mt-1 space-y-1 border-l border-slate-700 pl-3">
              {configSubItems.map((sub) => <SidebarNavItem key={sub.id} item={sub} isSubItem />)}
            </div>
          )}

          <button 
            onClick={() => { setUsersOpen(!usersOpen); setConfigOpen(false); }} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeModule.startsWith("usr-") ? "bg-sky-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"} ${sidebarCollapsed ? "justify-center" : ""}`}
            title={sidebarCollapsed ? "Usuarios" : undefined}
          >
            <Users className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Usuarios</span>}
            {!sidebarCollapsed && <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${usersOpen ? "rotate-180" : ""}`} />}
          </button>
          {usersOpen && !sidebarCollapsed && (
            <div className="mt-1 space-y-1 border-l border-slate-700 pl-3">
              {usersSubItems.map((sub) => <SidebarNavItem key={sub.id} item={sub} isSubItem />)}
            </div>
          )}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button 
            onClick={() => handleSelectModule("profile")} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeModule === "profile" ? "bg-sky-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"} ${sidebarCollapsed ? "justify-center" : ""}`}
            title={sidebarCollapsed ? "Mi Perfil" : undefined}
          >
            <UserCircle className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Mi Perfil</span>}
          </button>
          
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3 px-2 mt-2">
              <Avatar className="h-9 w-9 ring-2 ring-sky-500 shrink-0">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-sky-700 text-white text-xs">AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-white truncate">{profile.name}</p><p className="text-xs text-slate-500 truncate">{profile.email}</p></div>
              <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors" title="Cerrar sesión"><LogOut className="h-4 w-4" /></button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 mt-2">
              <Avatar className="h-9 w-9 ring-2 ring-sky-500">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-sky-700 text-white text-xs">AD</AvatarFallback>
              </Avatar>
              <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors" title="Cerrar sesión"><LogOut className="h-4 w-4" /></button>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="md:hidden">
              <Menu className="h-6 w-6 text-slate-700" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden md:flex">
              {sidebarCollapsed ? <PanelLeftOpen className="h-5 w-5 text-slate-700" /> : <PanelLeftClose className="h-5 w-5 text-slate-700" />}
            </Button>
            <div>
              <h1 className="text-lg md:text-xl font-serif font-bold text-slate-900 capitalize">
                {activeModule.startsWith("cfg-") ? configSubItems.find((c) => c.id === activeModule)?.label : 
                 activeModule.startsWith("usr-") ? usersSubItems.find((c) => c.id === activeModule)?.label : 
                 activeModule === "profile" ? "Mi Perfil" :
                 sidebarConfig.find((i) => i.id === activeModule)?.label}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Gestión clínica / MediCore Framework</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar pacientes..." className="pl-10 w-64 bg-slate-50 border-slate-200" />
            </div>
            <Button variant="ghost" size="icon" className="relative"><Bell className="h-5 w-5 text-slate-600" /><span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-sky-500" /></Button>
            <Avatar className="h-9 w-9 cursor-pointer" onClick={() => handleSelectModule("profile")}>
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-sky-100 text-sky-700 text-xs font-semibold">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          {renderContent()}
        </main>
      </div>

      <button 
        onClick={() => setChatOpen(!chatOpen)} 
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-sky-600 text-white shadow-lg flex items-center justify-center hover:bg-sky-700 transition-colors"
        title="Abrir Asistente IA"
      >
        {chatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!chatOpen && <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"></span>}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100%-3rem)] max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden" style={{ height: "600px" }}>
          <div className="bg-sky-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Asistente MediCore</p>
                <p className="text-xs text-sky-100">En línea</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.role === "user" ? "bg-sky-600 text-white rounded-br-none" : "bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex gap-2 mb-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
              {chatCommands.map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <button 
                    key={cmd.id} 
                    onClick={() => handleChatCommand(cmd.id, cmd.label)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium hover:bg-sky-50 hover:text-sky-700 transition-colors whitespace-nowrap shrink-0"
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
                className="flex-1 bg-slate-50 border-slate-200"
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-sky-600 hover:bg-sky-700 text-white shrink-0">
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
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-slate-100">
        <div>
          <CardTitle className="text-lg font-serif flex items-center gap-2"><Icon className="h-5 w-5 text-sky-700" />{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          <input ref={importRef} type="file" accept=".csv" onChange={onImport} className="hidden" />
          <Button onClick={() => importRef.current?.click()} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50"><FileUp className="h-4 w-4 mr-2" />Importar</Button>
          <Button onClick={onExportExcel} variant="outline" className="border-sky-200 text-sky-700 hover:bg-sky-50"><FileSpreadsheet className="h-4 w-4 mr-2" />Excel</Button>
          <Button onClick={onExportPDF} className="bg-sky-600 hover:bg-sky-700 text-white"><FileText className="h-4 w-4 mr-2" />PDF</Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {showForm && (
          <form onSubmit={handleSubmit} className="p-4 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {columns.map((col) => (
              <div key={col.key} className="space-y-2">
                <Label htmlFor={col.key}>{col.label}</Label>
                {col.type === "checkbox" ? (
                  <div className="flex items-center gap-2 h-10">
                    <Checkbox 
                      id={col.key} 
                      checked={formData[col.key] || false} 
                      onCheckedChange={(v) => handleInputChange(col.key, v)} 
                      className="data-[state=checked]:bg-sky-600 data-[state=checked]:border-sky-600"
                    />
                    <Label htmlFor={col.key} className="text-sm font-normal text-slate-600 cursor-pointer">Sí</Label>
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
              <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white flex-1">
                {editingId ? <><Pencil className="h-4 w-4 mr-2" />Actualizar</> : <><Plus className="h-4 w-4 mr-2" />Crear</>}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
            </div>
          </form>
        )}

        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-sky-600 hover:bg-sky-700 text-white">
            <Plus className="h-4 w-4 mr-2" /> Nuevo Registro
          </Button>
        )}

        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr className="border-b border-slate-100">
                {columns.map((col) => (
                  <th key={col.key} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">{col.label}</th>
                ))}
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-3 text-sm text-slate-700">
                      {col.type === "checkbox" ? (
                        <Badge variant={item[col.key] ? "default" : "secondary"} className={item[col.key] ? "bg-sky-100 text-sky-700" : "bg-slate-200 text-slate-600"}>{item[col.key] ? "Sí" : "No"}</Badge>
                      ) : (
                        item[col.key]
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-3 text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="h-8 w-8 text-slate-500 hover:text-sky-700 hover:bg-sky-50"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (<tr><td colSpan={columns.length + 1} className="px-6 py-12 text-center text-sm text-slate-400">No hay registros disponibles.</td></tr>)}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};