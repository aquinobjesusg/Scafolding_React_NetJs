import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

import { usePage, Link } from '@inertiajs/react';
import AppLogo from './app-logo';
import { NavUser } from '@/components/nav-user';
import { iconMapper } from '@/lib/iconMapper';
import type { LucideIcon } from 'lucide-react';
import { ChevronDown, ChevronRight, Minus, Plus } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

interface MenuItem {
  id: number;
  title: string;
  route: string | null;
  icon: string;
  children?: MenuItem[];
}

function RenderMenu({ 
  items, 
  level = 0, 
  currentUrl,
  expandedGroups,
  toggleGroup,
  isCollapsed 
}: { 
  items: MenuItem[]; 
  level?: number;
  currentUrl: string;
  expandedGroups: Set<number>;
  toggleGroup: (groupId: number) => void;
  isCollapsed: boolean;
}) {

  if (!Array.isArray(items)) return null;

  return (
    <>
      {items.map((menu) => {
        if (!menu) return null;
        const Icon = iconMapper(menu.icon || 'Folder') as LucideIcon;
        const children = Array.isArray(menu.children) ? menu.children.filter(Boolean) : [];
        const hasChildren = children.length > 0;
        // Mejorar detección de ruta activa
        const isActive = menu.route && (
          currentUrl === menu.route || 
          (menu.route !== '/' && currentUrl.startsWith(menu.route + '/')) ||
          (menu.route !== '/' && currentUrl.startsWith(menu.route))
        );
        // Solo aplicar indentación si el sidebar no está colapsado
        const indentClass = !isCollapsed && level > 0 ? `pl-${4 + level * 3}` : '';
        
        const activeClass = isActive
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground';

        if (!menu.route && !hasChildren) return null;

        // 🔥 Si tiene hijos, hacemos un collapsible
        if (hasChildren) {
          const isExpanded = expandedGroups.has(menu.id);
          // Verificar si algún hijo está activo para marcar el grupo padre
          const hasActiveChildMenu = children.some(child => 
            child.route && (
              currentUrl === child.route || 
              (child.route !== '/' && currentUrl.startsWith(child.route + '/')) ||
              (child.route !== '/' && currentUrl.startsWith(child.route))
            )
          );
          
          const groupActiveClass = (isActive || hasActiveChildMenu)
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground';
          
          return (
            <SidebarMenuItem key={menu.id}>
              <Collapsible 
                open={isExpanded}
                onOpenChange={() => toggleGroup(menu.id)}
              >
                <CollapsibleTrigger
                  className={cn(
                    "w-full group flex items-center rounded-md transition-colors",
                    !isCollapsed && "justify-between",
                    isCollapsed && "justify-center",
                    indentClass,
                    groupActiveClass,
                    level === 0 ? 'py-3 px-4 my-1' : 'py-2 px-3'
                  )}
                >
                  <div className="flex items-center">
                    <Icon className={cn(
                      "size-4 opacity-80 group-hover:opacity-100",
                      !isCollapsed && "mr-2"
                    )} />
                    {!isCollapsed && <span>{menu.title}</span>}
                  </div>

                  {/* flecha rotando */}
                  {!isCollapsed && (
                    <>
                      <ChevronRight className={cn(
                        "ml-auto transition-transform duration-200 size-4",
                        isExpanded ? "hidden" : "block"
                      )} />
                      <ChevronDown className={cn(
                        "ml-auto transition-transform duration-200 size-4", 
                        isExpanded ? "block" : "hidden"
                      )} />
                    </>
                  )}
                </CollapsibleTrigger>

                <CollapsibleContent className="transition-all duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0">
                  <SidebarMenu className="border-l border-muted pl-2">
                    <RenderMenu 
                      items={children} 
                      level={level + 1}
                      currentUrl={currentUrl}
                      expandedGroups={expandedGroups}
                      toggleGroup={toggleGroup}
                      isCollapsed={isCollapsed}
                    />
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          );
        }

        // 🔥 Item sin hijos
        return (
          <SidebarMenuItem key={menu.id}>
            <SidebarMenuButton 
              asChild 
              className={cn(
                "group flex items-center rounded-md transition-colors",
                isCollapsed ? "justify-center" : "justify-start",
                indentClass,
                activeClass,
                level === 0 ? 'py-3 px-4 my-1' : 'py-2 px-3'
              )}
            >
              <Link href={menu.route || '#'}>
                <Icon className={cn(
                  "size-4 opacity-80 group-hover:opacity-100",
                  !isCollapsed && "mr-2"
                )} />
                {!isCollapsed && <span>{menu.title}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
}

export function AppSidebar() {
  const { props, url: currentUrl } = usePage();
  const { menus = [] } = props as { menus?: MenuItem[] };
  const { state } = useSidebar();
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());
  
  const isCollapsed = state === 'collapsed';

  // Función para alternar grupos
  const toggleGroup = useCallback((groupId: number) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      
      // Guardar en localStorage para persistencia
      localStorage.setItem('sidebar-expanded-groups', JSON.stringify([...newSet]));
      return newSet;
    });
  }, []);

  // Función para verificar si un grupo contiene la ruta activa
  const hasActiveChild = useCallback((menuItem: MenuItem, url: string): boolean => {
    // Verificar si la ruta actual coincide exactamente o es una subruta
    if (menuItem.route) {
      if (url === menuItem.route || 
          (menuItem.route !== '/' && url.startsWith(menuItem.route + '/')) ||
          (menuItem.route !== '/' && url.startsWith(menuItem.route))) {
        return true;
      }
    }
    // Verificar recursivamente en los hijos
    if (menuItem.children && menuItem.children.length > 0) {
      return menuItem.children.some(child => hasActiveChild(child, url));
    }
    return false;
  }, []);

  // Inicializar estado desde localStorage y expandir grupos activos
  useEffect(() => {
    try {
      // Cargar grupos expandidos desde localStorage
      const saved = localStorage.getItem('sidebar-expanded-groups');
      let savedGroups = new Set<number>();
      
      if (saved) {
        const parsed = JSON.parse(saved);
        savedGroups = new Set(parsed);
      }

      // Encontrar grupos que contienen la ruta activa
      const activeGroups = new Set<number>();
      const checkActiveGroups = (items: MenuItem[]) => {
        items.forEach(item => {
          if (item.children && item.children.length > 0) {
            if (hasActiveChild(item, currentUrl || '')) {
              activeGroups.add(item.id);
            }
            checkActiveGroups(item.children);
          }
        });
      };
      
      checkActiveGroups(menus);
      
      // Combinar grupos guardados y grupos activos
      const finalExpandedGroups = new Set([...savedGroups, ...activeGroups]);
      setExpandedGroups(finalExpandedGroups);
      
      // Actualizar localStorage con la combinación final
      localStorage.setItem('sidebar-expanded-groups', JSON.stringify([...finalExpandedGroups]));
    } catch (error) {
      console.error('Error al cargar el estado del sidebar:', error);
    }
  }, [menus, currentUrl, hasActiveChild]);

  return (
    <Sidebar collapsible="icon" variant="inset" className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="px-4 py-3 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="default" asChild className="hover:bg-transparent">
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          <RenderMenu 
            items={menus} 
            currentUrl={currentUrl || ''}
            expandedGroups={expandedGroups}
            toggleGroup={toggleGroup}
            isCollapsed={isCollapsed}
          />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-4 py-3 border-t">
        <NavUser  />
      </SidebarFooter>
    </Sidebar>
  );
}