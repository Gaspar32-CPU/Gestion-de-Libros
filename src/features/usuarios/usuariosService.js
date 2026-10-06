import api from '../../services/api';
import { normalizarTexto } from '../../utils/normalizarTexto';

const ETIQUETAS_ROL = {
  lector: 'Lector',
  admin: 'Administrador',
  'super-admin': 'Super admin',
};

function normalizarUsuario(usuario) {
  return {
    id: usuario.id,
    nombre: usuario.nombre ?? '',
    cedula: usuario.CI ?? '',
    correo: usuario.correo ?? '',
    rol: usuario.rol,
    rolEtiqueta: ETIQUETAS_ROL[usuario.rol] ?? usuario.rol ?? '',
    organizacionId: usuario.organizacionId ?? null,
    fechaRegistro: usuario.fecharegistro ?? null,
  };
}

// Usuarios de todas las organizaciones (GET /api/admin/usuarios, solo super-admin).
export async function obtenerUsuarios() {
  const { data } = await api.get('/admin/usuarios');
  return data.map(normalizarUsuario);
}

// Filtra por nombre o correo, sin distinguir mayúsculas ni tildes.
export function filtrarUsuarios(usuarios, busqueda) {
  const termino = normalizarTexto(busqueda);

  if (!termino) return usuarios;

  return usuarios.filter(
    (usuario) =>
      normalizarTexto(usuario.nombre).includes(termino) ||
      normalizarTexto(usuario.correo).includes(termino)
  );
}
