import React, { createContext, useContext, useState, useEffect } from 'react';
import { Permission, Role, User, UserRole } from '../types';
import { INITIAL_PERMISSIONS, INITIAL_ROLES, INITIAL_USERS } from '../mockData';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  roles: Role[];
  permissions: Permission[];
  isAuthenticated: boolean;
  login: (email: string, pass: string, rememberMe?: boolean) => { success: boolean; message: string };
  register: (name: string, email: string, pass: string, role?: UserRole) => { success: boolean; message: string };
  forgotPassword: (email: string) => { success: boolean; message: string; recoveryToken?: string };
  resetPassword: (email: string, newPass: string) => { success: boolean; message: string };
  logout: () => void;
  switchDemoAccount: (role: UserRole) => void;
  hasPermission: (code: string) => boolean;
  
  // User Management CRUD
  addUser: (user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
  
  // Roles Management CRUD
  addRole: (role: Omit<Role, 'id' | 'userCount'>) => void;
  updateRole: (id: string, updates: Partial<Role>) => void;
  deleteRole: (id: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load users from localStorage or default
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('edupro_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [roles, setRoles] = useState<Role[]>(() => {
    const saved = localStorage.getItem('edupro_roles');
    return saved ? JSON.parse(saved) : INITIAL_ROLES;
  });

  const [permissions] = useState<Permission[]>(INITIAL_PERMISSIONS);

  // Active logged-in user
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('edupro_current_user');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default to admin user for immediate seamless review
    return INITIAL_USERS[0];
  });

  useEffect(() => {
    localStorage.setItem('edupro_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('edupro_roles', JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('edupro_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('edupro_current_user');
    }
  }, [currentUser]);

  const login = (email: string, pass: string, rememberMe: boolean = true) => {
    const trimmedEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!user) {
      return { success: false, message: 'No existe una cuenta registrada con este correo electrónico.' };
    }

    if (user.status === 'Inactivo' || user.status === 'Suspendido') {
      return { success: false, message: `La cuenta se encuentra en estado "${user.status}". Contacta al administrador.` };
    }

    // Update lastLogin
    const updatedUser = {
      ...user,
      lastLogin: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    setCurrentUser(updatedUser);

    if (rememberMe) {
      localStorage.setItem('edupro_remember_email', trimmedEmail);
    } else {
      localStorage.removeItem('edupro_remember_email');
    }

    return { success: true, message: `¡Bienvenido/a de nuevo, ${user.name}!` };
  };

  const register = (name: string, email: string, pass: string, role: UserRole = 'STUDENT') => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!name.trim() || !trimmedEmail || !pass.trim()) {
      return { success: false, message: 'Todos los campos son obligatorios.' };
    }

    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, message: 'Ya existe un usuario registrado con este correo.' };
    }

    const newUser: User = {
      id: `u-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      role: role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      status: 'Activo',
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().replace('T', ' ').slice(0, 16),
      enrolledCourses: [],
    };

    const updatedList = [newUser, ...users];
    setUsers(updatedList);
    setCurrentUser(newUser);

    // Update user count on role
    setRoles((prev) =>
      prev.map((r) => (r.code === role ? { ...r, userCount: r.userCount + 1 } : r))
    );

    return { success: true, message: '¡Cuenta creada con éxito! Has iniciado sesión automáticamente.' };
  };

  const forgotPassword = (email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (!user) {
      return {
        success: false,
        message: 'No se encontró ninguna cuenta asociada a este correo electrónico.',
      };
    }

    const recoveryToken = Math.random().toString(36).substring(2, 8).toUpperCase();
    return {
      success: true,
      message: `Se ha generado un código de recuperación enviado a ${trimmedEmail}.`,
      recoveryToken,
    };
  };

  const resetPassword = (email: string, newPass: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (!user) {
      return { success: false, message: 'Usuario no encontrado.' };
    }

    return {
      success: true,
      message: 'Tu contraseña ha sido actualizada correctamente. Ya puedes iniciar sesión.',
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchDemoAccount = (role: UserRole) => {
    const candidate = users.find((u) => u.role === role && u.status === 'Activo') || users[0];
    setCurrentUser(candidate);
  };

  const hasPermission = (code: string): boolean => {
    if (!currentUser) return false;
    const userRoleObj = roles.find((r) => r.code === currentUser.role);
    if (!userRoleObj) return false;
    // Admin has all permissions
    if (currentUser.role === 'ADMIN') return true;
    return userRoleObj.permissions.includes(code);
  };

  // User CRUD operations
  const addUser = (userData: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => {
    const newUser: User = {
      ...userData,
      id: `u-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Nunca',
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
    );
    if (currentUser?.id === id) {
      setCurrentUser((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteUser = (id: string) => {
    if (currentUser?.id === id) {
      alert('No puedes eliminar tu propio usuario en sesión.');
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'Activo' ? 'Inactivo' : 'Activo';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  // Roles CRUD operations
  const addRole = (roleData: Omit<Role, 'id' | 'userCount'>) => {
    const newRole: Role = {
      ...roleData,
      id: `r-${Date.now()}`,
      userCount: 0,
      isSystem: false,
    };
    setRoles((prev) => [...prev, newRole]);
  };

  const updateRole = (id: string, updates: Partial<Role>) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  const deleteRole = (id: string): boolean => {
    const role = roles.find((r) => r.id === id);
    if (role?.isSystem) {
      alert('Los roles del sistema principales no pueden ser eliminados.');
      return false;
    }
    if (role && role.userCount > 0) {
      alert(`No se puede eliminar el rol "${role.name}" porque tiene ${role.userCount} usuario(s) asignados.`);
      return false;
    }
    setRoles((prev) => prev.filter((r) => r.id !== id));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        roles,
        permissions,
        isAuthenticated: !!currentUser,
        login,
        register,
        forgotPassword,
        resetPassword,
        logout,
        switchDemoAccount,
        hasPermission,
        addUser,
        updateUser,
        deleteUser,
        toggleUserStatus,
        addRole,
        updateRole,
        deleteRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
