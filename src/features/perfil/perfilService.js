import api from '../../services/api';

function normalizarPerfil(usuario) {
  return {
    id: usuario.id,
    foto: usuario.foto || '',
    nombre: usuario.nombre ?? '',
    apellido: usuario.apellido ?? '',
    cedula: usuario.CI ?? '',
    correo: usuario.correo ?? '',
    telefono: usuario.telefono ?? '',
  };
}

export async function obtenerPerfil(id) {
  const { data } = await api.get(`/usuarios/${id}`);
  return normalizarPerfil(data);
}

export async function actualizarPerfil(id, datos) {
  // La foto tiene sus propios endpoints (ver subirFoto/quitarFoto), igual
  // que el logo de organización: este PUT no la toca.
  const cuerpo = {
    nombre: datos.nombre,
    apellido: datos.apellido,
    correo: datos.correo,
    telefono: datos.telefono,
  };
  if (datos.contrasena) cuerpo.contrasena = datos.contrasena;

  const { data } = await api.put(`/usuarios/${id}`, cuerpo);
  return normalizarPerfil(data);
}

export async function subirFoto(id, archivo) {
  const body = new FormData();
  body.append('foto', archivo);
  const { data } = await api.post(`/usuarios/${id}/foto`, body);
  return normalizarPerfil(data);
}

export async function quitarFoto(id) {
  const { data } = await api.delete(`/usuarios/${id}/foto`);
  return normalizarPerfil(data);
}
