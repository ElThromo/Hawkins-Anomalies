import { createContext } from "react";

export interface Usuario {
  idUsuario: number;
  nombre: string;
  email: string;
  rol: string;
  avatar?: string | null;
}
export interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (usuario: Usuario, token: string) => void;
  logout: () => void;
  actualizarUsuario: (usuario: Usuario) => void; // <- nuevo
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);