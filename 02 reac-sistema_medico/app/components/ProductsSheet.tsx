"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Globe, Monitor, X, CheckCircle } from "lucide-react"

const webProducts = [
  {
    name: "Catálogo Público Web",
    description: "Catálogo accesible desde cualquier navegador para compradores hospitalarios y distribuidores.",
    features: ["Acceso 24/7 sin instalación", "Búsqueda avanzada por filtros", "Comparativa de precios en tiempo real", "Pedidos directos desde la web"],
    icon: Globe,
  },
  {
    name: "Marketplace Médico",
    description: "Plataforma web tipo marketplace conectando fabricantes con hospitales y clínicas.",
    features: ["Múltiples vendedores verificados", "Sistema de valoraciones", "Checkout seguro", "Facturación automática"],
    icon: Globe,
  },
  {
    name: "Portal de Proveedores Web",
    description: "Panel web para que fabricantes gestionen su catálogo, stock y pedidos desde el navegador.",
    features: ["Gestión de productos drag & drop", "Actualización masiva por CSV", "Analytics de ventas web", "Notificaciones en tiempo real"],
    icon: Globe,
  },
]

const computerProducts = [
  {
    name: "App Desktop MedConnect",
    description: "Aplicación nativa para Windows, macOS y Linux con funcionalidades offline y sincronización automática.",
    features: ["Modo offline completo", "Sincronización en segundo plano", "Notificaciones nativas del SO", "Acceso a archivos locales"],
    icon: Monitor,
  },
  {
    name: "Cliente de Integración Local",
    description: "Software instalable para conectar ERPs hospitalarios y sistemas legados con MedConnect.",
    features: ["Conectores HL7/FHIR nativos", "Mapeo visual de campos", "Logs de auditoría locales", "Actualizaciones automáticas silenciosas"],
    icon: Monitor,
  },
  {
    name: "Herramienta de Migración",
    description: "Utilidad de escritorio para migración masiva de datos desde sistemas antiguos a MedConnect.",
    features: ["Validación de datos en tiempo real", "Plantillas predefinidas", "Rollback automático ante errores", "Reportes de migración detallados"],
    icon: Monitor,
  },
]

export function ProductsSheet() {
  return (
    <Sheet>
      <SheetContent className="w-full max-w-5xl max-h-[90vh] p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <SheetTitle className="text-2xl font-bold text-blue-950">Productos: Web vs Computador</SheetTitle>
            <SheetDescription className="text-blue-600 mt-1">
              MedConnect ofrece soluciones tanto basadas en web como aplicaciones nativas de escritorio para adaptarse a cualquier flujo de trabajo hospitalario.
            </SheetDescription>
          </div>
          <SheetClose />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-950 mb-6 pb-3 border-b border-blue-100">
              <Globe className="h-5 w-5 text-blue-600" />
              Productos en la Web
            </h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {webProducts.map((product, index) => (
                <Card
                  key={index}
                  className="border-blue-100 hover:border-blue-300 transition-colors bg-white"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-600">
                        <product.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold text-blue-950">{product.name}</CardTitle>
                        <CardDescription className="text-sm text-blue-600">{product.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-950 mb-6 pb-3 border-b border-blue-100">
              <Monitor className="h-5 w-5 text-orange-600" />
              Productos en el Computador
            </h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {computerProducts.map((product, index) => (
                <Card
                  key={index}
                  className="border-blue-100 hover:border-orange-300/50 transition-colors bg-gradient-to-br from-white to-orange-50/30"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-100 text-orange-600">
                        <product.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold text-blue-950">{product.name}</CardTitle>
                        <CardDescription className="text-sm text-blue-600">{product.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 pt-6 border-t border-blue-100 flex gap-3 justify-center">
          <Button variant="outline" className="gap-2" onClick={() => alert("Descargar app de escritorio")}>
            <Monitor className="h-4 w-4" />
            Descargar App Desktop
          </Button>
          <Button variant="default" className="gap-2" onClick={() => alert("Abrir versión web")}>
            <Globe className="h-4 w-4" />
            Probar Versión Web
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function SheetClose({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors", className)}
      {...props}
    >
      <X className="h-5 w-5" />
    </button>
  )
}