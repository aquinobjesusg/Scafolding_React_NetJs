import React, { JSX, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import MenuModal from '@/pages/menus/MenuModal';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableMenuItem from '@/pages/menus/SortableMenuItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Edit, Trash2, Plus, Save, ChevronDown, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface MenuItem {
  id: number;
  title: string;
  route: string;
  icon: string;
  parent_id: number | null;
  permission_name: string | null;
  order: number;
  children?: MenuItem[];
}

interface Props {
  menuItems: MenuItem[];
  parentMenus: { id: number; title: string }[];
  permissions: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de menús',
    href: '/menus',
  },
];

export default function MenuIndex({ menuItems, parentMenus, permissions }: Props) {
  const [menus, setMenus] = useState<MenuItem[]>(menuItems);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);

  // Sincronizar el estado local cuando menuItems cambie desde el servidor
  React.useEffect(() => {
    setMenus(menuItems);
  }, [menuItems]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = menus.findIndex((m) => m.id === Number(active.id));
    const newIndex = menus.findIndex((m) => m.id === Number(over.id));

    setMenus((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  const handleChildDragEnd = (parentId: number) => (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setMenus((prevMenus) =>
      prevMenus.map((menu) => {
        if (menu.id !== parentId || !menu.children) return menu;

        const oldIndex = menu.children.findIndex((m) => m.id === Number(active.id));
        const newIndex = menu.children.findIndex((m) => m.id === Number(over.id));
        if (oldIndex === -1 || newIndex === -1) return menu;

        const newChildren = arrayMove(menu.children, oldIndex, newIndex);
        return { ...menu, children: newChildren };
      })
    );
  };

  const handleSave = () => {
    setIsSaving(true);

    const buildOrderPayload = (items: MenuItem[]): any[] => {
      return items.map((item, index) => ({
        id: item.id,
        order: index + 1,
        children: item.children ? buildOrderPayload(item.children) : [],
      }));
    };

    router.post('/menus/reorder', { menus: buildOrderPayload(menus) }, {
      onSuccess: () => toast.success('Orden del menú se ha guardado correctamente.'),
      onError: () => toast.error('No se pudo guardar el orden del menú.'),
      onFinish: () => setIsSaving(false),
    });
  };

  const openCreateModal = () => {
    setSelectedMenu(null);
    setIsModalOpen(true);
  };

  const openEditModal = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    router.delete(`/menus/${id}`, {
      onSuccess: () => {
        toast.success('Menú eliminado correctamente.');
      },
      onError: () => toast.error('No se pudo eliminar el menú.'),
    });
  };

  function renderMenuList(items: MenuItem[], level: number = 0): JSX.Element[] {
    const levelIndentMap = ['ml-0', 'ml-4', 'ml-8', 'ml-12', 'ml-16', 'ml-20'];

    return items.map((menu) => {
      const hasChildren = menu.children && menu.children.length > 0;
      const isExpanded = expandedIds.includes(menu.id);
      const indentClass = levelIndentMap[level] || 'ml-20';

      return (
        <div key={menu.id}>
          <div
            className={`flex items-center justify-between rounded-lg border bg-background px-4 py-3 shadow-sm hover:shadow transition-shadow ${indentClass}`}
          >
            <div className="flex items-center gap-2 flex-1">
              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(menu.id)}
                  className="text-muted-foreground hover:text-primary transition"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <span className="w-4" />
              )}

              <SortableMenuItem id={menu.id.toString()} title={menu.title} />
            </div>

            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-primary"
                onClick={() => openEditModal(menu)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar este menú?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esto eliminará permanentemente el menú "{menu.title}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(menu.id)}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {hasChildren && isExpanded && (
            <div className="mt-1">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleChildDragEnd(menu.id)}
              >
                <SortableContext
                  items={menu.children!.map((c) => c.id.toString())}
                  strategy={verticalListSortingStrategy}
                >
                  {renderMenuList(menu.children!, level + 1)}
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gestión de menús" />

      <div className="flex-1 p-4 md:p-6">
        <Card className="w-full">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Gestión de menús
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Arrastra y suelta para reordenar los menús principales y submenús
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Guardando...' : 'Guardar orden'}
                </Button>
                <Button onClick={openCreateModal}>
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir menú
                </Button>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            {menus.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No hay menús disponibles
                </p>
                <Button onClick={openCreateModal}>
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir primer menú
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={menus.map((m) => m.id.toString())}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {renderMenuList(menus)}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <MenuModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        menu={selectedMenu}
        parentMenus={parentMenus}
        permissions={permissions}
      />
    </AppLayout>
  );
}
