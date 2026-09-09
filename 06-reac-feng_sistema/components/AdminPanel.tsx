'use client'
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookOpen,
  FolderKanban,
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  FileSpreadsheet,
  FileText,
  LogOut,
  Search,
  Home,
  PieChart,
  Table2,
  UserCircle,
  Camera,
  Check,
  Receipt,
  X,
  Bot,
  Send,
  Sparkles,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type CrudItem = {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
};

type DetalleFactura = {
  id: string;
  producto: string;
  cantidad: number;
  precio: number;
};

type Factura = {
  id: string;
  cliente: string;
  documento: string;
  fecha: string;
  vencimiento: string;
  detalles: DetalleFactura[];
  estado: string;
};

type MenuItem = {
  id: string;
  label: string;
  icon: any;
  submenus: { id: string; label: string }[];
};

type ChatMessage = {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
};

const menuData: MenuItem[] = [
  { id: "cursos", label: "Mis Cursos", icon: BookOpen, submenus: [{ id: "ver", label: "Ver Cursos" }, { id: "crear", label: "Crear Curso" }, { id: "export", label: "Exportar Cursos" }] },
  { id: "proyectos", label: "Proyectos", icon: FolderKanban, submenus: [{ id: "ver", label: "Ver Proyectos" }, { id: "crear", label: "Crear Proyecto" }, { id: "export", label: "Exportar Proyectos" }] },
  { id: "calendario", label: "Calendario", icon: Calendar, submenus: [{ id: "ver", label: "Ver Eventos" }, { id: "crear", label: "Crear Evento" }, { id: "export", label: "Exportar Eventos" }] },
  { id: "estudiantes", label: "Estudiantes", icon: Users, submenus: [{ id: "ver", label: "Ver Estudiantes" }, { id: "crear", label: "Crear Estudiante" }, { id: "export", label: "Exportar Estudiantes" }] },
  { id: "mensajes", label: "Mensajes", icon: MessageSquare, submenus: [{ id: "ver", label: "Ver Mensajes" }, { id: "crear", label: "Enviar Mensaje" }, { id: "export", label: "Exportar Mensajes" }] },
  { id: "reportes", label: "Reportes", icon: BarChart3, submenus: [{ id: "ver", label: "Ver Reportes" }, { id: "crear", label: "Crear Reporte" }, { id: "export", label: "Exportar Reportes" }] },
  { 
    id: "estadisticas", 
    label: "Estadísticas", 
    icon: PieChart, 
    submenus: [
      { id: "barras", label: "Gráfico de Barras" }, 
      { id: "torta", label: "Gráfico de Torta" }, 
      { id: "tabla", label: "Tabla de Datos" }
    ] 
  },
  { 
    id: "facturas", 
    label: "Facturas", 
    icon: Receipt, 
    submenus: [
      { id: "ver", label: "Ver Facturas" }, 
      { id: "crear", label: "Nueva Factura" }, 
      { id: "export", label: "Exportar Facturas" }
    ] 
  },
  { id: "perfil", label: "Perfil de Usuario", icon: UserCircle, submenus: [{ id: "datos", label: "Datos Personales" }, { id: "seguridad", label: "Cambiar Contraseña" }, { id: "tema", label: "Tema de Colores" }] },
  { id: "ajustes", label: "Ajustes", icon: Settings, submenus: [{ id: "ver", label: "Ver Ajustes" }, { id: "crear", label: "Crear Ajuste" }, { id: "export", label: "Exportar Config" }] },
];

const initialData: Record<string, CrudItem[]> = {
  cursos: [
    { id: "1", nombre: "React Avanzado", descripcion: "Curso sobre hooks y context", estado: "Activo" },
    { id: "2", nombre: "TypeScript Básico", descripcion: "Fundamentos de TS", estado: "Activo" },
  ],
  proyectos: [
    { id: "1", nombre: "App Móvil", descripcion: "Desarrollo iOS/Android", estado: "En Progreso" },
  ],
  calendario: [
    { id: "1", nombre: "Reunión de Equipo", descripcion: "Sincronización semanal", estado: "Programado" },
  ],
  estudiantes: [
    { id: "1", nombre: "Ana López", descripcion: "Estudiante de React", estado: "Activo" },
    { id: "2", nombre: "Carlos Ruiz", descripcion: "Estudiante de TS", estado: "Inactivo" },
  ],
  mensajes: [
    { id: "1", nombre: "Bienvenida", descripcion: "Mensaje a nuevos usuarios", estado: "Enviado" },
  ],
  reportes: [
    { id: "1", nombre: "Reporte Mensual", descripcion: "Estadísticas de uso", estado: "Generado" },
  ],
  estadisticas: [],
  facturas: [],
  perfil: [],
  ajustes: [
    { id: "1", nombre: "Tema Oscuro", descripcion: "Configuración de apariencia", estado: "Activo" },
  ],
};

