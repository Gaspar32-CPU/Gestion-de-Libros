export function obtenerIniciales(nombre) {
    if (!nombre) return "";

    return nombre
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((palabra) => palabra[0].toUpperCase())
        .join("");
}
