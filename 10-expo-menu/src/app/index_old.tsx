import { AdminLayout } from "@/components/AdminLayout";
import { ClientsView } from "@/components/ClientsView";
import { DashboardView } from "@/components/DashboardView";
import { InvoicesView } from "@/components/InvoicesView";
import { LoginPage } from "@/components/LoginPage";
import { ProfileView } from "@/components/ProfileView";
import { useState } from "react";

export type Section = "dashboard" | "clients" | "invoices" | "profile";

export default function App() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [section, setSection] = useState<Section>("dashboard");

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <AdminLayout
      user={user}
      section={section}
      onSectionChange={setSection}
      onLogout={() => {
        setUser(null);
        setSection("dashboard");
      }}
    >
      {section === "dashboard" && <DashboardView />}
      {section === "clients" && <ClientsView />}
      {section === "invoices" && <InvoicesView />}
      {section === "profile" && <ProfileView user={user} onUpdate={setUser} />}
    </AdminLayout>
  );
}