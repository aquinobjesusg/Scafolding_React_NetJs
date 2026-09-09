import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, } from '@/components/ui/alert-dialog';
import { type BreadcrumbItem, type User } from '@/types';
import { Plus, Edit, Trash2, RotateCcw } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import UserModal from './UserModal';

dayjs.extend(relativeTime);
dayjs.locale('es');

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de usuarios',
    href: '/users',
  },
];

interface Role {
  id: number;
  name: string;
}

interface Props {
  users: {
    data: User[];
    current_page: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
  };
  roles: Role[];
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function UserIndex({ users, roles }: Props) {
  const { delete: destroy, processing } = useForm();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleDelete = (id: number) => {
    destroy(`/users/${id}`);
  };

  const handleResetPassword = (id: number) => {
    router.put(`/users/${id}/reset-password`, {}, { preserveScroll: true });
  };

  const openCreateModal = () => {
    setSelectedUser(null);
    setModalOpen(true);
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gestión de usuarios" />
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gestión de usuarios</h1>
            <p className="text-muted-foreground">Gestiona los datos de los usuarios y sus roles dentro del sistema.</p>
          </div>
          <Button className="w-full md:w-auto" size="sm" onClick={openCreateModal}>
            <Plus className="h-4 w-4 mr-2" />
            Añadir Usuario
          </Button>
        </div>

        <div className="space-y-2 divide-y rounded-md border bg-background">
          {users.data.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No hay datos de usuarios disponibles.</div>
          ) : (
            users.data.map((user) => (
              <div
                key={user.id}
                className="flex flex-row md:items-center justify-between gap-4 px-4 py-5 hover:bg-muted/50 transition"
              >
                {/* Avatar e información */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-lg font-semibold text-primary">
                    {getInitials(user.name)}
                  </div>
                  <div className="space-y-1">
                    <div className="text-base font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                    <div className="text-xs text-muted-foreground italic">
                      Registrado {dayjs(user.created_at).locale('es').fromNow()}
                    </div>
                    {user.roles.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <Badge key={role.id} variant="secondary" className="text-xs font-normal">
                            {role.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap gap-2 justify-end md:justify-start">
                  <Button size="sm" variant="outline" onClick={() => openEditModal(user)}>
                    <Edit className="h-4 w-4" />
                    <span className='hidden sm:inline'>Editar</span>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="secondary">
                        <RotateCcw className="h-4 w-4" />
                        <span className='hidden sm:inline'>Restablecer</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Restablecer contraseña?</AlertDialogTitle>
                        <AlertDialogDescription>
                          La contraseña de <strong>{user.name}</strong> se restablecerá a:
                          <br />
                          <code className="bg-muted rounded px-2 py-1 text-sm">password</code>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleResetPassword(user.id)}
                          disabled={processing}
                        >
                          Sí, Restablecer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className='hidden sm:inline'>Eliminar</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
                        <AlertDialogDescription>
                          El usuario <strong>{user.name}</strong> será eliminado permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(user.id)}
                          disabled={processing}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Sí, Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* User Modal */}
      <UserModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        user={selectedUser}
        roles={roles}
        currentRole={selectedUser?.roles[0]?.name}
      />
    </AppLayout>
  );
}
