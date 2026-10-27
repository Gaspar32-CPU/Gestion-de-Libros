import api from '../../services/api'

// Traduce las columnas de la tabla `libros` (MySQL) a los nombres que ya
// usan los componentes del catálogo, para no tener que tocarlos a todos.
function normalizarLibro(libro) {
  return {
    id: libro.id,
    portadaUrl: libro.portada || '',
    titulo: libro.titulo,
    autor: libro.autor,
    generos: libro.generos ?? [],
    editorial: libro.editorial,
    isbn: libro.isbn,
    // Se saca el año del string en vez de usar Date().getFullYear(): fecha_pub
    // llega como "YYYY-MM-DD" y Date lo interpreta como medianoche UTC, así que
    // en husos horarios negativos (Uruguay/Argentina) getFullYear() devolvía el
    // año local, un año menos que el guardado.
    anio: libro.fecha_pub
      ? Number(String(libro.fecha_pub).slice(0, 4))
      : undefined,
    descripcion: libro.resumen || '',
    puntuacion: Number(libro.promedio_estrellas) || 0,
    ejemplaresLibres: libro.disponibles,
    ejemplaresTotales: libro.stock,
    idioma: libro.idioma || '',
    codigoInterno: libro.codigo_interno || '',
  }
}

function normalizarResena(r) {
  return {
    id: r.id,
    usuario: r.usuario,
    calificacion: r.calificacion,
    comentario: r.comentario,
    fecha: r.fecha,
  }
}

export async function obtenerLibros() {
  const { data } = await api.get('/libros')
  return data.map(normalizarLibro)
}

export async function obtenerLibroPorId(id) {
  const { data } = await api.get(`/libros/${id}`)
  return normalizarLibro(data)
}

export async function obtenerResenas(id) {
  const { data } = await api.get(`/libros/${id}/resenas`)
  return data.map(normalizarResena)
}

export async function crearResena(id, { calificacion, comentario }) {
  const { data } = await api.post(`/libros/${id}/resenas`, {
    calificacion,
    comentario,
  })
  return normalizarResena(data)
}

function aCuerpoLibro(datos) {
  return {
    titulo: datos.titulo,
    autor: datos.autor,
    generos: datos.generos,
    editorial: datos.editorial || null,
    isbn: datos.isbn || null,
    fecha_pub: datos.anio ? `${datos.anio}-01-01` : null,
    resumen: datos.descripcion || null,
    portada: datos.portadaUrl || null,
    stock: datos.stock,
    idioma: datos.idioma || null,
    codigo_interno: datos.codigoInterno || null,
  }
}

export async function crearLibro(datos) {
  const { data } = await api.post('/libros', aCuerpoLibro(datos))
  return normalizarLibro(data)
}

export async function actualizarLibro(id, datos) {
  const { data } = await api.put(`/libros/${id}`, aCuerpoLibro(datos))
  return normalizarLibro(data)
}

export async function eliminarLibro(id) {
  await api.delete(`/libros/${id}`)
}

export async function obtenerLibrosPaginados({ page = 1, limit = 4 } = {}) {
  const safePage = Math.max(1, Number(page) || 1)
  const safeLimit = Math.max(1, Number(limit) || 4)

  const libros = await obtenerLibros() // ya normalizados

  const startIndex = (safePage - 1) * safeLimit
  const endIndex = startIndex + safeLimit

  return {
    data: libros.slice(startIndex, endIndex),
    hasMore: endIndex < libros.length,
    total: libros.length,
  }
}
