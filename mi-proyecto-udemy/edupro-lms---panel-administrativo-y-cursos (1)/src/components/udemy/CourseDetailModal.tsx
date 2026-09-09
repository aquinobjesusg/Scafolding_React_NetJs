import React, { useState } from 'react';
import { Course } from '../../types';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  Star, 
  Users, 
  Clock, 
  Check, 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Play
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPayment: (course: Course) => void;
  onOpenPlayer: (courseId: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  onOpenPayment,
  onOpenPlayer,
}) => {
  const { isUserEnrolled } = useCourse();
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  if (!isOpen || !course) return null;

  const enrolled = isUserEnrolled(course.id);

  let totalDurationMinutes = 0;
  let totalLessonsCount = 0;
  course.sections.forEach((s) => {
    totalLessonsCount += s.lessons.length;
    s.lessons.forEach((l) => {
      totalDurationMinutes += l.durationMinutes;
    });
  });

  const hours = Math.floor(totalDurationMinutes / 60);
  const mins = totalDurationMinutes % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative my-8 w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hero Banner (Udemy style dark banner) */}
        <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 p-6 sm:p-8 text-white">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              <span>{course.category}</span>
              <span>•</span>
              <span>{course.level}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {course.shortDescription}
            </p>

            {/* Ratings and Stats */}
            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-amber-400">{course.rating.toFixed(1)}</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-gray-400">({course.ratingCount.toLocaleString()} reseñas)</span>
              </div>

              <div className="flex items-center gap-1.5 text-gray-300">
                <Users className="h-3.5 w-3.5 text-indigo-400" />
                <span>{course.studentsCount.toLocaleString()} estudiantes</span>
              </div>

              <div className="flex items-center gap-1.5 text-gray-300">
                <Clock className="h-3.5 w-3.5 text-indigo-400" />
                <span>{hours > 0 ? `${hours}h ` : ''}{mins}m de contenido</span>
              </div>
            </div>

            <div className="text-xs text-gray-400 pt-1">
              Creado por <strong className="text-white">{course.instructorName}</strong> • Actualizado:{' '}
              {course.updatedAt}
            </div>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-8">
          {/* Main Info (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* What you will learn */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-900">Lo que aprenderás en este curso</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Syllabus Accordion */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">Contenido del curso</h3>
                <span className="text-xs text-gray-500">
                  {course.sections.length} secciones • {totalLessonsCount} lecciones
                </span>
              </div>

              <div className="rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                {course.sections.map((section, idx) => {
                  const isExpanded = expandedSectionId === section.id || idx === 0;

                  return (
                    <div key={section.id} className="bg-white">
                      <button
                        type="button"
                        onClick={() => setExpandedSectionId(isExpanded ? null : section.id)}
                        className="flex w-full items-center justify-between bg-gray-50/70 px-4 py-3 text-left hover:bg-gray-100/60 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="text-xs font-bold text-gray-900">{section.title}</span>
                        </div>
                        <span className="text-[11px] text-gray-500">
                          {section.lessons.length} lecciones
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="divide-y divide-gray-50 p-2">
                          {section.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between px-3 py-2 text-xs hover:bg-indigo-50/30 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                {lesson.type === 'video' && (
                                  <PlayCircle className="h-3.5 w-3.5 text-indigo-600" />
                                )}
                                {lesson.type === 'quiz' && (
                                  <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
                                )}
                                {lesson.type === 'article' && (
                                  <FileText className="h-3.5 w-3.5 text-emerald-600" />
                                )}
                                <span className="text-gray-700">{lesson.title}</span>
                              </div>
                              <span className="text-[11px] text-gray-400 font-mono">
                                {lesson.durationMinutes} min
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Bio */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-900">Instructor</h3>
              <div className="flex items-center gap-3">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructorName}
                  className="h-12 w-12 rounded-xl object-cover ring-2 ring-indigo-100"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{course.instructorName}</h4>
                  <p className="text-[11px] text-gray-500">
                    Instructor especializado en arquitecturas de software e interfaces
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Pricing & Action Card */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg space-y-4">
              {/* Promo Video Thumbnail */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black group">
                {isPlayingTrailer ? (
                  <video
                    src={course.promoVideoUrl}
                    controls
                    autoPlay
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlayingTrailer(true)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-600 shadow-xl hover:scale-110 transition-transform"
                      >
                        <Play className="h-6 w-6 fill-indigo-600 ml-1" />
                      </button>
                    </div>
                    <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white">
                      Vista previa del curso
                    </span>
                  </>
                )}
              </div>

              {/* Pricing */}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-gray-900">
                    ${course.price.toFixed(2)} USD
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ${course.originalPrice.toFixed(2)} USD
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% de descuento
                  </span>
                </div>
                <p className="text-[11px] text-rose-600 font-semibold mt-0.5">
                  ¡Oferta por tiempo limitado!
                </p>
              </div>

              {/* Action Button */}
              {enrolled ? (
                <button
                  id="modal-continue-course-btn"
                  onClick={() => {
                    onOpenPlayer(course.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all"
                >
                  <PlayCircle className="h-4 w-4" />
                  <span>Continuar con el Curso</span>
                </button>
              ) : (
                <button
                  id="modal-buy-course-btn"
                  onClick={() => {
                    onOpenPayment(course);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition-all active:scale-[0.99]"
                >
                  <span>Inscribirme Ahora (${course.price.toFixed(2)} USD)</span>
                </button>
              )}

              <div className="space-y-2 border-t border-gray-100 pt-3 text-[11px] text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Acceso vitalicio ilimitado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-purple-500" />
                  <span>Certificado oficial al culminar</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Garantía de reembolso 30 días</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
