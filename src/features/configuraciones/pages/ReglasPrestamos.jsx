import StepperNumerico from "../components/StepperNumerico";

export default function ReglasPrestamos(configuracion) {
  return (
    <div>
        <p className="font-bold text-[#152943]">
            Reglas de préstamo
        </p>
        <StepperNumerico
            opciones={{
            titulo: "Límite de préstamos",
            descripcion: "Número máximo de libros que un usuario puede tener prestados al mismo tiempo"
            }}
            valor={configuracion?.reglas_prestamo || 0}
            onChange={(nuevoValor) =>
            setConfiguracion({ ...configuracion, reglas_prestamo: nuevoValor })
            }
        />
        <StepperNumerico
            opciones={{
            titulo: "Plazo de cada préstamo",
            descripcion: "Días hasta la devolución esperada"
            }}
            valor={configuracion?.reglas_prestamo || 0}
            onChange={(nuevoValor) =>
            setConfiguracion({ ...configuracion, reglas_prestamo: nuevoValor })
            }
        />
        <StepperNumerico
            opciones={{
            titulo: "Extensiones permitidas",
            descripcion: "30 días cada una"
            }}
            valor={configuracion?.reglas_prestamo || 0}
            onChange={(nuevoValor) =>
            setConfiguracion({ ...configuracion, reglas_prestamo: nuevoValor })
            }
        />
        <StepperNumerico
            opciones={{
            titulo: "Congelar usuarios por atraso reiterado",
            descripcion: "Bloquea nuevos préstamos tras devoluciones tardías"
            }}
            toggle={true}
            valor={configuracion?.reglas_prestamo || 0}
            onChange={(nuevoValor) =>
            setConfiguracion({ ...configuracion, reglas_prestamo: nuevoValor })
            }
        />
    </div>
  );
}
