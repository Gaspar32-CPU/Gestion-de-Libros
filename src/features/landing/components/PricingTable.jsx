import { Fragment, useEffect, useState } from "react";
import { obtenerPlanes, obtenerComparativaPlanes } from "../../../services/planes";

function Valor({ valor }) {
  if (typeof valor === "boolean") {
    return valor ? <span className="text-brand font-bold">✓</span> : <span className="text-ink-3">–</span>;
  }
  return <span className="font-bold text-ink">{typeof valor === "number" ? valor.toLocaleString("es-UY") : valor}</span>;
}

export function PricingTable() {
  const [planes, setPlanes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([obtenerPlanes(), obtenerComparativaPlanes()])
      .then(([planesData, comparativaData]) => {
        setPlanes(planesData);
        setCategorias(comparativaData.categorias);
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, []);

  if (cargando || error) {
    return (
      <section id="comparativa" className="px-30 py-20 bg-bg">
        <p className="text-sm font-bold text-brand tracking-wide">COMPARATIVA</p>
        <h2 className="mt-3 text-4xl font-extrabold text-ink">Todo lo que incluye cada plan</h2>
        {cargando && <p className="mt-10 text-ink-3">Cargando comparativa…</p>}
        {error && <p className="mt-10 text-red-600">No pudimos cargar la comparativa en este momento.</p>}
      </section>
    );
  }

  return (
    <section id="comparativa" className="px-30 py-20 bg-bg">
      <p className="text-sm font-bold text-brand tracking-wide">COMPARATIVA</p>
      <h2 className="mt-3 text-4xl font-extrabold text-ink">Todo lo que incluye cada plan</h2>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-white">
              <th className="text-left font-bold text-ink-3 text-xs tracking-wide uppercase px-6 py-4">
                Funcionalidad
              </th>
              {planes.map((plan, i) => (
                <th
                  key={plan.id}
                  className={`text-center px-6 py-4 ${i === 1 ? "bg-brand/5" : ""}`}
                >
                  <p className="font-extrabold text-ink">{plan.nombre}</p>
                  <p className="text-xs text-ink-3 font-normal">US$ {plan.precioMensual}/mes</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <Fragment key={categoria.nombre}>
                <tr className="bg-bg">
                  <td
                    colSpan={planes.length + 1}
                    className="px-6 py-2 text-xs font-bold text-brand-d tracking-wide uppercase"
                  >
                    {categoria.nombre}
                  </td>
                </tr>
                {categoria.filas.map((fila) => (
                  <tr key={fila.funcionalidad} className="border-t border-line bg-white">
                    <td className="px-6 py-3 text-ink-2">{fila.funcionalidad}</td>
                    {fila.valores.map((valor, i) => (
                      <td key={i} className={`px-6 py-3 text-center ${i === 1 ? "bg-brand/5" : ""}`}>
                        <Valor valor={valor} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
