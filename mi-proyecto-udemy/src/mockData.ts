import { Course, Permission, Role, SystemConfig, Transaction, User } from './types';

export const INITIAL_PERMISSIONS: Permission[] = [
  { id: 'p1', name: 'Ver Cursos', code: 'courses.read', category: 'Cursos', description: 'Permite visualizar el catálogo y contenido de los cursos' },
  { id: 'p2', name: 'Crear Cursos', code: 'courses.create', category: 'Cursos', description: 'Permite crear nuevos cursos, módulos y lecciones' },
  { id: 'p3', name: 'Editar Cursos', code: 'courses.update', category: 'Cursos', description: 'Permite modificar contenido, precios y estados de cursos' },
  { id: 'p4', name: 'Eliminar Cursos', code: 'courses.delete', category: 'Cursos', description: 'Permite archivar o eliminar cursos del sistema' },
  
  { id: 'p5', name: 'Ver Usuarios', code: 'users.read', category: 'Usuarios', description: 'Permite listar los usuarios registrados' },
  { id: 'p6', name: 'Gestionar Usuarios', code: 'users.manage', category: 'Usuarios', description: 'Permite crear, actualizar y suspender usuarios' },
  { id: 'p7', name: 'Gestionar Roles', code: 'roles.manage', category: 'Usuarios', description: 'Permite administrar roles y asignar permisos' },
  
  { id: 'p8', name: 'Ver Reportes', code: 'reports.read', category: 'Reportes', description: 'Acceso al módulo de analíticas y reportes dinámicos' },
  { id: 'p9', name: 'Exportar Reportes', code: 'reports.export', category: 'Reportes', description: 'Permite descargar datos y analíticas en formato Excel' },
  
  { id: 'p10', name: 'Ver Transacciones', code: 'finance.read', category: 'Finanzas', description: 'Historial de pagos, ingresos y comisiones' },
  { id: 'p11', name: 'Gestionar Reembolsos', code: 'finance.refund', category: 'Finanzas', description: 'Procesar reembolsos de compras a estudiantes' },
  
  { id: 'p12', name: 'Configuración General', code: 'settings.manage', category: 'Configuración', description: 'Editar pasarelas de pago, correos y parámetros globales' },
];

