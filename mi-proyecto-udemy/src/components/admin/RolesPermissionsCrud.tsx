import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Permission, Role, UserRole } from '../../types';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  FileSpreadsheet, 
  KeyRound, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { exportToExcel } from '../../utils/excelExport';

export const RolesPermissionsCrud: React.FC = () => {
  const { roles, permissions, addRole, updateRole, deleteRole } = useAuth();

  const [selectedRoleId, setSelectedRoleId] = useState<string>(roles[0]?.id || 'r1');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  // Form states
  const [roleName, setRoleName] = useState('');
  const [roleCode, setRoleCode] = useState<UserRole>('EDITOR');
  const [roleDesc, setRoleDesc] = useState('');

  const selectedRole = roles.find((r) => r.id === selectedRoleId) || roles[0];

  const handleTogglePermission = (permissionCode: string) => {
    if (!selectedRole) return;
    if (selectedRole.code === 'ADMIN') {
      alert('El rol Super Administrador tiene todos los permisos por defecto.');
      return;
    }

    const currentPerms = selectedRole.permissions;
    const exists = currentPerms.includes(permissionCode);
    const updated = exists
      ? currentPerms.filter((p) => p !== permissionCode)
      : [...currentPerms, permissionCode];

    updateRole(selectedRole.id, { permissions: updated });
  };

  const handleOpenAddRole = () => {
    setEditingRole(null);
    setRoleName('');
    setRoleCode('EDITOR');
    setRoleDesc('');
    setIsRoleModalOpen(true);
  };

  const handleOpenEditRole = (role: Role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setRoleCode(role.code);
    setRoleDesc(role.description);
    setIsRoleModalOpen(true);
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) return;

    if (editingRole) {
      updateRole(editingRole.id, {
        name: roleName.trim(),
        description: roleDesc.trim(),
      });
    } else {
      addRole({
        name: roleName.trim(),
        code: roleCode,
        description: roleDesc.trim(),
        permissions: ['courses.read'],
      });
    }
    setIsRoleModalOpen(false);
  };

  const handleExportRolesExcel = () => {
    const rows = roles.map((r) => ({
      ID: r.id,
      Nombre: r.name,
      Código: r.code,
      UsuariosAsignados: r.userCount,
      EsSistema: r.isSystem ? 'Sí' : 'No',
      Permisos: r.permissions.join(', '),
      Descripción: r.description,
    }));

    exportToExcel(
      rows,
      [
        { header: 'ID', key: 'ID' },
        { header: 'Nombre del Rol', key: 'Nombre' },
        { header: 'Código', key: 'Código' },
        { header: 'Usuarios Asignados', key: 'UsuariosAsignados' },
        { header: 'Rol de Sistema', key: 'EsSistema' },
        { header: 'Permisos Habilitados', key: 'Permisos' },
        { header: 'Descripción', key: 'Descripción' },
      ],
      'reporte_roles_y_permisos',
      'Roles'
    );
  };

  // Group permissions by Category
  const categories = Array.from(new Set(permissions.map((p) => p.category)));

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            Roles de Usuario y Matriz de Permisos
          </h2>
          <p className="text-xs text-gray-500">
            Define perfiles de acceso y ajusta granularmente qué acciones puede ejecutar cada rol.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-export-roles-excel"
            onClick={handleExportRolesExcel}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            <span>Exportar Matriz a Excel</span>
          </button>
          <button
            id="btn-add-custom-role"
            onClick={handleOpenAddRole}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Rol</span>
          </button>
        </div>
      </div>

      {/* Main 2-column layout: Roles list & Permissions Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Role Cards */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 px-1">
            Roles Definidos ({roles.length})
          </h3>

          <div className="space-y-2">
            {roles.map((role) => {
              const isSelected = selectedRole?.id === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`group relative cursor-pointer rounded-2xl border p-4 transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                          role.code === 'ADMIN'
                            ? 'bg-rose-100 text-rose-700'
                            : role.code === 'INSTRUCTOR'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{role.name}</h4>
                        <span className="text-[10px] font-mono text-gray-400">
                          code: {role.code}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {!role.isSystem && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditRole(role);
                            }}
                            className="text-gray-400 hover:text-indigo-600 p-1"
                            title="Editar rol"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`¿Eliminar rol ${role.name}?`)) {
                                deleteRole(role.id);
                              }
                            }}
                            className="text-gray-400 hover:text-rose-600 p-1"
                            title="Eliminar rol"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                    {role.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 text-[11px] text-gray-500">
                    <span>
                      <strong className="text-gray-800">{role.userCount}</strong> usuarios asignados
                    </span>
                    <span className="font-semibold text-indigo-600">
                      {role.code === 'ADMIN' ? 'Todos' : `${role.permissions.length} permisos`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2-cols: Permissions Matrix for selected role */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900">
                  Permisos para: <span className="text-indigo-600">{selectedRole?.name}</span>
                </h3>
                {selectedRole?.isSystem && (
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600">
                    Rol del Sistema
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Haz clic en cada permiso para habilitar o restringir el acceso para este perfil.
              </p>
            </div>

            <div className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
              Total activos: <strong className="text-indigo-600 font-bold">{selectedRole?.code === 'ADMIN' ? '12/12' : `${selectedRole?.permissions.length}/${permissions.length}`}</strong>
            </div>
          </div>

          {selectedRole?.code === 'ADMIN' && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800 border border-amber-200">
              <Info className="h-4 w-4 shrink-0 text-amber-600" />
              <span>
                El Super Administrador posee permisos universales irrestrictos sobre todos los módulos del sistema por seguridad.
              </span>
            </div>
          )}

          {/* Categories and permissions */}
          <div className="space-y-5">
            {categories.map((category) => {
              const categoryPermissions = permissions.filter((p) => p.category === category);

              return (
                <div key={category} className="rounded-xl border border-gray-100 bg-gray-50/40 p-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                    <KeyRound className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Módulo de {category}</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {categoryPermissions.map((perm) => {
                      const isGranted =
                        selectedRole?.code === 'ADMIN' ||
                        selectedRole?.permissions.includes(perm.code);

                      return (
                        <div
                          key={perm.id}
                          onClick={() => handleTogglePermission(perm.code)}
                          className={`flex items-start gap-2.5 rounded-xl border p-2.5 cursor-pointer transition-all select-none ${
                            isGranted
                              ? 'border-indigo-200 bg-white shadow-2xs'
                              : 'border-transparent bg-transparent hover:bg-white/80 opacity-60'
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded transition-colors ${
                              isGranted
                                ? 'bg-indigo-600 text-white'
                                : 'border border-gray-300 bg-white'
                            }`}
                          >
                            {isGranted && <Check className="h-3 w-3" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-gray-900">
                                {perm.name}
                              </span>
                              <span className="font-mono text-[9px] text-gray-400">
                                {perm.code}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                              {perm.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Role Add/Edit Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-5 py-4">
              <h3 className="text-sm font-bold text-gray-900">
                {editingRole ? 'Editar Rol' : 'Crear Nuevo Rol'}
              </h3>
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRole} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nombre del Rol
                </label>
                <input
                  type="text"
                  required
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                  placeholder="ej. Coordinador Pedagógico"
                />
              </div>

              {!editingRole && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Código Base de Permisos
                  </label>
                  <select
                    value={roleCode}
                    onChange={(e) => setRoleCode(e.target.value as UserRole)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-white"
                  >
                    <option value="EDITOR">EDITOR (Edición de contenidos)</option>
                    <option value="INSTRUCTOR">INSTRUCTOR (Creación de cursos)</option>
                    <option value="STUDENT">STUDENT (Consumo de clases)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Descripción del Perfil
                </label>
                <textarea
                  rows={3}
                  value={roleDesc}
                  onChange={(e) => setRoleDesc(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                  placeholder="Explica qué funciones cumple este rol..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsRoleModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
                >
                  {editingRole ? 'Guardar Cambios' : 'Crear Rol'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
