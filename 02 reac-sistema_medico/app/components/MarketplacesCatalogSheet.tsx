"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ShoppingCart, Plane, Hotel, X, ExternalLink, CheckCircle, Star } from "lucide-react"

const marketplaceCatalogs = [
  {
    id: "bakery",
    name: "Panadería Artesanal Online",
    category: "Venta de Panes y Repostería",
    description: "Marketplace especializado en panadería artesanal, conectando panaderías locales con consumidores y negocios hosteleros.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop",
    features: ["Pan de masa madre", "Repostería tradicional", "Entrega en 24h", "Suscripciones semanales"],
    stats: { vendors: 120, products: 2400, rating: 4.8 },
    link: "#",
  },
  {
    id: "travel",
    name: "ViajaYa Marketplace",
    category: "Compra de Viajes y Experiencias",
    description: "Plataforma integral para reserva de vuelos, paquetes vacacionales, actividades y experiencias locales en un solo lugar.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop",
    features: ["Vuelos + hotel combinados", "Experiencias locales", "Seguro de viaje incluido", "Pago a plazos sin intereses"],
    stats: { vendors: 350, products: 15000, rating: 4.6 },
    link: "#",
  },
  {
    id: "hotels",
    name: "HotelConnect Pro",
    category: "Reserva de Hoteles y Alojamientos",
    description: "Motor de reservas B2B para hoteles, cadenas hoteleras y agencias con gestión centralizada de inventario y tarifas.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    features: ["Channel manager integrado", "Tarifas dinámicas", "Gestión de grupos", "API para conectividad"],
    stats: { vendors: 2800, products: 45000, rating: 4.9 },
    link: "#",
  },
]

export function MarketplacesCatalogSheet() {
  return (
    <Sheet>
      <SheetContent className="w-full max-w-6xl max-h-[90vh] p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <SheetTitle className="text-2xl font-bold text-blue-950">Catálogos de Mercados Especializados</SheetTitle>
            <SheetDescription className="text-blue-600 mt-1">
              Descubre marketplaces verticales especializados por sector. Cada catálogo está optimizado para las necesidades específicas de su industria.
            </SheetDescription>
          </div>
          <SheetClose />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-2">
          {marketplaceCatalogs.map((catalog) => (
            <Card
              key={catalog.id}
              className="group relative overflow-hidden border-blue-100 hover:border-orange-300/50 transition-all duration-300 bg-white shadow-lg"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={catalog.image}
                  alt={catalog.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2 py-1 text-xs font-medium text-white bg-blue-600/90 rounded-full backdrop-blur">
                    {catalog.category}
                  </span>
                  <div className="flex items-center gap-1 text-white">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{catalog.stats.rating}</span>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-blue-950 line-clamp-1">{catalog.name}</CardTitle>
                <CardDescription className="text-sm text-blue-600 line-clamp-2">{catalog.description}</CardDescription>
              </CardHeader>

              <CardContent className="pb-3">
                <ul className="space-y-2 mb-4">
                  {catalog.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-blue-700">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 text-xs text-blue-500 border-t border-blue-100 pt-3">
                  <span className="flex items-center gap-1">
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {catalog.stats.vendors} vendedores
                  </span>
                  <span className="flex items-center gap-1">
                    <ExternalLink className="h-3.5 w-3.5" />
                    {catalog.stats.products.toLocaleString()} productos
                  </span>
                </div>
              </CardContent>

              <CardFooter className="pt-0 border-t border-blue-100">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-white hover:bg-orange-50 border-blue-200 text-blue-700 hover:border-orange-400 hover:text-orange-600"
                  onClick={() => alert(`Abrir catálogo: ${catalog.name}`)}
                >
                  Explorar catálogo
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="text-3xl font-bold text-blue-950">3,500+</div>
              <div className="text-sm text-blue-600">Vendedores Verificados</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="text-3xl font-bold text-blue-950">62,000+</div>
              <div className="text-sm text-blue-600">Productos en Catálogo</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="text-3xl font-bold text-blue-950">4.8/5</div>
              <div className="text-sm text-blue-600">Rating Promedio</div>
            </div>
          </div>
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