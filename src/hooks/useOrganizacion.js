import { useEffect, useState } from "react";
import api from "../services/api";

export function useOrganizacion(organizacionId) {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    if (!organizacionId) return;

    api.get(`/organizaciones/${organizacionId}`)
      .then((res) => setDatos(res.data))
      .catch((err) => console.error("Error al traer la organización", err));
  }, [organizacionId]);

  return datos;
}
