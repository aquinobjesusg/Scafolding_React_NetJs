"use client";

import App from "@/App";  // ← Así se importa el default export

export default function Home() {
  return (
    <div>
      <App />  {/* ← Componente con mayúscula */}
    </div>
  );
}