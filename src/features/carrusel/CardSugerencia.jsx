const styles = {
  carrusel_elemento: {
    opacity: 0,
    position: "absolute",
    top: 0,
    zIndex: 100
  },
  activo: {
    opacity: 1,
    position: "relative",
    zIndex: 900,
    width: "100%",
    margin: "auto",
    transition: "transform .5s, opacity .5s, z-index .5s"
  },
  anterior: {
    transform: "translateX(-100%)"
  },
  siguiente: {
    transform: "translateX(100%)"
  }
};

export const CardSugerencias = (props) => {
  const style = {
    ...(props.activo ? styles.activo : styles.carrusel_elemento),
    ...(props.anterior ? styles.anterior : {}),
    ...(props.siguiente ? styles.siguiente : {})
  };

  return <div style={style}>{props.data}</div>;
};