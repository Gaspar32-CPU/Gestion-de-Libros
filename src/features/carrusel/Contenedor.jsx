import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { CardSugerencias } from "./CardSugerencia";
import { libros as lista } from "../libro/libro";

const INTERVALO_AUTOSCROLL_MS = 3000;

const styles = {
  btn: {
    zIndex: 1001,
    marginTop: "25%"
  },
  carrousel_wrapper: {
    display: "flex"
  },
  carrousel: {
    overflow: "hidden",
    width: "90%",
    margin: "auto"
  },
  libro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  },
  libroImg: {
    width: "180px",
    height: "260px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
  },
  libroTitulo: {
    marginTop: "12px"
  }
};

const Contenedor = () => {
  const [elementoActivo, setElementoActivo] = useState(0);
  const [anterior, setAnterior] = useState(lista.length - 1);
  const [siguiente, setSiguiente] = useState(elementoActivo + 1);

  useEffect(() => {
    if (elementoActivo === 0) {
      setAnterior(lista.length - 1);
      setSiguiente(elementoActivo + 1);
    } else if (elementoActivo === lista.length - 1) {
      setAnterior(elementoActivo - 1);
      setSiguiente(0);
    } else {
      setAnterior(elementoActivo - 1);
      setSiguiente(elementoActivo + 1);
    }
  }, [elementoActivo]);

  //mover elemento
  const moverImagenDerecha = () => {
    // Si es el último elemento, restablezca a 0, de lo contrario +1
    setElementoActivo((actual) => (actual === lista.length - 1 ? 0 : actual + 1));
  };

  //mover elemento
  const moverImagenIzquierda = () => {
    // Si es el primer elemento, establézcala como el último elemento, de lo contrario -1
    setElementoActivo((actual) => (actual === 0 ? lista.length - 1 : actual - 1));
  };

  // avance automatico del carrusel
  useEffect(() => {
    const intervalo = setInterval(moverImagenDerecha, INTERVALO_AUTOSCROLL_MS);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={styles.carrousel_wrapper}>
      <div style={styles.btn}>
        <IconButton onClick={moverImagenIzquierda} size="small">
          <ArrowBackIosRoundedIcon />
        </IconButton>
      </div>
      <div style={styles.carrousel}>
        {lista.map((libro, index) => (
          <CardSugerencias
            key={libro.id}
            data={
              <div style={styles.libro}>
                <img src={libro.portadaUrl} alt={libro.titulo} style={styles.libroImg} />
                <h3 style={styles.libroTitulo}>{libro.titulo}</h3>
              </div>
            }
            activo={elementoActivo === index}
            anterior={anterior === index}
            siguiente={siguiente === index}
          />
        ))}
      </div>
      <div style={styles.btn}>
        <IconButton onClick={moverImagenDerecha} size="small">
          <ArrowBackIosRoundedIcon style={{ transform: "rotate(180deg)" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Contenedor;