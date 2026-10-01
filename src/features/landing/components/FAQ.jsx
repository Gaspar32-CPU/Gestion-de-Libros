import { useState } from "react";

const PREGUNTAS = [
  {
    pregunta: "¿Qué pasa cuando contrato un plan?",
    respuesta:
      "Al confirmarse el pago, Bookly crea la organización con su dominio de correo y la cuenta de administrador que la gestiona. Desde ahí cargás el catálogo, invitás a los lectores y configurás las reglas de préstamo. No hace falta tener una cuenta antes de contratar.",
  },
  {
    pregunta: "¿Quién puede registrarse en la biblioteca de mi institución?",
    respuesta:
      "Solo quienes tengan un correo del dominio que configures — por ejemplo @anima.edu.uy. Cada persona que se registra con ese dominio queda asociada a tu organización y suma al cupo de usuarios del plan. Los datos de una organización nunca son visibles para otra.",
  },
  {
    pregunta: "¿Qué pasa con la planilla de Excel que usamos hoy?",
    respuesta:
      "La migramos sin costo en cualquiera de los tres planes. Nos pasás el archivo, lo importamos con títulos, autores, stock y préstamos abiertos, y lo revisamos con ustedes antes de salir en vivo.",
  },
  {
    pregunta: "¿Cómo se cuentan los usuarios de cada plan?",
    respuesta:
      "Un usuario es cada persona con cuenta activa que puede pedir libros: estudiantes, docentes y tutores. Los invitados que solo miran el catálogo no consumen cupo, y los administradores se cuentan aparte.",
  },
  {
    pregunta: "¿Puedo cambiar de plan más adelante?",
    respuesta:
      "Sí, en cualquier momento y sin perder datos. Al subir de plan se ajusta la diferencia proporcional al tiempo restante; al bajar, el cambio aplica en la siguiente renovación.",
  },
  {
    pregunta: "¿Qué incluye la personalización de marca?",
    respuesta:
      "A partir del plan Colegio podés configurar el logo, el color primario y secundario, y el nombre de la app. Bookly entero adopta la identidad de tu institución, no la nuestra.",
  },
  {
    pregunta: "¿La app funciona en celular?",
    respuesta:
      "Sí. Es una aplicación web responsive: funciona desde el navegador en computadora, tablet y celular, sin necesidad de descargar nada.",
  },
  {
    pregunta: "¿Hay costo de instalación o de alta?",
    respuesta:
      "No. El precio del plan es todo lo que se paga, e incluye la implementación, la migración de datos y la capacitación inicial del equipo.",
  },
];

export function FAQ() {
  const [abierta, setAbierta] = useState(0);

  return (
    <section id="faq" className="px-30 py-20 bg-bg">
      <p className="text-sm font-bold text-brand tracking-wide">PREGUNTAS FRECUENTES</p>
      <div className="mt-3 flex justify-between gap-10 flex-wrap">
        <h2 className="text-4xl font-extrabold text-ink max-w-md">Lo que suelen preguntarnos</h2>
        <p className="text-ink-2 max-w-sm self-end">
          ¿Te queda algo sin responder? Escribinos a{" "}
          <a href="mailto:hola@bookly.app" className="underline hover:text-ink">
            hola@bookly.app
          </a>{" "}
          y te contestamos el mismo día.
        </p>
      </div>

      <div className="mt-10 space-y-3 max-w-3xl">
        {PREGUNTAS.map((item, i) => {
          const estaAbierta = abierta === i;
          return (
            <div key={item.pregunta} className="rounded-2xl border border-line bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setAbierta(estaAbierta ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="font-bold text-ink">{item.pregunta}</span>
                <span className="shrink-0 w-7 h-7 rounded-full bg-bg border border-line flex items-center justify-center text-ink-2 font-bold">
                  {estaAbierta ? "−" : "+"}
                </span>
              </button>
              {estaAbierta && (
                <p className="px-6 pb-4 text-sm text-ink-2">{item.respuesta}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
