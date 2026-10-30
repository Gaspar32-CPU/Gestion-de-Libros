import { Link } from 'react-router-dom'
import { LibroSugerencia } from './LibroSugerencia'

// Cuánto tarda un libro en cruzar su lugar en el carrusel. Más alto = más lento.
const SEGUNDOS_POR_LIBRO = 5

// Máximo de libros visibles a la vez (lg: 1/5 del ancho).
const MAX_VISIBLES = 5

const Contenedor = ({ libros = [] }) => {
  if (libros.length === 0) return null

  // Una "vuelta" tiene que llenar el ancho visible: con pocos libros se
  // repiten hasta llegar a MAX_VISIBLES, así nunca queda un hueco vacío.
  const vuelta = Array.from(
    { length: Math.ceil(MAX_VISIBLES / libros.length) },
    () => libros,
  ).flat()

  // La vuelta va dos veces seguidas para que el desplazamiento continuo
  // (animate-desplazar-mitad en index.css) vuelva a empezar sin saltos.
  const librosEnLoop = [...vuelta, ...vuelta]

  return (
    // @container: los anchos de los libros (cqw) son relativos al carrusel,
    // no a la tira que se mueve, que es más ancha.
    <div className="@container w-full overflow-hidden py-2">
      <div
        className="flex w-max animate-desplazar-mitad"
        style={{ animationDuration: `${vuelta.length * SEGUNDOS_POR_LIBRO}s` }}
      >
        {librosEnLoop.map((libro, i) => {
          // Solo la primera aparición de cada libro es navegable con teclado
          // y lectores de pantalla; las repeticiones son decorativas.
          const esRepeticion = i >= libros.length
          return (
            <Link
              key={i}
              to={`/libro/${libro.id}`}
              aria-hidden={esRepeticion}
              tabIndex={esRepeticion ? -1 : undefined}
              className="w-[50cqw] sm:w-[33.333cqw] md:w-[25cqw] lg:w-[20cqw] shrink-0 px-2 block no-underline"
            >
              <LibroSugerencia
                portadaUrl={libro.portadaUrl}
                titulo={libro.titulo}
                genero={libro.generos.join(', ')}
                autor={libro.autor}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Contenedor
