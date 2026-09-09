"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Building2, Clock, Award, Users, Target, Code, X, CheckCircle } from "lucide-react"

const companyInfo = {
  mission: "Democratizar el acceso a tecnología médica avanzada mediante plataformas digitales que conectan fabricantes, hospitales y pacientes de forma eficiente, transparente y segura.",
  vision: "Ser la infraestructura digital de referencia para el comercio de tecnología sanitaria en Europa y Latinoamérica para 2030.",
  values: [
    { name: "Innovación Responsable", description: "Desarrollamos tecnología que mejora la vida de los pacientes sin comprometer la seguridad ni la ética." },
    { name: "Transparencia Radical", description: "Precios claros, datos abiertos y comunicación honesta con todos nuestros stakeholders." },
    { name: "Excelencia Técnica", description: "Código limpio, arquitectura escalable y estándares médicos más exigentes que los regulatorios." },
    { name: "Colaboración Abierta", description: "Trabajamos con fabricantes, hospitales y reguladores como socios, no como clientes." },
  ],
  trajectory: [
    { year: "2018", title: "Fundación", description: "Nace MedConnect en Madrid como spin-off de un grupo hospitalario, con la misión de digitalizar la cadena de suministro médico." },
    { year: "2019", title: "Primer Marketplace", description: "Lanzamiento del primer marketplace B2B para material quirúrgico en España. 50 hospitales piloto." },
    { year: "2020", title: "Expansión Internacional", description: "Entrada en México, Colombia y Chile. Certificación ISO 13485 y GDPR compliance." },
    { year: "2021", title: "Serie A - 12M€", description: "Ronda liderada por fondos de healthtech europeos. Equipo crece a 80 personas." },
    { year: "2022", title: "Plataforma 2.0", description: "Relanzamiento con arquitectura microservicios, API pública y SDK para desarrolladores." },
    { year: "2023", title: "Líder en España", description: "Más de 300 hospitales conectados, 15,000 referencias, 50M€ en GMV anual." },
    { year: "2024", title: "Expansión Europa", description: "Oficinas en París, Milán y Múnich. Certificación MDR 2017/745. 200+ empleados." },
  ],
  techStack: [
    "TypeScript / Node.js / NestJS",
    "React / Next.js / Tailwind CSS",
    "PostgreSQL / Redis / Kafka",
    "Kubernetes / AWS / Terraform",
    "FHIR / HL7 / DICOM",
    "GraphQL / REST / gRPC",
  ],
}

export function AboutCompanySheet() {
  return (
    <Sheet>
      <SheetContent className="w-full max-w-5xl max-h-[90vh] p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <SheetTitle className="text-2xl font-bold text-blue-950">Acerca de la Empresa</SheetTitle>
            <SheetDescription className="text-blue-600 mt-1">
              MedConnect: Empresa de tecnología de Soluciones de Software para el sector salud. Trayectoria de la Empresa haciendo software durante varios años.
            </SheetDescription>
          </div>
          <SheetClose />
        </div>

        <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2">
          <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-950 mb-4 pb-2 border-b border-blue-100">
              <Target className="h-5 w-5 text-blue-600" />
              Misión y Visión
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-100 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="text-blue-950 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Misión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">{companyInfo.mission}</p>
                </CardContent>
              </Card>
              <Card className="border-blue-100 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="text-blue-950 flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-600" />
                    Visión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">{companyInfo.vision}</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-950 mb-4 pb-2 border-b border-blue-100">
              <Award className="h-5 w-5 text-orange-600" />
              Valores Corporativos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companyInfo.values.map((value, index) => (
                <Card key={index} className="border-blue-100 hover:border-blue-300 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-blue-950 text-base">{value.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-blue-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-950 mb-4 pb-2 border-b border-blue-100">
              <Clock className="h-5 w-5 text-blue-600" />
              Trayectoria de la Empresa haciendo software durante varios años
            </h3>
            <div className="space-y-4">
              {companyInfo.trajectory.map((milestone, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-blue-600 group-hover:bg-orange-500 transition-colors" />
                    {index < companyInfo.trajectory.length - 1 && <div className="w-0.5 h-full bg-blue-200 mt-2" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-blue-950 bg-blue-50 px-3 py-1 rounded-full">{milestone.year}</span>
                      <span className="text-base font-semibold text-blue-900">{milestone.title}</span>
                    </div>
                    <p className="text-sm text-blue-600 mt-1 ml-10">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-950 mb-4 pb-2 border-b border-blue-100">
              <Code className="h-5 w-5 text-orange-600" />
              Stack Tecnológico
            </h3>
            <div className="flex flex-wrap gap-2">
              {companyInfo.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full hover:bg-orange-50 hover:border-orange-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-950 mb-4 pb-2 border-b border-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
              Equipo y Certificaciones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-blue-100 text-center p-6">
                <Building2 className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-blue-950">200+</p>
                <p className="text-sm text-blue-600">Empleados en 4 países</p>
              </Card>
              <Card className="border-blue-100 text-center p-6">
                <Award className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-blue-950">ISO 13485</p>
                <p className="text-sm text-blue-600">Certificación Dispositivos Médicos</p>
              </Card>
              <Card className="border-blue-100 text-center p-6">
                <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-blue-950">MDR 2017/745</p>
                <p className="text-sm text-blue-600">Reglamento Europeo Dispositivos</p>
              </Card>
            </div>
          </section>
        </div>

        <div className="mt-6 pt-6 border-t border-blue-100 flex gap-3 justify-center">
          <Button variant="outline" className="gap-2" onClick={() => alert("Ver carreras")}>
            <Users className="h-4 w-4" />
            Ver Ofertas de Empleo
          </Button>
          <Button variant="default" className="gap-2" onClick={() => alert("Contactar ventas")}>
            <Building2 className="h-4 w-4" />
            Hablar con Ventas
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