const initialFacturas: Factura[] = [
  {
    id: "F-001",
    cliente: "Tech Corp",
    documento: "12345678-9",
    fecha: "2023-10-01",
    vencimiento: "2023-10-30",
    estado: "Pagada",
    detalles: [
      { id: "1", producto: "Licencia Software", cantidad: 2, precio: 500 },
      { id: "2", producto: "Soporte Técnico", cantidad: 1, precio: 300 },
    ],
  },
  {
    id: "F-002",
    cliente: "Innovate LLC",
    documento: "87654321-0",
    fecha: "2023-10-05",
    vencimiento: "2023-11-05",
    estado: "Pendiente",
    detalles: [
      { id: "1", producto: "Consultoría", cantidad: 10, precio: 80 },
    ],
  },
];

const barData = [
  { name: "Ene", usuarios: 400, ventas: 240 },
  { name: "Feb", usuarios: 300, ventas: 139 },
  { name: "Mar", usuarios: 200, ventas: 980 },
  { name: "Abr", usuarios: 278, ventas: 390 },
  { name: "May", usuarios: 189, ventas: 480 },
];

const pieData = [
  { name: "Ventas", value: 400 },
  { name: "Marketing", value: 300 },
  { name: "Desarrollo", value: 300 },
  { name: "RRHH", value: 200 },
];

const tableData = [
  { mes: "Enero", ventas: 400, usuarios: 240 },
  { mes: "Febrero", ventas: 300, usuarios: 139 },
  { mes: "Marzo", ventas: 200, usuarios: 980 },
  { mes: "Abril", ventas: 278, usuarios: 390 },
  { mes: "Mayo", ventas: 189, usuarios: 480 },
];

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ec4899", "#06b6d4"];

const themes = [
  { id: "indigo", name: "Predeterminado", color: "bg-indigo-600", hex: "#4f46e5", ring: "ring-indigo-500", text: "text-indigo-600", bgLight: "bg-indigo-50", border: "border-indigo-200", hover: "hover:bg-indigo-700" },
  { id: "sky", name: "Azul Cielo", color: "bg-sky-500", hex: "#0ea5e9", ring: "ring-sky-500", text: "text-sky-600", bgLight: "bg-sky-50", border: "border-sky-200", hover: "hover:bg-sky-600" },
  { id: "rose", name: "Rojo Naranja", color: "bg-rose-500", hex: "#f43f5e", ring: "ring-rose-500", text: "text-rose-600", bgLight: "bg-rose-50", border: "border-rose-200", hover: "hover:bg-rose-600" },
  { id: "olive", name: "Verde Oliva", color: "bg-lime-700", hex: "#4d7c0f", ring: "ring-lime-700", text: "text-lime-700", bgLight: "bg-lime-50", border: "border-lime-200", hover: "hover:bg-lime-800" },
];

