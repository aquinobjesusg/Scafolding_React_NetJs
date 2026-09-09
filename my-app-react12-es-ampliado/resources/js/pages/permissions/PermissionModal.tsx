import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Permission } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface PermissionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    permission?: Permission | null;
    groups: string[];
}

export default function PermissionModal({ open, onOpenChange, permission, groups = [] }: PermissionModalProps) {
    const isEdit = !!permission;

    const { data, setData, processing, errors, reset } = useForm({
        name: permission?.name || '',
        group: permission?.group || '',
        newGroup: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name: data.name,
            group: data.newGroup.trim() !== '' ? data.newGroup.trim() : data.group,
        };

        const options = {
            onSuccess: () => {
                /* toast.success(isEdit ? 'Permiso actualizado con éxito' : 'Permiso creado con éxito'); */
                onOpenChange(false);
                reset();
            },
            onError: () => {
                toast.error('Error al procesar el permiso');
            },
        };

        if (isEdit) {
            router.put(`/permissions/${permission.id}`, payload, options);
        } else {
            router.post('/permissions', payload, options);
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
                    <DialogTitle>{isEdit ? 'Editar Permiso' : 'Añadir Permiso'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Permission Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre del Permiso</Label>
                        <Input
                            id="name"
                            placeholder="ejemplo: manage-users"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    {/* Select Group */}
                    <div className="space-y-2">
                        <Label htmlFor="group">Seleccionar Grupo</Label>
                        <Select value={data.group || ''} onValueChange={(val) => setData('group', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar grupo..." />
                            </SelectTrigger>
                            <SelectContent>
                                {groups.map((group) => (
                                    <SelectItem key={group} value={group}>
                                        {group}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.group && <p className="text-sm text-red-500">{errors.group}</p>}
                    </div>

                    {/* New Group */}
                    <div className="space-y-2">
                        <Label htmlFor="newGroup">O escribir un grupo nuevo</Label>
                        <Input
                            id="newGroup"
                            placeholder="ejemplo: Tender / Article / User"
                            value={data.newGroup}
                            onChange={(e) => setData('newGroup', e.target.value)}
                        />
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
