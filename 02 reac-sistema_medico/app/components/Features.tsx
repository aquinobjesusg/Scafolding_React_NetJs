"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Globe, BarChart3, Cpu, Link2, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Sincronización en Tiempo Real",
    description: "Actualización automática de stock, precios y catálogos en menos de 30 segundos across todos los canales conectados.",
  },
  {
    icon: Shield,
    title: "Cumplimiento Normativo",
    description: "Certificados ISO 13485, MDR 2017/745, GDPR y trazabilidad completa UDI para cada dispositivo médico.",
  },
  {
    icon: Globe,
    title: "50+ Marketplaces Integrados",
    description: "Conexión nativa con Amazon Business, Mercado Libre, Falabella, Rappi y marketplaces especializados por país.",
  },
  {
    icon: BarChart3,
    title: "Analytics Predictivos",
    description: "Dashboards con IA para forecasting de demanda, detección de roturas de stock y optimización de precios.",
  },
  {
    icon: Cpu,
    title: "API & Webhooks Avanzados",
    description: "API REST/GraphQL completa, SDKs en 5 lenguajes, webhooks en tiempo real y sandbox para desarrolladores.",
  },
  {
    icon: Link2,
    title: "Integración ERP Nativa",
    description: "Conectores preconstruidos para SAP, Oracle, Microsoft Dynamics, Odoo y sistemas hospitalarios legacy HL7/FHIR.",
  },
]

export function Features() {
  return (
    <section className="py-20 lg:py-28 bg-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-4">
            Todo lo que necesitas para escalar
          </h2>
          <p className="text-lg text-blue-600">
            Una plataforma unificada que elimina la complejidad operativa y te permite centrarte en lo importante: tus pacientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-blue-100 hover:border-blue-300 transition-all duration-300 bg-white hover:shadow-xl"
            >
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-blue-950 text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-600 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">¿Listo para transformar tu cadena de suministro médico?</h3>
            <p className="text-blue-100 mb-6">Únete a 300+ hospitales que ya usan MedConnect para automatizar sus compras.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors" onClick={() => alert("Iniciar prueba gratis")}>
                Iniciar Prueba Gratis 14 Días
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors" onClick={() => alert("Contactar ventas")}>
                Hablar con Ventas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}