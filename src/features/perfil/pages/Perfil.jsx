import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../context/useAuth';
import { obtenerIniciales } from '../../../utils/obtenerIniciales';
import { urlArchivo } from '../../../utils/urlArchivo';
import { obtenerPerfil, actualizarPerfil, subirFoto, quitarFoto } from '../perfilService';

export const ETIQUETAS_ROL = { lector: 'Lector', admin: 'Administrador', 'super-admin': 'Super admin' };

const TIPOS_FOTO_ACEPTADOS = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_SIZE_MB_FOTO = 2;

const CAMPO = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#1fa48a]';
const CAMPO_BLOQUEADO = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-sm text-slate-400 cursor-not-allowed';
const BOTON_SECUNDARIO = 'px-4 py-2 rounded-xl text-sm font-bold text-slate-700 border border-slate-200 bg-white hover:border-slate-300 cursor-pointer';
const CARD = 'bg-white border border-slate-200 rounded-2xl p-6';

function Campo({ etiqueta, children, nota }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-500">{etiqueta}</span>
      {children}
      {nota && <span className="text-xs text-slate-400">{nota}</span>}
    </label>
  );
}

const FORM_VACIO = { foto: '', nombre: '', apellido: '', telefono: '', contrasena: '', confirmarContrasena: '' };

