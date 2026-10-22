const ORIGEN_API = new URL(import.meta.env.VITE_API_URL, window.location.origin)
  .origin;

export function urlArchivo(url) {
  if (!url) return url;
  return url.startsWith("/uploads/") ? `${ORIGEN_API}${url}` : url;
}
