import { useState } from "react";
import type { ReactNode } from "react";
import { SidebarContext } from "./SidebarContext";

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Arranca abierta en desktop, cerrada en mobile
  const [abierta, setAbierta] = useState(() => window.innerWidth >= 768);

  function toggleSidebar() {
    setAbierta((prev) => !prev);
  }

  function cerrarSidebar() {
    setAbierta(false);
  }

  return (
    <SidebarContext.Provider value={{ abierta, toggleSidebar, cerrarSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}