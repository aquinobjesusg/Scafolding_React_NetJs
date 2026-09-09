"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const testimonials = [
  {
    content: "MedConnect redujo nuestro tiempo de procesamiento de pedidos en un 78%. La integración con nuestro ERP fue fluida y el soporte técnico nos acompañó en cada paso.",
    author: "Dra. María González",
    role: "Directora de Compras, Hospital Universitario La Paz",
    avatar: "MG",
    company: "Hospital La Paz",
    rating: 5,
  },
  {
    content: "La sincronización automática de stock entre 12 marketplaces nos ahorra 40 horas semanales de trabajo manual. El ROI fue positivo desde el primer mes.",
    author: "Carlos Mendoza",
    role: "CEO, Distribuidora Médica Sur",
    avatar: "CM",
    company: "DMS",
    rating: 5,
  },
  {
    content: "Como fabricante, poder publicar nuestro catálogo una vez y que se sincronice en 50+ canales es un cambio de juego. Las analíticas nos ayudan a tomar mejores decisiones de producción.",
    author: "Ana Rodríguez",
    role: "VP Commercial, OrthoTech España",
    avatar: "AR",
    company: "OrthoTech",
    rating: 5,
  },
  {
    content: "La conformidad con MDR 2017/745 y la trazabilidad UDI automática nos quita un peso enorme de encima. Cumplimiento normativo sin dolores de cabeza.",
    author: "Dr. Javier Ruiz",
    role: "Chief Medical Officer, Clínica Universidad de Navarra",
    avatar: "JR",
    company: "CUN",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-4">
            Confían en MedConnect
          </h2>
          <p className="text-lg text-blue-600">
            Más de 300 hospitales, clínicas y fabricantes en Europa y Latinoamérica usan nuestra plataforma cada día.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30 h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-1 mb-6">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Quote className="h-10 w-10 text-blue-200 mb-4" />
                      <p className="text-xl text-blue-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-blue-950">{testimonial.author}</div>
                          <div className="text-sm text-blue-500">{testimonial.role}</div>
                          <div className="text-xs text-blue-400">{testimonial.company}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={prev}
              aria-label="Testimonial anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-blue-600 w-6"
                      : "bg-blue-300 hover:bg-blue-400"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={next}
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {["Hospital La Paz", "Clínica Universidad Navarra", "Hospital Gregorio Marañón", "Hospital 12 de Octubre"].map((hospital, i) => (
            <div key={i} className="px-4 py-3 text-center text-sm font-medium text-blue-700 bg-blue-50 rounded-lg border border-blue-100">
              {hospital}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}