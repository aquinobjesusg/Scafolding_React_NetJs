import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { ShieldCheck, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import RoleModal from './RoleModal';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de roles',
    href: '/roles',
  },
];

interface Permission {
  id: number;
  name: string;
  group: string;
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

interface Props {
  roles: Role[];
  groupedPermissions: Record<string, Permission[]>;
}

export default function RoleIndex({ roles, groupedPermissions }: Props) {
  const { delete: destroy, processing } = useForm();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);

  const handleDelete = (id: number) => {
    destroy(`/roles/${id}`, {
      onSuccess: () => toast.success('Rol eliminado correctamente.'),
      onError: () => toast.error('Error al eliminar el rol'),
    });
  };

  const openCreateModal = () => {
    setSelectedRole(null);
    setModalOpen(true);
  };

  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gestión de roles" />
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gestión de roles</h1>
            <p className="text-muted-foreground">
              Gestiona los roles y permisos para el sistema
            </p>
          </div>
          <Button className="w-full md:w-auto" size="sm" onClick={openCreateModal}>
            <Plus className="h-4 w-4" />
            Añadir Rol
          </Button>
        </div>

        <div className="space-y-4">
          {roles.length === 0 && (
            <Card>
              <CardContent className="py-6 text-center text-muted-foreground">
                No hay datos de roles disponibles.
              </CardContent>
            </Card>
          )}

          {roles.map((role) => (
            <Card key={role.id} className="border shadow-sm">
              <CardHeader className="bg-muted/40 border-b flex flex-row md:items-center justify-between md:justify-between md:space-y-0 space-y-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    {role.name}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {role.permissions.length} permiso
                    {role.permissions.length > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-end md:justify-start">
                  <Button size="sm" variant="outline" onClick={() => openEditModal(role)}>
                    <Edit className="h-4 w-4" />
                    <span className='hidden sm:inline'>Editar</span>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className='hidden sm:inline'>Eliminar</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          El rol <strong>{role.name}</strong> será eliminado permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(role.id)}
                          disabled={processing}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Sí, Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>

              {role.permissions.length > 0 && (
                <CardContent className="pt-4">
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    Permisos asignados:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <Badge
                        key={permission.id}
                        variant="outline"
                        className="font-normal text-xs border-muted"
                      >
                        {permission.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Role Modal */}
      <RoleModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        role={selectedRole}
        groupedPermissions={groupedPermissions}
      />
    </AppLayout>
  );
}
