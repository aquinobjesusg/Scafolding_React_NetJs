import { useState } from "react";
import { AuthScreen } from "@/components/AuthScreen";
import { AdminPanel } from "@/components/AdminPanel";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; provider: string } | null>(null);

  const handleLogin = (userData: { name: string; email: string; provider: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <AdminPanel user={user} onLogout={handleLogout} />;
}