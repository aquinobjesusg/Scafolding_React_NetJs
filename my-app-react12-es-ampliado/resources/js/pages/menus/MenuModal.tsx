import React, { useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import IconSelect from '@/components/ui/icon-select';
import PermissionSelect from '@/components/ui/permission-select';

interface MenuItem {
    id: number;
    title: string;
    route: string;
    icon: string;
    parent_id: number | null;
    permission_name: string | null;
}

interface MenuModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    menu?: MenuItem | null;
    parentMenus: { id: number; title: string }[];
    permissions: string[];
}

export default function MenuModal({ open, onOpenChange, menu, parentMenus, permissions }: MenuModalProps) {
    const isEdit = !!menu;

    const { data, setData, processing, errors, reset } = useForm({
        title: menu?.title || '',
        route: menu?.route || '',
        icon: menu?.icon || '',
        parent_id: menu?.parent_id ?? null,
        permission_name: menu?.permission_name || '',
    });

    useEffect(() => {
        if (menu) {
        setData({
            title: menu.title || '',
            route: menu.route || '',
            icon: menu.icon || '',
            parent_id: menu.parent_id ?? null,
            permission_name: menu.permission_name || '',
        });
        } else {
        reset();
        }
    }, [menu]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
        onSuccess: () => {
            toast.success(isEdit ? 'Menú actualizado correctamente.' : 'Menú creado correctamente.');
            onOpenChange(false);
            reset();
        },
        onError: () => {
            toast.error(isEdit ? 'Error al actualizar el menú' : 'Error al crear el menú');
        },
        };

        if (isEdit) {
        router.put(`/menus/${menu.id}`, data, options);
        } else {
        router.post('/menus', data, options);
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
        <DialogContent className="sm:max-w-3xl sm:rounded-lg w-full rounded-2xl">
            <DialogHeader>
            <DialogTitle>{isEdit ? 'Editar Menú' : 'Añadir Menú'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                <Label htmlFor="title">Título del Menú *</Label>
                <Input
                    id="title"
                    placeholder="Ejemplo: Dashboard"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                <Label htmlFor="route">Ruta</Label>
                <Input
                    id="route"
                    placeholder="Ejemplo: /dashboard"
                    value={data.route}
                    onChange={(e) => setData('route', e.target.value)}
                    className={errors.route ? 'border-red-500' : ''}
                />
                {errors.route && <p className="text-sm text-red-500">{errors.route}</p>}
                </div>

                <div className="space-y-2">
                <Label htmlFor="icon">Icono (Lucide)</Label>
                <IconSelect value={data.icon} onChange={(val) => setData('icon', val)} />
                {errors.icon && <p className="text-sm text-red-500">{errors.icon}</p>}
                </div>

                <div className="space-y-2">
                <Label htmlFor="parent_id">Menú Padre</Label>
                <select
                    id="parent_id"
                    value={data.parent_id ?? ''}
                    onChange={(e) =>
                    setData('parent_id', e.target.value === '' ? null : Number(e.target.value))
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">— Ninguno —</option>
                    {parentMenus.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.title}
                    </option>
                    ))}
                </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                <Label htmlFor="permission_name">Permiso</Label>
                <PermissionSelect
                    value={data.permission_name || ''}
                    onChange={(val) => setData('permission_name', val)}
                    options={permissions}
                />
                {errors.permission_name && (
                    <p className="text-sm text-red-500">{errors.permission_name}</p>
                )}
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
    );
}
