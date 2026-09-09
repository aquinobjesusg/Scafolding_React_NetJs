import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, CourseSection, Lesson, SystemConfig, Transaction } from '../types';
import { INITIAL_CONFIG, INITIAL_COURSES, INITIAL_TRANSACTIONS } from '../mockData';
import { useAuth } from './AuthContext';

interface CourseContextType {
  courses: Course[];
  transactions: Transaction[];
  systemConfig: SystemConfig;
  activeCourse: Course | null;
  activeLesson: Lesson | null;
  completedLessons: Record<string, string[]>; // courseId -> array of lessonIds
  
  // Navigation & Player
  setActiveCourseById: (courseId: string, lessonId?: string) => void;
  setActiveLesson: (lesson: Lesson) => void;
  toggleLessonCompletion: (courseId: string, lessonId: string) => void;
  getCourseProgressPercent: (courseId: string) => number;
  isUserEnrolled: (courseId: string) => boolean;

  // Course CRUD
  addCourse: (course: Omit<Course, 'id' | 'rating' | 'ratingCount' | 'studentsCount' | 'updatedAt'>) => Course;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  
  // Curriculum management within course
  addSection: (courseId: string, title: string) => void;
  addLessonToSection: (courseId: string, sectionId: string, lesson: Omit<Lesson, 'id'>) => void;
  deleteLesson: (courseId: string, sectionId: string, lessonId: string) => void;

  // Payments and Transactions
  processPayment: (
    course: Course,
    paymentMethod: 'Tarjeta de Crédito' | 'PayPal' | 'Mercado Pago' | 'Transferencia',
    finalAmount: number
  ) => { success: boolean; transaction: Transaction };
  refundTransaction: (transactionId: string) => void;

