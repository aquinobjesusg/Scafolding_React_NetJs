"use client";
import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { AuthScreen } from "@/components/AuthScreen";
import { AdminPanel } from "@/components/AdminPanel";

export type View = "landing" | "auth" | "admin";
export type AuthMode = "login" | "register" | "forgot";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const navigate = (next: View, mode?: AuthMode) => {
    if (mode) setAuthMode(mode);
    setView(next);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {view === "landing" && <LandingPage onNavigate={navigate} />}
      {view === "auth" && (
        <AuthScreen initialMode={authMode} onNavigate={navigate} />
      )}
      {view === "admin" && <AdminPanel onNavigate={navigate} />}
    </div>
  );
}