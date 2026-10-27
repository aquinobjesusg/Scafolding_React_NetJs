import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, UserPlus } from "lucide-react";
import { useAuthStore, type UserRole } from "@/lib/store";

const ROLES: UserRole[] = ["Administrador", "Facturador", "Contador"];

const roleStyles: Record<UserRole, string> = {
  Administrador: "bg-sky-100 text-sky-800",
  Facturador: "bg-cyan-100 text-cyan-800",
  Contador: "bg-slate-200 text-slate-700",
};

export default function UsersView() {
  const { users, addUser, removeUser, currentUser } = useAuthStore();
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    role: "Facturador" as UserRole,
  });
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.username || !form.password) {
      setError("Completa nombre, usuario y contraseña");
      return;
    }
    const res = addUser(form);
    if (!res.ok) {
      setError(res.error ?? "No se pudo crear el usuario");
      return;
    }
    setForm({ name: "", username: "", password: "", email: "", role: "Facturador" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-2 border-sky-100 shadow-sm h-fit">
        <CardHeader className="bg-sky-50 rounded-t-xl border-b border-sky-100">
          <CardTitle className="flex items-center gap-2 text-sky-900">
            <UserPlus className="h-5 w-5" /> Nuevo usuario
          </CardTitle>
          <CardDescription>Crea accesos para tu equipo</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre completo</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="María Pérez" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Usuario</Label>
                <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="mperez" />
              </div>
              <div className="space-y-2">
                <Label>Contraseña</Label>
                <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="correo@nucleo.ec" />
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as UserRole })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
              Crear usuario
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 border-sky-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">Usuarios del sistema</CardTitle>
          <CardDescription>{users.length} usuarios registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-sky-50">
                <TableHead>Nombre</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id} className="hover:bg-sky-50/60">
                  <TableCell>
                    <div className="font-medium text-slate-800">{u.name}</div>
                    <div className="text-xs text-slate-500">{u.email || "—"}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-600">{u.username}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={roleStyles[u.role]}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={u.id === currentUser?.id}
                      onClick={() => removeUser(u.id)}
                      className="text-slate-400 hover:text-red-600 disabled:opacity-30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}