import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function RutaAdmin({ children }: { children: ReactNode }) {
  const { usuario } = useAuth();

  if (!usuario || usuario.rol !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default RutaAdmin;