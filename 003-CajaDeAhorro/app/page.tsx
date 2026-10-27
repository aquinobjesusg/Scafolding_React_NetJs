'use client'
import React, { useState } from "react";
import { AuthScreen } from "@/components/auth/AuthScreen";
import { AdminPanel } from "@/components/panel/AdminPanel";

export type AppView = "login" | "register" | "forgot" | "panel";

export default function App() {
  const [view, setView] = useState<AppView>("login");

  const handleNavigate = (next: AppView) => setView(next);

  if (view === "panel") {
    return <AdminPanel onNavigate={handleNavigate} />;
  }

  return <AuthScreen initialView={view} onNavigate={handleNavigate} />;
}