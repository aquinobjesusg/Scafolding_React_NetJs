import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { router, useForm } from "@inertiajs/react";
import { type Permission, type Role } from "@/types";
import { Save } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface RoleModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    role?: Role | null;
    groupedPermissions: Record<string, Permission[]>;
}

export default function RoleModal({ open, onOpenChange, role, groupedPermissions }: RoleModalProps) {
    const isEdit = !!role;

    const { data, setData, processing, errors, reset } = useForm({
        name: role?.name || '',
        permissions: role?.permissions?.map((p) => p.name) || [],
    });

    React.useEffect(() => {
        if (role) {
            setData({
                name: role.name,
                permissions: role.permissions?.map((p) => p.name) || [],
            });
        } else {
            setData({
                name: '',
                permissions: [],
            });
        }
    }, [role]);

    const togglePermission = (perm: string) => {
        setData('permissions', data.permissions.includes(perm)
            ? data.permissions.filter((p) => p !== perm)
            : [...data.permissions, perm]
        );
    };

    const toggleGroup = (group: string, perms: Permission[]) => {
        const allChecked = perms.every(perm => data.permissions.includes(perm.name));
        if (allChecked) {
            setData('permissions', data.permissions.filter(p => !perms.map(perm => perm.name).includes(p)));
        } else {
            const newPermissions = [...data.permissions];
            perms.forEach(perm => {
                if (!newPermissions.includes(perm.name)) {
                    newPermissions.push(perm.name);
                }
            });
            setData('permissions', newPermissions);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const payload = {
            name: data.name,
            permissions: data.permissions,
        };

        const options = {
            onSuccess: () => {
                toast.success(isEdit ? 'Rol actualizado correctamente.' : 'Rol creado correctamente.');
                onOpenChange(false);
                reset();
            },
            onError: () => {
                toast.error(isEdit ? 'Error al actualizar el rol' : 'Error al crear el rol');
            },
        };

        if (isEdit) {
            router.put(`/roles/${role?.id}`, payload, options);
        } else {
            router.post('/roles', payload, options);
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
                    <DialogTitle>{isEdit ? 'Editar Rol' : 'Crear Rol'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Role Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre del Rol</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Ingresa el nombre del rol"
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <Label className="text-lg font-semibold">Permisos</Label>
                            <p className="text-sm text-muted-foreground mt-1">
                                Selecciona los permisos para otorgar a este rol
                            </p>
                        </div>

                        <div className="max-h-96 overflow-y-auto space-y-4">
                            {Object.entries(groupedPermissions).map(([group, perms]) => {
                                const allChecked = perms.every(perm => data.permissions.includes(perm.name));

                                return (
                                    <div key={group} className="bg-muted/20 p-4 rounded-lg border">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Checkbox
                                                id={`group-${group}`}
                                                checked={allChecked}
                                                onCheckedChange={() => toggleGroup(group, perms)}
                                            />
                                            <Label 
                                                htmlFor={`group-${group}`}
                                                className="text-sm font-medium uppercase tracking-wider text-muted-foreground cursor-pointer"
                                            >
                                                {group}
                                            </Label>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pl-7">
                                            {perms.map((perm) => (
                                                <div key={perm.id} className="flex items-center gap-3">
                                                    <Checkbox
                                                        id={`perm-${perm.id}`}
                                                        checked={data.permissions.includes(perm.name)}
                                                        onCheckedChange={() => togglePermission(perm.name)}
                                                    />
                                                    <Label 
                                                        htmlFor={`perm-${perm.id}`}
                                                        className="text-sm cursor-pointer"
                                                    >
                                                        {perm.name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <DialogFooter className="flex justify-between sm:justify-between">
                        <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? (isEdit ? 'Guardando...' : 'Añadiendo...') : isEdit ? 'Guardar Cambios' : 'Añadir'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}