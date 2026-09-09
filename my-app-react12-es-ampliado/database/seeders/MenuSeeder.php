<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // MENU: Dashboard
        Menu::create([
            'title' => 'Información',
            'icon' => 'Home',
            'route' => '/dashboard',
            'order' => 1,
            'permission_name' => 'dashboard-view',
        ]);

        // MENU: Estadisticas
        Menu::create([
            'title' => 'Estadisticas',
            'icon' => 'Home',
            'route' => '/estadisticas',
            'order' => 1,
            'permission_name' => 'dashboard-view',
        ]);

        // MENU: Estadisticas Generales
        Menu::create([
            'title' => 'Generales',
            'icon' => 'Home',
            'route' => '/general',
            'order' => 1,
            'permission_name' => 'dashboard-view',
        ]);
        
        
        // GROUP: Access
        $access = Menu::create([
            'title' => 'Acceso',
            'icon' => 'Contact',
            'route' => '#',
            'order' => 2,
            'permission_name' => 'access-view',
        ]);

        Menu::create([
            'title' => 'Permisos',
            'icon' => 'AlertOctagon',
            'route' => '/permissions',
            'order' => 2,
            'permission_name' => 'permission-view',
            'parent_id' => $access->id,
        ]);

        Menu::create([
            'title' => 'Usuarios',
            'icon' => 'Users',
            'route' => '/users',
            'order' => 3,
            'permission_name' => 'users-view',
            'parent_id' => $access->id,
        ]);

        Menu::create([
            'title' => 'Roles',
            'icon' => 'AlertTriangle',
            'route' => '/roles',
            'order' => 4,
            'permission_name' => 'roles-view',
            'parent_id' => $access->id,
        ]);

        // GROUP: Settings
        $settings = Menu::create([
            'title' => 'Configuración',
            'icon' => 'Settings',
            'route' => '#',
            'order' => 3,
            'permission_name' => 'settings-view',
        ]);

        Menu::create([
            'title' => 'Gestión de menús',
            'icon' => 'Menu',
            'route' => '/menus',
            'order' => 1,
            'permission_name' => 'menu-view',
            'parent_id' => $settings->id,
        ]);

        Menu::create([
            'title' => 'Configuración de la App',
            'icon' => 'AtSign',
            'route' => '/settingsapp',
            'order' => 2,
            'permission_name' => 'app-settings-view',
            'parent_id' => $settings->id,
        ]);

        Menu::create([
            'title' => 'Backup',
            'icon' => 'Inbox',
            'route' => '/backup',
            'order' => 3,
            'permission_name' => 'backup-view',
            'parent_id' => $settings->id,
        ]);

        // GROUP: Utilities
        $utilities = Menu::create([
            'title' => 'Utilidades',
            'icon' => 'CreditCard',
            'route' => '#',
            'order' => 4,
            'permission_name' => 'utilities-view',
        ]);

        Menu::create([
            'title' => 'Registros de Auditoría',
            'icon' => 'Activity',
            'route' => '/audit-logs',
            'order' => 2,
            'permission_name' => 'log-view',
            'parent_id' => $utilities->id,
        ]);

        Menu::create([
            'title' => 'Gestor de Archivos',
            'icon' => 'Folder',
            'route' => '/files',
            'order' => 3,
            'permission_name' => 'filemanager-view',
            'parent_id' => $utilities->id,
        ]);
    }
}
