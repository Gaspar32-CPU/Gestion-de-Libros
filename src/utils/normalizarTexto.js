export function normalizarTexto(texto) {
    if (!texto) return "";

    return texto
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase();
}