export default function Perfil() {
  const { usuario, actualizarUsuario } = useAuth();
  const inputFoto = useRef(null);
  const [perfil, setPerfil] = useState(null);
  const [form, setForm] = useState(FORM_VACIO);
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [cambiandoContrasena, setCambiandoContrasena] = useState(false);
  const [notificarNovedades, setNotificarNovedades] = useState(false);
  const [errores, setErrores] = useState({});
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    obtenerPerfil(usuario.id)
      .then((datos) => {
        setPerfil(datos);
        setForm({ ...FORM_VACIO, foto: datos.foto, nombre: datos.nombre, apellido: datos.apellido, telefono: datos.telefono });
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
    setExito('');
  };

  // El archivo se sube recién al guardar (ver guardarFoto más abajo), igual
  // que el logo de organización: hasta entonces solo mostramos una preview
  // local con un object URL.
  const cambiarFoto = (archivo) => {
    if (form.foto?.startsWith('blob:')) URL.revokeObjectURL(form.foto);
    setArchivoFoto(archivo);
    setForm((prev) => ({ ...prev, foto: archivo ? URL.createObjectURL(archivo) : '' }));
    setExito('');
  };

  const seleccionarFoto = (e) => {
    const archivo = e.target.files?.[0];
    e.target.value = '';
    if (!archivo) return;

    if (!TIPOS_FOTO_ACEPTADOS.includes(archivo.type)) {
      setError('Formato no válido. Usá PNG, JPG o WEBP.');
      return;
    }
    if (archivo.size > MAX_SIZE_MB_FOTO * 1024 * 1024) {
      setError(`La foto supera los ${MAX_SIZE_MB_FOTO} MB.`);
      return;
    }

    setError('');
    cambiarFoto(archivo);
  };

  const cancelarContrasena = () => {
    setCambiandoContrasena(false);
    setForm((prev) => ({ ...prev, contrasena: '', confirmarContrasena: '' }));
    setErrores((prev) => ({ ...prev, contrasena: '', confirmarContrasena: '' }));
  };

  const cancelarCambios = () => {
    if (form.foto?.startsWith('blob:')) URL.revokeObjectURL(form.foto);
    setArchivoFoto(null);
    setForm({ ...FORM_VACIO, foto: perfil.foto, nombre: perfil.nombre, apellido: perfil.apellido, telefono: perfil.telefono });
    setCambiandoContrasena(false);
    setErrores({});
    setError('');
    setExito('');
  };

  const hayCambios = perfil && (
    form.foto !== perfil.foto ||
    form.nombre.trim() !== perfil.nombre ||
    form.apellido.trim() !== perfil.apellido ||
    form.telefono.trim() !== perfil.telefono ||
    form.contrasena !== ''
  );

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!form.apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio.';
    if (!form.telefono.trim()) nuevosErrores.telefono = 'El teléfono es obligatorio.';
    if (cambiandoContrasena && form.contrasena && form.contrasena !== form.confirmarContrasena) {
      nuevosErrores.confirmarContrasena = 'Las contraseñas no coinciden.';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // La foto tiene sus propios endpoints (POST/DELETE), igual que el logo de
  // organización: el PUT de abajo no la toca.
  const guardarFoto = async () => {
    if (form.foto === perfil.foto) return;
    if (archivoFoto) {
      await subirFoto(usuario.id, archivoFoto);
    } else {
      await quitarFoto(usuario.id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');
    if (!validar()) return;

    setGuardando(true);
    try {
      await guardarFoto();
      const actualizado = await actualizarPerfil(usuario.id, {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        correo: perfil.correo,
        telefono: form.telefono.trim(),
        contrasena: form.contrasena,
      });
      if (form.foto?.startsWith('blob:')) URL.revokeObjectURL(form.foto);
      setArchivoFoto(null);
      setPerfil(actualizado);
      setForm((prev) => ({ ...prev, foto: actualizado.foto, nombre: actualizado.nombre, apellido: actualizado.apellido, telefono: actualizado.telefono, contrasena: '', confirmarContrasena: '' }));
      actualizarUsuario({ nombre: actualizado.nombre, apellido: actualizado.apellido, foto: actualizado.foto });
      setCambiandoContrasena(false);
      setExito('Todo guardado');
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
  const iniciales = obtenerIniciales(nombreMostrado);
  const rolEtiqueta = ETIQUETAS_ROL[usuario.rol] ?? usuario.rol;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 text-slate-800">
      <div className="flex items-center gap-5 mb-8">
        <div className="w-20 h-20 rounded-full bg-lime-500 flex items-center justify-center text-2xl font-extrabold text-ink shrink-0 overflow-hidden">
          {form.foto ? <img src={urlArchivo(form.foto)} alt="" className="w-full h-full object-cover" /> : iniciales}
        </div>
        <div className="min-w-0">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Mi perfil</h1>
          <p className="text-sm text-slate-500 mt-1 truncate">{perfil?.correo} · {rolEtiqueta}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <section className={`${CARD} flex items-center gap-4`}>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900">Foto de perfil</p>
            <p className="text-xs text-slate-400">PNG, JPG o WEBP. Hasta {MAX_SIZE_MB_FOTO} MB.</p>
          </div>
          <input ref={inputFoto} type="file" accept={TIPOS_FOTO_ACEPTADOS.join(',')} onChange={seleccionarFoto} className="hidden" />
          <div className="flex gap-2">
            <button type="button" onClick={() => inputFoto.current?.click()} className={BOTON_SECUNDARIO}>
              Subir foto
            </button>
            {form.foto && (
              <button type="button" onClick={() => cambiarFoto(null)} className={BOTON_SECUNDARIO}>
                Quitar
              </button>
            )}
          </div>
        </section>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <section className={`${CARD} flex flex-col gap-5`}>
            <div>
              <h2 className="font-bold text-slate-900">Datos personales</h2>
              <p className="text-sm text-slate-500">Con estos datos te identificamos en los préstamos y en los avisos que enviamos.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Campo etiqueta="Nombre">
                <input className={CAMPO} value={form.nombre} onChange={actualizarCampo('nombre')} />
                {errores.nombre && <span className="text-xs text-rose-600">{errores.nombre}</span>}
              </Campo>
              <Campo etiqueta="Apellido">
                <input className={CAMPO} value={form.apellido} onChange={actualizarCampo('apellido')} />
                {errores.apellido && <span className="text-xs text-rose-600">{errores.apellido}</span>}
              </Campo>
              <Campo etiqueta="Teléfono">
                <input type="tel" className={CAMPO} value={form.telefono} onChange={actualizarCampo('telefono')} />
                {errores.telefono && <span className="text-xs text-rose-600">{errores.telefono}</span>}
              </Campo>
              <Campo etiqueta="Cédula" nota="No editable">
                <input className={CAMPO_BLOQUEADO} value={perfil?.cedula || ''} readOnly disabled />
              </Campo>
            </div>

            <Campo etiqueta="Correo institucional" nota="Define tu institución">
              <input className={CAMPO_BLOQUEADO} value={perfil?.correo || ''} readOnly disabled />
            </Campo>
          </section>

          <section className={`${CARD} flex flex-col gap-5`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-slate-900">Contraseña</h2>
                <p className="text-sm text-slate-500">Dejala como está si no querés cambiarla.</p>
              </div>
              {!cambiandoContrasena && (
                <button type="button" onClick={() => setCambiandoContrasena(true)} className={BOTON_SECUNDARIO}>
                  Cambiar contraseña
                </button>
              )}
            </div>

            {cambiandoContrasena && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Campo etiqueta="Nueva contraseña">
                  <input type="password" autoComplete="new-password" className={CAMPO} value={form.contrasena} onChange={actualizarCampo('contrasena')} />
                </Campo>
                <Campo etiqueta="Repetir contraseña">
                  <input type="password" autoComplete="new-password" className={CAMPO} value={form.confirmarContrasena} onChange={actualizarCampo('confirmarContrasena')} />
                  {errores.confirmarContrasena && <span className="text-xs text-rose-600">{errores.confirmarContrasena}</span>}
                </Campo>
                <div className="sm:col-span-2 flex justify-end">
                  <button type="button" onClick={cancelarContrasena} className={BOTON_SECUNDARIO}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className={`${CARD} flex flex-col gap-4`}>
            <div>
              <h2 className="font-bold text-slate-900">Notificaciones</h2>
              <p className="text-sm text-slate-500">Elegí qué avisos querés recibir por correo.</p>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
              <div>
                <p className="font-semibold text-slate-900">Novedades y recomendaciones</p>
                <p className="text-sm text-slate-500">Nuevos ingresos y libros sugeridos por docentes</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notificarNovedades}
                onClick={() => setNotificarNovedades((v) => !v)}
                className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer shrink-0 ${notificarNovedades ? 'bg-[#1fa48a]' : 'bg-slate-300'}`}
              >
                <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${notificarNovedades ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          </section>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={!hayCambios || guardando}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1fa48a] hover:bg-[#198771] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer"
            >
              {guardando ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button
              type="button"
              onClick={cancelarCambios}
              disabled={!hayCambios || guardando}
              className={`${BOTON_SECUNDARIO} disabled:cursor-not-allowed disabled:opacity-50`}
            >
              Cancelar
            </button>
            {!error && (
              <span className="text-sm text-slate-500">
                {hayCambios ? 'Tenés cambios sin guardar' : (exito || 'Todo guardado')}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
