import { useState } from "react";
import { LoginPage } from "@/components/LoginPage";
import { AdminPanel } from "@/components/AdminPanel";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");

  const handleLogin = (email: string) => {
    setCurrentUser(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser("");
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <AdminPanel userEmail={currentUser} onLogout={handleLogout} />;
}