import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router no resetea el scroll al navegar entre rutas.
// Sin esto, al abrir la ficha de un libro desde el catálogo scrolleado
// la nueva página aparece con el mismo scroll heredado.
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
