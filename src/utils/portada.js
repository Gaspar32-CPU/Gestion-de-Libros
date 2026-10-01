const HEX_COLOR_REGEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

// Una portada puede ser una imagen (URL o archivo subido como data URL) o,
// si el libro no tiene una imagen real, un color liso elegido por el admin.
export function esColorPortada(portadaUrl) {
  return typeof portadaUrl === "string" && HEX_COLOR_REGEX.test(portadaUrl.trim());
}
