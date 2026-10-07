import api from '../../services/api';
import { normalizarTexto } from '../../utils/normalizarTexto';

const ETIQUETAS_ROL = {
  lector: 'Lector',
  admin: 'Administrador',
  'super-admin': 'Super admin',
};

function normalizarUsuario(usuario) {
  const nombre = usuario.nombre ?? '';
  const apellido = usuario.apellido ?? '';

  return {
    id: usuario.id,
    nombre,
    apellido,
    // Los usuarios previos a la columna "apellido" lo tienen vacío y su
    // nombre completo está todo en "nombre".
    nombreCompleto: `${nombre} ${apellido}`.trim(),
    cedula: usuario.CI ?? '',
    correo: usuario.correo ?? '',
    rol: usuario.rol,
    rolEtiqueta: ETIQUETAS_ROL[usuario.rol] ?? usuario.rol ?? '',
    organizacionId: usuario.organizacionId ?? null,
    fechaRegistro: usuario.fecharegistro ?? null,
  };
}

// Usuarios de todas las organizaciones (GET /api/admin/usuarios, solo super-admin).
export async function obtenerTodosUsuarios() {
  const { data } = await api.get('/admin/usuarios');
  return data.map(normalizarUsuario);
}

// Usuarios de la mi organización (GET /api/usuarios).
export async function obtenerMisUsuarios() {
  const { data } = await api.get('/usuarios');
  return data.map(normalizarUsuario);
}

// Filtra por nombre completo o correo, sin distinguir mayúsculas ni tildes.
export function filtrarUsuarios(usuarios, busqueda) {
  const termino = normalizarTexto(busqueda);

  if (!termino) return usuarios;

  return usuarios.filter(
    (usuario) =>
      normalizarTexto(usuario.nombreCompleto).includes(termino) ||
      normalizarTexto(usuario.correo).includes(termino)
  );
}
