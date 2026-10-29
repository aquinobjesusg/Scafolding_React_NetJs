import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, FileText, Download } from "lucide-react";

interface Invoice {
  id: number;
  number: string;
  client: string;
  amount: number;
  date: string;
  status: "Pagada" | "Pendiente" | "Vencida";
}

const CLIENTS = ["María González", "Carlos Ruiz", "Ana Torres", "Javier López"];

const INITIAL: Invoice[] = [
  { id: 1, number: "FAC-2025-001", client: "María González", amount: 1250, date: "2025-01-15", status: "Pagada" },
  { id: 2, number: "FAC-2025-002", client: "Carlos Ruiz", amount: 890, date: "2025-01-22", status: "Pendiente" },
  { id: 3, number: "FAC-2025-003", client: "Ana Torres", amount: 2340, date: "2025-02-03", status: "Vencida" },
  { id: 4, number: "FAC-2025-004", client: "Javier López", amount: 560, date: "2025-02-10", status: "Pagada" },
];

const EMPTY: Omit<Invoice, "id"> = {
  number: "",
  client: CLIENTS[0],
  amount: 0,
  date: new Date().toISOString().slice(0, 10),
  status: "Pendiente",
};

const statusStyle: Record<Invoice["status"], string> = {
  Pagada: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  Pendiente: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  Vencida: "bg-rose-100 text-rose-700 hover:bg-rose-100",
};

export function InvoicesView() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Invoice | null>(null);
  const [form, setForm] = useState<Omit<Invoice, "id">>(EMPTY);

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY, number: `FAC-2025-${String(invoices.length + 1).padStart(3, "0")}` });
    setOpen(true);
  };

  const openEdit = (i: Invoice) => {
    setEditing(i);
    setForm({ number: i.number, client: i.client, amount: i.amount, date: i.date, status: i.status });
    setOpen(true);
  };

  const save = () => {
    if (!form.number || form.amount <= 0) return;
    if (editing) {
      setInvoices((prev) => prev.map((i) => (i.id === editing.id ? { ...form, id: editing.id } : i)));
    } else {
      setInvoices((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setOpen(false);
  };

  const remove = (id: number) => setInvoices((prev) => prev.filter((i) => i.id !== id));

  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices.filter((i) => i.status === "Pagada").reduce((s, i) => s + i.amount, 0);
  const pending = invoices.filter((i) => i.status !== "Pagada").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Facturas</h1>
          <p className="text-muted-foreground mt-1">Gestiona la facturación de tus clientes</p>
        </div>
        <Button onClick={openNew} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20">
          <Plus className="h-4 w-4 mr-2" /> Nueva factura
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="rounded-2xl border-slate-200 shadow-sm bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
          <CardContent className="p-5">
            <p className="text-indigo-100 text-xs uppercase tracking-wide">Total facturado</p>
            <p className="text-3xl font-bold mt-1">€{total.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">Cobrado</p>
            <p className="text-3xl font-bold mt-1 text-emerald-600">€{paid.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">Pendiente</p>
            <p className="text-3xl font-bold mt-1 text-amber-600">€{pending.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {invoices.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">No hay facturas</p>
              <p className="text-sm text-muted-foreground">Crea tu primera factura</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {invoices.map((i) => (
                <div key={i.id} className="flex flex-wrap items-center gap-4 p-4 hover:bg-slate-50 transition">
                  <div className="h-11 w-11 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-40">
                    <p className="font-semibold text-slate-900">{i.number}</p>
                    <p className="text-sm text-muted-foreground">{i.client}</p>
                  </div>
                  <div className="text-sm text-slate-600 min-w-24">{i.date}</div>
                  <div className="font-bold text-slate-900 min-w-24">€{i.amount.toLocaleString()}</div>
                  <Badge className={statusStyle[i.status]}>{i.status}</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(i)}>
                      <Pencil className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(i.id)}>
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
            <DialogTitle>{editing ? "Editar factura" : "Nueva factura"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Número de factura</Label>
              <Input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Select value={form.client} onValueChange={(v) => setForm({ ...form, client: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CLIENTS.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Importe (€)</Label>
                <Input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Invoice["status"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pagada">Pagada</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Vencida">Vencida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {editing ? "Guardar cambios" : "Crear factura"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}