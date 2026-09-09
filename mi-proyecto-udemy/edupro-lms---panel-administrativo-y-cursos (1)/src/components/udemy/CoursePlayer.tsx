import React, { useState, useRef, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { Lesson, QuizQuestion } from '../../types';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  FileText, 
  HelpCircle, 
  Video as VideoIcon, 
  Download, 
  PenSquare, 
  Save, 
  Share2, 
  X, 
  ArrowLeft,
  Settings2,
  Check
} from 'lucide-react';

interface CoursePlayerProps {
  onBackToCatalog: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ onBackToCatalog }) => {
  const { 
    activeCourse, 
    activeLesson, 
    setActiveLesson, 
    completedLessons, 
    toggleLessonCompletion, 
    getCourseProgressPercent 
  } = useCourse();
  const { currentUser } = useAuth();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Player controls state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Tabs state: 'overview' | 'notes' | 'resources'
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources'>('overview');
  
  // Student scratchpad notes state
  const [studentNote, setStudentNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('edupro_student_notes');
    return saved ? JSON.parse(saved) : {};
  });
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Certificate Modal
  const [showCertificate, setShowCertificate] = useState(false);

  if (!activeCourse) {
    return (
      <div className="p-12 text-center">
        <p className="text-sm text-gray-500">No hay ningún curso seleccionado.</p>
        <button
          onClick={onBackToCatalog}
          className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  // Load lesson notes
  useEffect(() => {
    if (activeLesson) {
      setStudentNote(savedNotes[activeLesson.id] || '');
      // Reset quiz state
      setSelectedAnswers({});
      setQuizSubmitted(false);
    }
  }, [activeLesson]);

  const handleSaveNote = () => {
    if (!activeLesson) return;
    const updated = { ...savedNotes, [activeLesson.id]: studentNote };
    setSavedNotes(updated);
    localStorage.setItem('edupro_student_notes', JSON.stringify(updated));
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  // Video event handlers
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (!duration && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const target = parseFloat(e.target.value);
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const val = parseFloat(e.target.value);
    setVolume(val);
    videoRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const changeSpeed = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (activeLesson) {
      toggleLessonCompletion(activeCourse.id, activeLesson.id);
    }
    // Auto advance to next lesson
    advanceToNextLesson();
  };

  const advanceToNextLesson = () => {
    let foundCurrent = false;
    for (const sec of activeCourse.sections) {
      for (const les of sec.lessons) {
        if (foundCurrent) {
          setActiveLesson(les);
          return;
        }
        if (les.id === activeLesson?.id) {
          foundCurrent = true;
        }
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = getCourseProgressPercent(activeCourse.id);
  const isLessonCompleted = (lessonId: string) => {
    return (completedLessons[activeCourse.id] || []).includes(lessonId);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-gray-950 text-white">
      {/* Top Bar for Learning Mode */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalog}
            className="flex items-center gap-1.5 rounded-lg bg-gray-800 px-2.5 py-1.5 text-xs font-semibold text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al Catálogo</span>
          </button>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span className="text-xs font-bold text-gray-200 truncate max-w-md">
            {activeCourse.title}
          </span>
        </div>

        {/* Progress & Certificate */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 hidden md:inline">Tu progreso:</span>
            <span className="font-mono font-bold text-emerald-400">{progressPercent}%</span>
            <div className="h-2 w-20 rounded-full bg-gray-800 overflow-hidden hidden sm:block">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setShowCertificate(true)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              progressPercent === 100
                ? 'bg-amber-500 text-gray-950 hover:bg-amber-400 shadow-md animate-pulse'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Certificado {progressPercent === 100 ? '¡Listo!' : ''}</span>
          </button>
        </div>
      </div>

      {/* Main Learning Canvas: Video / Quiz + Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side: Video Player or Interactive Quiz */}
        <div className="flex-1 flex flex-col bg-black">
          {/* Main Media Container */}
          <div className="relative aspect-video w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden group">
            {/* 1. If Video Lesson */}
            {activeLesson?.type === 'video' ? (
              <>
                <video
                  ref={videoRef}
                  src={activeLesson.videoUrl || activeCourse.promoVideoUrl}
                  className="h-full w-full object-contain"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleVideoEnded}
                  onClick={handlePlayPause}
                />

                {/* Video Controls Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
                  {/* Scrubber Progress Bar */}
                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  {/* Buttons Bar */}
                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handlePlayPause}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                      </button>

                      {/* Volume */}
                      <div className="flex items-center gap-1.5">
                        <button onClick={toggleMute} className="text-gray-300 hover:text-white">
                          {isMuted || volume === 0 ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-16 h-1 bg-gray-700 rounded appearance-none accent-indigo-500"
                        />
                      </div>

                      {/* Time display */}
                      <span className="font-mono text-[11px] text-gray-300">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Speed selector */}
                      <div className="relative">
                        <button
                          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                          className="rounded px-2 py-1 bg-white/10 text-[11px] font-bold hover:bg-white/20"
                        >
                          {playbackRate}x
                        </button>
                        {showSpeedMenu && (
                          <div className="absolute bottom-8 right-0 rounded-xl bg-gray-900 border border-gray-700 p-1 text-xs shadow-xl space-y-0.5">
                            {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                              <button
                                key={rate}
                                onClick={() => changeSpeed(rate)}
                                className={`block w-full text-left px-3 py-1 rounded-lg ${
                                  playbackRate === rate ? 'bg-indigo-600 text-white font-bold' : 'text-gray-300 hover:bg-gray-800'
                                }`}
                              >
                                {rate}x
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Fullscreen */}
                      <button
                        onClick={toggleFullscreen}
                        className="text-gray-300 hover:text-white"
                        title="Pantalla completa"
                      >
                        <Maximize className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : activeLesson?.type === 'quiz' ? (
              /* 2. If Interactive Quiz Lesson */
              <div className="h-full w-full overflow-y-auto bg-gray-900 p-6 sm:p-10 text-left">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="flex items-center gap-2 text-amber-400">
                    <HelpCircle className="h-6 w-6" />
                    <h3 className="text-lg font-bold text-white">
                      Cuestionario Interactivo de Evaluación
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400">
                    Responde a las siguientes preguntas para validar los conceptos aprendidos en este módulo.
                  </p>

                  <div className="space-y-6">
                    {activeLesson.quizQuestions?.map((q, qIdx) => (
                      <div
                        key={q.id}
                        className="rounded-2xl border border-gray-800 bg-gray-950 p-5 space-y-3"
                      >
                        <div className="text-sm font-bold text-gray-200">
                          {qIdx + 1}. {q.question}
                        </div>

                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedAnswers[q.id] === optIdx;
                            const isCorrect = q.correctAnswerIndex === optIdx;

                            let optStyle = 'border-gray-800 bg-gray-900/60 text-gray-300 hover:bg-gray-800';
                            if (quizSubmitted) {
                              if (isCorrect) {
                                optStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold';
                              } else if (isSelected && !isCorrect) {
                                optStyle = 'border-rose-500 bg-rose-950/40 text-rose-300';
                              }
                            } else if (isSelected) {
                              optStyle = 'border-indigo-500 bg-indigo-950/40 text-indigo-300 font-bold';
                            }

                            return (
                              <div
                                key={optIdx}
                                onClick={() => {
                                  if (!quizSubmitted) {
                                    setSelectedAnswers({ ...selectedAnswers, [q.id]: optIdx });
                                  }
                                }}
                                className={`flex items-center gap-3 rounded-xl border p-3 text-xs cursor-pointer transition-all ${optStyle}`}
                              >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-700 text-[10px] font-bold">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="rounded-xl bg-gray-900 p-3 text-xs text-gray-300 border border-gray-800">
                            <strong className="text-indigo-400">Explicación:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Quiz Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    {!quizSubmitted ? (
                      <button
                        onClick={() => {
                          setQuizSubmitted(true);
                          if (activeLesson) {
                            toggleLessonCompletion(activeCourse.id, activeLesson.id);
                          }
                        }}
                        className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                      >
                        Evaluar y Completar
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4" /> Lección completada exitosamente
                        </span>
                        <button
                          onClick={advanceToNextLesson}
                          className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                        >
                          Siguiente Lección →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* 3. Article / Reading Lesson */
              <div className="h-full w-full overflow-y-auto bg-gray-900 p-6 sm:p-10 text-left">
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <FileText className="h-5 w-5" />
                    <h3 className="text-lg font-bold text-white">{activeLesson?.title}</h3>
                  </div>
                  <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 text-sm text-gray-300 leading-relaxed space-y-4">
                    <p>{activeLesson?.articleContent}</p>
                    <div className="rounded-xl bg-indigo-950/40 border border-indigo-900/60 p-4 text-xs text-indigo-300">
                      💡 <strong>Consejo del Instructor:</strong> Te recomendamos tomar notas de estos lineamientos para implementarlos en tus proyectos reales de producción.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (activeLesson) toggleLessonCompletion(activeCourse.id, activeLesson.id);
                    }}
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    Marcar lectura como completada
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Details & Interactive Scratchpad Tabs */}
          <div className="flex-1 bg-gray-900 p-6 border-t border-gray-800">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
              <div className="flex items-center gap-4 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 transition-colors ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-indigo-500 text-indigo-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Descripción de la Lección
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'notes'
                      ? 'border-b-2 border-indigo-500 text-indigo-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <PenSquare className="h-3.5 w-3.5" />
                  <span>Mis Notas Personales</span>
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`pb-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'resources'
                      ? 'border-b-2 border-indigo-500 text-indigo-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Archivos Descargables</span>
                </button>
              </div>

              {activeLesson && (
                <button
                  onClick={() => toggleLessonCompletion(activeCourse.id, activeLesson.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    isLessonCompleted(activeLesson.id)
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {isLessonCompleted(activeLesson.id) ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Lección Completada</span>
                    </>
                  ) : (
                    <>
                      <Circle className="h-3.5 w-3.5" />
                      <span>Marcar como vista</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-2 text-xs text-gray-300">
                <h4 className="text-sm font-bold text-white">{activeLesson?.title}</h4>
                <p className="text-gray-400 leading-relaxed">
                  En esta clase aprenderás los conceptos fundamentales de esta sección, complementados con demostraciones prácticas sobre el código fuente de ejemplo.
                </p>
                <div className="text-[11px] text-gray-500 pt-2">
                  Instructor: <strong className="text-gray-300">{activeCourse.instructorName}</strong> • Duración:{' '}
                  {activeLesson?.durationMinutes} minutos
                </div>
              </div>
            )}

            {/* Tab: Notes (Real Scratchpad) */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Tus apuntes se guardan localmente para que puedas repasarlos cuando quieras.
                  </span>
                  {noteSavedFeedback && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> ¡Apuntes guardados!
                    </span>
                  )}
                </div>
                <textarea
                  rows={4}
                  value={studentNote}
                  onChange={(e) => setStudentNote(e.target.value)}
                  placeholder="Escribe aquí tus apuntes, dudas o comandos de esta lección..."
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 p-3 text-xs text-gray-200 placeholder-gray-500 focus:border-indigo-500 outline-hidden"
                />
                <button
                  onClick={handleSaveNote}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Guardar Apuntes</span>
                </button>
              </div>
            )}

            {/* Tab: Resources */}
            {activeTab === 'resources' && (
              <div className="space-y-2 text-xs">
                {activeLesson?.resources && activeLesson.resources.length > 0 ? (
                  activeLesson.resources.map((res, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-950 p-3 hover:border-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-indigo-400" />
                        <div>
                          <div className="font-semibold text-gray-200">{res.name}</div>
                          <div className="text-[10px] text-gray-500">{res.size}</div>
                        </div>
                      </div>
                      <a
                        href={res.url}
                        download
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Descargando archivo adjunto: ${res.name}`);
                        }}
                        className="flex items-center gap-1 rounded-lg bg-gray-800 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-gray-700"
                      >
                        <Download className="h-3 w-3" />
                        <span>Descargar</span>
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic py-2">
                    No hay archivos adjuntos específicos en esta lección.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Course Curriculum Sidebar (Udemy Style Playlist) */}
        <div className="w-full lg:w-80 border-l border-gray-800 bg-gray-900 flex flex-col h-auto lg:h-[calc(100vh-7rem)] overflow-y-auto">
          <div className="p-4 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Contenido del Curso
            </h3>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-gray-400">Lecciones completadas:</span>
              <span className="font-bold text-emerald-400">
                {(completedLessons[activeCourse.id] || []).length} /{' '}
                {activeCourse.sections.reduce((acc, s) => acc + s.lessons.length, 0)}
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-800/80 flex-1">
            {activeCourse.sections.map((section, sIdx) => (
              <div key={section.id} className="p-3">
                <div className="text-[11px] font-bold text-gray-400 mb-2">
                  Sección {sIdx + 1}: {section.title}
                </div>

                <div className="space-y-1">
                  {section.lessons.map((lesson) => {
                    const isActive = activeLesson?.id === lesson.id;
                    const isDone = isLessonCompleted(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`group flex items-start gap-2.5 rounded-xl p-2.5 text-xs cursor-pointer transition-all ${
                          isActive
                            ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                            : 'hover:bg-gray-800/70 text-gray-300'
                        }`}
                      >
                        {/* Checkbox button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonCompletion(activeCourse.id, lesson.id);
                          }}
                          className="mt-0.5 text-gray-500 hover:text-emerald-400"
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-600 group-hover:text-gray-400" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 font-medium truncate">
                            {lesson.type === 'video' && (
                              <VideoIcon className="h-3 w-3 text-indigo-400 shrink-0" />
                            )}
                            {lesson.type === 'quiz' && (
                              <HelpCircle className="h-3 w-3 text-amber-400 shrink-0" />
                            )}
                            {lesson.type === 'article' && (
                              <FileText className="h-3 w-3 text-emerald-400 shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                            {lesson.durationMinutes} min
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white text-gray-900 shadow-2xl p-8 border-8 border-indigo-900/10 text-center space-y-6">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Certificate Border decoration */}
            <div className="border-4 border-dashed border-indigo-200 rounded-2xl p-8 space-y-4">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl">
                  <Award className="h-10 w-10 text-amber-300" />
                </div>
              </div>

              <div className="uppercase tracking-widest text-xs font-black text-indigo-600">
                Certificado de Finalización Académica
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-black text-gray-900">
                {currentUser?.name || 'Estudiante Destacado'}
              </h2>

              <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                Ha completado satisfactoriamente el plan de estudios interactivo, evaluaciones y horas prácticas del curso profesional:
              </p>

              <h3 className="text-base sm:text-lg font-bold text-indigo-950 font-serif">
                "{activeCourse.title}"
              </h3>

              <div className="flex justify-between items-end pt-8 text-xs border-t border-gray-100 max-w-md mx-auto">
                <div className="text-center">
                  <div className="font-serif italic font-bold text-gray-800">Prof. Carlos Santana</div>
                  <div className="text-[10px] text-gray-400">Firma del Instructor</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-gray-700">{new Date().toISOString().split('T')[0]}</div>
                  <div className="text-[10px] text-gray-400">Fecha de Emisión</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-xs font-bold text-indigo-600">ID: CERT-{Date.now().toString().slice(-6)}</div>
                  <div className="text-[10px] text-gray-400">Código Verificable</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700"
              >
                <Download className="h-4 w-4" />
                <span>Imprimir / Guardar Diploma en PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
