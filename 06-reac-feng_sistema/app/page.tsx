'use client'
import { useState } from "react";
import { Landing } from "@/components/Landing";
import { AuthModal } from "@/components/AuthModal";
import { AdminPanel } from "@/components/AdminPanel";

export default function App() {
  const [view, setView] = useState<"landing" | "admin">("landing");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">("login");

  const openAuth = (mode: "login" | "register" | "forgot") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    setAuthOpen(false);
    setView("admin");
  };

  if (view === "admin") {
    return <AdminPanel onExit={() => setView("landing")} />;
  }

  return (
    <>
      <Landing onAuth={openAuth} onEnterAdmin={() => setView("admin")} />
      <AuthModal
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}


/*
import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}
*/
