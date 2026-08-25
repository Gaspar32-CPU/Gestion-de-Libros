import { useEffect, useState } from "react";
import api from "../services/api";

export function useOrganizacion(organizacionId) {
  const [organizacion, setOrganizacion] = useState(null);

  useEffect(() => {
    if (!organizacionId) return;

    api.get(`/organizaciones/${organizacionId}`)
      .then((res) => setOrganizacion(res.data))
      .catch((err) => console.error("Error al traer la organización", err));
  }, [organizacionId]);

  return organizacion;
}
