import React from 'react';
import { 
  Star, 
  Users, 
  BookOpen, 
  Linkedin, 
  Github, 
  Twitter, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TeamSection: React.FC = () => {
  const team = [
    {
      name: 'Prof. Carlos Santana',
      role: 'Director Académico & Lead Architect',
      specialty: 'Angular, React & Microfrontends',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Ex-ingeniero senior en Big Tech con más de 12 años formando a más de 45,000 desarrolladores en arquitecturas modernas.',
      coursesCount: 8,
      studentsCount: '28,400',
      rating: 4.9,
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    {
      name: 'Dra. Elena Vega',
      role: 'Head de Inteligencia Artificial',
      specialty: 'Python, LLMs, GenAI & MLOps',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
      bio: 'Doctora en Computación especializada en modelos de lenguaje generativo e integración de pipelines de IA en producción.',
      coursesCount: 5,
      studentsCount: '19,200',
      rating: 4.8,
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    {
      name: 'Marcos Rivas',
      role: 'Director de Diseño y Experiencia de Usuario',
      specialty: 'UI/UX, Sistemas de Diseño & Figma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      bio: 'Diseñador de producto galardonado. Lidera el estándar de accesibilidad, tipografía y diseño interactivo en EduPro LMS.',
      coursesCount: 4,
      studentsCount: '14,800',
      rating: 4.9,
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    {
      name: 'Sofía Valenzuela',
      role: 'Arquitecta Cloud & DevOps',
      specialty: 'Docker, Kubernetes, AWS & CI/CD',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      bio: 'Especialista en escalabilidad de plataformas educativas con alta concurrencia y despliegue seguro con contenedores.',
      coursesCount: 6,
      studentsCount: '21,500',
      rating: 4.7,
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  ];

  return (
    <section id="equipo" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-orange-100 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
              <Sparkles className="h-3.5 w-3.5 text-orange-500" />
              <span>Equipo de Colaboración & Docentes</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-950">
              Guiado por expertos con experiencia real en la industria
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Nuestro equipo docente y de desarrollo trabaja conjuntamente para crear contenidos vigentes, interactivos y con retroalimentación personalizada.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-xl border border-orange-200">
              ★ 4.9 Calificación Promedio Docente
            </span>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-orange-100/90 bg-white p-5 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Photo & Badge */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-orange-50">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 rounded-lg bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{member.rating}</span>
                  </div>
                </div>

                {/* Member Info */}
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-orange-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-bold text-orange-600">
                    {member.role}
                  </p>
                  <p className="text-[11px] font-medium text-gray-400">
                    {member.specialty}
                  </p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Stats & Social */}
              <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-orange-500" />
                    <strong>{member.coursesCount}</strong> cursos
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-orange-500" />
                    <strong>{member.studentsCount}</strong> alumnos
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <Twitter className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
