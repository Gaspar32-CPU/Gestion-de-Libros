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
  const cuerpo = {
    nombre: datos.nombre,
    apellido: datos.apellido,
    correo: datos.correo,
    telefono: datos.telefono,
    foto: datos.foto,
  };
  if (datos.contrasena) cuerpo.contrasena = datos.contrasena;

  const { data } = await api.put(`/usuarios/${id}`, cuerpo);
  return normalizarPerfil(data);
}
