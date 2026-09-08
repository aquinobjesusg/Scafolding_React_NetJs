import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  DollarSign,
  LogOut,
  Plus,
  Search,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Printer,
} from "lucide-react";

interface AdminPanelProps {
  userEmail: string;
  onLogout: () => void;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
}

interface PurchaseOrder {
  id: string;
  client: string;
  date: string;
  amount: number;
  status: "pendiente" | "aprobada" | "enviada" | "entregada";
  items: string[];
}

interface Invoice {
  id: string;
  number: string;
  client: string;
  date: string;
  amount: number;
  status: "emitida" | "pagada" | "vencida";
}

export function AdminPanel({ userEmail, onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Algodón Pima", category: "Telas", price: 12.5, stock: 500, unit: "m" },
    { id: 2, name: "Hilo de Poliéster", category: "Hilos", price: 3.2, stock: 1200, unit: "kg" },
    { id: 3, name: "Tinte Índigo", category: "Tintes", price: 25.0, stock: 80, unit: "kg" },
    { id: 4, name: "Botones de Madera", category: "Accesorios", price: 0.5, stock: 5000, unit: "unid" },
    { id: 5, name: "Cierres Metálicos", category: "Accesorios", price: 1.2, stock: 2000, unit: "unid" },
  ]);

  const [orders, setOrders] = useState<PurchaseOrder[]>([
    {
      id: "OC-001",
      client: "Textiles del Norte S.A.",
      date: "2024-01-15",
      amount: 2500.0,
      status: "aprobada",
      items: ["Algodón Pima", "Hilo de Poliéster"],
    },
    {
      id: "OC-002",
      client: "Confecciones Andinas",
      date: "2024-01-18",
      amount: 1800.0,
      status: "pendiente",
      items: ["Tinte Índigo", "Botones de Madera"],
    },
    {
      id: "OC-003",
      client: "Tejidos del Sur",
      date: "2024-01-20",
      amount: 3200.0,
      status: "enviada",
      items: ["Cierres Metálicos", "Algodón Pima"],
    },
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "1", number: "F001-0001", client: "Textiles del Norte S.A.", date: "2024-01-15", amount: 2500.0, status: "pagada" },
    { id: "2", number: "F001-0002", client: "Confecciones Andinas", date: "2024-01-18", amount: 1800.0, status: "emitida" },
    { id: "3", number: "F001-0003", client: "Tejidos del Sur", date: "2024-01-20", amount: 3200.0, status: "vencida" },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    unit: "unid",
  });

  const [newOrder, setNewOrder] = useState({
    client: "",
    items: "",
    amount: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const totalRevenue = invoices
    .filter((inv) => inv.status === "pagada")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingAmount = invoices
    .filter((inv) => inv.status !== "pagada")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const lowStockProducts = products.filter((p) => p.stock < 100);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      const product: Product = {
        id: products.length + 1,
        name: newProduct.name,
        category: newProduct.category || "General",
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock) || 0,
        unit: newProduct.unit,
      };
      setProducts([...products, product]);
      setNewProduct({ name: "", category: "", price: "", stock: "", unit: "unid" });
    }
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOrder.client && newOrder.amount) {
      const order: PurchaseOrder = {
        id: `OC-${String(orders.length + 1).padStart(3, "0")}`,
        client: newOrder.client,
        date: new Date().toISOString().split("T")[0],
        amount: parseFloat(newOrder.amount),
        status: "pendiente",
        items: newOrder.items.split(",").map((item) => item.trim()).filter(Boolean),
      };
      setOrders([order, ...orders]);
      setNewOrder({ client: "", items: "", amount: "" });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pendiente: { label: "Pendiente", className: "bg-amber-100 text-amber-800" },
      aprobada: { label: "Aprobada", className: "bg-emerald-100 text-emerald-800" },
      enviada: { label: "Enviada", className: "bg-blue-100 text-blue-800" },
      entregada: { label: "Entregada", className: "bg-teal-100 text-teal-800" },
      emitida: { label: "Emitida", className: "bg-blue-100 text-blue-800" },
      pagada: { label: "Pagada", className: "bg-emerald-100 text-emerald-800" },
      vencida: { label: "Vencida", className: "bg-red-100 text-red-800" },
    };
    const config = statusMap[status] || { label: status, className: "bg-gray-100 text-gray-800" };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50">
      <header className="bg-teal-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-400 p-2 rounded-lg">
              <Scissors className="h-6 w-6 text-teal-900" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold">TextilPro</h1>
              <p className="text-teal-200 text-xs">Panel de Proveedor</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{userEmail}</p>
              <p className="text-teal-300 text-xs">Proveedor Verificado</p>
            </div>
            <Button
              variant="outline"
              className="border-teal-600 text-teal-100 hover:bg-teal-800"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-white/80 backdrop-blur">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Productos
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Órdenes
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Facturas
            </TabsTrigger>
            <TabsTrigger value="collections" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Cobranza
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-white shadow-md border-teal-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-teal-700 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Ingresos Totales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-teal-900">S/ {totalRevenue.toFixed(2)}</p>
                  <p className="text-sm text-emerald-600 mt-1">+12% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-teal-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-teal-700 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Por Cobrar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-amber-600">S/ {pendingAmount.toFixed(2)}</p>
                  <p className="text-sm text-amber-600 mt-1">3 facturas pendientes</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-teal-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-teal-700 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Stock Bajo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-600">{lowStockProducts.length}</p>
                  <p className="text-sm text-red-600 mt-1">Productos por reabastecer</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-md border-teal-100">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-teal-900">
                    Órdenes Recientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-teal-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-teal-900">{order.client}</p>
                          <p className="text-sm text-teal-600">
                            {order.id} · {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-teal-900">S/ {order.amount.toFixed(2)}</p>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-teal-100">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-teal-900">
                    Alertas de Stock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowStockProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-amber-900">{product.name}</p>
                          <p className="text-sm text-amber-700">{product.category}</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          {product.stock} {product.unit}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white shadow-md border-teal-100 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-teal-900">
                    Catálogo de Productos
                  </CardTitle>
                  <CardDescription>Gestiona tu inventario de insumos textiles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                    <Input
                      placeholder="Buscar productos..."
                      className="pl-10 border-teal-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-teal-100">
                          <th className="text-left py-2 px-3 text-teal-700">Producto</th>
                          <th className="text-left py-2 px-3 text-teal-700">Categoría</th>
                          <th className="text-right py-2 px-3 text-teal-700">Precio</th>
                          <th className="text-right py-2 px-3 text-teal-700">Stock</th>
                          <th className="text-right py-2 px-3 text-teal-700">Unidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b border-teal-50 hover:bg-teal-50/50">
                            <td className="py-3 px-3 font-medium text-teal-900">{product.name}</td>
                            <td className="py-3 px-3 text-teal-700">{product.category}</td>
                            <td className="py-3 px-3 text-right text-teal-900">
                              S/ {product.price.toFixed(2)}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <Badge
                                className={
                                  product.stock < 100
                                    ? "bg-red-100 text-red-800"
                                    : "bg-emerald-100 text-emerald-800"
                                }
                              >
                                {product.stock}
                              </Badge>
                            </td>
                            <td className="py-3 px-3 text-right text-teal-700">{product.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-teal-100">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-teal-900 flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Nuevo Producto
                  </CardTitle>
                  <CardDescription>Agrega un nuevo insumo a tu catálogo</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-name" className="text-teal-900">
                        Nombre del Producto
                      </Label>
                      <Input
                        id="product-name"
                        placeholder="Ej: Algodón Orgánico"
                        className="border-teal-200"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-category" className="text-teal-900">
                        Categoría
                      </Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) =>
                          setNewProduct({ ...newProduct, category: value })
                        }
                      >
                        <SelectTrigger className="border-teal-200">
                          <SelectValue placeholder="Selecciona categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Telas">Telas</SelectItem>
                          <SelectItem value="Hilos">Hilos</SelectItem>
                          <SelectItem value="Tintes">Tintes</SelectItem>
                          <SelectItem value="Accesorios">Accesorios</SelectItem>
                          <SelectItem value="Maquinaria">Maquinaria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-price" className="text-teal-900">
                          Precio (S/)
                        </Label>
                        <Input
                          id="product-price"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="border-teal-200"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-stock" className="text-teal-900">
                          Stock
                        </Label>
                        <Input
                          id="product-stock"
                          type="number"
                          placeholder="0"
                          className="border-teal-200"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, stock: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-unit" className="text-teal-900">
                        Unidad de Medida
                      </Label>
                      <Select
                        value={newProduct.unit}
                        onValueChange={(value) =>
                          setNewProduct({ ...newProduct, unit: value })
                        }
                      >
                        <SelectTrigger className="border-teal-200">
                          <SelectValue placeholder="Selecciona unidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unid">Unidades</SelectItem>
                          <SelectItem value="m">Metros</SelectItem>
                          <SelectItem value="kg">Kilogramos</SelectItem>
                          <SelectItem value="lt">Litros</SelectItem>
                          <SelectItem value="rollo">Rollos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Producto
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white shadow-md border-teal-100 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-teal-900">
                    Órdenes de Compra
                  </CardTitle>
                  <CardDescription>Gestiona las órdenes recibidas de tus clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 bg-teal-50 rounded-lg border border-teal-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-teal-900">{order.client}</p>
                            <p className="text-sm text-teal-600">
                              {order.id} · {order.date}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {order.items.map((item, idx) => (
                              <Badge key={idx} className="bg-white text-teal-700 border border-teal-200">
                                {item}
                              </Badge>
                            ))}
                          </div>
                          <p className="font-bold text-teal-900">S/ {order.amount.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-teal-100">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-teal-900 flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Nueva Orden
                  </CardTitle>
                  <CardDescription>Registra una nueva orden de compra</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateOrder} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="order-client" className="text-teal-900">
                        Cliente
                      </Label>
                      <Input
                        id="order-client"
                        placeholder="Nombre de la empresa"
                        className="border-teal-200"
                        value={newOrder.client}
                        onChange={(e) =>
                          setNewOrder({ ...newOrder, client: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="order-items" className="text-teal-900">
                        Productos (separados por coma)
                      </Label>
                      <Textarea
                        id="order-items"
                        placeholder="Algodón Pima, Hilo de Poliéster"
                        className="border-teal-200"
                        value={newOrder.items}
                        onChange={(e) =>
                          setNewOrder({ ...newOrder, items: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="order-amount" className="text-teal-900">
                        Monto Total (S/)
                      </Label>
                      <Input
                        id="order-amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="border-teal-200"
                        value={newOrder.amount}
                        onChange={(e) =>
                          setNewOrder({ ...newOrder, amount: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Orden
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invoices">
            <Card className="bg-white shadow-md border-teal-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-serif text-teal-900">
                      Facturación
                    </CardTitle>
                    <CardDescription>Emite y gestiona tus facturas electrónicas</CardDescription>
                  </div>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Factura
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-teal-100">
                        <th className="text-left py-2 px-3 text-teal-700">N° Factura</th>
                        <th className="text-left py-2 px-3 text-teal-700">Cliente</th>
                        <th className="text-left py-2 px-3 text-teal-700">Fecha</th>
                        <th className="text-right py-2 px-3 text-teal-700">Monto</th>
                        <th className="text-left py-2 px-3 text-teal-700">Estado</th>
                        <th className="text-right py-2 px-3 text-teal-700">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-teal-50 hover:bg-teal-50/50">
                          <td className="py-3 px-3 font-medium text-teal-900">{invoice.number}</td>
                          <td className="py-3 px-3 text-teal-700">{invoice.client}</td>
                          <td className="py-3 px-3 text-teal-700">{invoice.date}</td>
                          <td className="py-3 px-3 text-right text-teal-900">
                            S/ {invoice.amount.toFixed(2)}
                          </td>
                          <td className="py-3 px-3">{getStatusBadge(invoice.status)}</td>
                          <td className="py-3 px-3">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" className="border-teal-200 text-teal-700">
                                <Printer className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="border-teal-200 text-teal-700">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collections">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-white shadow-md border-teal-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-teal-700 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Cobrado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-emerald-600">S/ {totalRevenue.toFixed(2)}</p>
                  <p className="text-sm text-emerald-600 mt-1">
                    {invoices.filter((i) => i.status === "pagada").length} facturas pagadas
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-teal-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-teal-700 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Pendiente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-amber-600">S/ {pendingAmount.toFixed(2)}</p>
                  <p className="text-sm text-amber-600 mt-1">
                    {invoices.filter((i) => i.status === "emitida").length} facturas por cobrar
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-teal-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-teal-700 flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    Vencido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-600">
                    S/{" "}
                    {invoices
                      .filter((i) => i.status === "vencida")
                      .reduce((sum, i) => sum + i.amount, 0)
                      .toFixed(2)}
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    {invoices.filter((i) => i.status === "vencida").length} facturas vencidas
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-md border-teal-100">
              <CardHeader>
                <CardTitle className="text-lg font-serif text-teal-900">
                  Detalle de Cobranza
                </CardTitle>
                <CardDescription>Control de pagos y facturas pendientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 bg-teal-50 rounded-lg border border-teal-100"
                    >
                      <div>
                        <p className="font-medium text-teal-900">{invoice.client}</p>
                        <p className="text-sm text-teal-600">
                          {invoice.number} · {invoice.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold text-teal-900">S/ {invoice.amount.toFixed(2)}</p>
                        {getStatusBadge(invoice.status)}
                        {invoice.status !== "pagada" && (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => {
                              setInvoices(
                                invoices.map((inv) =>
                                  inv.id === invoice.id ? { ...inv, status: "pagada" } : inv
                                )
                              );
                            }}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Registrar Pago
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

import { Scissors } from "lucide-react";