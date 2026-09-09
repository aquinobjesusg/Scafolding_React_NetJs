"use client"

import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"

const footerLinks = {
  Producto: [
    { label: "Catálogo Unificado", href: "#" },
    { label: "Gestión de Pedidos", href: "#" },
    { label: "Sincronización de Stock", href: "#" },
    { label: "Precios Dinámicos", href: "#" },
    { label: "Analytics & Reportes", href: "#" },
    { label: "API & Webhooks", href: "#" },
  ],
  Marketplaces: [
    { label: "Amazon Business", href: "#" },
    { label: "Mercado Libre", href: "#" },
    { label: "Falabella", href: "#" },
    { label: "Linio", href: "#" },
    { label: "Rappi", href: "#" },
    { label: "Ver todos (50+)", href: "#" },
  ],
  Recursos: [
    { label: "Documentación API", href: "#" },
    { label: "Centro de Ayuda", href: "#" },
    { label: "Guías de Integración", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Casos de Éxito", href: "#" },
    { label: "Comunidad", href: "#" },
  ],
  Empresa: [
    { label: "Acerca de Nosotros", href: "#" },
    { label: "Carreras", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Prensa", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Legal", href: "#" },
  ],
}

function SocialIcon({ children, ...props }: React.ComponentProps<"a"> & { children: React.ReactNode }) {
  return (
    <a
      {...props}
      className="p-2 rounded-lg bg-blue-800/50 text-blue-300 hover:bg-blue-700/50 hover:text-white transition-colors"
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="bg-blue-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjAxIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6" aria-label="MedConnect Home">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700">
                <svg className="h-5 w-5 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="currentColor"/>
                  <path d="M8 12h16M8 16h12M8 20h8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">MedConnect</span>
            </a>
            <p className="text-blue-300 text-sm mb-6 max-w-xs">
              La plataforma líder para sincronizar catálogos médicos, automatizar compras y conectar fabricantes con hospitales en toda Europa y Latinoamérica.
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon href="#" aria-label="Twitter">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" aria-label="LinkedIn">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" aria-label="GitHub">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" aria-label="Email">
                <Mail className="h-5 w-5" />
              </SocialIcon>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-blue-300 hover:text-white hover:text-orange-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      {link.label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-blue-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-400 text-sm">
            © 2024 MedConnect. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm text-blue-400">
            <a href="#" className="hover:text-orange-400 transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Términos de Servicio</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}