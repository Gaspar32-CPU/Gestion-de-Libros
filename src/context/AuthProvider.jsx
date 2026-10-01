import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { AuthContext } from "./AuthContext";

function leerUsuarioInicial() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const expirado = decoded.exp * 1000 < Date.now();
    if (expirado) {
      localStorage.removeItem("token");
      return null;
    }
    return decoded;
  } catch {
    localStorage.removeItem("token");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuarioInicial);
  // eslint-disable-next-line no-unused-vars
  const [cargando, setCargando] = useState(false);

  function login(token) {
    localStorage.setItem("token", token);
    setUsuario(jwtDecode(token));
  }

  function logout() {
    localStorage.removeItem("token");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}
