export type UserRole = 'ADMIN' | 'INSTRUCTOR' | 'STUDENT' | 'EDITOR';

export interface Permission {
  id: string;
  name: string;
  code: string;
  category: 'Cursos' | 'Usuarios' | 'Reportes' | 'Finanzas' | 'Configuración';
  description: string;
}

export interface Role {
  id: string;
  name: string;
  code: UserRole;
  description: string;
  userCount: number;
  permissions: string[]; // permission codes
  isSystem?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: 'Activo' | 'Inactivo' | 'Suspendido';
  createdAt: string;
  lastLogin: string;
  enrolledCourses?: string[];
  coursesCreated?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'video' | 'quiz' | 'article';
  videoUrl?: string;
  articleContent?: string;
  quizQuestions?: QuizQuestion[];
  isCompleted?: boolean;
  resources?: { name: string; url: string; size: string }[];
}

export interface CourseSection {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Todos los niveles';
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  price: number;
  originalPrice: number;
  rating: number;
  ratingCount: number;
  studentsCount: number;
  thumbnail: string;
  promoVideoUrl: string;
  status: 'Publicado' | 'Borrador' | 'En Revisión' | 'Archivado';
  updatedAt: string;
  features: string[];
  sections: CourseSection[];
}

export interface Transaction {
  id: string;
  transactionCode: string;
  userId: string;
  userName: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: string;
  paymentMethod: 'Tarjeta de Crédito' | 'PayPal' | 'Mercado Pago' | 'Transferencia';
  status: 'Completado' | 'Pendiente' | 'Fallido' | 'Reembolsado';
  date: string;
}

export interface SystemConfig {
  platformName: string;
  platformEmail: string;
  currency: string;
  currencySymbol: string;
  taxPercent: number;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  stripeEnabled: boolean;
  paypalEnabled: boolean;
  mercadoPagoEnabled: boolean;
  allowCertificates: boolean;
  primaryColor: string;
}

export type ActiveView = 
  | 'udemy-explore' 
  | 'udemy-player' 
  | 'admin-dashboard' 
  | 'admin-courses' 
  | 'admin-users' 
  | 'admin-roles' 
  | 'admin-reports' 
  | 'admin-transactions' 
  | 'admin-settings';
