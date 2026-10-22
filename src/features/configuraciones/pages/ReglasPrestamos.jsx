import StepperNumerico from "../components/StepperNumerico";

export default function ReglasPrestamos({ configuracion, onChange }) {
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
            valor={configuracion.maxLibrosPorUsuario}
            min={1}
            max={255}
            onChange={(nuevoValor) => onChange("maxLibrosPorUsuario", nuevoValor)}
        />
        <StepperNumerico
            opciones={{
            titulo: "Plazo de cada préstamo",
            descripcion: "Días hasta la devolución esperada"
            }}
            valor={configuracion.diasPrestamo}
            min={1}
            max={365}
            onChange={(nuevoValor) => onChange("diasPrestamo", nuevoValor)}
        />
        <StepperNumerico
            opciones={{
            titulo: "Permitir extensiones",
            descripcion: "Los lectores pueden pedir más días para devolver un libro"
            }}
            toggle={true}
            valor={configuracion.permiteExtension}
            onChange={(nuevoValor) => onChange("permiteExtension", nuevoValor)}
        />
        {configuracion.permiteExtension && (
          <>
            <StepperNumerico
                opciones={{
                titulo: "Extensiones permitidas",
                descripcion: `${configuracion.diasExtension} días cada una`
                }}
                valor={configuracion.maxExtensiones}
                min={0}
                max={255}
                onChange={(nuevoValor) => onChange("maxExtensiones", nuevoValor)}
            />
            <StepperNumerico
                opciones={{
                titulo: "Días por extensión",
                descripcion: "Días que se suman a la devolución en cada extensión"
                }}
                valor={configuracion.diasExtension}
                min={1}
                max={365}
                onChange={(nuevoValor) => onChange("diasExtension", nuevoValor)}
            />
          </>
        )}
        <StepperNumerico
            opciones={{
            titulo: "Congelar usuarios por atraso reiterado",
            descripcion: "Bloquea nuevos préstamos tras devoluciones tardías"
            }}
            toggle={true}
            valor={configuracion.congelarUsuarios}
            onChange={(nuevoValor) => {
              onChange("congelarUsuarios", nuevoValor);
              if (nuevoValor && !configuracion.diasAtrasoCongelamiento) {
                onChange("diasAtrasoCongelamiento", 7);
              }
            }}
        />
        {configuracion.congelarUsuarios && (
          <StepperNumerico
              opciones={{
              titulo: "Días de atraso para congelar",
              descripcion: "Días de atraso a partir de los cuales se congela al usuario"
              }}
              valor={configuracion.diasAtrasoCongelamiento ?? 1}
              min={1}
              max={365}
              onChange={(nuevoValor) => onChange("diasAtrasoCongelamiento", nuevoValor)}
          />
        )}
    </div>
  );
}
