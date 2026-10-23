import { useEffect, useState } from 'react';
import { obtenerSecciones, enviarReporte, MAX_CARACTERES_REPORTE } from '../reportesService';

// Estilos tomados del prototipo (Bookly.html → "REPORT PROBLEM").
const COLOR_BORDE = 'border-[#E7E2D7]';
const COLOR_BORDE_ERROR = 'border-[#D9534F]';

const estiloCampo =
  'block w-full mt-[7px] border-[1.5px] rounded-[10px] text-sm bg-white text-[#16324F] outline-none focus:border-[#12A594]';

export default function ReportarProblema() {
  const [secciones, setSecciones] = useState([]);
  const [cargandoSecciones, setCargandoSecciones] = useState(true);
  const [errorSecciones, setErrorSecciones] = useState('');

  const [idSeccion, setIdSeccion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errores, setErrores] = useState({ seccion: '', descripcion: '' });

  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');

  // Al abrir la pantalla, pedimos al backend la lista de secciones.
  useEffect(() => {
    obtenerSecciones()
      .then(setSecciones)
      .catch(() =>
        setErrorSecciones('No pudimos cargar las secciones. Recargá la página para intentar de nuevo.'),
      )
      .finally(() => setCargandoSecciones(false));
  }, []);

  function validar() {
    const nuevosErrores = {
      seccion: idSeccion ? '' : 'Elegí una sección',
      descripcion: descripcion.trim() ? '' : 'Contanos qué pasó',
    };
    setErrores(nuevosErrores);
    return !nuevosErrores.seccion && !nuevosErrores.descripcion;
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setEnviado(false);
    setErrorEnvio('');

    if (!validar()) return;

    setEnviando(true);
    try {
      await enviarReporte({ idSeccion: Number(idSeccion), descripcion: descripcion.trim() });
      setEnviado(true);
      setIdSeccion('');
      setDescripcion('');
    } catch (error) {
      setErrorEnvio(
        error.response?.data?.mensaje ?? 'No pudimos enviar el reporte. Probá de nuevo en unos minutos.',
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="max-w-[560px] p-9">
      <h1 className="mb-1.5 text-[26px] font-extrabold tracking-[-0.02em] text-[#16324F]">
        Reportar un problema
      </h1>
      <p className="mb-[22px] text-[14.5px] text-[#4A6076]">
        Contanos qué pasó con el sistema o con un libro.
      </p>

      <form
        onSubmit={manejarEnvio}
        noValidate
        className={`rounded-2xl border ${COLOR_BORDE} bg-white p-6`}
      >
        {enviado && (
          <p role="status" className="mb-4 rounded-[10px] bg-[#12A594]/10 px-3 py-2.5 text-sm font-semibold text-[#0E7F76]">
            ¡Gracias! Recibimos tu reporte.
          </p>
        )}

        <label htmlFor="reporte-seccion" className="text-[13px] font-semibold text-[#4A6076]">
          Sección
        </label>
        <select
          id="reporte-seccion"
          value={idSeccion}
          onChange={(e) => {
            setIdSeccion(e.target.value);
            setErrores((prev) => ({ ...prev, seccion: '' }));
          }}
          disabled={cargandoSecciones}
          aria-invalid={Boolean(errores.seccion)}
          className={`${estiloCampo} px-3 py-[11px] font-semibold ${errores.seccion ? COLOR_BORDE_ERROR : COLOR_BORDE}`}
        >
          <option value="">{cargandoSecciones ? 'Cargando secciones…' : 'Elegí dónde pasó el problema'}</option>
          {secciones.map((seccion) => (
            <option key={seccion.id} value={seccion.id}>
              {seccion.nombre}
            </option>
          ))}
        </select>
        {errores.seccion && <p className="mt-1.5 text-[13px] font-semibold text-[#D9534F]">{errores.seccion}</p>}
        {errorSecciones && <p className="mt-1.5 text-[13px] font-semibold text-[#D9534F]">{errorSecciones}</p>}

        <label htmlFor="reporte-descripcion" className="mt-4 block text-[13px] font-semibold text-[#4A6076]">
          Descripción
        </label>
        <textarea
          id="reporte-descripcion"
          value={descripcion}
          onChange={(e) => {
            setDescripcion(e.target.value);
            setErrores((prev) => ({ ...prev, descripcion: '' }));
          }}
          placeholder="Describí el problema con el mayor detalle posible…"
          maxLength={MAX_CARACTERES_REPORTE}
          aria-invalid={Boolean(errores.descripcion)}
          className={`${estiloCampo} min-h-[120px] resize-y p-3 ${errores.descripcion ? COLOR_BORDE_ERROR : COLOR_BORDE}`}
        />
        <div className="mt-1.5 flex justify-between gap-3">
          <p className="text-[13px] font-semibold text-[#D9534F]">{errores.descripcion}</p>
          <p className="shrink-0 text-xs text-[#8A9AAB]">
            {descripcion.length}/{MAX_CARACTERES_REPORTE}
          </p>
        </div>

        {errorEnvio && <p className="mt-4 text-[13px] font-semibold text-[#D9534F]">{errorEnvio}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="mt-4 cursor-pointer rounded-[11px] bg-[#12A594] px-6 py-[13px] text-sm font-extrabold text-white hover:bg-[#0E7F76] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? 'Enviando…' : 'Enviar reporte'}
        </button>
      </form>
    </div>
  );
}
