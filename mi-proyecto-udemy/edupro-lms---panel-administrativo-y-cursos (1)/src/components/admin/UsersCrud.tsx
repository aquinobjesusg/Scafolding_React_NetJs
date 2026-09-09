import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, UserRole } from '../../types';
import { CrudTable, ColumnDef } from './CrudTable';
import { 
  UserCheck, 
  UserX, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  Mail, 
  Calendar,
  X
} from 'lucide-react';

export const UsersCrud: React.FC = () => {
  const { users, roles, addUser, updateUser, deleteUser, toggleUserStatus, currentUser } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [status, setStatus] = useState<'Activo' | 'Inactivo'>('Activo');

  const openAddModal = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setRole('STUDENT');
    setStatus('Activo');
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status === 'Suspendido' ? 'Inactivo' : user.status);
    setIsModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('Por favor completa los campos requeridos.');
      return;
    }

    if (editingUser) {
      updateUser(editingUser.id, {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        status,
      });
    } else {
      addUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        status,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        enrolledCourses: [],
      });
    }
    setIsModalOpen(false);
  };

  const columns: ColumnDef<User>[] = [
    {
      header: 'Usuario',
      accessor: 'name',
      sortable: true,
      render: (_, u) => (
        <div className="flex items-center gap-3">
          <img
            src={u.avatar}
            alt={u.name}
            className="h-8 w-8 rounded-xl object-cover ring-1 ring-gray-200"
          />
          <div>
            <div className="font-bold text-gray-900">{u.name}</div>
            <div className="text-[11px] text-gray-400">{u.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Rol Asignado',
      accessor: 'role',
      sortable: true,
      render: (role) => {
        const colors: Record<string, string> = {
          ADMIN: 'bg-rose-100 text-rose-800 border-rose-200',
          INSTRUCTOR: 'bg-amber-100 text-amber-800 border-amber-200',
          EDITOR: 'bg-blue-100 text-blue-800 border-blue-200',
          STUDENT: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold border ${
              colors[role] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {role === 'ADMIN' && <ShieldCheck className="h-3 w-3" />}
            {role}
          </span>
        );
      },
    },
    {
      header: 'Estado',
      accessor: 'status',
      sortable: true,
      render: (status, u) => (
        <button
          onClick={() => toggleUserStatus(u.id)}
          title="Click para cambiar estado"
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all ${
            status === 'Activo'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              status === 'Activo' ? 'bg-emerald-500' : 'bg-gray-400'
            }`}
          />
          {status}
        </button>
      ),
    },
    {
      header: 'Fecha Registro',
      accessor: 'createdAt',
      sortable: true,
      render: (date) => (
        <span className="text-gray-500 text-xs font-mono">{date}</span>
      ),
    },
    {
      header: 'Último Acceso',
      accessor: 'lastLogin',
      sortable: true,
      render: (lastLogin) => (
        <span className="text-gray-500 text-xs">{lastLogin || 'Nunca'}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <CrudTable<User>
        title="Gestión de Usuarios y Accesos"
        subtitle="Administra cuentas, roles asignados, estados y exporta el padrón completo a Excel."
        data={users}
        columns={columns}
        searchPlaceholder="Buscar por nombre, correo o rol..."
        searchFields={['name', 'email', 'role', 'status']}
        onAdd={openAddModal}
        addLabel="Nuevo Usuario"
        excelFileName="reporte_usuarios_registrados"
        excelColumns={[
          { header: 'ID', key: 'id' },
          { header: 'Nombre Completo', key: 'name' },
          { header: 'Correo Electrónico', key: 'email' },
          { header: 'Rol', key: 'role' },
          { header: 'Estado', key: 'status' },
          { header: 'Fecha de Registro', key: 'createdAt' },
          { header: 'Último Inicio de Sesión', key: 'lastLogin' },
        ]}
        actions={(user) => (
          <div className="flex items-center gap-1">
            <button
              onClick={() => openEditModal(user)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              title="Editar usuario"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => {
                if (confirm(`¿Estás seguro de eliminar el usuario ${user.name}?`)) {
                  deleteUser(user.id);
                }
              }}
              disabled={user.id === currentUser?.id}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 transition-colors"
              title="Eliminar usuario"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      />

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-5 py-4">
              <h3 className="text-sm font-bold text-gray-900">
                {editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                  placeholder="ej. Mariana Rios"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                  placeholder="ej. mariana@correo.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Rol de Usuario
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-white"
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.code}>
                        {r.name} ({r.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Estado de la Cuenta
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Activo' | 'Inactivo')}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-white"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
                >
                  {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
