import { createContext } from "react";

export interface SidebarContextType {
  abierta: boolean;
  toggleSidebar: () => void;
  cerrarSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);