  // System Configuration
  updateSystemConfig: (updates: Partial<SystemConfig>) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, updateUser } = useAuth();

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('edupro_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('edupro_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [systemConfig, setSystemConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('edupro_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('edupro_completed_lessons');
    if (saved) return JSON.parse(saved);
    // Initial completed lessons for sample course c1
    return {
      c1: ['l1', 'l2'],
    };
  });

  useEffect(() => {
    localStorage.setItem('edupro_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('edupro_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('edupro_config', JSON.stringify(systemConfig));
  }, [systemConfig]);

  useEffect(() => {
    localStorage.setItem('edupro_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const setActiveCourseById = (courseId: string, lessonId?: string) => {
    const found = courses.find((c) => c.id === courseId);
    if (!found) return;
    setActiveCourse(found);

    if (lessonId) {
      for (const sec of found.sections) {
        const l = sec.lessons.find((item) => item.id === lessonId);
        if (l) {
          setActiveLesson(l);
          return;
        }
      }
    }

    // Default to first lesson of first section
    if (found.sections.length > 0 && found.sections[0].lessons.length > 0) {
      setActiveLesson(found.sections[0].lessons[0]);
    } else {
      setActiveLesson(null);
    }
  };

  const toggleLessonCompletion = (courseId: string, lessonId: string) => {
    setCompletedLessons((prev) => {
      const currentList = prev[courseId] || [];
      const exists = currentList.includes(lessonId);
      const updated = exists
        ? currentList.filter((id) => id !== lessonId)
        : [...currentList, lessonId];
      return { ...prev, [courseId]: updated };
    });
  };

  const getCourseProgressPercent = (courseId: string): number => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || course.sections.length === 0) return 0;
    
    let totalLessons = 0;
    course.sections.forEach((s) => {
      totalLessons += s.lessons.length;
    });

    if (totalLessons === 0) return 0;
    const completedCount = (completedLessons[courseId] || []).length;
    return Math.min(100, Math.round((completedCount / totalLessons) * 100));
  };

  const isUserEnrolled = (courseId: string): boolean => {
    if (!currentUser) return false;
    // Admins and instructors of that course always have access
    if (currentUser.role === 'ADMIN') return true;
    const course = courses.find((c) => c.id === courseId);
    if (course && course.instructorId === currentUser.id) return true;
    return currentUser.enrolledCourses?.includes(courseId) || false;
  };

  const addCourse = (
    courseData: Omit<Course, 'id' | 'rating' | 'ratingCount' | 'studentsCount' | 'updatedAt'>
  ): Course => {
    const newCourse: Course = {
      ...courseData,
      id: `c-${Date.now()}`,
      rating: 5.0,
      ratingCount: 1,
      studentsCount: 0,
      updatedAt: new Date().toISOString().split('T')[0],
      sections: courseData.sections || [
        {
          id: `s-${Date.now()}`,
          title: 'Módulo 1: Introducción y Fundamentos',
          order: 1,
          lessons: [
            {
              id: `l-${Date.now()}`,
              title: '1. Bienvenida al curso',
              durationMinutes: 10,
              type: 'video',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            }
          ]
        }
      ]
    };

    setCourses((prev) => [newCourse, ...prev]);
    return newCourse;
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : c
      )
    );
    if (activeCourse?.id === id) {
      setActiveCourse((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    if (activeCourse?.id === id) {
      setActiveCourse(null);
      setActiveLesson(null);
    }
  };

  const addSection = (courseId: string, title: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const newSec: CourseSection = {
            id: `s-${Date.now()}`,
            title,
            order: c.sections.length + 1,
            lessons: [],
          };
          return { ...c, sections: [...c.sections, newSec] };
        }
        return c;
      })
    );
  };

  const addLessonToSection = (
    courseId: string,
    sectionId: string,
    lessonData: Omit<Lesson, 'id'>
  ) => {
    const newLesson: Lesson = {
      ...lessonData,
      id: `l-${Date.now()}`,
    };

    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedSections = c.sections.map((sec) => {
            if (sec.id === sectionId) {
              return { ...sec, lessons: [...sec.lessons, newLesson] };
            }
            return sec;
          });
          return { ...c, sections: updatedSections };
        }
        return c;
      })
    );
  };

  const deleteLesson = (courseId: string, sectionId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedSections = c.sections.map((sec) => {
            if (sec.id === sectionId) {
              return { ...sec, lessons: sec.lessons.filter((l) => l.id !== lessonId) };
            }
            return sec;
          });
          return { ...c, sections: updatedSections };
        }
        return c;
      })
    );
  };

  const processPayment = (
    course: Course,
    paymentMethod: 'Tarjeta de Crédito' | 'PayPal' | 'Mercado Pago' | 'Transferencia',
    finalAmount: number
  ) => {
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`,
      transactionCode: `TRX-${Date.now().toString().slice(-8)}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Cliente Invitado',
      userEmail: currentUser?.email || 'cliente@correo.com',
      courseId: course.id,
      courseTitle: course.title,
      amount: finalAmount,
      currency: systemConfig.currency,
      paymentMethod,
      status: 'Completado',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    // Increment students count for course
    setCourses((prev) =>
      prev.map((c) =>
        c.id === course.id ? { ...c, studentsCount: c.studentsCount + 1 } : c
      )
    );

    // Add course to user enrolledCourses
    if (currentUser) {
      const currentEnrolled = currentUser.enrolledCourses || [];
      if (!currentEnrolled.includes(course.id)) {
        updateUser(currentUser.id, {
          enrolledCourses: [...currentEnrolled, course.id],
        });
      }
    }

    return { success: true, transaction: newTransaction };
  };

  const refundTransaction = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId ? { ...t, status: 'Reembolsado' } : t
      )
    );
  };

  const updateSystemConfig = (updates: Partial<SystemConfig>) => {
    setSystemConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        transactions,
        systemConfig,
        activeCourse,
        activeLesson,
        completedLessons,
        setActiveCourseById,
        setActiveLesson,
        toggleLessonCompletion,
        getCourseProgressPercent,
        isUserEnrolled,
        addCourse,
        updateCourse,
        deleteCourse,
        addSection,
        addLessonToSection,
        deleteLesson,
        processPayment,
        refundTransaction,
        updateSystemConfig,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
