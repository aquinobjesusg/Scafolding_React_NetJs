"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Shield, Clock } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 text-orange-300 text-sm font-medium mb-6">
          <Users className="h-4 w-4" />
          300+ hospitales ya confían en MedConnect
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Empieza a sincronizar tu catálogo médico hoy mismo
        </h2>
        <p className="text-lg sm:text-xl text-blue-200 mb-10 max-w-3xl mx-auto">
          Prueba gratuita de 14 días. Sin tarjeta de crédito. Implementación guiada en 48 horas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl shadow-orange-500/25 text-lg px-8 py-3"
            onClick={() => alert("Iniciar prueba gratis")}
          >
            Iniciar Prueba Gratis
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-lg px-8 py-3"
            onClick={() => alert("Agendar demo")}
          >
            Agendar Demo Personalizada
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
          <div className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-6 w-6 text-orange-400" />
              <span className="text-2xl font-bold text-white">ISO 13485</span>
            </div>
            <p className="text-blue-300 text-sm">Certificación dispositivos médicos</p>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-6 w-6 text-orange-400" />
              <span className="text-2xl font-bold text-white">48h</span>
            </div>
            <p className="text-blue-300 text-sm">Implementación guiada</p>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-6 w-6 text-orange-400" />
              <span className="text-2xl font-bold text-white">14 días</span>
            </div>
            <p className="text-blue-300 text-sm">Prueba gratis sin compromiso</p>
          </div>
        </div>
      </div>
    </section>
  )
}