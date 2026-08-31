import { useEffect, useState } from "react";
import api from "../../../services/api";

export function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      setCargando(true);
      setError("");

      const respuesta = await api.get("/api/usuarios");

      setUsuarios(respuesta.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      setError("No se pudieron obtener los usuarios.");
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Usuarios</h1>

      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              {usuario.nombre || usuario.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
