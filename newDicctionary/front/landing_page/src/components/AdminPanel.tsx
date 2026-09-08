'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Globe, Plus, Pencil, Trash2, FileSpreadsheet, FileText, LogOut, Search } from "lucide-react";
import type { View, AuthMode } from "@/App";
import { exportToExcel, exportToPDF } from "@/lib/export-utils";

interface ProductType {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  language: string;
  level: string;
  price: number;
  typeId: string;
}

const initialTypes: ProductType[] = [
  { id: "t1", name: "Curso completo" },
  { id: "t2", name: "Tutoría 1:1" },
  { id: "t3", name: "Pack de lecciones" },
  { id: "t4", name: "Certificación" },
];

const initialProducts: Product[] = [
  { id: "p1", name: "Español A1-B2", language: "Español", level: "A1-B2", price: 49, typeId: "t1" },
  { id: "p2", name: "Inglés conversacional", language: "Inglés", level: "B1-C1", price: 79, typeId: "t2" },
  { id: "p3", name: "Francés intensivo", language: "Francés", level: "A2-B2", price: 99, typeId: "t3" },
  { id: "p4", name: "Japonés para viajes", language: "Japonés", level: "A1", price: 29, typeId: "t3" },
  { id: "p5", name: "DELE C2", language: "Español", level: "C2", price: 149, typeId: "t4" },
];

type Tab = "products" | "types";

interface Props {
  onNavigate: (view: View, mode?: AuthMode) => void;
}

export function AdminPanel({ onNavigate }: Props) {
  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [types, setTypes] = useState<ProductType[]>(initialTypes);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", language: "", level: "", price: "", typeId: "" });

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.language.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", language: "", level: "", price: "", typeId: types[0]?.id || "" });
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, language: p.language, level: p.level, price: String(p.price), typeId: p.typeId });
    setDialogOpen(true);
  };

  const save = () => {
    if (!form.name || !form.language || !form.price || !form.typeId) return;
    if (editing) {
      setProducts(products.map(p => p.id === editing.id ? {
        ...p, name: form.name, language: form.language, level: form.level, price: Number(form.price), typeId: form.typeId
      } : p));
    } else {
      setProducts([...products, {
        id: `p${Date.now()}`, name: form.name, language: form.language, level: form.level, price: Number(form.price), typeId: form.typeId
      }]);
    }
    setDialogOpen(false);
  };

  const remove = (id: string) => setProducts(products.filter(p => p.id !== id));

  const getTypeName = (typeId: string) => types.find(t => t.id === typeId)?.name || "—";

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 text-slate-300 flex flex-col p-4 shrink-0">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="font-serif font-bold text-white leading-tight">Lingua</p>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>
        <nav className="space-y-1 flex-1">
          <button
            onClick={() => setTab("products")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "products" ? "bg-teal-600 text-white" : "hover:bg-slate-800"}`}
          >
            Productos
          </button>
          <button
            onClick={() => setTab("types")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "types" ? "bg-teal-600 text-white" : "hover:bg-slate-800"}`}
          >
            Tipos de producto
          </button>
        </nav>
        <Button variant="ghost" onClick={() => onNavigate("landing")} className="text-slate-400 hover:text-white hover:bg-slate-800 justify-start">
          <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
        </Button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-2xl font-bold text-slate-900">
                {tab === "products" ? "Gestión de productos" : "Tipos de producto"}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {tab === "products" ? `${products.length} productos registrados` : `${types.length} categorías definidas`}
              </p>
            </div>
            {tab === "products" && (
              <div className="flex gap-2">
                <Button variant="outline" className="border-slate-300 bg-white hover:bg-slate-50" onClick={() => exportToExcel(filtered, types)}>
                  <FileSpreadsheet className="w-4 h-4 mr-2 text-emerald-600" /> Excel
                </Button>
                <Button variant="outline" className="border-slate-300 bg-white hover:bg-slate-50" onClick={() => exportToPDF(filtered, types)}>
                  <FileText className="w-4 h-4 mr-2 text-rose-600" /> PDF
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={openCreate}>
                  <Plus className="w-4 h-4 mr-1" /> Nuevo
                </Button>
              </div>
            )}
          </div>

          {tab === "products" ? (
            <Card className="shadow-sm border-slate-200 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <div className="relative max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input placeholder="Buscar producto..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-white" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="text-left font-semibold px-4 py-3">Producto</th>
                      <th className="text-left font-semibold px-4 py-3">Idioma</th>
                      <th className="text-left font-semibold px-4 py-3">Nivel</th>
                      <th className="text-left font-semibold px-4 py-3">Tipo</th>
                      <th className="text-right font-semibold px-4 py-3">Precio</th>
                      <th className="text-right font-semibold px-4 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-800">{p.name}</td>
                        <td className="px-4 py-3 text-slate-600">{p.language}</td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 text-xs font-medium">{p.level}</span></td>
                        <td className="px-4 py-3 text-slate-600">{getTypeName(p.typeId)}</td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-800">${p.price}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-teal-700 hover:bg-teal-50" onClick={() => openEdit(p)}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-rose-600 hover:bg-rose-50" onClick={() => remove(p.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-400">No se encontraron productos.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <Card className="shadow-sm border-slate-200 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="text-left font-semibold px-4 py-3">Nombre del tipo</th>
                      <th className="text-left font-semibold px-4 py-3">Productos asociados</th>
                      <th className="text-right font-semibold px-4 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {types.map(t => (
                      <tr key={t.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-800">{t.name}</td>
                        <td className="px-4 py-3 text-slate-600">{products.filter(p => p.typeId === t.id).length}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-rose-600 hover:bg-rose-50" onClick={() => setTypes(types.filter(x => x.id !== t.id))}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-2">
                  <Input
                    placeholder="Nuevo tipo de producto..."
                    className="max-w-xs bg-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        setTypes([...types, { id: `t${Date.now()}`, name: e.currentTarget.value }]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="border-slate-300 bg-white"
                    onClick={(e) => {
                      const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                      if (input?.value) {
                        setTypes([...types, { id: `t${Date.now()}`, name: input.value }]);
                        input.value = "";
                      }
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Añadir
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar producto" : "Nuevo producto"}</DialogTitle>
            <DialogDescription>Completa los datos del producto de idioma.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Nombre</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej: Inglés intermedio" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Idioma</Label>
                <Input value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} placeholder="Inglés" />
              </div>
              <div className="space-y-1.5">
                <Label>Nivel</Label>
                <Input value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} placeholder="B1-C1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Precio (USD)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="49" />
              </div>
              <div className="space-y-1.5">
                <Label>Tipo de producto</Label>
                <Select value={form.typeId} onValueChange={(v) => setForm({ ...form, typeId: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                  <SelectContent>
                    {types.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={save}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}