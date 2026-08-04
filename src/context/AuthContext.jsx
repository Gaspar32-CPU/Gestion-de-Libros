//hecho con IA
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expirado = decoded.exp * 1000 < Date.now();
        if (expirado) {
          localStorage.removeItem("token");
          setUsuario(null);
        } else {
          setUsuario(decoded);
        }
      } catch {
        localStorage.removeItem("token");
        setUsuario(null);
      }
    }
    setCargando(false);
  }, []);

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

export function useAuth() {
  return useContext(AuthContext);
}