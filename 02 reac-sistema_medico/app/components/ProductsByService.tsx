"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Stethoscope, Pill, HeartPulse, Bone, Brain, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "traumatologia",
    name: "Traumatología",
    description: "Soluciones integrales para cirugía ortopédica y traumatología: implantes, instrumental quirúrgico, prótesis y sistemas de fijación. Catálogo unificado con trazabilidad completa y cumplimiento normativo MDR.",
    icon: Bone,
    href: "/traumatologia",
    stats: { productos: 2840, proveedores: 47, marketplaces: 12 },
  },
  {
    id: "cardiologia",
    name: "Cardiología",
    description: "Dispositivos cardiovasculares avanzados: stents, catéteres, marcapasos, válvulas y sistemas de diagnóstico por imagen. Integración directa con fabricantes líderes y hospitales de referencia.",
    icon: HeartPulse,
    href: "/cardiologia",
    stats: { productos: 1920, proveedores: 31, marketplaces: 8 },
  },
  {
    id: "neurologia",
    name: "Neurología",
    description: "Equipamiento neuroquirúrgico de precisión: sistemas de navegación, instrumental microquirúrgico, implantes craneales y dispositivos de neuromodulación. Soporte técnico especializado 24/7.",
    icon: Brain,
    href: "/neurologia",
    stats: { productos: 1150, proveedores: 19, marketplaces: 6 },
  },
  {
    id: "oftalmologia",
    name: "Oftalmología",
    description: "Tecnología oftalmológica de vanguardia: lentes intraoculares, sistemas de facoemulsificación, instrumental de microcirugía y diagnósticos por imagen. Certificación CE y FDA.",
    icon: Eye,
    href: "/oftalmologia",
    stats: { productos: 980, proveedores: 15, marketplaces: 5 },
  },
  {
    id: "cirugia-general",
    name: "Cirugía General",
    description: "Instrumental y dispositivos para cirugía general y mínimamente invasiva: trocares, grapadoras, mallas, suturas y energía quirúrgica. Logística integrada con bloque quirúrgico.",
    icon: Stethoscope,
    href: "/cirugia-general",
    stats: { productos: 3420, proveedores: 52, marketplaces: 15 },
  },
  {
    id: "farmacia-hospitalaria",
    name: "Farmacia Hospitalaria",
    description: "Gestión integral de medicamentos y productos sanitarios: automatización de dispensación, trazabilidad de lotes, control de caducidades y cumplimiento normativo AEMPS/EMA.",
    icon: Pill,
    href: "/farmacia-hospitalaria",
    stats: { productos: 5600, proveedores: 89, marketplaces: 3 },
  },
]

export function ProductsByService() {
  return (
    <section className="relative py-20 lg:py-32 bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Nueva vertical: Traumatología ya disponible
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950 tracking-tight mb-6">
            Productos por <span className="text-orange-500">Servicio Clínico</span>
          </h2>
          <p className="text-lg text-blue-600 max-w-2xl mx-auto">
            Accede a catálogos especializados por especialidad médica. Cada vertical incluye productos validados, proveedores certificados y sincronización automática con tu ERP hospitalario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <article
              key={service.id}
              className={cn(
                "group relative bg-white rounded-2xl border border-blue-100 overflow-hidden",
                "shadow-sm hover:shadow-xl transition-all duration-500",
                "hover:border-orange-200 hover:-translate-y-1"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <Card className="relative h-full border-none bg-transparent shadow-none">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 group-hover:from-orange-500 group-hover:to-orange-600 transition-colors duration-300 mb-4">
                        <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl font-bold text-blue-950 group-hover:text-orange-600 transition-colors">
                        {service.name}
                      </CardTitle>
                    </div>
                    <span className="flex-shrink-0 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                      {service.stats.productos.toLocaleString()} SKUs
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <CardDescription className="text-blue-600 text-base leading-relaxed mb-6">
                    {service.description}
                  </CardDescription>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-blue-500 border-t border-blue-100 pt-4">
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                      {service.stats.proveedores} proveedores
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      {service.stats.marketplaces} marketplaces
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 pb-0 flex items-center justify-between border-t border-blue-100">
                  <a
                    href={service.href}
                    className="group flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-orange-500 transition-colors"
                  >
                    Explorar catálogo
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
{/*                   <Button
                    variant="outline"
                    size="sm"
                    className="group bg-white border-blue-200 text-blue-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors" asChild
                  >
                    <a href={service.href} className="flex items-center gap-1">
                      Demo
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </a>
                  </Button>*/} 
                </CardFooter>
              </Card>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
{/*           <Button
            variant="outline"
            size="lg"
            className="bg-white border-blue-200 text-blue-700 hover:bg-blue-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors gap-2"
            asChild
          >
            <a href="/servicios">
              Ver todas las especialidades (24+)
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button> */}
        </div>
      </div>
    </section>
  )
}