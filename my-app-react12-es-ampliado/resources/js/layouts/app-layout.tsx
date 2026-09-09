import React from 'react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
}

export default function AppLayout({ children, breadcrumbs, title }: AppLayoutProps) {
  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs} title={title}>
      {children}
    </AppSidebarLayout>
  );
}
