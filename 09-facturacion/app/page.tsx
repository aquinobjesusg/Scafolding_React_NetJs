'use client'
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Package, FileText, Receipt, UserCog, LogOut, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClientsView from "@/components/ClientsView";
import ProductsView from "@/components/ProductsView";
import InvoicesView from "@/components/InvoicesView";
import RetentionView from "@/components/RetentionView";
import UsersView from "@/components/UsersView";
import LoginView from "@/components/LoginView";
import QuotesView from "@/components/QuotesView";
import { useBillingStore, useAuthStore } from "@/lib/store";

export default function App() {
  const [tab, setTab] = useState("facturas");
  const { clients, products, invoices } = useBillingStore();
  const { currentUser, logout } = useAuthStore();

  if (!currentUser) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900">
      <header className="bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-500 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/40">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight">
                Núcleo Facturación
              </h1>
              <p className="text-sm text-sky-100/90">
                Sistema empresarial de facturación y retenciones
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Stat label="Clientes" value={clients.length} />
            <Stat label="Productos" value={products.length} />
            <Stat label="Facturas" value={invoices.length} />
            <div className="flex items-center gap-3 pl-6 border-l border-white/20">
              <div className="text-right">
                <div className="text-sm font-semibold">{currentUser.name}</div>
                <div className="text-xs uppercase tracking-wide text-sky-100/80">{currentUser.role}</div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={logout}
                className="text-white hover:bg-white/20 hover:text-white gap-1"
              >
                <LogOut className="h-4 w-4" /> Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="bg-white border border-sky-100 shadow-sm p-1 h-auto flex-wrap">
            <TabsTrigger value="facturas" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white gap-2">
              <FileText className="h-4 w-4" /> Facturas
            </TabsTrigger>
            <TabsTrigger value="presupuestos" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white gap-2">
              <Calculator className="h-4 w-4" /> Presupuestos
            </TabsTrigger>
            <TabsTrigger value="clientes" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white gap-2">
              <Users className="h-4 w-4" /> Clientes
            </TabsTrigger>
            <TabsTrigger value="productos" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white gap-2">
              <Package className="h-4 w-4" /> Productos
            </TabsTrigger>
            <TabsTrigger value="retencion" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white gap-2">
              <Receipt className="h-4 w-4" /> Retenciones
            </TabsTrigger>
            <TabsTrigger value="usuarios" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white gap-2">
              <UserCog className="h-4 w-4" /> Usuarios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="facturas" className="mt-6">
            <InvoicesView />
          </TabsContent>
          <TabsContent value="presupuestos" className="mt-6">
            <QuotesView />
          </TabsContent>
          <TabsContent value="clientes" className="mt-6">
            <ClientsView />
          </TabsContent>
          <TabsContent value="productos" className="mt-6">
            <ProductsView />
          </TabsContent>
          <TabsContent value="retencion" className="mt-6">
            <RetentionView />
          </TabsContent>
          <TabsContent value="usuarios" className="mt-6">
            <UsersView />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-sky-100 bg-white py-6 mt-12">
        <div className="mx-auto max-w-7xl px-6 text-sm text-slate-500 flex justify-between">
          <span>© {new Date().getFullYear()} Núcleo Facturación S.A.</span>
          <span>RUC: 1792345678001 · Quito, Ecuador</span>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-right">
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs uppercase tracking-wide text-sky-100/80">{label}</div>
    </div>
  );
}