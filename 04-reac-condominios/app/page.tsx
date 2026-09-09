'use client'

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

