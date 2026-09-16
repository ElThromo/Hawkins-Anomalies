import type { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useSidebar } from "../../context/useSidebar";
import "./Layout.css";

function Layout({ children }: { children: ReactNode }) {
  const { abierta } = useSidebar();

  return (
    <>
      <Sidebar />
      <main className={`page-content ${abierta ? "contenido-sidebar-abierta" : "contenido-sidebar-cerrada"}`}>
        {children}
      </main>
    </>
  );
}

export default Layout;