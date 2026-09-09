"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Globe, Users, ShoppingCart } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-28 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-orange-50/30">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-blue-100/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Nueva versión 2.0 — Arquitectura microservicios, API pública y SDK
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-950 leading-tight mb-6">
              La plataforma que
              <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 bg-clip-text text-transparent">
                conecta tecnología médica
              </span>
              con quien la necesita
            </h1>
            <p className="text-lg sm:text-xl text-blue-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Marketplace B2B unificado para hospitales, clínicas y fabricantes. Sincroniza catálogos, gestiona pedidos y automatiza compras en 50+ marketplaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl shadow-blue-500/25 text-lg px-8 py-3"
                onClick={() => alert("Solicitar demo")}
              >
                Solicitar Demo Gratuita
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 text-lg px-8 py-3"
                onClick={() => alert("Ver documentación")}
              >
                Ver Documentación
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-blue-600">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="font-medium text-blue-800">ISO 13485</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                <span className="font-medium text-blue-800">MDR 2017/745</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="font-medium text-blue-800">300+ Hospitales</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white rounded-2xl border border-blue-100 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border-b border-blue-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="ml-4 text-xs text-blue-500 font-mono">app.medconnect.io/dashboard</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <StatCard value="15,000+" label="Referencias" icon={ShoppingCart} color="blue" />
                  <StatCard value="50+" label="Marketplaces" icon={Globe} color="orange" />
                  <StatCard value="99.9%" label="Uptime SLA" icon={Shield} color="blue" />
                </div>
                <div className="space-y-3">
                  <DashboardRow title="Prótesis Cadera Zimmer" category="Traumatología" price="€2,450" stock="En stock" trend="up" />
                  <DashboardRow title="Stent Coronario Abbott" category="Cardiología" price="€1,890" stock="Bajo stock" trend="down" />
                  <DashboardRow title="Lente Intraocular Alcon" category="Oftalmología" price="€890" stock="En stock" trend="up" />
                  <DashboardRow title="Grapadora Ethicon" category="Cirugía General" price="€320" stock="En stock" trend="neutral" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-gradient-to-br from-orange-400/20 to-blue-400/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label, icon: Icon, color }: { value: string; label: string; icon: React.ComponentType<{ className?: string }>; color: "blue" | "orange" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
  }
  return (
    <div className={`p-4 rounded-xl border ${colors[color]}`}>
      <Icon className="h-5 w-5 mb-2" />
      <div className="text-2xl font-bold text-blue-950">{value}</div>
      <div className="text-xs font-medium">{label}</div>
    </div>
  )
}

function DashboardRow({ title, category, price, stock, trend }: { title: string; category: string; price: string; stock: string; trend: "up" | "down" | "neutral" }) {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-blue-500",
  }
  const trendIcons = {
    up: "↗",
    down: "↘",
    neutral: "→",
  }
  return (
    <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-100">
      <div>
        <div className="font-medium text-blue-900 text-sm">{title}</div>
        <div className="text-xs text-blue-500">{category}</div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-blue-950 text-sm">{price}</div>
        <div className="flex items-center justify-end gap-1 text-xs">
          <span className={trendColors[trend]}>{trendIcons[trend]}</span>
          <span className={stock === "En stock" ? "text-green-600" : "text-orange-600"}>
            {stock}
          </span>
        </div>
      </div>
    </div>
  )
}