export function AdminPanel({ onExit }: { onExit: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [data, setData] = useState(initialData);
  const [facturas, setFacturas] = useState<Factura[]>(initialFacturas);
  const [activeSection, setActiveSection] = useState("cursos");
  const [activeSubmenu, setActiveSubmenu] = useState("ver");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFacturaModalOpen, setIsFacturaModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CrudItem | null>(null);
  const [editingFactura, setEditingFactura] = useState<Factura | null>(null);
  const [formData, setFormData] = useState({ nombre: "", descripcion: "", estado: "Activo" });
  const [facturaForm, setFacturaForm] = useState<Factura>({
    id: "",
    cliente: "",
    documento: "",
    fecha: new Date().toISOString().split("T")[0],
    vencimiento: new Date().toISOString().split("T")[0],
    estado: "Pendiente",
    detalles: [],
  });
  const [detalleForm, setDetalleForm] = useState<DetalleFactura>({ id: "", producto: "", cantidad: 1, precio: 0 });
  
  const [activeTheme, setActiveTheme] = useState(themes[0]);
  const [profileImage, setProfileImage] = useState("");
  const [profileData, setProfileData] = useState({ nombre: "Admin User", email: "admin@fengoffice.com", telefono: "+123 456 7890", bio: "Administrador del sistema y creador de cursos." });
  const [passwordData, setPasswordData] = useState({ actual: "", nueva: "", confirmar: "" });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "bot", text: "¡Hola! Soy tu asistente virtual. Puedo ayudarte a navegar y realizar acciones en el panel. Selecciona una opción del menú o escríbeme un comando.", timestamp: new Date().toISOString() }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen]);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
    setActiveSection(id);
    if (id === "estadisticas") setActiveSubmenu("barras");
    else if (id === "perfil") setActiveSubmenu("datos");
    else setActiveSubmenu("ver");
  };

  const handleSubmenuClick = (sectionId: string, submenuId: string) => {
    setActiveSection(sectionId);
    setActiveSubmenu(submenuId);
    setMobileOpen(false);
    if (sectionId === "facturas") {
      if (submenuId === "crear") {
        setEditingFactura(null);
        setFacturaForm({
          id: `F-${String(facturas.length + 1).padStart(3, "0")}`,
          cliente: "",
          documento: "",
          fecha: new Date().toISOString().split("T")[0],
          vencimiento: new Date().toISOString().split("T")[0],
          estado: "Pendiente",
          detalles: [],
        });
        setIsFacturaModalOpen(true);
      } else if (submenuId === "export") {
        exportFacturasToExcel();
      }
    } else if (sectionId !== "estadisticas" && sectionId !== "perfil") {
      if (submenuId === "crear") {
        setEditingItem(null);
        setFormData({ nombre: "", descripcion: "", estado: "Activo" });
        setIsModalOpen(true);
      } else if (submenuId === "export") {
        exportToExcel(sectionId);
      } else {
        setIsModalOpen(false);
      }
    }
  };

  const exportToExcel = (sectionId: string) => {
    const items = data[sectionId] || [];
    const headers = ["ID", "Nombre", "Descripción", "Estado"];
    const csvContent = [
      headers.join(","),
      ...items.map(item => [item.id, `"${item.nombre}"`, `"${item.descripcion}"`, `"${item.estado}"`].join(","))
    ].join("\n");
    
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${sectionId}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportFacturasToExcel = () => {
    const headers = ["ID", "Cliente", "Documento", "Fecha", "Vencimiento", "Estado", "Subtotal", "IVA (19%)", "Total"];
    const csvContent = [
      headers.join(","),
      ...facturas.map(f => {
        const subtotal = f.detalles.reduce((acc, d) => acc + (d.cantidad * d.precio), 0);
        const iva = subtotal * 0.19;
        const total = subtotal + iva;
        return [f.id, `"${f.cliente}"`, `"${f.documento}"`, f.fecha, f.vencimiento, `"${f.estado}"`, subtotal.toFixed(2), iva.toFixed(2), total.toFixed(2)].join(",");
      })
    ].join("\n");
    
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "facturas.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => window.print();

  const handleSave = () => {
    const sectionData = data[activeSection] || [];
    if (editingItem) {
      const updatedData = sectionData.map(item => item.id === editingItem.id ? { ...item, ...formData } : item);
      setData({ ...data, [activeSection]: updatedData });
    } else {
      const newItem: CrudItem = { id: Date.now().toString(), ...formData };
      setData({ ...data, [activeSection]: [...sectionData, newItem] });
    }
    setIsModalOpen(false);
  };

  const handleEdit = (item: CrudItem) => {
    setEditingItem(item);
    setFormData({ nombre: item.nombre, descripcion: item.descripcion, estado: item.estado });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const sectionData = data[activeSection] || [];
    setData({ ...data, [activeSection]: sectionData.filter(item => item.id !== id) });
  };

  const handleFacturaSave = () => {
    if (editingFactura) {
      setFacturas(facturas.map(f => f.id === editingFactura.id ? facturaForm : f));
    } else {
      setFacturas([...facturas, facturaForm]);
    }
    setIsFacturaModalOpen(false);
  };

  const handleEditFactura = (factura: Factura) => {
    setEditingFactura(factura);
    setFacturaForm(factura);
    setIsFacturaModalOpen(true);
  };

  const handleDeleteFactura = (id: string) => {
    setFacturas(facturas.filter(f => f.id !== id));
  };

  const handleAddDetalle = () => {
    if (detalleForm.producto && detalleForm.cantidad > 0 && detalleForm.precio >= 0) {
      setFacturaForm({
        ...facturaForm,
        detalles: [...facturaForm.detalles, { ...detalleForm, id: Date.now().toString() }],
      });
      setDetalleForm({ id: "", producto: "", cantidad: 1, precio: 0 });
    }
  };

  const handleDeleteDetalle = (id: string) => {
    setFacturaForm({
      ...facturaForm,
      detalles: facturaForm.detalles.filter(d => d.id !== id),
    });
  };

  const calculateTotals = (detalles: DetalleFactura[]) => {
    const subtotal = detalles.reduce((acc, d) => acc + (d.cantidad * d.precio), 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;
    return { subtotal, iva, total };
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addChatMessage = (sender: "bot" | "user", text: string) => {
    setChatMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), sender, text, timestamp: new Date().toISOString() }]);
  };

  const handleChatCommand = (command: string) => {
    addChatMessage("user", command);
    const cmd = command.toLowerCase();
    
    const matchedSection = menuData.find(m => cmd.includes(m.id) || cmd.includes(m.label.toLowerCase()));
    
    if (matchedSection) {
      setOpenMenus(prev => ({ ...prev, [matchedSection.id]: true }));
      setActiveSection(matchedSection.id);
      
      if (cmd.includes("crear") || cmd.includes("nuevo") || cmd.includes("nueva")) {
        if (matchedSection.id === "facturas") {
          setEditingFactura(null);
          setFacturaForm({
            id: `F-${String(facturas.length + 1).padStart(3, "0")}`,
            cliente: "",
            documento: "",
            fecha: new Date().toISOString().split("T")[0],
            vencimiento: new Date().toISOString().split("T")[0],
            estado: "Pendiente",
            detalles: [],
          });
          setIsFacturaModalOpen(true);
        } else if (matchedSection.id !== "estadisticas" && matchedSection.id !== "perfil") {
          setEditingItem(null);
          setFormData({ nombre: "", descripcion: "", estado: "Activo" });
          setIsModalOpen(true);
        }
        addChatMessage("bot", `Abriendo formulario para crear un nuevo registro en ${matchedSection.label}.`);
      } else if (cmd.includes("ver") || cmd.includes("ir") || cmd.includes("mostrar")) {
        if (matchedSection.id === "estadisticas") setActiveSubmenu("barras");
        else if (matchedSection.id === "perfil") setActiveSubmenu("datos");
        else setActiveSubmenu("ver");
        addChatMessage("bot", `Navegando a la sección ${matchedSection.label}.`);
      } else if (cmd.includes("export")) {
        if (matchedSection.id === "facturas") exportFacturasToExcel();
        else exportToExcel(matchedSection.id);
        addChatMessage("bot", `Exportando datos de ${matchedSection.label} a Excel.`);
      } else {
        if (matchedSection.id === "estadisticas") setActiveSubmenu("barras");
        else if (matchedSection.id === "perfil") setActiveSubmenu("datos");
        else setActiveSubmenu("ver");
        addChatMessage("bot", `Te he llevado a ${matchedSection.label}. ¿Qué deseas hacer allí? Puedes ver, crear o exportar.`);
      }
    } else if (cmd.includes("hola") || cmd.includes("ayuda") || cmd.includes("menu")) {
      addChatMessage("bot", "Puedo ayudarte a navegar. Prueba con comandos como 'ir a cursos', 'crear factura', 'ver perfil' o 'exportar estudiantes'.");
    } else {
      addChatMessage("bot", "Lo siento, no reconocí ese comando. Intenta con 'ir a [sección]', 'crear [sección]' o 'exportar [sección]'.");
    }
    setChatInput("");
  };

  const currentItems = data[activeSection] || [];
  const currentSectionLabel = menuData.find(m => m.id === activeSection)?.label || "";
  const currentSubmenuLabel = menuData.find(m => m.id === activeSection)?.submenus.find(s => s.id === activeSubmenu)?.label || "";

  const renderContent = () => {
    if (activeSection === "estadisticas") {
      if (activeSubmenu === "barras") {
        return (
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${activeTheme.text}`}><BarChart3 className="h-5 w-5" /> Rendimiento Mensual</CardTitle>
              <CardDescription>Comparativo de usuarios y ventas por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                  <Legend />
                  <Bar dataKey="usuarios" name="Usuarios" fill={activeTheme.hex} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ventas" name="Ventas" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      }
      if (activeSubmenu === "torta") {
        return (
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${activeTheme.text}`}><PieChart className="h-5 w-5" /> Distribución por Área</CardTitle>
              <CardDescription>Proporción de usuarios por departamento</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsPieChart>
                  <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={150} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(56 * 100).toFixed(0)}%`}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      }
      if (activeSubmenu === "tabla") {
        return (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${activeTheme.text}`}><Table2 className="h-5 w-5" /> Datos Detallados</CardTitle>
                <CardDescription>Ventas y usuarios por mes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 bg-slate-50">
                      <TableHead>Mes</TableHead>
                      <TableHead className="text-right">Ventas</TableHead>
                      <TableHead className="text-right">Usuarios</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow key={row.mes} className="border-slate-100">
                        <TableCell className="font-medium">{row.mes}</TableCell>
                        <TableCell className="text-right text-slate-700">{row.ventas}</TableCell>
                        <TableCell className="text-right text-slate-700">{row.usuarios}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${activeTheme.text}`}><BarChart3 className="h-5 w-5" /> Gráfico de Barras</CardTitle>
                <CardDescription>Visualización de los datos tabulados</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={tableData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="mes" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                    <Legend />
                    <Bar dataKey="ventas" name="Ventas" fill={activeTheme.hex} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="usuarios" name="Usuarios" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );
      }
    }

    if (activeSection === "facturas") {
      return (
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden md:table-cell">Fecha</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facturas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                      No hay facturas registradas. Crea una nueva para comenzar.
                    </TableCell>
                  </TableRow>
                ) : (
                  facturas.map((factura) => {
                    const totals = calculateTotals(factura.detalles);
                    return (
                      <TableRow key={factura.id} className="border-slate-100">
                        <TableCell className="font-mono text-xs text-slate-500">{factura.id}</TableCell>
                        <TableCell>
                          <div className="font-medium text-slate-900">{factura.cliente}</div>
                          <div className="text-xs text-slate-500">{factura.documento}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-slate-600">{factura.fecha}</TableCell>
                        <TableCell className="text-right font-semibold text-slate-900">${totals.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            factura.estado === "Pagada" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {factura.estado}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEditFactura(factura)} className={`h-8 w-8 text-slate-500 hover:${activeTheme.bgLight} hover:${activeTheme.text}`}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteFactura(factura.id)} className="h-8 w-8 text-slate-500 hover:bg-rose-50 hover:text-rose-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );
    }

    if (activeSection === "perfil") {
      if (activeSubmenu === "datos") {
        return (
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className={activeTheme.text}>Datos Personales</CardTitle>
              <CardDescription>Actualiza tu información de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-slate-100 shadow-sm">
                    <AvatarImage src={profileImage} />
                    <AvatarFallback className={`text-2xl ${activeTheme.color} text-white`}>AU</AvatarFallback>
                  </Avatar>
                  <label className={`absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ${activeTheme.color} text-white shadow-md transition-transform hover:scale-110`}>
                    <Camera className="h-4 w-4" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg font-semibold text-slate-900">{profileData.nombre}</p>
                  <p className="text-sm text-slate-500">{profileData.email}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input id="nombre" value={profileData.nombre} onChange={(e) => setProfileData({ ...profileData, nombre: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" value={profileData.telefono} onChange={(e) => setProfileData({ ...profileData, telefono: e.target.value })} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea id="bio" value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} rows={3} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className={`${activeTheme.color} ${activeTheme.hover} text-white`}>Guardar Cambios</Button>
              </div>
            </CardContent>
          </Card>
        );
      }
      if (activeSubmenu === "seguridad") {
        return (
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className={activeTheme.text}>Cambiar Contraseña</CardTitle>
              <CardDescription>Actualiza tu contraseña periódicamente para mantener tu cuenta segura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="actual">Contraseña Actual</Label>
                <Input id="actual" type="password" value={passwordData.actual} onChange={(e) => setPasswordData({ ...passwordData, actual: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nueva">Nueva Contraseña</Label>
                <Input id="nueva" type="password" value={passwordData.nueva} onChange={(e) => setPasswordData({ ...passwordData, nueva: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmar">Confirmar Contraseña</Label>
                <Input id="confirmar" type="password" value={passwordData.confirmar} onChange={(e) => setPasswordData({ ...passwordData, confirmar: e.target.value })} />
              </div>
              <div className="flex justify-end">
                <Button className={`${activeTheme.color} ${activeTheme.hover} text-white`}>Actualizar Contraseña</Button>
              </div>
            </CardContent>
          </Card>
        );
      }
      if (activeSubmenu === "tema") {
        return (
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className={activeTheme.text}>Tema de Colores</CardTitle>
              <CardDescription>Personaliza la apariencia de tu panel de administración</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveTheme(theme)}
                    className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                      activeTheme.id === theme.id ? `${theme.border} bg-slate-50 shadow-md` : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${theme.color} text-white shadow-sm`}>
                      {activeTheme.id === theme.id && <Check className="h-8 w-8" />}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{theme.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      }
    }

    return (
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 bg-slate-50">
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden md:table-cell">Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                    No hay registros. Crea uno nuevo para comenzar.
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((item) => (
                  <TableRow key={item.id} className="border-slate-100">
                    <TableCell className="font-mono text-xs text-slate-500">{item.id.slice(-4)}</TableCell>
                    <TableCell className="font-medium text-slate-900">{item.nombre}</TableCell>
                    <TableCell className="hidden max-w-xs truncate text-slate-600 md:table-cell">{item.descripcion}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        item.estado === "Activo" || item.estado === "Enviado" || item.estado === "Generado" || item.estado === "Programado"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {item.estado}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className={`h-8 w-8 text-slate-500 hover:${activeTheme.bgLight} hover:${activeTheme.text}`}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-slate-500 hover:bg-rose-50 hover:text-rose-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  const facturaTotals = calculateTotals(facturaForm.detalles);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <aside className={`${collapsed ? "w-20" : "w-64"} hidden shrink-0 border-r border-slate-200 bg-white transition-all duration-300 lg:flex lg:flex-col`}>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${activeTheme.color} text-white font-bold shadow-md`}>F</div>
            {!collapsed && <span className="text-lg font-bold">Feng Office</span>}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {menuData.map((item) => {
            const Icon = item.icon;
            const isOpen = openMenus[item.id];
            return (
              <div key={item.id}>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id ? `${activeTheme.bgLight} ${activeTheme.text}` : "text-slate-600 hover:bg-slate-100"
                  } ${collapsed ? "justify-center" : "justify-between"}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {!collapsed && (isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
                </button>
                {isOpen && !collapsed && (
                  <div className="mt-1 ml-6 flex flex-col gap-1 border-l border-slate-200 pl-3">
                    {item.submenus.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubmenuClick(item.id, sub.id)}
                        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors ${
                          activeSection === item.id && activeSubmenu === sub.id ? `bg-slate-100 ${activeTheme.text} font-medium` : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="shrink-0 border-t border-slate-200 p-3">
          <Button variant="ghost" onClick={onExit} className={`w-full justify-start gap-3 text-slate-600 hover:bg-slate-100 ${collapsed ? "px-0" : ""}`}>
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Salir</span>}
          </Button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-white shadow-xl">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
              <div className="flex items-center gap-2">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${activeTheme.color} text-white font-bold`}>F</div>
                <span className="text-lg font-bold">Feng Office</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
              {menuData.map((item) => {
                const Icon = item.icon;
                const isOpen = openMenus[item.id];
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        activeSection === item.id ? `${activeTheme.bgLight} ${activeTheme.text}` : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </div>
                      {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    {isOpen && (
                      <div className="mt-1 ml-6 flex flex-col gap-1 border-l border-slate-200 pl-3">
                        {item.submenus.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleSubmenuClick(item.id, sub.id)}
                            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors ${
                              activeSection === item.id && activeSubmenu === sub.id ? `bg-slate-100 ${activeTheme.text} font-medium` : "text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="shrink-0 border-t border-slate-200 p-3">
              <Button variant="ghost" onClick={onExit} className="w-full justify-start gap-3 text-slate-600 hover:bg-slate-100">
                <LogOut className="h-5 w-5" />
                <span>Salir</span>
              </Button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} className="lg:hidden">
              <PanelLeftOpen className="h-5 w-5" />
            </Button>
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-slate-900">{currentSectionLabel}</h1>
              <p className="text-xs text-slate-500">{currentSubmenuLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Buscar..." className="w-64 pl-9" />
            </div>
            <Button variant="outline" size="sm" onClick={onExit} className="hidden md:flex">
              <Home className="mr-2 h-4 w-4" /> Inicio
            </Button>
            <Avatar className="h-9 w-9 border-2 border-slate-100">
              <AvatarImage src={profileImage} />
              <AvatarFallback className={`${activeTheme.color} text-white text-sm font-semibold`}>AU</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{currentSectionLabel}</h2>
              <p className="text-sm text-slate-500">
                {activeSection === "estadisticas" ? "Visualiza métricas y datos estadísticos" : activeSection === "perfil" ? "Gestiona tu cuenta y preferencias" : activeSection === "facturas" ? "Administra las facturas emitadas" : `Gestiona los registros de ${currentSectionLabel.toLowerCase()}`}
              </p>
            </div>
            {activeSection !== "estadisticas" && activeSection !== "perfil" && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => activeSection === "facturas" ? exportFacturasToExcel() : exportToExcel(activeSection)} className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
                </Button>
                <Button variant="outline" size="sm" onClick={exportToPDF} className="border-rose-200 text-rose-700 hover:bg-rose-50">
                  <FileText className="mr-2 h-4 w-4" /> PDF
                </Button>
                <Button size="sm" onClick={() => {
                  if (activeSection === "facturas") {
                    setEditingFactura(null);
                    setFacturaForm({
                      id: `F-${String(facturas.length + 1).padStart(3, "0")}`,
                      cliente: "",
                      documento: "",
                      fecha: new Date().toISOString().split("T")[0],
                      vencimiento: new Date().toISOString().split("T")[0],
                      estado: "Pendiente",
                      detalles: [],
                    });
                    setIsFacturaModalOpen(true);
                  } else {
                    setEditingItem(null);
                    setFormData({ nombre: "", descripcion: "", estado: "Activo" });
                    setIsModalOpen(true);
                  }
                }} className={`${activeTheme.color} ${activeTheme.hover} text-white`}>
                  <Plus className="mr-2 h-4 w-4" /> {activeSection === "facturas" ? "Nueva Factura" : "Nuevo"}
                </Button>
              </div>
            )}
          </div>
          {renderContent()}
        </main>
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {isChatOpen && (
          <div className="flex h-[500px] w-80 flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl sm:w-96">
            <div className={`flex h-16 items-center justify-between rounded-t-2xl ${activeTheme.color} px-4 text-white`}>
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <div>
                  <p className="font-semibold leading-tight">Asistente Feng</p>
                  <p className="text-xs opacity-90">En línea</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="h-8 w-8 text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                    msg.sender === "user" ? `${activeTheme.color} text-white rounded-br-sm` : "bg-white text-slate-700 border border-slate-200 rounded-bl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-slate-200 bg-white p-3">
              <div className="mb-2 flex flex-wrap gap-1">
                {menuData.slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleChatCommand(`ir a ${item.label.toLowerCase()}`)}
                    className={`rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-600 transition-colors hover:${activeTheme.bgLight} hover:${activeTheme.text}`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleChatCommand("menú completo")}
                  className={`rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-600 transition-colors hover:${activeTheme.bgLight} hover:${activeTheme.text}`}
                >
                  Más...
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Escribe un comando..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && chatInput.trim()) {
                      handleChatCommand(chatInput.trim());
                    }
                  }}
                  className="flex-1"
                />
                <Button size="icon" onClick={() => chatInput.trim() && handleChatCommand(chatInput.trim())} className={`${activeTheme.color} ${activeTheme.hover} text-white shrink-0`}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`flex h-14 w-14 items-center justify-center rounded-full ${activeTheme.color} text-white shadow-lg transition-transform hover:scale-105 ${activeTheme.hover}`}
        >
          {isChatOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
        </button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Editar Registro" : "Nuevo Registro"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "Modifica los detalles del registro seleccionado." : "Completa la información para crear un nuevo registro."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ej: Curso de React" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} placeholder="Describe brevemente..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Input id="estado" value={formData.estado} onChange={(e) => setFormData({ ...formData, estado: e.target.value })} placeholder="Ej: Activo, En Progreso..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} className={`${activeTheme.color} ${activeTheme.hover} text-white`}>
              {editingItem ? "Guardar Cambios" : "Crear Registro"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFacturaModalOpen} onOpenChange={setIsFacturaModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className={`flex items-center gap-2 ${activeTheme.text}`}>
              <Receipt className="h-5 w-5" />
              {editingFactura ? `Editar Factura ${facturaForm.id}` : "Nueva Factura"}
            </DialogTitle>
            <DialogDescription>
              Completa los datos del encabezado, agrega productos al detalle y revisa los totales.
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[70vh] overflow-y-auto py-4 pr-2">
            <div className="mb-6">
              <h4 className="mb-3 text-sm font-semibold text-slate-700">Encabezado</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fac-id">N° Factura</Label>
                  <Input id="fac-id" value={facturaForm.id} disabled className="bg-slate-50 font-mono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fac-cliente">Cliente</Label>
                  <Input id="fac-cliente" value={facturaForm.cliente} onChange={(e) => setFacturaForm({ ...facturaForm, cliente: e.target.value })} placeholder="Nombre del cliente" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fac-doc">Documento</Label>
                  <Input id="fac-doc" value={facturaForm.documento} onChange={(e) => setFacturaForm({ ...facturaForm, documento: e.target.value })} placeholder="RUT / NIF / DNI" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fac-estado">Estado</Label>
                  <Input id="fac-estado" value={facturaForm.estado} onChange={(e) => setFacturaForm({ ...facturaForm, estado: e.target.value })} placeholder="Pendiente / Pagada" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fac-fecha">Fecha</Label>
                  <Input id="fac-fecha" type="date" value={facturaForm.fecha} onChange={(e) => setFacturaForm({ ...facturaForm, fecha: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fac-venc">Vencimiento</Label>
                  <Input id="fac-venc" type="date" value={facturaForm.vencimiento} onChange={(e) => setFacturaForm({ ...facturaForm, vencimiento: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 text-sm font-semibold text-slate-700">Detalle de la Factura</h4>
              <div className="mb-4 grid grid-cols-12 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="col-span-5 space-y-1 md:col-span-5">
                  <Label htmlFor="det-prod" className="text-xs">Producto</Label>
                  <Input id="det-prod" value={detalleForm.producto} onChange={(e) => setDetalleForm({ ...detalleForm, producto: e.target.value })} placeholder="Nombre del producto" className="h-8" />
                </div>
                <div className="col-span-2 space-y-1 md:col-span-2">
                  <Label htmlFor="det-cant" className="text-xs">Cant.</Label>
                  <Input id="det-cant" type="number" value={detalleForm.cantidad} onChange={(e) => setDetalleForm({ ...detalleForm, cantidad: parseFloat(e.target.value) || 0 })} className="h-8" />
                </div>
                <div className="col-span-3 space-y-1 md:col-span-3">
                  <Label htmlFor="det-prec" className="text-xs">Precio</Label>
                  <Input id="det-prec" type="number" value={detalleForm.precio} onChange={(e) => setDetalleForm({ ...detalleForm, precio: parseFloat(e.target.value) || 0 })} className="h-8" />
                </div>
                <div className="col-span-2 flex items-end md:col-span-2">
                  <Button size="sm" onClick={handleAddDetalle} className={`w-full ${activeTheme.color} ${activeTheme.hover} text-white`}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 bg-slate-50">
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-right">Cant.</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facturaForm.detalles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-20 text-center text-sm text-slate-500">
                          Agrega productos al detalle usando el formulario superior.
                        </TableCell>
                      </TableRow>
                    ) : (
                      facturaForm.detalles.map((d) => (
                        <TableRow key={d.id} className="border-slate-100">
                          <TableCell className="font-medium text-slate-900">{d.producto}</TableCell>
                          <TableCell className="text-right text-slate-700">{d.cantidad}</TableCell>
                          <TableCell className="text-right text-slate-700">${d.precio.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-semibold text-slate-900">${(d.cantidad * d.precio).toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteDetalle(d.id)} className="h-7 w-7 text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="ml-auto w-full max-w-xs space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal:</span>
                <span className="font-medium text-slate-900">${facturaTotals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>IVA (19%):</span>
                <span className="font-medium text-slate-900">${facturaTotals.iva.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                <span>Total:</span>
                <span>${facturaTotals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFacturaModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleFacturaSave} className={`${activeTheme.color} ${activeTheme.hover} text-white`}>
              {editingFactura ? "Guardar Cambios" : "Crear Factura"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}