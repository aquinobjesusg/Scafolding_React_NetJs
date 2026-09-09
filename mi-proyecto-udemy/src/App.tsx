import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CourseProvider, useCourse } from './context/CourseContext';
import { ActiveView, Course } from './types';
import { Navbar } from './components/common/Navbar';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { DashboardOverview } from './components/admin/DashboardOverview';
import { UsersCrud } from './components/admin/UsersCrud';
import { RolesPermissionsCrud } from './components/admin/RolesPermissionsCrud';
import { CoursesCrud } from './components/admin/CoursesCrud';
import { TransactionsCrud } from './components/admin/TransactionsCrud';
import { DynamicReports } from './components/admin/DynamicReports';
import { SystemSettings } from './components/admin/SystemSettings';
import { UdemyCatalog } from './components/udemy/UdemyCatalog';
import { CourseDetailModal } from './components/udemy/CourseDetailModal';
import { PaymentModal } from './components/udemy/PaymentModal';
import { CoursePlayer } from './components/udemy/CoursePlayer';
import { AuthModal } from './components/auth/AuthModal';
import { Menu, X, Sparkles } from 'lucide-react';

function MainApp() {
  const { currentUser } = useAuth();
  const { courses, selectCourseById, activeCourse } = useCourse();

  // Navigation State
  const [currentView, setCurrentView] = useState<ActiveView>('udemy-explore');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register' | 'forgot'>('login');

  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [courseToPay, setCourseToPay] = useState<Course | null>(null);

  const handleOpenAuth = (mode: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleOpenPlayer = (courseId: string) => {
    selectCourseById(courseId);
    setCurrentView('udemy-player');
  };

  const handleOpenPayment = (course: Course) => {
    setCourseToPay(course);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (course: Course) => {
    handleOpenPlayer(course.id);
  };

  const isAdminView = currentView.startsWith('admin-');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setIsMobileSidebarOpen(false);
        }}
        onOpenAuthModal={(mode) => handleOpenAuth(mode || 'login')}
        onOpenQuickSettings={() => setCurrentView('admin-settings')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {isAdminView ? (
          /* Admin Panel Layout with Lateral Menu */
          <div className="flex-1 flex flex-col md:flex-row">
            {/* Mobile Toggle Button */}
            <div className="md:hidden flex items-center justify-between border-b border-gray-200 bg-white p-3">
              <span className="text-xs font-bold text-gray-700">Menú Administrativo</span>
              <button
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100"
              >
                {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Sidebar for Desktop and Mobile overlay */}
            <div
              className={`${
                isMobileSidebarOpen ? 'block fixed inset-0 z-30 pt-16 bg-black/40 md:relative md:pt-0' : 'hidden'
              } md:block`}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <div
                className="h-full max-w-[280px] bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <AdminSidebar
                  currentView={currentView}
                  onNavigate={(view) => {
                    setCurrentView(view);
                    setIsMobileSidebarOpen(false);
                  }}
                />
              </div>
            </div>

            {/* Admin Workspace Content */}
            <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
              {currentView === 'admin-dashboard' && (
                <DashboardOverview
                  onNavigate={setCurrentView}
                  onOpenCourseModal={() => setCurrentView('admin-courses')}
                />
              )}

              {currentView === 'admin-courses' && (
                <CoursesCrud onNavigateToCourse={handleOpenPlayer} />
              )}

              {currentView === 'admin-transactions' && <TransactionsCrud />}

              {currentView === 'admin-users' && <UsersCrud />}

              {currentView === 'admin-roles' && <RolesPermissionsCrud />}

              {currentView === 'admin-reports' && <DynamicReports />}

              {currentView === 'admin-settings' && <SystemSettings />}
            </main>
          </div>
        ) : currentView === 'udemy-player' ? (
          /* Udemy Integrated Video & Interactive Lesson Player */
          <main className="flex-1">
            <CoursePlayer onBackToCatalog={() => setCurrentView('udemy-explore')} />
          </main>
        ) : (
          /* Udemy Marketplace Catalog */
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
            <UdemyCatalog
              onSelectCourse={(c) => setSelectedCourseForDetail(c)}
              onOpenPlayer={handleOpenPlayer}
              onOpenPayment={handleOpenPayment}
              onOpenAuth={() => handleOpenAuth('login')}
            />
          </main>
        )}
      </div>

      {/* Auth Modal (Login, Recuperar Contraseña, Registro) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authInitialMode}
        onLoginSuccess={() => {
          setIsAuthModalOpen(false);
          // If admin, take to admin-dashboard
          if (currentUser?.role === 'ADMIN' || currentUser?.role === 'INSTRUCTOR') {
            setCurrentView('admin-dashboard');
          }
        }}
      />

      {/* Course Detail Landing Modal */}
      <CourseDetailModal
        course={selectedCourseForDetail}
        isOpen={Boolean(selectedCourseForDetail)}
        onClose={() => setSelectedCourseForDetail(null)}
        onOpenPayment={(course) => {
          setSelectedCourseForDetail(null);
          handleOpenPayment(course);
        }}
        onOpenPlayer={(courseId) => {
          setSelectedCourseForDetail(null);
          handleOpenPlayer(courseId);
        }}
      />

      {/* Payment Checkout Modal */}
      <PaymentModal
        course={courseToPay}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        onRequireLogin={() => {
          setIsPaymentModalOpen(false);
          handleOpenAuth('login');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <MainApp />
      </CourseProvider>
    </AuthProvider>
  );
}
