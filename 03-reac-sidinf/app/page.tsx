'use client'
import React, { useState } from "react";
import { AuthScreen } from "@/app/components/auth/AuthScreen";
import { AdminPanel } from "@/app/components/panel/AdminPanel";

export type AppView = "login" | "register" | "forgot" | "panel";

export default function Home() {
  
  const [view, setView] = useState<AppView>("login");

  const handleNavigate = (next: AppView) => setView(next);

  if (view === "panel") {
    return <AdminPanel onNavigate={handleNavigate} />;
  }

  return <AuthScreen initialView={view} onNavigate={handleNavigate} />;

}
