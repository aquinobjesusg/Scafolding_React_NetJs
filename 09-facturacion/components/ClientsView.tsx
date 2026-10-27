import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, UserPlus, Mail, Phone, MapPin } from "lucide-react";
import { useBillingStore } from "@/lib/store";

export default function ClientsView() {
  const { clients, addClient, removeClient } = useBillingStore();
  const [form, setForm] = useState({ name: "", ruc: "", address: "", email: "", phone: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.ruc) return;
    addClient(form);
    setForm({ name: "", ruc: "", address: "", email: "", phone: "" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-2 border-sky-100 shadow-sm">
        <CardHeader className="bg-sky-50 rounded-t-xl border-b border-sky-100">
          <CardTitle className="flex items-center gap-2 text-sky-900">
            <UserPlus className="h-5 w-5" /> Nuevo cliente
          </CardTitle>
          <CardDescription>Registra los datos fiscales del cliente</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label>Razón social</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Empresa S.A." />
            </div>
            <div className="space-y-2">
              <Label>RUC / Cédula</Label>
              <Input value={form.ruc} onChange={(e) => setForm({ ...form, ruc: e.target.value })} placeholder="1790012345001" />
            </div>
            <div className="space-y-2">
              <Label>Dirección</Label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Av. Principal 123" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="correo@empresa.ec" />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="02-1234567" />
              </div>
            </div>
            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
              Guardar cliente
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="lg:col-span-3 space-y-4">
        {clients.length === 0 && (
          <Card className="border-dashed border-sky-200 bg-white">
            <CardContent className="py-16 text-center text-slate-500">
              No hay clientes registrados todavía.
            </CardContent>
          </Card>
        )}
        {clients.map((c) => (
          <Card key={c.id} className="border-sky-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-white font-bold">
                  {c.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-slate-900">{c.name}</div>
                  <div className="text-xs font-mono text-slate-500">RUC: {c.ruc}</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 pt-1">
                    {c.address && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-sky-600" />{c.address}</span>}
                    {c.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5 text-sky-600" />{c.email}</span>}
                    {c.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5 text-sky-600" />{c.phone}</span>}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeClient(c.id)} className="text-slate-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}