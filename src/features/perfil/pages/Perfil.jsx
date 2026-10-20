import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuth';
import { obtenerIniciales } from '../../../utils/obtenerIniciales';
import { obtenerPerfil, actualizarPerfil } from '../perfilService';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CAMPO_BASE = 'w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-[#1fa48a]';

function Campo({ etiqueta, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{etiqueta}</span>
      {children}
    </label>
  );
}

function FilaSoloLectura({ etiqueta, valor }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{etiqueta}</span>
      <span className="text-sm text-slate-800">{valor || '—'}</span>
    </div>
  );
}

export default function Perfil() {
  const { usuario } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [form, setForm] = useState({
    foto: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    contrasena: '',
    confirmarContrasena: '',
  });
  const [errores, setErrores] = useState({});
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    obtenerPerfil(usuario.id)
      .then((datos) => {
        setPerfil(datos);
        setForm((prev) => ({
          ...prev,
          foto: datos.foto,
          nombre: datos.nombre,
          apellido: datos.apellido,
          correo: datos.correo,
          telefono: datos.telefono,
        }));
      })
      .catch((err) => {
        console.error('Error al traer el perfil', err);
        setError('No pudimos traer tus datos. Intentá de nuevo más tarde.');
      })
      .finally(() => setCargando(false));
  }, [usuario.id]);

  const actualizarCampo = (campo) => (e) => {
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));
    setErrores((prev) => ({ ...prev, [campo]: '' }));
  };

  const cambiarFoto = (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    const lector = new FileReader();
    lector.onload = () => setForm((prev) => ({ ...prev, foto: lector.result }));
    lector.readAsDataURL(archivo);
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!form.apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio.';
    if (!EMAIL_REGEX.test(form.correo.trim())) nuevosErrores.correo = 'Ingresá un email válido.';
    if (!form.telefono.trim()) nuevosErrores.telefono = 'El teléfono es obligatorio.';
    if (form.contrasena && form.contrasena !== form.confirmarContrasena) {
      nuevosErrores.confirmarContrasena = 'Las contraseñas no coinciden.';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');
    if (!validar()) return;

    setGuardando(true);
    try {
      const actualizado = await actualizarPerfil(usuario.id, {
        foto: form.foto,
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        correo: form.correo.trim(),
        telefono: form.telefono.trim(),
        contrasena: form.contrasena,
      });
      setPerfil(actualizado);
      setForm((prev) => ({ ...prev, contrasena: '', confirmarContrasena: '' }));
      setExito('Tus datos se guardaron correctamente.');
    } catch (err) {
      console.error('Error al guardar el perfil', err);
      setError(err.response?.data?.mensaje || err.response?.data?.error || 'No se pudo guardar tu perfil.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return <p className="p-8 text-sm text-slate-500">Cargando tu perfil...</p>;
  }

  const nombreMostrado = `${form.nombre} ${form.apellido}`.trim() || usuario.nombre;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 text-slate-800">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Mi perfil</h1>
        <p className="text-sm text-[#1fa48a] font-medium mt-1">Revisá y actualizá tus datos personales.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
        {form.foto ? (
          <img src={form.foto} alt="Foto de perfil" className="w-24 h-24 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-lime-500 flex items-center justify-center text-2xl font-extrabold text-ink shrink-0">
            {obtenerIniciales(nombreMostrado)}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 flex-1 w-full">
          <FilaSoloLectura etiqueta="Nombre" valor={perfil?.nombre} />
          <FilaSoloLectura etiqueta="Apellido" valor={perfil?.apellido} />
          <FilaSoloLectura etiqueta="Email" valor={perfil?.correo} />
          <FilaSoloLectura etiqueta="Cédula" valor={perfil?.cedula} />
          <FilaSoloLectura etiqueta="Teléfono" valor={perfil?.telefono} />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col gap-5">
        <h2 className="text-base font-bold text-slate-900">Editar datos</h2>

        <Campo etiqueta="Foto de perfil">
          <input type="file" accept="image/*" onChange={cambiarFoto} className="text-sm text-slate-600" />
        </Campo>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Campo etiqueta="Nombre">
            <input className={CAMPO_BASE} value={form.nombre} onChange={actualizarCampo('nombre')} />
            {errores.nombre && <span className="text-xs text-rose-600">{errores.nombre}</span>}
          </Campo>
          <Campo etiqueta="Apellido">
            <input className={CAMPO_BASE} value={form.apellido} onChange={actualizarCampo('apellido')} />
            {errores.apellido && <span className="text-xs text-rose-600">{errores.apellido}</span>}
          </Campo>
          <Campo etiqueta="Email">
            <input type="email" className={CAMPO_BASE} value={form.correo} onChange={actualizarCampo('correo')} />
            {errores.correo && <span className="text-xs text-rose-600">{errores.correo}</span>}
          </Campo>
          <Campo etiqueta="Teléfono">
            <input type="tel" className={CAMPO_BASE} value={form.telefono} onChange={actualizarCampo('telefono')} />
            {errores.telefono && <span className="text-xs text-rose-600">{errores.telefono}</span>}
          </Campo>
          <Campo etiqueta="Nueva contraseña">
            <input type="password" autoComplete="new-password" className={CAMPO_BASE} value={form.contrasena} onChange={actualizarCampo('contrasena')} placeholder="Dejalo vacío para no cambiarla" />
          </Campo>
          <Campo etiqueta="Repetir contraseña">
            <input type="password" autoComplete="new-password" className={CAMPO_BASE} value={form.confirmarContrasena} onChange={actualizarCampo('confirmarContrasena')} />
            {errores.confirmarContrasena && <span className="text-xs text-rose-600">{errores.confirmarContrasena}</span>}
          </Campo>
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}
        {exito && <p className="text-sm text-[#1fa48a]">{exito}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={guardando}
            className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-[#1fa48a] hover:bg-[#198771] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {guardando ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}
