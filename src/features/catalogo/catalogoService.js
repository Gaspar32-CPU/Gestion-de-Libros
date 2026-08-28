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
