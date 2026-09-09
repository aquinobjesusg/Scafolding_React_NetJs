import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from '@/types'
import { router, useForm } from "@inertiajs/react"
import { Save } from "lucide-react"
import React from "react"
import { toast } from "sonner"

interface Role {
    id: number;
    name: string;
}

interface UserModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user?: User | null;
    roles: Role[];
    currentRole?: string;
}


export default function UserModal({ open, onOpenChange, user, roles = [], currentRole }: UserModalProps) {
    const isEdit = !!user;

    const { data, setData, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        role: currentRole || '',
    });

    React.useEffect(() => {
        if (user) {
            setData({
                name: user.name,
                email: user.email,
                password: '',
                role: user.roles[0]?.name || '',
            });
        } else {
            setData({
                name: '',
                email: '',
                password: '',
                role: '',
            })
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role
        };

        const options = {
            onSuccess: () => {
                /* toast.success(isEdit ? 'Usuario actualizado con éxito' : 'Usuario creado con éxito'); */
                onOpenChange(false);
                reset();
            },
            onError: () => {
                toast.error('Error al procesar el usuario');
            },
        };

        if (isEdit) {
            router.put(`/users/${user.id}`, payload, options);
        } else {
            router.post('/users', payload, options);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            reset();
        }
        onOpenChange(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-2xl sm:rounded-lg w-full rounded-2xl">
                <DialogHeader>
                    <DialogTitle>{isEdit ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={errors.name ? 'border-red-500' : ''}
                            placeholder="Nombre completo"
                        />
                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={errors.email ? 'border-red-500' : ''}
                            placeholder="Correo electrónico"
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña {isEdit ? '(Opcional)' : ''}</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={errors.password ? 'border-red-500' : ''}
                            placeholder={isEdit ? 'Dejar en blanco para mantener la contraseña actual' : '••••••••'}
                        />
                        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                        <Label htmlFor="role">Rol</Label>
                        <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar rol..." />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role.id} value={role.name}>
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
                    </div>

                    <DialogFooter className="flex justify-between sm:justify-between">
                        <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancelar</Button>
                        <Button type="submit" disabled={processing} >
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? (isEdit ? 'Guardando...' : 'Añadiendo...') : isEdit ? 'Guardar Cambios' : 'Añadir'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}