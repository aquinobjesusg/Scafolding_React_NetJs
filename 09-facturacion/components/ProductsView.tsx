import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, PackagePlus } from "lucide-react";
import { useBillingStore, currency } from "@/lib/store";

export default function ProductsView() {
  const { products, addProduct, removeProduct } = useBillingStore();
  const [form, setForm] = useState({ code: "", name: "", price: "", taxRate: "15" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    addProduct({
      code: form.code || "GEN-000",
      name: form.name,
      price: parseFloat(form.price),
      taxRate: parseFloat(form.taxRate),
    });
    setForm({ code: "", name: "", price: "", taxRate: "15" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-2 border-sky-100 shadow-sm h-fit">
        <CardHeader className="bg-sky-50 rounded-t-xl border-b border-sky-100">
          <CardTitle className="flex items-center gap-2 text-sky-900">
            <PackagePlus className="h-5 w-5" /> Nuevo producto
          </CardTitle>
          <CardDescription>Catálogo de bienes y servicios</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label>Código</Label>
              <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="SRV-001" />
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nombre del producto" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Precio (USD)</Label>
                <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>IVA (%)</Label>
                <Input type="number" value={form.taxRate} onChange={(e) => setForm({ ...form, taxRate: e.target.value })} />
              </div>
            </div>
            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
              Guardar producto
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 border-sky-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">Catálogo</CardTitle>
          <CardDescription>{products.length} productos registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-sky-50">
                <TableHead>Código</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-center">IVA</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id} className="hover:bg-sky-50/60">
                  <TableCell className="font-mono text-xs text-slate-500">{p.code}</TableCell>
                  <TableCell className="font-medium text-slate-800">{p.name}</TableCell>
                  <TableCell className="text-right font-semibold">{currency(p.price)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-sky-100 text-sky-800">{p.taxRate}%</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => removeProduct(p.id)} className="text-slate-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-slate-500">
                    Sin productos registrados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}