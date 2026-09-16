import { useContext } from "react";
import { SidebarContext } from "./SidebarContext";

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar debe usarse dentro de un SidebarProvider");
  }
  return context;
}