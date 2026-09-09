import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { Course, CourseSection, Lesson, ActiveView } from '../../types';
import { CrudTable, ColumnDef } from './CrudTable';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Layers, 
  PlaySquare, 
  Star, 
  Users, 
  DollarSign, 
  Video, 
  HelpCircle, 
  FileText, 
  ExternalLink,
  X
} from 'lucide-react';

interface CoursesCrudProps {
  onNavigateToCourse: (courseId: string) => void;
}

export const CoursesCrud: React.FC<CoursesCrudProps> = ({ onNavigateToCourse }) => {
  const { courses, addCourse, updateCourse, deleteCourse, addSection, addLessonToSection, deleteLesson } = useCourse();
  const { currentUser } = useAuth();

  // Modals state
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Curriculum Editor modal
  const [curriculumCourse, setCurriculumCourse] = useState<Course | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  
  // Lesson add form state inside curriculum modal
  const [targetSectionId, setTargetSectionId] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonType, setLessonType] = useState<'video' | 'quiz' | 'article'>('video');
  const [lessonDuration, setLessonDuration] = useState(12);
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonArticle, setLessonArticle] = useState('');

  // Course Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Desarrollo Web');
  const [level, setLevel] = useState<'Principiante' | 'Intermedio' | 'Avanzado' | 'Todos los niveles'>('Todos los niveles');
  const [price, setPrice] = useState(29.99);
  const [originalPrice, setOriginalPrice] = useState(99.99);
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [promoVideoUrl, setPromoVideoUrl] = useState('');
  const [status, setStatus] = useState<'Publicado' | 'Borrador' | 'En Revisión'>('Publicado');

  const openAddCourse = () => {
    setEditingCourse(null);
    setTitle('');
    setCategory('Desarrollo Web');
    setLevel('Todos los niveles');
    setPrice(29.99);
    setOriginalPrice(99.99);
    setShortDescription('');
    setDescription('');
    setThumbnail('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80');
    setPromoVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    setStatus('Publicado');
    setIsCourseModalOpen(true);
  };

  const openEditCourse = (c: Course) => {
    setEditingCourse(c);
    setTitle(c.title);
    setCategory(c.category);
    setLevel(c.level);
    setPrice(c.price);
    setOriginalPrice(c.originalPrice);
    setShortDescription(c.shortDescription);
    setDescription(c.description);
    setThumbnail(c.thumbnail);
    setPromoVideoUrl(c.promoVideoUrl);
    setStatus(c.status as any);
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingCourse) {
      updateCourse(editingCourse.id, {
        title: title.trim(),
        category,
        level,
        price: Number(price),
        originalPrice: Number(originalPrice),
        shortDescription,
        description,
        thumbnail,
        promoVideoUrl,
        status,
      });
    } else {
      addCourse({
        title: title.trim(),
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        level,
        instructorId: currentUser?.id || 'u2',
        instructorName: currentUser?.name || 'Prof. Carlos Santana',
        instructorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        price: Number(price),
        originalPrice: Number(originalPrice),
        shortDescription,
        description,
        thumbnail: thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
        promoVideoUrl: promoVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        status,
        features: [
          'Video de alta calidad en 1080p',
          'Acceso completo de por vida',
          'Certificado de finalización',
          'Archivos y recursos descargables'
        ],
        sections: [],
      });
    }
    setIsCourseModalOpen(false);
  };

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!curriculumCourse || !newSectionTitle.trim()) return;
    addSection(curriculumCourse.id, newSectionTitle.trim());
    setNewSectionTitle('');
    // Refresh curriculumCourse local ref
    const updated = courses.find((c) => c.id === curriculumCourse.id);
    if (updated) setCurriculumCourse(updated);
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!curriculumCourse || !targetSectionId || !lessonTitle.trim()) return;

    addLessonToSection(curriculumCourse.id, targetSectionId, {
      title: lessonTitle.trim(),
      durationMinutes: Number(lessonDuration),
      type: lessonType,
      videoUrl: lessonType === 'video' ? (lessonVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4') : undefined,
      articleContent: lessonType === 'article' ? lessonArticle : undefined,
      quizQuestions: lessonType === 'quiz' ? [
        {
          id: `q-${Date.now()}`,
          question: '¿Qué método se utiliza para persistir y reactivar el estado?',
          options: ['localStorage con Signals', 'Recargar la página con F5', 'Cerrar el navegador', 'Borrar cookies'],
          correctAnswerIndex: 0,
          explanation: 'Signals integrados con persistencia local mantienen el estado sincronizado de forma reactiva.'
        }
      ] : undefined
    });

    setLessonTitle('');
    setTargetSectionId(null);
    const updated = courses.find((c) => c.id === curriculumCourse.id);
    if (updated) setCurriculumCourse(updated);
  };

  const columns: ColumnDef<Course>[] = [
    {
      header: 'Curso',
      accessor: 'title',
      sortable: true,
      render: (_, c) => (
        <div className="flex items-center gap-3">
          <img
            src={c.thumbnail}
            alt={c.title}
            className="h-10 w-16 rounded-lg object-cover ring-1 ring-gray-200"
          />
          <div className="max-w-xs">
            <div className="font-bold text-gray-900 truncate" title={c.title}>
              {c.title}
            </div>
            <div className="text-[11px] text-gray-400">
              {c.category} • {c.level}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Instructor',
      accessor: 'instructorName',
      sortable: true,
      render: (_, c) => (
        <div className="flex items-center gap-2">
          <img
            src={c.instructorAvatar}
            alt={c.instructorName}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-xs text-gray-700 font-medium">{c.instructorName}</span>
        </div>
      ),
    },
    {
      header: 'Precio',
      accessor: 'price',
      sortable: true,
      render: (price, c) => (
        <div>
          <span className="font-bold text-gray-900">${price.toFixed(2)}</span>
          <span className="ml-1.5 text-[11px] text-gray-400 line-through">
            ${c.originalPrice.toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      header: 'Alumnos',
      accessor: 'studentsCount',
      sortable: true,
      render: (count) => (
        <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
          <Users className="h-3.5 w-3.5 text-indigo-500" />
          <span>{count.toLocaleString()}</span>
        </div>
      ),
    },
    {
      header: 'Valoración',
      accessor: 'rating',
      sortable: true,
      render: (rating, c) => (
        <div className="flex items-center gap-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
          <span className="text-[10px] text-gray-400">({c.ratingCount})</span>
        </div>
      ),
    },
    {
      header: 'Estado',
      accessor: 'status',
      sortable: true,
      render: (status) => {
        const colors: Record<string, string> = {
          Publicado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          Borrador: 'bg-gray-100 text-gray-600 border-gray-200',
          'En Revisión': 'bg-amber-50 text-amber-700 border-amber-200',
        };
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
              colors[status] || 'bg-gray-100 text-gray-600'
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <CrudTable<Course>
        title="Catálogo y Módulos de Cursos"
        subtitle="Administra lecciones en video, quizzes interactivos, precios y exporta el catálogo a Excel."
        data={courses}
        columns={columns}
        searchPlaceholder="Buscar por título, categoría o instructor..."
        searchFields={['title', 'category', 'instructorName', 'level']}
        onAdd={openAddCourse}
        addLabel="Crear Curso"
        excelFileName="reporte_cursos_plataforma"
        excelColumns={[
          { header: 'ID', key: 'id' },
          { header: 'Título del Curso', key: 'title' },
          { header: 'Categoría', key: 'category' },
          { header: 'Nivel', key: 'level' },
          { header: 'Instructor', key: 'instructorName' },
          { header: 'Precio (USD)', key: 'price' },
          { header: 'Alumnos Inscritos', key: 'studentsCount' },
          { header: 'Calificación', key: 'rating' },
          { header: 'Estado', key: 'status' },
          { header: 'Total Secciones', key: 'sections', formatter: (val) => val ? val.length : 0 },
        ]}
        actions={(course) => (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigateToCourse(course.id)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              title="Abrir en Reproductor / Vista Alumno"
            >
              <PlaySquare className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => {
                setCurriculumCourse(course);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              title="Editar Contenido y Lecciones"
            >
              <Layers className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => openEditCourse(course)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              title="Editar información general"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => {
                if (confirm(`¿Estás seguro de eliminar el curso "${course.title}"?`)) {
                  deleteCourse(course.id);
                }
              }}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              title="Eliminar curso"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      />

      {/* Course Add / Edit Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-gray-100">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 backdrop-blur-md px-6 py-4">
              <h3 className="text-sm font-bold text-gray-900">
                {editingCourse ? 'Editar Información del Curso' : 'Crear Nuevo Curso'}
              </h3>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Título del Curso *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                  placeholder="ej. Angular 18 Enterprise & Microfrontends"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-white"
                  >
                    <option value="Desarrollo Web">Desarrollo Web</option>
                    <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                    <option value="Diseño y UI/UX">Diseño y UI/UX</option>
                    <option value="Bases de Datos">Bases de Datos</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Nivel
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-white"
                  >
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Todos los niveles">Todos los niveles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-white"
                  >
                    <option value="Publicado">Publicado</option>
                    <option value="Borrador">Borrador</option>
                    <option value="En Revisión">En Revisión</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Precio Oferta (USD $)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Precio Regular (Tachado)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Descripción Corta (Hero)
                </label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                  placeholder="Resumen en una frase atractiva para los estudiantes..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Descripción Completa
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                  placeholder="Qué aprenderán, requisitos previos y objetivos del curso..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    URL Miniatura (Imagen)
                  </label>
                  <input
                    type="url"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    URL Video Promocional / Trailer (.mp4)
                  </label>
                  <input
                    type="url"
                    value={promoVideoUrl}
                    onChange={(e) => setPromoVideoUrl(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
                >
                  {editingCourse ? 'Guardar Cambios' : 'Crear Curso'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Curriculum / Lessons Builder Modal */}
      {curriculumCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-6 py-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Plan de Estudios: <span className="text-indigo-600">{curriculumCourse.title}</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Organiza las secciones, lecciones en video y cuestionarios interactivos.
                </p>
              </div>
              <button
                onClick={() => setCurriculumCourse(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Add New Section form */}
              <form onSubmit={handleAddSection} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  placeholder="Título de la nueva sección (ej. Módulo 3: Pruebas Unitarias)"
                  className="flex-1 rounded-xl border border-gray-300 px-3.5 py-2 text-xs text-gray-900 focus:border-indigo-500 outline-hidden"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Agregar Módulo
                </button>
              </form>

              {/* Sections list */}
              <div className="space-y-4">
                {curriculumCourse.sections.map((section, idx) => (
                  <div
                    key={section.id}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-700">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900">{section.title}</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setTargetSectionId(targetSectionId === section.id ? null : section.id);
                        }}
                        className="flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100"
                      >
                        <Plus className="h-3 w-3" />
                        Agregar Lección
                      </button>
                    </div>

                    {/* Lesson creation sub-form */}
                    {targetSectionId === section.id && (
                      <form
                        onSubmit={handleAddLesson}
                        className="rounded-xl bg-gray-50 p-3.5 border border-indigo-100 space-y-3"
                      >
                        <div className="text-xs font-bold text-indigo-900">
                          Nueva Lección para: {section.title}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="Título de la lección"
                            value={lessonTitle}
                            onChange={(e) => setLessonTitle(e.target.value)}
                            className="md:col-span-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:border-indigo-500 outline-hidden"
                          />
                          <select
                            value={lessonType}
                            onChange={(e) => setLessonType(e.target.value as any)}
                            className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900 outline-hidden"
                          >
                            <option value="video">Video Clase</option>
                            <option value="quiz">Quiz Interactivo</option>
                            <option value="article">Artículo / Lectura</option>
                          </select>
                        </div>

                        {lessonType === 'video' && (
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              type="url"
                              placeholder="URL del Video (.mp4 / streaming)"
                              value={lessonVideoUrl}
                              onChange={(e) => setLessonVideoUrl(e.target.value)}
                              className="col-span-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 outline-hidden"
                            />
                            <input
                              type="number"
                              placeholder="Minutos"
                              value={lessonDuration}
                              onChange={(e) => setLessonDuration(parseInt(e.target.value) || 5)}
                              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 outline-hidden"
                            />
                          </div>
                        )}

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setTargetSectionId(null)}
                            className="rounded-lg px-3 py-1 text-xs text-gray-500 hover:bg-gray-200"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
                          >
                            Guardar Lección
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Lessons list in section */}
                    <div className="space-y-1.5">
                      {section.lessons.length === 0 ? (
                        <p className="text-[11px] text-gray-400 italic py-1">
                          No hay lecciones en esta sección todavía.
                        </p>
                      ) : (
                        section.lessons.map((lesson, lIdx) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between rounded-xl bg-gray-50/70 px-3 py-2 text-xs hover:bg-gray-100/80 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              {lesson.type === 'video' && (
                                <Video className="h-3.5 w-3.5 text-indigo-600" />
                              )}
                              {lesson.type === 'quiz' && (
                                <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
                              )}
                              {lesson.type === 'article' && (
                                <FileText className="h-3.5 w-3.5 text-emerald-600" />
                              )}
                              <span className="font-medium text-gray-800">{lesson.title}</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-[11px] text-gray-400 font-mono">
                                {lesson.durationMinutes} min
                              </span>
                              <button
                                onClick={() => deleteLesson(curriculumCourse.id, section.id, lesson.id)}
                                className="text-gray-400 hover:text-rose-600 p-0.5"
                                title="Eliminar lección"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 text-right">
              <button
                type="button"
                onClick={() => setCurriculumCourse(null)}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Listo y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
