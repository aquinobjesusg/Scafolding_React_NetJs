import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Mail, Save, ShieldCheck, User as UserIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  user: { name: string; email: string; role: string };
  onUpdate: (u: { name: string; email: string; role: string }) => void;
}

export function ProfileView({ user, onUpdate }: Props) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState("Administrador de la plataforma Expo. Encargado de la gestión de clientes y facturación.");
  const [saved, setSaved] = useState(false);

  const save = () => {
    onUpdate({ ...user, name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Perfil de usuario</h1>
        <p className="text-muted-foreground mt-1">Administra tu información personal y preferencias</p>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500" />
        <CardContent className="p-6 -mt-12">
          <div className="flex flex-wrap items-end gap-4">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-40 pb-1">
              <h2 className="text-xl font-bold text-slate-900">{name}</h2>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 mb-1">
              <ShieldCheck className="h-3 w-3 mr-1" /> {user.role}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Información personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre completo</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input value={name} onChange={(e) => setName(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Biografía</Label>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button onClick={save} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
                <Save className="h-4 w-4 mr-2" /> Guardar cambios
              </Button>
              {saved && <span className="text-sm text-emerald-600 font-medium">✓ Cambios guardados</span>}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Seguridad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">Contraseña</p>
              <p className="text-xs text-muted-foreground mt-1">Última actualización hace 30 días</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">Cambiar contraseña</Button>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
              <p className="text-sm font-semibold text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> 2FA activado
              </p>
              <p className="text-xs text-emerald-700 mt-1">Tu cuenta está protegida</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}