export const INITIAL_ROLES: Role[] = [
  {
    id: 'r1',
    name: 'Super Administrador',
    code: 'ADMIN',
    description: 'Control total de la plataforma, usuarios, finanzas y configuraciones avanzadas.',
    userCount: 2,
    permissions: INITIAL_PERMISSIONS.map(p => p.code),
    isSystem: true,
  },
  {
    id: 'r2',
    name: 'Instructor Titular',
    code: 'INSTRUCTOR',
    description: 'Crea cursos, publica lecciones, gestiona estudiantes y revisa métricas de sus clases.',
    userCount: 5,
    permissions: ['courses.read', 'courses.create', 'courses.update', 'reports.read', 'reports.export'],
    isSystem: true,
  },
  {
    id: 'r3',
    name: 'Estudiante',
    code: 'STUDENT',
    description: 'Acceso a cursos adquiridos, reproductor interactivo, quizzes y certificados.',
    userCount: 34,
    permissions: ['courses.read'],
    isSystem: true,
  },
  {
    id: 'r4',
    name: 'Editor de Contenido',
    code: 'EDITOR',
    description: 'Revisa ortografía, recursos y optimización de lecciones en borrador.',
    userCount: 3,
    permissions: ['courses.read', 'courses.update', 'reports.read'],
    isSystem: false,
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alejandro Morales (Admin)',
    email: 'admin@edupro.com',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Activo',
    createdAt: '2025-01-10',
    lastLogin: '2026-09-08 18:32',
    enrolledCourses: ['c1', 'c2', 'c3'],
  },
  {
    id: 'u2',
    name: 'Prof. Carlos Santana',
    email: 'carlos@edupro.com',
    role: 'INSTRUCTOR',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'Activo',
    createdAt: '2025-02-14',
    lastLogin: '2026-09-07 14:15',
    coursesCreated: 4,
    enrolledCourses: ['c1'],
  },
  {
    id: 'u3',
    name: 'Dra. Elena Valenzuela',
    email: 'elena@edupro.com',
    role: 'INSTRUCTOR',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'Activo',
    createdAt: '2025-03-01',
    lastLogin: '2026-09-05 09:20',
    coursesCreated: 3,
    enrolledCourses: ['c2'],
  },
  {
    id: 'u4',
    name: 'María Fernández',
    email: 'maria@edupro.com',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'Activo',
    createdAt: '2025-05-19',
    lastLogin: '2026-09-08 19:10',
    enrolledCourses: ['c1', 'c3'],
  },
  {
    id: 'u5',
    name: 'Javier Domínguez',
    email: 'javier@edupro.com',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'Activo',
    createdAt: '2025-06-22',
    lastLogin: '2026-09-06 21:04',
    enrolledCourses: ['c2'],
  },
  {
    id: 'u6',
    name: 'Lucía Méndez',
    email: 'lucia@edupro.com',
    role: 'EDITOR',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'Activo',
    createdAt: '2025-07-08',
    lastLogin: '2026-09-04 11:45',
    enrolledCourses: [],
  },
  {
    id: 'u7',
    name: 'Rodrigo Benítez',
    email: 'rodrigo@inactivo.com',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    status: 'Inactivo',
    createdAt: '2025-08-11',
    lastLogin: '2026-08-10 16:30',
    enrolledCourses: [],
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Angular 18 & TypeScript Enterprise: De Cero a Arquitectura Cloud',
    slug: 'angular-18-typescript-enterprise',
    shortDescription: 'Domina Signals, SSR con Hydration, RxJS, NgRx Store, Standalone Components y Microfrontends.',
    description: 'El curso definitivo para desarrolladores que buscan construir sistemas escalables de nivel empresarial. Aprenderás las últimas novedades de Angular 18, control de estado reactivo, autenticación JWT, guards, interceptores y despliegue automatizado.',
    category: 'Desarrollo Web',
    level: 'Intermedio',
    instructorId: 'u2',
    instructorName: 'Prof. Carlos Santana',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    price: 34.99,
    originalPrice: 129.99,
    rating: 4.9,
    ratingCount: 1420,
    studentsCount: 8940,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    status: 'Publicado',
    updatedAt: '2026-09-01',
    features: [
      '42 horas de video en alta definición (1080p)',
      '18 lecciones interactivas con Quizzes de evaluación',
      'Código fuente descargable en GitHub',
      'Acceso de por vida en móviles y escritorio',
      'Certificado de finalización oficial'
    ],
    sections: [
      {
        id: 's1',
        title: 'Sección 1: Fundamentos Modernos y Angular Signals',
        order: 1,
        lessons: [
          {
            id: 'l1',
            title: '1. Bienvenida al curso y arquitectura de la plataforma',
            durationMinutes: 9,
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            isCompleted: true,
            resources: [
              { name: 'Diapositivas_Bienvenida.pdf', url: '#', size: '2.4 MB' },
              { name: 'Guia_Instalacion_Node_AngularCLI.txt', url: '#', size: '12 KB' }
            ]
          },
          {
            id: 'l2',
            title: '2. Configuración del Entorno de Desarrollo y Standalone Components',
            durationMinutes: 14,
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isCompleted: true,
            resources: [{ name: 'starter-workspace.zip', url: '#', size: '8.1 MB' }]
          },
          {
            id: 'l3',
            title: '3. Quiz Interactivo: Conceptos clave de Signals vs RxJS',
            durationMinutes: 6,
            type: 'quiz',
            isCompleted: false,
            quizQuestions: [
              {
                id: 'q1',
                question: '¿Cuál es la principal ventaja de Signals en el Change Detection de Angular?',
                options: [
                  'Elimina por completo la necesidad de TypeScript en el navegador.',
                  'Permite Change Detection a nivel granular sin necesidad de recorrer todo el árbol con Zone.js.',
                  'Aumenta el tamaño del bundle para admitir polyfills antiguos.',
                  'Solo funciona en navegadores basados en Safari.'
                ],
                correctAnswerIndex: 1,
                explanation: 'Signals proporciona reactividad con rastreo fino de dependencias (fine-grained reactivity), reduciendo el overhead de Zone.js.'
              },
              {
                id: 'q2',
                question: '¿Qué función nativa se utiliza para crear un valor derivado reactivo de una Signal?',
                options: ['computed()', 'derive()', 'rxTransform()', 'watchSignal()'],
                correctAnswerIndex: 0,
                explanation: 'computed(() => val()) genera una señal de solo lectura que se recalcula automáticamente cuando sus dependencias cambian.'
              }
            ]
          }
        ]
      },
      {
        id: 's2',
        title: 'Sección 2: Autenticación, Guards y Roles de Usuario',
        order: 2,
        lessons: [
          {
            id: 'l4',
            title: '4. Implementación del Flujo de Login y JWT Interceptor',
            durationMinutes: 18,
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isCompleted: false
          },
          {
            id: 'l5',
            title: '5. Protección de Rutas con canActivateFn y Matriz de Permisos',
            durationMinutes: 12,
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            isCompleted: false
          },
          {
            id: 'l6',
            title: '6. Lectura y Buenas Prácticas: Seguridad en SPAs',
            durationMinutes: 7,
            type: 'article',
            articleContent: 'La seguridad en aplicaciones de una sola página requiere mitigar vectores comunes de ataque como XSS y CSRF. Se recomienda almacenar tokens en cookies HttpOnly o gestionar refresh tokens con rotación estricta y tiempos de expiración cortos.'
          }
        ]
      },
      {
        id: 's3',
        title: 'Sección 3: Paneles Administrativos, Tablas CRUD y Exportación a Excel',
        order: 3,
        lessons: [
          {
            id: 'l7',
            title: '7. Creación del Layout Administrativo Responsivo',
            durationMinutes: 22,
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            isCompleted: false
          },
          {
            id: 'l8',
            title: '8. Generación Dinámica de Archivos Excel (.xlsx)',
            durationMinutes: 15,
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Inteligencia Artificial y Machine Learning con Python: De Conceptos a Producción',
    slug: 'ia-machine-learning-python',
    shortDescription: 'Crea modelos predictivos, redes neuronales con PyTorch, NLP, visión artificial y despliegue de APIs con FastAPI.',
    description: 'Aprende a diseñar, entrenar y evaluar algoritmos de aprendizaje supervisado y no supervisado. Incluye proyectos reales de predicción financiera, clasificación de imágenes y agentes de IA conversacionales.',
    category: 'Inteligencia Artificial',
    level: 'Todos los niveles',
    instructorId: 'u3',
    instructorName: 'Dra. Elena Valenzuela',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    price: 29.99,
    originalPrice: 99.99,
    rating: 4.8,
    ratingCount: 980,
    studentsCount: 6200,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    status: 'Publicado',
    updatedAt: '2026-08-25',
    features: [
      '38 horas de lecciones prácticas',
      'Notebooks de Jupyter y Google Colab incluidos',
      'Despliegue en Docker y Cloud Run',
      'Comunidad privada de Discord',
      'Certificado profesional'
    ],
    sections: [
      {
        id: 's21',
        title: 'Módulo 1: Fundamentos de Álgebra Lineal y NumPy',
        order: 1,
        lessons: [
          {
            id: 'l21',
            title: '1. Introducción al Ecosistema de Datos en Python',
            durationMinutes: 11,
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            isCompleted: false
          },
          {
            id: 'l22',
            title: '2. Operaciones Matriciales Vectorizadas con NumPy',
            durationMinutes: 16,
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'c3',
    title: 'Diseño de Sistemas UI/UX en Figma y Design Tokens para Desarrolladores',
    slug: 'diseno-sistemas-ui-ux-figma',
    shortDescription: 'Crea bibliotecas consistentes, componentes atómicos, auto layout 5.0, variables de color y tokens listos para código.',
    description: 'Transforma la manera en que diseñas productos digitales. Aprende a crear un Design System robusto que conecte diseñadores con ingenieros de software, optimizando tiempos de entrega.',
    category: 'Diseño y UI/UX',
    level: 'Principiante',
    instructorId: 'u2',
    instructorName: 'Prof. Carlos Santana',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    price: 24.99,
    originalPrice: 89.99,
    rating: 4.95,
    ratingCount: 840,
    studentsCount: 4300,
    thumbnail: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    status: 'Publicado',
    updatedAt: '2026-08-30',
    features: [
      '25 horas de contenido audiovisual',
      'Plantilla completa de UI Kit en Figma (licencia comercial)',
      'Guía paso a paso para tokens en CSS y Tailwind',
      'Certificado de finalización'
    ],
    sections: [
      {
        id: 's31',
        title: 'Fase 1: Fundamentos de Tipografía y Escalas Cromáticas',
        order: 1,
        lessons: [
          {
            id: 'l31',
            title: '1. Teoría del Color, Contraste WCAG y Escalas Radiales',
            durationMinutes: 13,
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'c4',
    title: 'Fullstack Next.js 15, PostgreSQL & Microservicios Cloud',
    slug: 'nextjs-postgresql-microservicios',
    shortDescription: 'Server Actions, Drizzle ORM, Docker, autenticación segura con Auth.js y pasarelas de pago Stripe.',
    description: 'Construye aplicaciones web de alto rendimiento preparadas para producción. Desde la base de datos relacional hasta la arquitectura de cache y edge functions.',
    category: 'Desarrollo Web',
    level: 'Avanzado',
    instructorId: 'u3',
    instructorName: 'Dra. Elena Valenzuela',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    price: 39.99,
    originalPrice: 149.99,
    rating: 4.88,
    ratingCount: 1120,
    studentsCount: 7100,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    promoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    status: 'Publicado',
    updatedAt: '2026-09-04',
    features: [
      '50 horas de código real',
      'Despliegue paso a paso en Vercel y Cloud Run',
      'Pruebas de carga e integración continua'
    ],
    sections: [
      {
        id: 's41',
        title: 'Módulo 1: Arquitectura App Router y Server Components',
        order: 1,
        lessons: [
          {
            id: 'l41',
            title: '1. Fundamentos de Renderizado Híbrido en Next.js',
            durationMinutes: 18,
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            isCompleted: false
          }
        ]
      }
    ]
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1001',
    transactionCode: 'TRX-20260908-9841',
    userId: 'u4',
    userName: 'María Fernández',
    userEmail: 'maria@edupro.com',
    courseId: 'c1',
    courseTitle: 'Angular 18 & TypeScript Enterprise: De Cero a Arquitectura Cloud',
    amount: 34.99,
    currency: 'USD',
    paymentMethod: 'Tarjeta de Crédito',
    status: 'Completado',
    date: '2026-09-08 17:42',
  },
  {
    id: 'tx-1002',
    transactionCode: 'TRX-20260908-7723',
    userId: 'u5',
    userName: 'Javier Domínguez',
    userEmail: 'javier@edupro.com',
    courseId: 'c2',
    courseTitle: 'Inteligencia Artificial y Machine Learning con Python',
    amount: 29.99,
    currency: 'USD',
    paymentMethod: 'PayPal',
    status: 'Completado',
    date: '2026-09-08 14:19',
  },
  {
    id: 'tx-1003',
    transactionCode: 'TRX-20260907-5512',
    userId: 'u4',
    userName: 'María Fernández',
    userEmail: 'maria@edupro.com',
    courseId: 'c3',
    courseTitle: 'Diseño de Sistemas UI/UX en Figma y Design Tokens',
    amount: 24.99,
    currency: 'USD',
    paymentMethod: 'Mercado Pago',
    status: 'Completado',
    date: '2026-09-07 19:30',
  },
  {
    id: 'tx-1004',
    transactionCode: 'TRX-20260906-3390',
    userId: 'u7',
    userName: 'Rodrigo Benítez',
    userEmail: 'rodrigo@inactivo.com',
    courseId: 'c1',
    courseTitle: 'Angular 18 & TypeScript Enterprise: De Cero a Arquitectura Cloud',
    amount: 34.99,
    currency: 'USD',
    paymentMethod: 'Tarjeta de Crédito',
    status: 'Reembolsado',
    date: '2026-09-06 10:12',
  },
  {
    id: 'tx-1005',
    transactionCode: 'TRX-20260905-1120',
    userId: 'u1',
    userName: 'Alejandro Morales (Admin)',
    userEmail: 'admin@edupro.com',
    courseId: 'c4',
    courseTitle: 'Fullstack Next.js 15, PostgreSQL & Microservicios Cloud',
    amount: 39.99,
    currency: 'USD',
    paymentMethod: 'Tarjeta de Crédito',
    status: 'Completado',
    date: '2026-09-05 16:55',
  },
  {
    id: 'tx-1006',
    transactionCode: 'TRX-20260904-8821',
    userId: 'u2',
    userName: 'Carlos Santana',
    userEmail: 'carlos@edupro.com',
    courseId: 'c4',
    courseTitle: 'Fullstack Next.js 15, PostgreSQL & Microservicios Cloud',
    amount: 39.99,
    currency: 'USD',
    paymentMethod: 'PayPal',
    status: 'Completado',
    date: '2026-09-04 11:20',
  },
  {
    id: 'tx-1007',
    transactionCode: 'TRX-20260903-4419',
    userId: 'u3',
    userName: 'Elena Valenzuela',
    userEmail: 'elena@edupro.com',
    courseId: 'c1',
    courseTitle: 'Angular 18 & TypeScript Enterprise: De Cero a Arquitectura Cloud',
    amount: 34.99,
    currency: 'USD',
    paymentMethod: 'Transferencia',
    status: 'Completado',
    date: '2026-09-03 09:15',
  }
];

export const INITIAL_CONFIG: SystemConfig = {
  platformName: 'EduPro LMS & Video Academy',
  platformEmail: 'soporte@edupro.com',
  currency: 'USD',
  currencySymbol: '$',
  taxPercent: 16,
  allowRegistration: true,
  requireEmailVerification: false,
  stripeEnabled: true,
  paypalEnabled: true,
  mercadoPagoEnabled: true,
  allowCertificates: true,
  primaryColor: '#4F46E5',
};
