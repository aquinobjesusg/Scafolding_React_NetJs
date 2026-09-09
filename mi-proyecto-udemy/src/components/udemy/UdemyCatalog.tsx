import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { Course } from '../../types';
import { 
  Search, 
  Star, 
  Users, 
  Clock, 
  PlayCircle, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  GraduationCap, 
  BookOpen, 
  Zap 
} from 'lucide-react';

interface UdemyCatalogProps {
  onSelectCourse: (course: Course) => void;
  onOpenPlayer: (courseId: string) => void;
  onOpenPayment: (course: Course) => void;
  onOpenAuth: () => void;
}

export const UdemyCatalog: React.FC<UdemyCatalogProps> = ({
  onSelectCourse,
  onOpenPlayer,
  onOpenPayment,
  onOpenAuth,
}) => {
  const { courses, isUserEnrolled, getCourseProgressPercent } = useCourse();
  const { currentUser } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [selectedLevel, setSelectedLevel] = useState<string>('TODOS');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyMyCourses, setOnlyMyCourses] = useState(false);

  const categories = [
    'TODOS',
    'Desarrollo Web',
    'Inteligencia Artificial',
    'Diseño y UI/UX',
    'Bases de Datos',
  ];

  const filteredCourses = courses.filter((course) => {
    // Only published for catalog
    if (course.status !== 'Publicado') return false;

    // "Mis Cursos" filter
    if (onlyMyCourses && !isUserEnrolled(course.id)) return false;

    // Category filter
    if (selectedCategory !== 'TODOS' && course.category !== selectedCategory) return false;

    // Level filter
    if (selectedLevel !== 'TODOS' && course.level !== selectedLevel) return false;

    // Search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(term);
      const matchInstructor = course.instructorName.toLowerCase().includes(term);
      const matchDesc = course.shortDescription.toLowerCase().includes(term);
      if (!matchTitle && !matchInstructor && !matchDesc) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner (Udemy Style) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-indigo-950 to-violet-950 p-8 sm:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3.5 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Aprende con los mejores instructores de la industria</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Desarrolla habilidades reales con proyectos prácticos y código en vivo
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Plataforma interactiva estilo Udemy con soporte de video reproductor en alta definición, quizzes de evaluación en tiempo real y certificación oficial de finalización.
          </p>

          {/* Search bar inside hero */}
          <div className="relative max-w-lg pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="¿Qué quieres aprender hoy? Ej. Angular 18, Python, Figma..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md pl-12 pr-4 py-3.5 text-xs text-white placeholder-gray-400 focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 outline-hidden transition-all shadow-lg"
            />
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-40 bottom-0 h-64 w-64 rounded-full bg-violet-600/15 blur-2xl" />
      </div>

      {/* Category Pills & Filters */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {cat === 'TODOS' ? 'Todas las Categorías' : cat}
              </button>
            ))}
          </div>

          {/* Switch for enrolled courses */}
          {currentUser && (
            <button
              onClick={() => setOnlyMyCourses(!onlyMyCourses)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                onlyMyCourses
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Mis Cursos Matriculados</span>
            </button>
          )}
        </div>

        {/* Secondary Level Filter */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Filter className="h-3.5 w-3.5 text-gray-400" />
          <span className="font-semibold">Nivel:</span>
          {['TODOS', 'Principiante', 'Intermedio', 'Avanzado', 'Todos los niveles'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                selectedLevel === lvl
                  ? 'bg-gray-200 text-gray-900 font-bold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {lvl === 'TODOS' ? 'Cualquiera' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-base font-bold text-gray-900">No se encontraron cursos</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Prueba ajustando los filtros de categoría o buscando otro término.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('TODOS');
              setSelectedLevel('TODOS');
              setSearchTerm('');
              setOnlyMyCourses(false);
            }}
            className="mt-4 rounded-xl bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => {
            const enrolled = isUserEnrolled(course.id);
            const progress = enrolled ? getCourseProgressPercent(course.id) : 0;

            let totalMinutes = 0;
            course.sections.forEach((s) => s.lessons.forEach((l) => (totalMinutes += l.durationMinutes)));
            const hours = Math.floor(totalMinutes / 60);

            return (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-2xs hover:shadow-md transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <div>
                  {/* Thumbnail and badges */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Bestseller badge */}
                    {course.studentsCount > 4000 && (
                      <span className="absolute top-2 left-2 rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-gray-950 shadow-xs">
                        Más Vendido
                      </span>
                    )}

                    {/* Enrolled badge */}
                    {enrolled && (
                      <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                        <CheckCircle2 className="h-3 w-3" />
                        Inscrito
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      {course.shortDescription}
                    </p>

                    <div className="text-[11px] text-gray-600 font-medium truncate">
                      {course.instructorName}
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="font-extrabold text-amber-700">{course.rating.toFixed(1)}</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400">
                        ({course.ratingCount.toLocaleString()})
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-gray-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {hours > 0 ? `${hours}h ` : ''}video
                      </span>
                      <span>•</span>
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price and CTA */}
                <div className="border-t border-gray-100 bg-gray-50/50 p-4">
                  {enrolled ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-gray-600 font-medium">
                        <span>Progreso del curso:</span>
                        <span className="font-bold text-indigo-600">{progress}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPlayer(course.id);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700 transition-colors"
                      >
                        <PlayCircle className="h-3.5 w-3.5" />
                        <span>Continuar Lección</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-black text-gray-900">
                            ${course.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ${course.originalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPayment(course);
                        }}
                        className="flex items-center gap-1 rounded-xl bg-gray-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-600 transition-colors shadow-2xs"
                      >
                        <span>Comprar</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
