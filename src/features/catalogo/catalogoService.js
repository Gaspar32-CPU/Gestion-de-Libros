import api from '../../services/api';

// Traduce las columnas de la tabla `libros` (MySQL) a los nombres que ya
// usan los componentes del catálogo, para no tener que tocarlos a todos.
function normalizarLibro(libro) {
  return {
    id: libro.id,
    portadaUrl: libro.portada || '',
    titulo: libro.titulo,
    autor: libro.autor,
    genero: libro.genero,
    editorial: libro.editorial,
    isbn: libro.isbn,
    // Se saca el año del string en vez de usar Date().getFullYear(): fecha_pub
    // llega como "YYYY-MM-DD" y Date lo interpreta como medianoche UTC, así que
    // en husos horarios negativos (Uruguay/Argentina) getFullYear() devolvía el
    // año local, un año menos que el guardado.
    anio: libro.fecha_pub ? Number(String(libro.fecha_pub).slice(0, 4)) : undefined,
    descripcion: libro.resumen || '',
    puntuacion: Number(libro.promedio_estrellas) || 0,
    ejemplaresLibres: libro.disponibles,
    ejemplaresTotales: libro.stock,
    idioma: libro.idioma || '',
    codigoInterno: libro.codigo_interno || '',
  };
}

export async function obtenerLibros() {
  const { data } = await api.get('/libros');
  return data.map(normalizarLibro);
}

export async function obtenerLibroPorId(id) {
  const { data } = await api.get(`/libros/${id}`);
  return normalizarLibro(data);
}

function aCuerpoLibro(datos) {
  return {
    titulo: datos.titulo,
    autor: datos.autor,
    genero: datos.genero,
    editorial: datos.editorial || null,
    isbn: datos.isbn || null,
    fecha_pub: datos.anio ? `${datos.anio}-01-01` : null,
    resumen: datos.descripcion || null,
    portada: datos.portadaUrl || null,
    stock: datos.stock,
    idioma: datos.idioma || null,
    codigo_interno: datos.codigoInterno || null,
  };
}

export async function crearLibro(datos) {
  const { data } = await api.post('/libros', aCuerpoLibro(datos));
  return normalizarLibro(data);
}

export async function actualizarLibro(id, datos) {
  const { data } = await api.put(`/libros/${id}`, aCuerpoLibro(datos));
  return normalizarLibro(data);
}

export async function eliminarLibro(id) {
  await api.delete(`/libros/${id}`);
}

export function obtenerLibrosPaginados({ page = 1, limit = 4, simulateError = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) {
        reject(new Error("Error al conectar con el servidor. Intente nuevamente."));
        return;
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedBooks = libros.slice(startIndex, endIndex);
      
      resolve({
        data: paginatedBooks,
        hasMore: endIndex < libros.length,
        total: libros.length
      });
    }, 800); 
  });
}


const MOCK_REVIEWS = {
  "1": [
    { id: "r1", user: "Laura Gomez", rating: 5, comment: "Una obra maestra de la literatura. Lo leo cada año y siempre encuentro algo nuevo." },
    { id: "r2", user: "Carlos Perez", rating: 4, comment: "Excelente edicion. Muy recomendada para todas las edades." }
  ],
  "2": [
    { id: "r3", user: "Ana Martinez", rating: 5, comment: "El comienzo de una saga increible. La magia se siente real desde la primera pagina." }
  ],
  "3": [
    { id: "r4", user: "Juan Rodriguez", rating: 4, comment: "Un clasico que todos deberian leer. Una narrativa densa pero fascinante." }
  ],
  "4": [] 
};


export function obtenerResenasPorLibroId(libroId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_REVIEWS[libroId] || []);
    }, 400); // Demora simulada de red
  });
}
