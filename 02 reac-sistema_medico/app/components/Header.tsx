"use client"

import { useState } from "react"
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Productos",
    children: [
      { label: "Catálogo Unificado", href: "#" },
      { label: "Gestión de Pedidos", href: "#" },
      { label: "Sincronización de Stock", href: "#" },
      { label: "Precios Dinámicos", href: "#" },
      { label: "Analytics & Reportes", href: "#" },
      { label: "API & Webhooks", href: "#" },
      { label: "Productos en la Web", href: "#", action: "products-web" },
      { label: "Productos en el Computador", href: "#", action: "products-computer" },
    ],
  },
  {
    label: "Marketplaces",
    children: [
      { label: "Amazon Business", href: "#" },
      { label: "Mercado Libre", href: "#" },
      { label: "Falabella", href: "#" },
      { label: "Linio", href: "#" },
      { label: "Rappi", href: "#" },
      { label: "Ver todos (50+)", href: "#" },
      { label: "Catálogos de Mercados Especializados", href: "#", action: "marketplaces-catalog" },
    ],
  },
  {
    label: "Recursos",
    children: [
      { label: "Documentación API", href: "#" },
      { label: "Centro de Ayuda", href: "#" },
      { label: "Guías de Integración", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Casos de Éxito", href: "#" },
      { label: "Comunidad", href: "#" },
      { label: "Productos por Especialidad Médica", href: "#", action: "medical-specialties" },
    ],
  },
  {
    label: "Acerca de la Empresa",
    children: [
      { label: "Nuestra Historia", href: "#" },
      { label: "Equipo Directivo", href: "#" },
      { label: "Valores", href: "#" },
      { label: "Trayectoria", href: "#" },
      { label: "Acerca de la Empresa de Tecnología", href: "#", action: "about-company" },
    ],
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2" aria-label="MedConnect Home">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800">
                <svg className="h-5 w-5 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="currentColor"/>
                  <path d="M8 12h16M8 16h12M8 20h8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-blue-950">MedConnect</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <DropdownMenu
                  key={item.label}
                  label={item.label}
                  children={item.children}
                  onOpenChange={setOpenDropdown}
                  isOpen={openDropdown === item.label}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50">
              Iniciar Sesión
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25">
              Solicitar Demo
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-blue-600 hover:bg-blue-50"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800">
                <svg className="h-5 w-5 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="currentColor"/>
                  <path d="M8 12h16M8 16h12M8 20h8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-blue-950">MedConnect</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-6">
            {navItems.map((item) => (
              <MobileDropdown
                key={item.label}
                label={item.label}
                children={item.children}
              />
            ))}
            <div className="pt-6 border-t border-blue-100 flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-start">
                Iniciar Sesión
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700">
                Solicitar Demo
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

function DropdownMenu({
  label,
  children,
  onOpenChange,
  isOpen,
}: {
  label: string
  children: Array<{ label: string; href: string; action?: string }>
  onOpenChange: (label: string | null) => void
  isOpen: boolean
}) {
  return (
    <div className="relative">
      <button
        className="px-3 py-2 text-sm font-medium text-blue-700 hover:text-blue-900 rounded-lg transition-colors flex items-center gap-1"
        onMouseEnter={() => onOpenChange(label)}
        onMouseLeave={() => onOpenChange(null)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-white rounded-xl shadow-lg border border-blue-100/50 py-2">
          <ul className="space-y-1">
            {children.map((child) => (
              <li key={child.label}>
                <a
                  href={child.href}
                  className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                >
                  {child.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function MobileDropdown({
  label,
  children,
}: {
  label: string
  children: Array<{ label: string; href: string; action?: string }>
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-blue-700 hover:text-blue-900 rounded-lg transition-colors"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-2 ml-4 space-y-1">
          {children.map((child) => (
            <a
              key={child.label}
              href={child.href}
              className="block px-3 py-2 text-sm text-blue-600 hover:text-blue-900 hover:bg-blue-50/50 rounded-lg transition-colors"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}