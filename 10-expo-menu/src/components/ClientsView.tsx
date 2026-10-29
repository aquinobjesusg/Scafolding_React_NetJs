import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Mail, Pencil, Phone, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "Activo" | "Inactivo";
}

const INITIAL: Client[] = [
  { id: 1, name: "María González", email: "maria@acme.com", phone: "+34 612 345 678", company: "Acme S.L.", status: "Activo" },
  { id: 2, name: "Carlos Ruiz", email: "carlos@globex.io", phone: "+34 698 765 432", company: "Globex", status: "Activo" },
  { id: 3, name: "Ana Torres", email: "ana@initech.dev", phone: "+34 655 111 222", company: "Initech", status: "Inactivo" },
  { id: 4, name: "Javier López", email: "javier@umbrella.co", phone: "+34 677 888 999", company: "Umbrella", status: "Activo" },
];

const EMPTY: Omit<Client, "id"> = { name: "", email: "", phone: "", company: "", status: "Activo" };

export function ClientsView() {
  const [clients, setClients] = useState<Client[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState<Omit<Client, "id">>(EMPTY);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = (c: Client) => {
    setEditing(c);
    setForm({ name: c.name, email: c.email, phone: c.phone, company: c.company, status: c.status });
    setOpen(true);
  };

  const save = () => {
    if (!form.name || !form.email) return;
    if (editing) {
      setClients((prev) => prev.map((c) => (c.id === editing.id ? { ...form, id: editing.id } : c)));
    } else {
      setClients((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setOpen(false);
  };

  const remove = (id: number) => setClients((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clientes</h1>
          <p className="text-muted-foreground mt-1">Administra tu cartera de clientes</p>
        </div>
        <Button onClick={openNew} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20">
          <Plus className="h-4 w-4 mr-2" /> Nuevo cliente
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: clients.length, color: "text-indigo-600" },
          { label: "Activos", value: clients.filter((c) => c.status === "Activo").length, color: "text-emerald-600" },
          { label: "Inactivos", value: clients.filter((c) => c.status === "Inactivo").length, color: "text-amber-600" },
          { label: "Empresas", value: new Set(clients.map((c) => c.company)).size, color: "text-teal-600" },
        ].map((s) => (
          <Card key={s.label} className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {clients.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">No hay clientes registrados</p>
              <p className="text-sm text-muted-foreground">Añade tu primer cliente para comenzar</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {clients.map((c) => (
                <div key={c.id} className="flex flex-wrap items-center gap-4 p-4 hover:bg-slate-50 transition">
                  <div className="h-11 w-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-40">
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.company}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-sm text-slate-600 min-w-48">
                    <Mail className="h-4 w-4 text-slate-400" /> {c.email}
                  </div>
                  <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600 min-w-40">
                    <Phone className="h-4 w-4 text-slate-400" /> {c.phone}
                  </div>
                  <Badge
                    className={
                      c.status === "Activo"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                    }
                  >
                    {c.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
                      <Pencil className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(c.id)}>
                      <Trash2 className="h-4 w-4 text-rose-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar cliente" : "Nuevo cliente"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nombre completo</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej. María González" />
            </div>
            <div className="space-y-2">
              <Label>Correo electrónico</Label>
              <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="correo@empresa.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+34 ..." />
              </div>
              <div className="space-y-2">
                <Label>Empresa</Label>
                <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Empresa" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <div className="flex gap-2">
                {(["Activo", "Inactivo"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm({ ...form, status: s })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                      form.status === s
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {editing ? "Guardar cambios" : "Crear cliente"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}