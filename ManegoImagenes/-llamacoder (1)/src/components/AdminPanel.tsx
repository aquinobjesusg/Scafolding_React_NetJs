import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Stethoscope,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
  ImagePlus,
  X,
  Check,
  LayoutDashboard,
  ClipboardList,
  Upload,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

interface AdminPanelProps {
  user: { name: string; email: string; provider: string } | null;
  onLogout: () => void;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Estetoscopio Profesional",
    description: "Estetoscopio de alta precisión con tubo de doble lumen y campana de acero inoxidable.",
    price: 89.99,
    category: "Diagnóstico",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=300&fit=crop",
    stock: 15,
  },
  {
    id: 2,
    name: "Tensiómetro Digital",
    description: "Monitor de presión arterial digital con brazalete ajustable y pantalla LCD.",
    price: 45.5,
    category: "Monitoreo",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop",
    stock: 8,
  },
  {
    id: 3,
    name: "Termómetro Infrarrojo",
    description: "Termómetro sin contacto con medición instantánea y alarma de fiebre.",
    price: 29.99,
    category: "Diagnóstico",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=300&fit=crop",
    stock: 25,
  },
];

export function AdminPanel({ user, onLogout }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: newProduct.name,
                description: newProduct.description,
                price: parseFloat(newProduct.price),
                category: newProduct.category,
                image: newProduct.image || p.image,
                stock: parseInt(newProduct.stock),
              }
            : p
        )
      );
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          name: newProduct.name,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          category: newProduct.category,
          image: newProduct.image || "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=400&h=300&fit=crop",
          stock: parseInt(newProduct.stock),
        },
      ]);
    }
    setShowForm(false);
    setEditingProduct(null);
    setNewProduct({ name: "", description: "", price: "", category: "", image: "", stock: "" });
    setPreviewImage(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      stock: product.stock.toString(),
    });
    setPreviewImage(product.image);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    setNewProduct({ name: "", description: "", price: "", category: "", image: "", stock: "" });
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-teal-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-teal-600 flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-teal-900">Administracion de Productos</h1>
                <p className="text-xs text-teal-600">Panel de Administración</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-teal-900">{user?.name}</p>
                <p className="text-xs text-teal-600">{user?.email}</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-teal-200">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                <AvatarFallback className="bg-teal-100 text-teal-700">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                className="border-teal-200 text-teal-700 hover:bg-teal-50"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur border-teal-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-teal-600">Total Productos</p>
                  <p className="text-3xl font-bold text-teal-900">{products.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-teal-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-teal-600">Stock Total</p>
                  <p className="text-3xl font-bold text-teal-900">
                    {products.reduce((acc, p) => acc + p.stock, 0)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <ClipboardList className="h-6 w-6 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-teal-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-teal-600">Valor Inventario</p>
                  <p className="text-3xl font-bold text-teal-900">
                    ${products.reduce((acc, p) => acc + p.price * p.stock, 0).toFixed(2)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <LayoutDashboard className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-500" />
            <Input
              placeholder="Buscar productos..."
              className="pl-10 bg-white border-teal-200 focus:border-teal-500 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              setShowForm(true);
              setEditingProduct(null);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>

        {/* Product Form */}
        {showForm && (
          <Card className="mb-6 bg-white/90 backdrop-blur border-teal-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-teal-900">
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
              </CardTitle>
              <CardDescription className="text-teal-600">
                Complete la información del producto médico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-name" className="text-teal-900">Nombre del producto</Label>
                      <Input
                        id="product-name"
                        placeholder="Ej: Estetoscopio Profesional"
                        className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-category" className="text-teal-900">Categoría</Label>
                      <Input
                        id="product-category"
                        placeholder="Ej: Diagnóstico"
                        className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-price" className="text-teal-900">Precio ($)</Label>
                        <Input
                          id="product-price"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-stock" className="text-teal-900">Stock</Label>
                        <Input
                          id="product-stock"
                          type="number"
                          placeholder="0"
                          className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-description" className="text-teal-900">Descripción</Label>
                      <Textarea
                        id="product-description"
                        placeholder="Describe el producto médico..."
                        className="border-teal-200 focus:border-teal-500 focus:ring-teal-500 min-h-[100px]"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-teal-900">Imagen del producto</Label>
                    <div className="border-2 border-dashed border-teal-200 rounded-xl p-6 text-center hover:border-teal-400 transition-colors">
                      {previewImage ? (
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewImage(null);
                              setNewProduct({ ...newProduct, image: "" });
                            }}
                            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <Upload className="h-12 w-12 text-teal-400 mx-auto mb-2" />
                          <p className="text-sm text-teal-600 mb-1">Haga clic para subir imagen</p>
                          <p className="text-xs text-teal-400">PNG, JPG o GIF</p>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700">
                        <Check className="h-4 w-4 mr-2" />
                        {editingProduct ? "Guardar Cambios" : "Crear Producto"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-teal-200 text-teal-700 hover:bg-teal-50"
                        onClick={handleCancel}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-white/90 backdrop-blur border-teal-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-teal-600 text-white">
                    {product.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-teal-900 text-lg">{product.name}</h3>
                    <span className="text-lg font-bold text-teal-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-teal-700/70 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-teal-600">
                      Stock: <span className="font-semibold">{product.stock}</span>
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-teal-200 text-teal-700 hover:bg-teal-50"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white/80 backdrop-blur border-teal-100">
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-teal-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-teal-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-teal-600 mb-6">
                {searchTerm
                  ? "Intente con otro término de búsqueda"
                  : "Agregue su primer producto médico"}
              </p>
              {!searchTerm && (
                <Button
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Producto
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}