import { useEffect, useRef, useCallback } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { LibroSugerencia } from "./LibroSugerencia";
import { libros } from "../libro/libro";

const INTERVALO_AUTOSCROLL_MS = 3000;

const Contenedor = () => {
  const scrollRef = useRef(null);

  const desplazar = useCallback((direccion) => {
    const contenedor = scrollRef.current;
    if (!contenedor) return;

    const primerItem = contenedor.firstElementChild;
    const anchoItem = primerItem ? primerItem.getBoundingClientRect().width : contenedor.clientWidth;
    const maxScroll = contenedor.scrollWidth - contenedor.clientWidth;

    if (direccion === "derecha" && contenedor.scrollLeft >= maxScroll - 1) {
      contenedor.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direccion === "izquierda" && contenedor.scrollLeft <= 0) {
      contenedor.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      contenedor.scrollBy({
        left: direccion === "derecha" ? anchoItem : -anchoItem,
        behavior: "smooth"
      });
    }
  }, []);

  // avance automatico del carrusel
  useEffect(() => {
    const intervalo = setInterval(() => desplazar("derecha"), INTERVALO_AUTOSCROLL_MS);
    return () => clearInterval(intervalo);
  }, [desplazar]);

  return (
    <div className="flex items-center gap-2 w-full">
      <IconButton onClick={() => desplazar("izquierda")} size="small">
        <ArrowBackIosRoundedIcon />
      </IconButton>

      <div ref={scrollRef} className="flex flex-1 min-w-0 overflow-x-auto scrollbar-hide scroll-smooth py-2">
        {libros.map((libro) => (
          <div key={libro.id} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 shrink-0 px-2">
            <LibroSugerencia portadaUrl={libro.portadaUrl} titulo={libro.titulo} genero={libro.genero} autor={libro.autor} />
          </div>
        ))}
      </div>

      <IconButton onClick={() => desplazar("derecha")} size="small">
        <ArrowBackIosRoundedIcon style={{ transform: "rotate(180deg)" }} />
      </IconButton>
    </div>
  );
};

export default Contenedor;
