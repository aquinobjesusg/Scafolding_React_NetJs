"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronRight, Stethoscope, HeartPulse, Brain, Bone, Eye, X } from "lucide-react"

const medicalSpecialties = [
  {
    id: "traumatologia",
    name: "Traumatología",
    description: "Gestión integral de productos para cirugía ortopédica, prótesis, instrumental quirúrgico y materiales de osteosíntesis.",
    icon: Bone,
    features: ["Prótesis de cadera y rodilla", "Placas y tornillos", "Instrumental artroscópico", "Biomateriales"],
    link: "/especialidades/traumatologia"
  },
  {
    id: "cardiologia",
    name: "Cardiología",
    description: "Soluciones para intervencionismo cardíaco, marcapasos, stents, catéteres y dispositivos de electrofisiología.",
    icon: HeartPulse,
    features: ["Stents coronarios", "Marcapasos y ICD", "Catéteres de ablación", "Válvulas cardíacas"],
    link: "/especialidades/cardiologia"
  },
  {
    id: "neurologia",
    name: "Neurología",
    description: "Productos para neurocirugía, estimulación cerebral profunda, sistemas de navegación y neuromodulación.",
    icon: Brain,
    features: ["Sistemas de navegación", "Electrodos DBS", "Clips aneurismáticos", "Shunts ventriculares"],
    link: "/especialidades/neurologia"
  },
  {
    id: "oftalmologia",
    name: "Oftalmología",
    description: "Lentes intraoculares, instrumental microquirúrgico, equipos de facoemulsificación y diagnósticos por imagen.",
    icon: Eye,
    features: ["Lentes intraoculares", "Facoemulsificadores", "Instrumental microquirúrgico", "Tomógrafos OCT"],
    link: "/especialidades/oftalmologia"
  },
  {
    id: "cirugia-general",
    name: "Cirugía General",
    description: "Instrumental laparoscópico, grapadoras quirúrgicas, mallas de refuerzo y dispositivos de hemostasia.",
    icon: Stethoscope,
    features: ["Grapadoras lineales y circulares", "Mallas quirúrgicas", "Instrumental laparoscópico", "Hemostáticos"],
    link: "/especialidades/cirugia-general"
  },
  {
    id: "urologia",
    name: "Urología",
    description: "Endoscopios flexibles y rígidos, litotriptores, stents ureterales y prótesis urológicas.",
    icon: HeartPulse,
    features: ["Ureteroscopios flexibles", "Litotriptores láser", "Stents ureterales", "Prótesis peneanas"],
    link: "/especialidades/urologia"
  },
]

export function MedicalSpecialtiesSheet() {
  return (
    <Sheet>
      <SheetContent className="w-full max-w-6xl max-h-[90vh] p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <SheetTitle className="text-2xl font-bold text-blue-950">Productos por Especialidad Médica</SheetTitle>
            <SheetDescription className="text-blue-600 mt-1">
              Explora nuestro catálogo especializado por área terapéutica. Cada especialidad cuenta con productos certificados y listos para sincronizar.
            </SheetDescription>
          </div>
          <SheetClose />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[65vh] overflow-y-auto pr-2">
          {medicalSpecialties.map((specialty) => (
            <Card
              key={specialty.id}
              className="group relative overflow-hidden border-blue-100 hover:border-orange-300/50 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800">
                      <specialty.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-blue-950">{specialty.name}</CardTitle>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-blue-400 group-hover:text-orange-500 transition-colors opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1" />
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-blue-600/80 mb-4 line-clamp-3">{specialty.description}</p>
                <ul className="space-y-2">
                  {specialty.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-blue-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0 border-t border-blue-100">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-white hover:bg-orange-50 border-blue-200 text-blue-700 hover:border-orange-400 hover:text-orange-600"
                  onClick={() => alert(`Navegar a ${specialty.link}`)}
                >
                  Ver catálogo completo
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-blue-100">
          <p className="text-sm text-blue-500 text-center">
            ¿No encuentras tu especialidad? <Button variant="ghost" size="sm" className="p-0 text-orange-600 hover:text-orange-700">Contáctanos</Button> para solicitar una nueva categoría.
          </p>
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