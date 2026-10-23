import React from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-emerald-700 via-teal-800 to-cyan-900 p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center ring-1 ring-white/30">
            <span className="text-2xl font-bold">O</span>
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">OpenXava</p>
            <p className="text-xs text-emerald-200/80">Enterprise Framework</p>
          </div>
        </div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-serif font-bold leading-tight">Gestión empresarial<br />simplificada.</h2>
          <p className="text-emerald-100/80 max-w-md">Administra tus módulos, genera reportes en PDF y exporta datos a Excel con una interfaz inspirada en OpenXava.</p>
          <div className="flex gap-8 pt-4">
            <div><p className="text-3xl font-bold">12k+</p><p className="text-xs text-emerald-200/70 uppercase tracking-wider">Empresas</p></div>
            <div><p className="text-3xl font-bold">98%</p><p className="text-xs text-emerald-200/70 uppercase tracking-wider">Satisfacción</p></div>
          </div>
        </div>
        <p className="relative z-10 text-xs text-emerald-200/60">© 2025 OpenXava Clone. Todos los derechos reservados.</p>
      </div>
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold">O</div>
            <p className="text-lg font-bold text-slate-900">OpenXava</p>
          </div>
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-slate-900">{title}</h1>
            <p className="text-sm text-slate-500 mt-2">{subtitle}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 p-6 sm:p-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-slate-600">{footer}</div>}
        </div>
      </div>
    </div>
  );
}